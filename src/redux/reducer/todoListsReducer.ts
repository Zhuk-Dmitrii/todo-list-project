import { todoListsAPI } from '../../api/todoList-api'
import { ActionTypeTodoList, setTodoListsAC, TAction } from '../action/todoListsAction'
import { FilteredValues, TodoListBusinessType } from '../types/business'
import { AppDispatch } from '../types/store'

const initialState: TodoListBusinessType[] = []

export function todoListsReducer(
  state: TodoListBusinessType[] = initialState,
  action: TAction,
): TodoListBusinessType[] {
  switch (action.type) {
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      const stateCopy = [...state]

      return [
        {
          id: action.todoListId,
          title: action.title,
          filter: FilteredValues.all,
          addedDate: '',
          order: 0,
        },
        ...stateCopy,
      ]
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

export const fetchTodoListThunkCreator = () => {
  return (dispatch: AppDispatch) => {
    todoListsAPI.getTodoLists().then(res => {
      const action = setTodoListsAC(res.data)
      dispatch(action)
    })
  }
}
