import { thunk } from 'redux-thunk'
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from '@reduxjs/toolkit'

import { todoListsReducer } from './reducer/todoListsReducer'
import { tasksReducer } from './reducer/tasksReducer'
import { appReducer } from './reducer/appReducer'
import { authReducer } from './reducer/authReducer'

export const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
