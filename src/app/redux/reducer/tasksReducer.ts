import {
  TAction,
  ActionTypeTask,
  setTasksAC,
  createTaskAC,
  deleteTaskAC,
  updateTaskAC,
} from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'
import { todoListsAPI } from '../../../api/todoList-api'
import { TaskType, UpdateTaskModelType } from '../../../api/typesAPI/todoListTypes'
import { UpdateBusinessTaskModelType, TasksDataType } from '../../types/businessTypes'
import { AppDispatch, RootState } from '../../types/storeTypes'
import { setAppStatusAC } from '../action/appAction'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'

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

    case ActionTypeTask.UPDATE_TASK: {
      const tasks = state[action.todoListId]

      state[action.todoListId] = tasks.map(task => {
        if (task.id === action.taskId) {
          return { ...task, ...action.model }
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

    case ActionTypeTodoList.RESET_STATE: {
      return {}
    }

    default:
      return state
  }
}

// ------------------ THUNK CREATORS -------------------------------
export const getTasksTC = (todoListId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .getTodoListTasks(todoListId)
      .then(res => {
        dispatch(setTasksAC(todoListId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

export const createTaskTC = (todoListId: string, title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .createTodoListTask(todoListId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(createTaskAC(res.data.data.item))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

export const deleteTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .deleteTodoListTask(todoListId, taskId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(deleteTaskAC(todoListId, taskId))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

export const updateTaskTC = (
  todoListId: string,
  taskId: string,
  businessModel: UpdateBusinessTaskModelType,
) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))

    const state = getState()
    const task = state.tasks[todoListId].find(task => task.id === taskId)

    if (!task) {
      console.warn('таска не найдена')

      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...businessModel,
    }

    todoListsAPI
      .updateTodoListTask(todoListId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todoListId, taskId, businessModel))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}
