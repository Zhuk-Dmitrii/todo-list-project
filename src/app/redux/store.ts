import { thunk } from 'redux-thunk'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { todoListsReducer } from './slices/todoListsSlice'
import { tasksReducer } from './slices/tasksSlice'
import { appReducer } from './slices/appSlice'
import { authReducer } from './slices/authSlice'

export const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

window.store = store
