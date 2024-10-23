import { TDataTasks } from '../../components/App/App'
import { TAction, ActionType } from '../action/taskAction'

export function taskReducer(state: TDataTasks, action: TAction): TDataTasks {
  switch (action.type) {
    case ActionType.CREATE_TASK: {
      const stateCopy = { ...state }

      const newTask = {
        id: crypto.randomUUID(),
        title: action.title,
        isDone: false,
      }

      const tasks = stateCopy[action.todoListId]
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todoListId] = newTasks

      return stateCopy
    }
    case ActionType.DELETE_TASK: {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todoListId]
      const filteredTasks = tasks.filter(task => task.id !== action.taskId)

      stateCopy[action.todoListId] = filteredTasks

      return stateCopy
    }

    default:
      throw new Error('Sorry, action type invalid!')
  }
}
