import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { TodoListType } from '../../../api/typesAPI/todoListTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatus } from '../slices/appSlice'
import { todoListsAPI } from '../../../api/todoList-api'
import { getTasks } from './tasksThunk'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { changeTodoListEntityStatus } from '../slices/todoListsSlice'

export const getTodoList = createAsyncThunk<
  GetTodoListsPayload,
  void,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/getTodoList', async (_, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await todoListsAPI.getTodoLists()
    res.data.forEach(todoList => dispatch(getTasks(todoList.id)))
    dispatch(setAppStatus('succeeded'))

    return res.data
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const createTodoList = createAsyncThunk<
  CreateTodoListPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/createTodoList', async (title, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))

  try {
    const res = await todoListsAPI.createTodoList(title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatus('succeeded'))

      return { todoList: res.data.data.item }
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

export const deleteTodoList = createAsyncThunk<
  DeleteTodoListPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/deleteTodoList', async (id, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))
  dispatch(changeTodoListEntityStatus({ id, status: 'loading' }))

  try {
    const res = await todoListsAPI.deleteTodoList(id)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatus('succeeded'))

      return { id }
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

export const changeTodoListTitle = createAsyncThunk<
  ChangeTodoListTitlePayload,
  ChangeTodoListTitleThunkParam,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/changeTodoListTitle', async ({ id, title }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))

  try {
    const res = await todoListsAPI.updateTodoList(id, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatus('succeeded'))

      return { id, title }
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

// ------------------------ TYPES ------------------------------------
type GetTodoListsPayload = TodoListType[]

type CreateTodoListPayload = {
  todoList: TodoListType
}

type DeleteTodoListPayload = {
  id: string
}

type ChangeTodoListTitlePayload = {
  id: string
  title: string
}

type ChangeTodoListTitleThunkParam = {
  id: string
  title: string
}
