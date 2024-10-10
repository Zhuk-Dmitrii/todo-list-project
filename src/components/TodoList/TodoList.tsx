import { MouseEvent } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { AddCircleOutline, Clear } from '@mui/icons-material'

import { Todo } from '../Todo/Todo'
import { TTask, FilteredValues } from '../App/App'
import { InputForm } from '../InputForm/InputForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoListCSS'

type TProps = {
  todoListId: string
  title: string
  tasks: Array<TTask>
  filterValue: string
  deleteTodoList: (todoListId: string) => void
  changeValueForFilterTodoList: (todoListId: string, value: FilteredValues) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
  createTask: (todoListId: string, title: string) => void
  deleteTask: (todoListId: string, id: string) => void
  changeStatusTask: (todoListId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
}

export function TodoList(props: TProps) {
  function handleFilterBtnClick(event: MouseEvent<HTMLButtonElement>) {
    const targetValue = event.currentTarget.value

    if (targetValue === FilteredValues.all) {
      props.changeValueForFilterTodoList(props.todoListId, FilteredValues.all)
    }

    if (targetValue === FilteredValues.active) {
      props.changeValueForFilterTodoList(props.todoListId, FilteredValues.active)
    }

    if (targetValue === FilteredValues.completed) {
      props.changeValueForFilterTodoList(props.todoListId, FilteredValues.completed)
    }
  }

  function handleClickDelete() {
    props.deleteTodoList(props.todoListId)
  }

  function createTask(title: string) {
    props.createTask(props.todoListId, title)
  }

  function handleChangeTodoListTitle(newTitle: string) {
    props.changeTodoListTitle(props.todoListId, newTitle)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <IconButton onClick={handleClickDelete} size="small" sx={{ display: 'flex', ml: 'auto' }}>
        <Clear />
      </IconButton>
      <Box sx={{ mb: 2, height: '28px', display: 'flex', justifyContent: 'center' }}>
        <EditableSpan
          title={props.title}
          changeValue={handleChangeTodoListTitle}
          sx={customCSS.editableSpan}
        />
      </Box>

      <InputForm
        createItem={createTask}
        size="small"
        sx={{ width: '100%' }}
        styleWrapper={{ marginBottom: '24px' }}
      >
        <IconButton type="submit" color="primary" sx={{ ml: 0.5, mb: 'auto' }}>
          <AddCircleOutline />
        </IconButton>
      </InputForm>
      <List sx={{ maxHeight: '120px', overflow: 'auto' }}>
        {props.tasks.map(task => (
          <Todo
            key={task.id}
            todoListId={props.todoListId}
            task={task}
            deleteTask={props.deleteTask}
            changeStatusTask={props.changeStatusTask}
            changeTaskTitle={props.changeTaskTitle}
          />
        ))}
      </List>
      <Box sx={{ height: '30px', display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          onClick={handleFilterBtnClick}
          value={FilteredValues.all}
          variant={props.filterValue == FilteredValues.all ? 'contained' : 'outlined'}
          color="primary"
          children={'All'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleFilterBtnClick}
          value={FilteredValues.active}
          variant={props.filterValue == FilteredValues.active ? 'contained' : 'outlined'}
          color="secondary"
          children={'Active'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleFilterBtnClick}
          value={FilteredValues.completed}
          variant={props.filterValue == FilteredValues.completed ? 'contained' : 'outlined'}
          color="success"
          children={'Completed'}
          sx={{ height: '100%' }}
        />
      </Box>
    </Box>
  )
}
