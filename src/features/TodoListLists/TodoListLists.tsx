import { useCallback, useEffect } from 'react'
import { Box, Grid2, Paper } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks'
import { todoListsSelectors } from '../../app/redux/slices/todoListsSlice'
import { createTodoList, getTodoList } from '../../app/redux/thunks'
import { TodoList } from './TodoList'
import { InputFormToAdd } from '../../components/InputFormToAdd'
import { PATHS } from '../../app/routers/path'
import { authSelectors } from '../../app/redux/slices/authSlice'

export function TodoListLists() {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(todoListsSelectors.todoLists)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return

    dispatch(getTodoList())
  }, [dispatch, isLoggedIn])

  const addTodoList = useCallback(
    (title: string) => {
      const thunk = createTodoList(title)

      dispatch(thunk)
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />
  }

  return (
    <>
      <Box>
        <InputFormToAdd createItem={addTodoList} size="small" maxWidth="400px" />
        <Grid2 container sx={{ mt: 6 }} spacing={4}>
          {todoLists.map(todoList => (
            <Grid2
              key={todoList.id}
              sx={{ maxWidth: '300px', width: '100%', minHeight: '320px', maxHeight: '500px' }}
            >
              <Paper elevation={4} sx={{ p: 1, height: '100%' }}>
                <TodoList todoList={todoList} />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  )
}
