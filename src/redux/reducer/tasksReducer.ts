import { TDataTasks } from '../../types/todoTypes'
import { TAction, ActionTypeTask } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'

const initialState: TDataTasks = {}

export function tasksReducer(state = initialState, action: TAction): TDataTasks {
  switch (action.type) {
    case ActionTypeTask.CREATE_TASK: {
      const tasks = state[action.todoListId]

      const newTask = {
        id: crypto.randomUUID(),
        title: action.title,
        isDone: false,
      }

      state[action.todoListId] = [newTask, ...tasks]

      return { ...state }
    }
    case ActionTypeTask.DELETE_TASK: {
      const tasks = state[action.todoListId]
      const filteredTasks = tasks.filter(task => task.id !== action.taskId)

      state[action.todoListId] = filteredTasks

      return { ...state }
    }
    case ActionTypeTask.CHANGE_STATUS_TASK: {
      const tasks = state[action.todoListId]

      state[action.todoListId] = tasks.map(task => {
        if (task.id === action.taskId) {
          return { ...task, isDone: action.isDone }
        } else {
          return task
        }
      })

      return { ...state }
    }
    case ActionTypeTask.CHANGE_TASK_TITLE: {
      const tasks = state[action.todoListId]

      state[action.todoListId] = tasks.map(task => {
        if (task.id === action.taskId) {
          return { ...task, title: action.title }
        } else {
          return task
        }
      })

      return { ...state }
    }
    case ActionTypeTodoList.CREATE_TODO_LIST: {
      return {
        ...state,
        [action.todoListId]: [],
      }
    }
    case ActionTypeTodoList.DELETE_TODO_LIST: {
      const stateCopy = { ...state }

      delete stateCopy[action.id]

      return stateCopy
    }
    default:
      return state
  }
}
