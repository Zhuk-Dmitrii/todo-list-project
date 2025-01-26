import { useCallback, useEffect, useMemo } from 'react'
import { Container, Paper } from '@mui/material'
import { Grid2 } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { createActionCreateTodoList } from '../../redux/action/todoListsAction'
import { fetchTodoListThunkCreator } from '../../redux/reducer/todoListsReducer'
import { TodoList } from '../TodoList/TodoList'
import { InputForm } from '../InputForm/InputForm'
import { Header } from '../Header/Header'

export function App() {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(state => state.todoLists)

  useEffect(() => {
    dispatch(fetchTodoListThunkCreator())
  }, [dispatch])

  const createTodoList = useCallback(
    (title: string) => {
      const action = createActionCreateTodoList(title)

      dispatch(action)
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

  return (
    <>
      <Header />
      <Container sx={{ pt: 6, pb: 2 }}>
        <InputForm
          createItem={createTodoList}
          styleWrapper={styleInputForm.styleWrapper}
          sx={styleInputForm.sx}
          size="small"
        />

        <Grid2 container sx={{ mt: 6 }} spacing={4}>
          {todoLists.map(todoList => (
            <Grid2 key={todoList.id} sx={{ maxWidth: '300px', width: '100%', minHeight: '320px' }}>
              <Paper elevation={4} sx={{ p: 1, height: '100%' }}>
                <TodoList
                  todoListId={todoList.id}
                  title={todoList.title}
                  filterValue={todoList.filter}
                />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  )
}
