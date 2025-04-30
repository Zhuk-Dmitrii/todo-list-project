import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { createTodoListTC, deleteTodoListTC, getTodoListTC } from './todoListsSlice'
import { todoListsAPI } from '../../../api/todoList-api'
import { TaskType, UpdateTaskModelType } from '../../../api/typesAPI/todoListTypes'
import { UpdateBusinessTaskModelType, TasksDataType } from '../../types/businessTypes'
import { AppDispatch, RootState } from '../../types/storeTypes'
import { setAppStatusAC } from './appSlice'
import { clearTodoListsAndTaskState } from '../common/actions/common.actions'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'

const initialState: TasksDataType = {}

export const getTasksTC = createAsyncThunk<
  SetTasksPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string }
>('tasks/getTasks', async (todoListId, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todoListsAPI.getTodoListTasks(todoListId)
    dispatch(setAppStatusAC('succeeded'))

    return { todoListId, tasks: res.data.items }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const deleteTaskTC = createAsyncThunk<
  DeleteTaskPayload,
  DeleteTaskThunkParam,
  { dispatch: AppDispatch; rejectValue: string }
>('tasks/deleteTask', async ({ taskId, todoListId }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))

  try {
    await todoListsAPI.deleteTodoListTask(todoListId, taskId)

    dispatch(setAppStatusAC('succeeded'))

    return { todoListId, taskId }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const createTaskTC = createAsyncThunk<
  { task: TaskType },
  { todoListId: string; title: string },
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('tasks/createTask', async ({ todoListId, title }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))

  try {
    dispatch(setAppStatusAC('loading'))

    const res = await todoListsAPI.createTodoListTask(todoListId, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC('succeeded'))

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

export const updateTaskTC = createAsyncThunk<
  UpdateTaskPayload,
  UpdateTaskThunkParam,
  { state: RootState; dispatch: AppDispatch; rejectValue: string | string[] }
>(
  'tasks/updateTask',
  async ({ todoListId, taskId, businessModel }, { getState, dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC('loading'))

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
        dispatch(setAppStatusAC('succeeded'))

        return { todoListId, taskId, model: businessModel }
      } else {
        handleServerErrorApp(res.data, dispatch)

        return rejectWithValue(res.data.messages)
      }
    } catch (err) {
      const error = err as AxiosError
      handleNetworkErrorApp(error.message, dispatch)

      return rejectWithValue(error.message)
    }
  },
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTodoListTC.fulfilled, (state, action) => {
      state[action.payload.todoList.id] = []
    })

    builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })

    builder.addCase(getTodoListTC.fulfilled, (state, action) => {
      action.payload.forEach(tl => {
        state[tl.id] = []
      })
    })

    builder.addCase(clearTodoListsAndTaskState, () => {
      return initialState
    })

    builder.addCase(getTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks
    })

    builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        state[action.payload.todoListId].splice(index, 1)
      }
    })

    builder.addCase(createTaskTC.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    })

    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
  },
})

export const tasksReducer = tasksSlice.reducer

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
