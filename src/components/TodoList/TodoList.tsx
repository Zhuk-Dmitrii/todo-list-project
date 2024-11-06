import { MouseEvent } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { AddCircleOutline, Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  createActionChangeFilterTodoList,
  createActionChangeTitleTodoList,
  createActionDeleteTodoList,
} from '../../redux/action/todoListsAction'
import { createActionCreateTask } from '../../redux/action/taskAction'
import { Todo } from '../Todo/Todo'
import { FilteredValues } from '../../types/enums'
import { InputForm } from '../InputForm/InputForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoListCSS'

type TProps = {
  todoListId: string
  title: string
  filterValue: string
}

export function TodoList(props: TProps) {
  const tasks = useAppSelector(state => state.tasks[props.todoListId])
  const dispatch = useAppDispatch()

  // -------------------------------- Todo Lists -------------------------------
  function handleFilterBtnClick(event: MouseEvent<HTMLButtonElement>) {
    const targetValue = event.currentTarget.value

    if (targetValue === FilteredValues.all) {
      const action = createActionChangeFilterTodoList(props.todoListId, FilteredValues.all)
      dispatch(action)
    }

    if (targetValue === FilteredValues.active) {
      const action = createActionChangeFilterTodoList(props.todoListId, FilteredValues.active)
      dispatch(action)
    }

    if (targetValue === FilteredValues.completed) {
      const action = createActionChangeFilterTodoList(props.todoListId, FilteredValues.completed)
      dispatch(action)
    }
  }

  function handleClickDeleteTodoList() {
    const action = createActionDeleteTodoList(props.todoListId)
    dispatch(action)
  }

  function handleChangeTodoListTitle(newTitle: string) {
    const action = createActionChangeTitleTodoList(props.todoListId, newTitle)
    dispatch(action)
  }

  // -------------------------------- Tasks -------------------------------
  let filteredTasks = tasks

  if (props.filterValue == FilteredValues.active) {
    filteredTasks = filteredTasks.filter(task => !task.isDone)
  } else if (props.filterValue == FilteredValues.completed) {
    filteredTasks = filteredTasks.filter(task => task.isDone)
  }

  function createTask(title: string) {
    const action = createActionCreateTask(props.todoListId, title)

    dispatch(action)
  }

  // ----------------------------------------------------------------------
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <IconButton
        onClick={handleClickDeleteTodoList}
        size="small"
        sx={{ display: 'flex', ml: 'auto' }}
      >
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
        {filteredTasks.map(task => (
          <Todo key={task.id} todoListId={props.todoListId} task={task} />
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
