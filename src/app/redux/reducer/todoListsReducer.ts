import { todoListsAPI } from '../../../api/todoList-api'
import {
  ActionTypeTodoList,
  changeTodoListTitleAC,
  createTodoListAC,
  deleteTodoListAC,
  setTodoListsAC,
  TAction,
} from '../action/todoListsAction'
import { FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatusAC } from '../action/appAction'

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
      }

      return [newTodoList, ...stateCopy]
    }

    case ActionTypeTodoList.DELETE_TODO_LIST: {
      const newState = state.filter(todoList => todoList.id !== action.id)

      return newState
    }

    case ActionTypeTodoList.CHANGE_FILTER_TODO_LIST: {
      const stateCopy = [...state]
      const todoList = stateCopy.find(item => item.id == action.id)

      if (todoList) {
        todoList.filter = action.value
      }

      return stateCopy
    }

    case ActionTypeTodoList.CHANGE_TITLE_TODO_LIST: {
      const stateCopy = [...state]

      const todoList = stateCopy.find(item => item.id == action.id)

      if (todoList) {
        todoList.title = action.newTitle
      }

      return stateCopy
    }

    case ActionTypeTodoList.SET_TODO_LISTS: {
      const todoLists = action.todoLists.map(tl => {
        return {
          ...tl,
          filter: FilteredValues.all,
        }
      })

      return todoLists
    }

    default:
      return state
  }
}

// ------------------------ THUNKS ------------------------------------
export const getTodoListTC = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.getTodoLists().then(res => {
      dispatch(setTodoListsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
  }
}

export const createTodoListTC = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.createTodoList(title).then(res => {
      dispatch(createTodoListAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    })
  }
}

export const deleteTodoListTC = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.deleteTodoList(id).then(() => {
      dispatch(deleteTodoListAC(id))
      dispatch(setAppStatusAC('succeeded'))
    })
  }
}

export const changeTodoListTitleTC = (id: string, title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.updateTodoList(id, title).then(() => {
      dispatch(changeTodoListTitleAC(id, title))
      dispatch(setAppStatusAC('succeeded'))
    })
  }
}
