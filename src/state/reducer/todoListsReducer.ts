import { FilteredValues, TTodoList } from '../../components/App/App'
import { ActionType, TAction } from '../action/todoListsAction'

export function todoListsReducer(state: Array<TTodoList>, action: TAction): Array<TTodoList> {
  switch (action.type) {
    case ActionType.CREATE_TODO_LIST: {
      return [
        {
          id: crypto.randomUUID(),
          title: action.title,
          filter: FilteredValues.all,
        },
        ...state,
      ]
    }

    case ActionType.DELETE_TODO_LIST: {
      const newState = state.filter(todoList => todoList.id !== action.id)

      return newState
    }

    default:
      throw new Error('Sorry, action type invalid!')
  }
}
