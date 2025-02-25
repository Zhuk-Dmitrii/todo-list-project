import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { todoListsAPI } from '../../../api/todoList-api'
import { TodoListType } from '../../../api/typesAPI/todoListTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { setAppStatusAC } from '../reducer/appReducer'
import { getTasksTC } from './tasksReducer'
import { AppStatus, FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'

const initialState: TodoListBusinessType[] = []

const todoListsSlice = createSlice({
  name: 'auth',
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

    setTodoListsAC: (state, action: PayloadAction<TodoListType[]>) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }))
    },

    resetStateAC: () => [],
  },
})

export const todoListsReducer = todoListsSlice.reducer
export const {
  createTodoListAC,
  deleteTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  changeTodoListEntityStatusAC,
  setTodoListsAC,
  resetStateAC,
} = todoListsSlice.actions

// ------------------------ THUNKS ------------------------------------
export const getTodoListTC = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .getTodoLists()
      .then(res => {
        dispatch(setTodoListsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))

        return res.data
      })
      .then(todoListsData => {
        todoListsData.forEach(todoList => dispatch(getTasksTC(todoList.id)))
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

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
