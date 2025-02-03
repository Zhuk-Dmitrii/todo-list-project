import { thunk } from 'redux-thunk'
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from '@reduxjs/toolkit'

import { todoListsReducer } from './reducer/todoListsReducer'
import { tasksReducer } from './reducer/tasksReducer'
import { appReducer } from './reducer/appReducer'

export const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
