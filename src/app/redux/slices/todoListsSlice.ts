import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { todoListsAPI } from '../../../api/todoList-api'
import { TodoListType } from '../../../api/typesAPI/todoListTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { setAppStatus } from './appSlice'
import { getTasks } from './tasksSlice'
import { clearTodoListsAndTaskState } from '../common/actions'
import { AppStatus, FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { selectors } from '../selectors'

const initialState: TodoListBusinessType[] = []

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

const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<ChangeTodoListFilterPayload>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].filter = action.payload.filter
    },

    changeTodoListEntityStatus: (
      state,
      action: PayloadAction<ChangeTodoListEntityStatusPayload>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodoList.fulfilled, (_, action) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }))
    })

    builder.addCase(createTodoList.fulfilled, (state, action) => {
      const newTodoList: TodoListBusinessType = {
        ...action.payload.todoList,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }

      state.unshift(newTodoList)
    })

    builder.addCase(deleteTodoList.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    })

    builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].title = action.payload.title
    })

    builder.addCase(clearTodoListsAndTaskState, () => {
      return initialState
    })
  },
  selectors: selectors.todoListsSelectors,
})

export const todoListsReducer = todoListsSlice.reducer
export const { changeTodoListFilter, changeTodoListEntityStatus } = todoListsSlice.actions
export const todoListsSelectors = todoListsSlice.selectors

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
