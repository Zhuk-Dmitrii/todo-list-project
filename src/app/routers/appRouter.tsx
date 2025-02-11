import { createBrowserRouter } from 'react-router-dom'

import { PATHS } from './path'
import { App } from '../App'
import { TodoListLists } from '../../features/TodoListLists'
import { Login } from '../../features/Login'

export const appRouter = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <App />,
    children: [
      {
        path: PATHS.HOME,
        element: <TodoListLists />,
      },
      {
        path: PATHS.LOGIN,
        element: <Login />,
      },
    ],
  },
])
