import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createTodoListAC, deleteTodoListAC, setTodoListsAC, resetStateAC } from './todoListsSlice'
import { todoListsAPI } from '../../../api/todoList-api'
import { TaskType, UpdateTaskModelType } from '../../../api/typesAPI/todoListTypes'
import { UpdateBusinessTaskModelType, TasksDataType } from '../../types/businessTypes'
import { AppDispatch, RootState } from '../../types/storeTypes'
import { setAppStatusAC } from './appSlice'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'

const initialState: TasksDataType = {}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },

    deleteTaskAC: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        state[action.payload.todoListId].splice(index, 1)
      }
    },

    updateTaskAC: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },

    setTasksAC: (state, action: PayloadAction<SetTasksPayload>) => {
      state[action.payload.todoListId] = action.payload.tasks
    },
  },
  extraReducers: builder => {
    builder.addCase(createTodoListAC, (state, action) => {
      state[action.payload.todoList.id] = []
    })

    builder.addCase(deleteTodoListAC, (state, action) => {
      delete state[action.payload.id]
    })

    builder.addCase(setTodoListsAC, (state, action) => {
      action.payload.forEach(tl => {
        state[tl.id] = []
      })
    })

    builder.addCase(resetStateAC, () => {
      return initialState
    })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { createTaskAC, deleteTaskAC, updateTaskAC, setTasksAC } = tasksSlice.actions

// ------------------ THUNK CREATORS -------------------------------
export const getTasksTC = (todoListId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI
      .getTodoListTasks(todoListId)
      .then(res => {
        dispatch(setTasksAC({ todoListId, tasks: res.data.items }))
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
          dispatch(createTaskAC({ task: res.data.data.item }))
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
          dispatch(deleteTaskAC({ todoListId, taskId }))
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
          dispatch(updateTaskAC({ todoListId, taskId, model: businessModel }))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

// ------------------------ TYPES ------------------------------------
type DeleteTaskPayload = {
  todoListId: string
  taskId: string
}

type UpdateTaskPayload = {
  todoListId: string
  taskId: string
  model: UpdateBusinessTaskModelType
}

type SetTasksPayload = {
  todoListId: string
  tasks: TaskType[]
}
