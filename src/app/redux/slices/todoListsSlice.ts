import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { clearTodoListsAndTaskState } from '../common/actions'
import { AppStatus, FilteredValues, TodoListBusinessType } from '../../types/businessTypes'
import { selectors } from '../selectors'
import { getTodoList, createTodoList, deleteTodoList, changeTodoListTitle } from '../thunks'

const initialState: TodoListBusinessType[] = []

const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<ChangeTodoListFilterPayload>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].filter = action.payload.filter
    },

    changeTodoListEntityStatus: (
      state,
      action: PayloadAction<ChangeTodoListEntityStatusPayload>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodoList.fulfilled, (_, action) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }))
    })

    builder.addCase(createTodoList.fulfilled, (state, action) => {
      const newTodoList: TodoListBusinessType = {
        ...action.payload.todoList,
        filter: FilteredValues.all,
        entityStatus: 'idle',
      }

      state.unshift(newTodoList)
    })

    builder.addCase(deleteTodoList.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    })

    builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].title = action.payload.title
    })

    builder.addCase(clearTodoListsAndTaskState, () => {
      return initialState
    })
  },
  selectors: selectors.todoListsSelectors,
})

export const todoListsReducer = todoListsSlice.reducer
export const { changeTodoListFilter, changeTodoListEntityStatus } = todoListsSlice.actions
export const todoListsSelectors = todoListsSlice.selectors

// ------------------------ TYPES ------------------------------------
type ChangeTodoListFilterPayload = {
  id: string
  filter: FilteredValues
}

type ChangeTodoListEntityStatusPayload = {
  id: string
  status: AppStatus
}
