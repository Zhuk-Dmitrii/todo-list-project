import { todoListsAPI } from '../../../api/todoList-api'
import {
  ActionTypeTodoList,
  changeTodoListEntityStatusAC,
  changeTodoListTitleAC,
  createTodoListAC,
  deleteTodoListAC,
  setTodoListsAC,
  TAction,
} from '../action/todoListsAction'
import { FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatusAC } from '../action/appAction'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { getTasksTC } from './tasksReducer'

const initialState: TodoListBusinessType[] = []

export function todoListsReducer(
  state: TodoListBusinessType[] = initialState,
  action: TAction,
): TodoListBusinessType[] {
  switch (action.type) {
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      const stateCopy = [...state]

      const newTodoList: TodoListBusinessType = {
        ...action.todoList,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }

      return [newTodoList, ...stateCopy]
    }

    case ActionTypeTodoList.DELETE_TODO_LIST: {
      const newState = state.filter(todoList => todoList.id !== action.id)

      return newState
    }

    case ActionTypeTodoList.CHANGE_FILTER_TODO_LIST: {
      return state.map(todoList => {
        if (todoList.id === action.id) {
          return { ...todoList, filter: action.filter }
        } else {
          return todoList
        }
      })
    }

    case ActionTypeTodoList.CHANGE_TITLE_TODO_LIST: {
      return state.map(todoList => {
        if (todoList.id === action.id) {
          return { ...todoList, title: action.newTitle }
        } else {
          return todoList
        }
      })
    }

    case ActionTypeTodoList.CHANGE_ENTITY_STATUS_TODO_LIST: {
      return state.map(todoList => {
        if (todoList.id === action.id) {
          return { ...todoList, entityStatus: action.status }
        } else {
          return todoList
        }
      })
    }

    case ActionTypeTodoList.SET_TODO_LISTS: {
      const todoLists: TodoListBusinessType[] = action.todoLists.map(tl => {
        return {
          ...tl,
          filter: FilteredValues.all,
          entityStatus: 'idle',
        }
      })

      return todoLists
    }

    case ActionTypeTodoList.RESET_STATE: {
      return []
    }

    default:
      return state
  }
}

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
          dispatch(createTodoListAC(res.data.data.item))
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
    dispatch(changeTodoListEntityStatusAC(id, 'loading'))

    todoListsAPI
      .deleteTodoList(id)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(deleteTodoListAC(id))
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
          dispatch(changeTodoListTitleAC(id, title))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}
