import { TDataTasks } from '../../types/todoTypes'
import { TAction, ActionTypeTask } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'

const initialState: TDataTasks = {}

export function tasksReducer(state = initialState, action: TAction): TDataTasks {
  switch (action.type) {
    case ActionTypeTask.CREATE_TASK: {
      const stateCopy = structuredClone(state)

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
      const stateCopy = structuredClone(state)
      const tasks = stateCopy[action.todoListId]
      const filteredTasks = tasks.filter(task => task.id !== action.taskId)

      stateCopy[action.todoListId] = filteredTasks

      return stateCopy
    }
    case ActionTypeTask.CHANGE_STATUS_TASK: {
      const stateCopy = structuredClone(state)
      const tasks = stateCopy[action.todoListId]
      const task = tasks.find(task => task.id === action.taskId)

      if (task) task.isDone = action.isDone

      return stateCopy
    }
    case ActionTypeTask.CHANGE_TASK_TITLE: {
      const stateCopy = structuredClone(state)
      const tasks = stateCopy[action.todoListId]
      const task = tasks.find(task => task.id === action.taskId)

      if (task) task.title = action.title

      return stateCopy
    }
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      const stateCopy = structuredClone(state)

      stateCopy[action.todoListId] = []

      return stateCopy
    }
    case ActionTypeTodoList.DELETE_TODO_LIST: {
      const stateCopy = structuredClone(state)

      delete stateCopy[action.id]

      return stateCopy
    }
    default:
      return state
  }
}
