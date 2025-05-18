import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { UpdateBusinessTaskModelType } from '../../types/businessTypes'
import { TaskType, UpdateTaskModelType } from '../../../api/typesAPI/todoListTypes'
import { AppDispatch, RootState } from '../../types/storeTypes'
import { setAppStatus } from '../slices/appSlice'
import { todoListsAPI } from '../../../api/todoList-api'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { changeTaskEntityStatus } from '../slices/tasksSlice'

export const getTasks = createAsyncThunk<
  SetTasksPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string }
>('tasks/getTasks', async (todoListId, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await todoListsAPI.getTodoListTasks(todoListId)
    dispatch(setAppStatus('succeeded'))

    return { todoListId, tasks: res.data.items }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const deleteTask = createAsyncThunk<
  DeleteTaskPayload,
  DeleteTaskThunkParam,
  { dispatch: AppDispatch; rejectValue: string }
>('tasks/deleteTask', async ({ taskId, todoListId }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))
  dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'loading' }))

  try {
    await todoListsAPI.deleteTodoListTask(todoListId, taskId)

    dispatch(setAppStatus('succeeded'))
    dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'succeeded' }))

    return { todoListId, taskId }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)
    dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'failed' }))

    return rejectWithValue(error.message)
  }
})

export const createTask = createAsyncThunk<
  { task: TaskType },
  { todoListId: string; title: string },
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('tasks/createTask', async ({ todoListId, title }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))

  try {
    dispatch(setAppStatus('loading'))

    const res = await todoListsAPI.createTodoListTask(todoListId, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatus('succeeded'))

      return { task: res.data.data.item }
    } else {
      handleServerErrorApp(res.data, dispatch)

      return rejectWithValue(res.data.messages)
    }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const updateTask = createAsyncThunk<
  UpdateTaskPayload,
  UpdateTaskThunkParam,
  { state: RootState; dispatch: AppDispatch; rejectValue: string | string[] }
>(
  'tasks/updateTask',
  async ({ todoListId, taskId, businessModel }, { getState, dispatch, rejectWithValue }) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'loading' }))

    const state = getState()
    const task = state.tasks[todoListId].find(task => task.id === taskId)

    if (!task) {
      console.warn('таска не найдена')

      return rejectWithValue('таска не найдена')
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...businessModel,
    }

    try {
      const res = await todoListsAPI.updateTodoListTask(todoListId, taskId, apiModel)

      if (res.data.resultCode === 0) {
        dispatch(setAppStatus('succeeded'))
        dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'succeeded' }))

        return { todoListId, taskId, model: businessModel }
      } else {
        handleServerErrorApp(res.data, dispatch)
        dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'failed' }))

        return rejectWithValue(res.data.messages)
      }
    } catch (err) {
      const error = err as AxiosError
      handleNetworkErrorApp(error.message, dispatch)
      dispatch(changeTaskEntityStatus({ todoListId, taskId, status: 'failed' }))

      return rejectWithValue(error.message)
    }
  },
)

// ------------------------ TYPES ------------------------------------
type DeleteTaskPayload = {
  todoListId: string
  taskId: string
}

type DeleteTaskThunkParam = DeleteTaskPayload

type UpdateTaskPayload = {
  todoListId: string
  taskId: string
  model: UpdateBusinessTaskModelType
}

type UpdateTaskThunkParam = {
  todoListId: string
  taskId: string
  businessModel: UpdateBusinessTaskModelType
}

type SetTasksPayload = {
  todoListId: string
  tasks: TaskType[]
}
