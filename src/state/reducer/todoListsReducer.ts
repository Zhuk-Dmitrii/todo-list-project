import { FilteredValues, TTodoList } from '../../components/App/App'
import { ActionType, TAction } from '../action/todoListsAction'

export function todoListsReducer(state: Array<TTodoList>, action: TAction): Array<TTodoList> {
  switch (action.type) {
    case ActionType.CREATE_TODO_LIST: {
      const stateCopy = [...state]

      return [
        {
          id: crypto.randomUUID(),
          title: action.title,
          filter: FilteredValues.all,
        },
        ...stateCopy,
      ]
    }

    case ActionType.DELETE_TODO_LIST: {
      const newState = state.filter(todoList => todoList.id !== action.id)

      return newState
    }

    case ActionType.CHANGE_FILTER_TODO_LIST: {
      const stateCopy = [...state]
      const todoList = stateCopy.find(item => item.id == action.id)

      if (todoList) {
        todoList.filter = action.value
      }

      return stateCopy
    }

    case ActionType.CHANGE_TITLE_TODO_LIST: {
      const stateCopy = [...state]

      const todoList = stateCopy.find(item => item.id == action.id)

      if (todoList) {
        todoList.title = action.newTitle
      }

      return stateCopy
    }

    default:
      throw new Error('Sorry, action type invalid!')
  }
}
