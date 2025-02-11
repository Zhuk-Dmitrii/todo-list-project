import { createBrowserRouter } from 'react-router-dom'

import { PATHS } from './path'
import { App } from '../App'
import { TodoListLists } from '../../features/TodoListLists'
import { Login } from '../../features/Login'
import { NotFound } from '../../features/NotFound'

export const appRouter = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <App />,
    errorElement: <NotFound />,
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
