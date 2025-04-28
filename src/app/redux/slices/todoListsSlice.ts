import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { todoListsAPI } from '../../../api/todoList-api'
import { TodoListType } from '../../../api/typesAPI/todoListTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { setAppStatusAC } from './appSlice'
import { getTasksTC } from './tasksSlice'
import { AppStatus, FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'

const initialState: TodoListBusinessType[] = []

export const getTodoListTC = createAsyncThunk<
  GetTodoListsPayload,
  void,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/getTodoList', async (_, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todoListsAPI.getTodoLists()
    res.data.forEach(todoList => dispatch(getTasksTC(todoList.id)))
    dispatch(setAppStatusAC('succeeded'))

    return res.data
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue(error.message)
  }
})

export const createTodoListTC = createAsyncThunk<
  CreateTodoListPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/createTodoList', async (title, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))

  try {
    const res = await todoListsAPI.createTodoList(title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC('succeeded'))

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

export const deleteTodoListTC = createAsyncThunk<
  DeleteTodoListPayload,
  string,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/deleteTodoList', async (id, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodoListEntityStatusAC({ id, status: 'loading' }))

  try {
    const res = await todoListsAPI.deleteTodoList(id)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC('succeeded'))

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

export const changeTodoListTitleTC = createAsyncThunk<
  ChangeTodoListTitlePayload,
  ChangeTodoListTitleThunkParam,
  { dispatch: AppDispatch; rejectValue: string | string[] }
>('todoLists/changeTodoListTitle', async ({ id, title }, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))

  try {
    const res = await todoListsAPI.updateTodoList(id, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC('succeeded'))

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

const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    changeTodoListFilterAC: (state, action: PayloadAction<ChangeTodoListFilterPayload>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].filter = action.payload.filter
    },

    changeTodoListEntityStatusAC: (
      state,
      action: PayloadAction<ChangeTodoListEntityStatusPayload>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].entityStatus = action.payload.status
    },

    resetStateAC: () => {
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodoListTC.fulfilled, (_, action) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }))
    })

    builder.addCase(createTodoListTC.fulfilled, (state, action) => {
      const newTodoList: TodoListBusinessType = {
        ...action.payload.todoList,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }

      state.unshift(newTodoList)
    })

    builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    })

    builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].title = action.payload.title
    })
  },
})

export const todoListsReducer = todoListsSlice.reducer
export const { changeTodoListFilterAC, changeTodoListEntityStatusAC, resetStateAC } =
  todoListsSlice.actions

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

type ChangeTodoListFilterPayload = {
  id: string
  filter: FilteredValues
}

type ChangeTodoListEntityStatusPayload = {
  id: string
  status: AppStatus
}
