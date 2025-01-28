import { TAction, ActionTypeTask, setTasksAC, createTaskAC } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'
import { todoListsAPI } from '../../api/todoList-api'
import { TaskType } from '../../api/typesAPI/todoListTypes'
import { TasksDataType } from '../types/business'
import { AppDispatch } from '../types/store'

const initialState: TasksDataType = {}

export function tasksReducer(state: TasksDataType = initialState, action: TAction): TasksDataType {
  switch (action.type) {
    case ActionTypeTask.CREATE_TASK: {
      const tasks = state[action.task.todoListId]

      const newTask: TaskType = action.task

      state[action.task.todoListId] = [newTask, ...tasks]

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
        [action.todoList.id]: [],
      }
    }

    case ActionTypeTodoList.DELETE_TODO_LIST: {
      const stateCopy = { ...state }

      delete stateCopy[action.id]

      return stateCopy
    }

    case ActionTypeTodoList.SET_TODO_LISTS: {
      const stateCopy = { ...state }

      action.todoLists.forEach(tl => {
        stateCopy[tl.id] = []
      })

      return stateCopy
    }

    case ActionTypeTask.SET_TASKS: {
      const stateCopy = { ...state }

      stateCopy[action.todoListId] = action.tasks

      return stateCopy
    }

    default:
      return state
  }
}

// ------------------------ THUNKS ------------------------------------
export const getTasksTC = (todoListId: string) => {
  return (dispatch: AppDispatch) => {
    todoListsAPI.getTodoListTasks(todoListId).then(res => {
      const action = setTasksAC(todoListId, res.data.items)
      dispatch(action)
    })
  }
}

export const createTaskTC = (todoListId: string, title: string) => {
  return (dispatch: AppDispatch) => {
    todoListsAPI.createTodoListTask(todoListId, title).then(res => {
      const action = createTaskAC(res.data.data.item)
      dispatch(action)
    })
  }
}
