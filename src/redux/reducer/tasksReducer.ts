import { TAction, ActionTypeTask, createActionSetTasks } from '../action/taskAction'
import { ActionTypeTodoList } from '../action/todoListsAction'
import { todoListsAPI } from '../../api/todoList-api'
import { TaskPriority, TaskStatus, TaskType } from '../../api/typesAPI/todoListTypes'
import { TasksDataType } from '../types/business'
import { AppDispatch } from '../types/store'

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

export const fetchTasksThunkCreator = (todoListId: string) => {
  return (dispatch: AppDispatch) => {
    todoListsAPI.getTodoListTasks(todoListId).then(res => {
      const action = createActionSetTasks(todoListId, res.data.items)
      dispatch(action)
    })
  }
}
