import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createTodoList, deleteTodoList, getTodoList } from '../thunks'
import { AppStatus, TaskBusinessType, TasksDataType } from '../../types/businessTypes'
import { clearTodoListsAndTaskState } from '../common/actions'
import { selectors } from '../selectors'
import { getTasks, deleteTask, createTask, updateTask } from '../thunks'

const initialState: TasksDataType = {}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeTaskEntityStatus: (state, action: PayloadAction<ChangeTaskEntityStatusPayload>) => {
      const index = state[action.payload.todoListId].findIndex(
        task => task.id === action.payload.taskId,
      )

      if (index !== -1) state[action.payload.todoListId][index].entityStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(createTodoList.fulfilled, (state, action) => {
      state[action.payload.todoList.id] = []
    })

    builder.addCase(deleteTodoList.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })

    builder.addCase(getTodoList.fulfilled, (state, action) => {
      action.payload.forEach(tl => {
        state[tl.id] = []
      })
    })

    builder.addCase(clearTodoListsAndTaskState, () => {
      return initialState
    })

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks.map(task => {
        return {
          ...task,
          entityStatus: 'idle',
        }
      })
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        state[action.payload.todoListId].splice(index, 1)
      }
    })

    builder.addCase(createTask.fulfilled, (state, action) => {
      const newTask: TaskBusinessType = {
        ...action.payload.task,
        entityStatus: 'idle',
      }
      state[action.payload.task.todoListId].unshift(newTask)
    })

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)

      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
  },
  selectors: selectors.tasksSelectors,
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskEntityStatus } = tasksSlice.actions
export const tasksSelectors = tasksSlice.selectors

type ChangeTaskEntityStatusPayload = {
  todoListId: string
  taskId: string
  status: AppStatus
}
