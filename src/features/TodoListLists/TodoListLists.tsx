import { useCallback, useEffect, useMemo } from 'react'
import { Box, Grid2, Paper } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks'
import { createTodoList, getTodoList } from '../../app/redux/slices/todoListsSlice'
import { TodoList } from './TodoList'
import { InputForm } from '../../components/InputForm'
import { PATHS } from '../../app/routers/path'
import { authSelectors } from '../../app/redux/slices/authSlice'

export function TodoListLists() {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(state => state.todoLists)
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

  const styleInputForm = useMemo(
    () => ({
      styleWrapper: { justifyContent: 'center' },
      sx: { maxWidth: '400px', width: '100%' },
    }),
    [],
  )

  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />
  }

  return (
    <>
      <Box>
        <InputForm
          createItem={addTodoList}
          styleWrapper={styleInputForm.styleWrapper}
          sx={styleInputForm.sx}
          size="small"
        />
        <Grid2 container sx={{ mt: 6 }} spacing={4}>
          {todoLists.map(todoList => (
            <Grid2 key={todoList.id} sx={{ maxWidth: '300px', width: '100%', minHeight: '320px' }}>
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
