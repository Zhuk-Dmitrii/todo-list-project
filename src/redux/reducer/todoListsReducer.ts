import { TTodoList } from '../../types/todoTypes'
import { FilteredValues } from '../../types/enums'
import { ActionTypeTodoList, TAction } from '../action/todoListsAction'

const initialState: Array<TTodoList> = []

export function todoListsReducer(state = initialState, action: TAction): Array<TTodoList> {
  switch (action.type) {
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      const stateCopy = [...state]

      return [
        {
          id: action.todoListId,
          title: action.title,
          filter: FilteredValues.all,
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

    default:
      return state
  }
}
