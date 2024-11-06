import { Container, IconButton, Paper } from '@mui/material'
import { Grid2 } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

import { createActionCreateTodoList } from '../../redux/action/todoListsAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TodoList } from '../TodoList/TodoList'
import { InputForm } from '../InputForm/InputForm'
import { Header } from '../Header/Header'

export function App() {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(state => state.todoLists)

  function createTodoList(title: string) {
    const action = createActionCreateTodoList(title)

    dispatch(action)
  }

  return (
    <>
      <Header />
      <Container sx={{ pt: 6, pb: 2 }}>
        <InputForm
          createItem={createTodoList}
          styleWrapper={{ justifyContent: 'center' }}
          sx={{ maxWidth: '400px', width: '100%' }}
          size="small"
        >
          <IconButton type="submit" color="primary" sx={{ ml: 1, mb: 'auto' }}>
            <AddCircleOutline />
          </IconButton>
        </InputForm>

        <Grid2 container sx={{ mt: 6 }} spacing={4}>
          {todoLists.map(todoList => {
            return (
              <Grid2
                key={todoList.id}
                sx={{ maxWidth: '300px', width: '100%', minHeight: '320px' }}
              >
                <Paper elevation={4} sx={{ p: 1, height: '100%' }}>
                  <TodoList
                    todoListId={todoList.id}
                    title={todoList.title}
                    filterValue={todoList.filter}
                  />
                </Paper>
              </Grid2>
            )
          })}
        </Grid2>
      </Container>
    </>
  )
}
