import { useEffect } from 'react'
import { Grid2, Paper } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTodoListTC } from '../../redux/reducer/todoListsReducer'
import { TodoList } from '../TodoList'

export function TodoListLists() {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(state => state.todoLists)

  useEffect(() => {
    dispatch(getTodoListTC())
  }, [dispatch])

  return (
    <>
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
    </>
  )
}
