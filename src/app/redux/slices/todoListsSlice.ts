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
  TodoListType[],
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

const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    createTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
      const newTodoList: TodoListBusinessType = {
        ...action.payload.todoList,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }

      state.unshift(newTodoList)
    },

    deleteTodoListAC: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    },

    changeTodoListFilterAC: (state, action: PayloadAction<ChangeTodoListFilterPayload>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].filter = action.payload.filter
    },

    changeTodoListTitleAC: (state, action: PayloadAction<ChangeTodoListTitlePayload>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].title = action.payload.newTitle
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
  },
})

export const todoListsReducer = todoListsSlice.reducer
export const {
  createTodoListAC,
  deleteTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  changeTodoListEntityStatusAC,
  resetStateAC,
} = todoListsSlice.actions

// ------------------------ THUNKS ------------------------------------

export const createTodoListTC = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .createTodoList(title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(createTodoListAC({ todoList: res.data.data.item }))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

export const deleteTodoListTC = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC({ id, status: 'loading' }))

    todoListsAPI
      .deleteTodoList(id)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(deleteTodoListAC({ id }))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

export const changeTodoListTitleTC = (id: string, title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .updateTodoList(id, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodoListTitleAC({ id, newTitle: title }))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

// ------------------------ TYPES ------------------------------------
type ChangeTodoListFilterPayload = {
  id: string
  filter: FilteredValues
}

type ChangeTodoListTitlePayload = {
  id: string
  newTitle: string
}

type ChangeTodoListEntityStatusPayload = {
  id: string
  status: AppStatus
}
