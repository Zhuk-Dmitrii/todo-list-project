import { useCallback, useMemo } from 'react'
import { Container } from '@mui/material'
import { Grid2 } from '@mui/material'

import { useAppDispatch } from '../../redux/hooks'
import { createTodoListTC } from '../../redux/reducer/todoListsReducer'
import { InputForm } from '../InputForm'
import { Header } from '../Header'
import { TodoListLists } from '../TodoListLists'

export function App() {
  const dispatch = useAppDispatch()

  const createTodoList = useCallback(
    (title: string) => {
      const thunk = createTodoListTC(title)

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
          <TodoListLists />
        </Grid2>
      </Container>
    </>
  )
}
