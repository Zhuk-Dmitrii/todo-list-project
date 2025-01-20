import { combineReducers, legacy_createStore as createStore } from '@reduxjs/toolkit'

import { todoListsReducer } from './reducer/todoListsReducer'
import { tasksReducer } from './reducer/tasksReducer'

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
})

export const store = createStore(rootReducer)
