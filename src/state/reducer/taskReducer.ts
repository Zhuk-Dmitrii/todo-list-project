import { TDataTasks } from '../../components/App/App'
import { TAction, ActionTypeTask } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'

export function taskReducer(state: TDataTasks, action: TAction): TDataTasks {
  switch (action.type) {
    case ActionTypeTask.CREATE_TASK: {
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
    case ActionTypeTask.DELETE_TASK: {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todoListId]
      const filteredTasks = tasks.filter(task => task.id !== action.taskId)

      stateCopy[action.todoListId] = filteredTasks

      return stateCopy
    }
    case ActionTypeTask.CHANGE_STATUS_TASK: {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todoListId]
      const task = tasks.find(task => task.id === action.taskId)

      if (task) task.isDone = action.isDone

      return stateCopy
    }
    case ActionTypeTask.CHANGE_TASK_TITLE: {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todoListId]
      const task = tasks.find(task => task.id === action.taskId)

      if (task) task.title = action.title

      return stateCopy
    }
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      const stateCopy = { ...state }

      stateCopy[action.todoListId] = []

      return stateCopy
    }
    default:
      throw new Error('Sorry, action type invalid!')
  }
}
