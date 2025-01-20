import { TAction, ActionTypeTask } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'
import { TaskPriority, TaskStatus, TaskType } from '../../api/typesAPI/todoListTypes'
import { TasksDataType } from '../types/business'

const initialState: TasksDataType = {}

export function tasksReducer(state: TasksDataType = initialState, action: TAction): TasksDataType {
  switch (action.type) {
    case ActionTypeTask.CREATE_TASK: {
      const tasks = state[action.todoListId]

      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title: action.title,
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: action.todoListId,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
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
          return { ...task, status: action.status }
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
