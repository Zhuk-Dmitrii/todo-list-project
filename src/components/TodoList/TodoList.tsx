import React, { MouseEvent, useMemo, useCallback, useEffect } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTasksThunkCreator } from '../../redux/reducer/tasksReducer'
import {
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  deleteTodoListAC,
} from '../../redux/action/todoListsAction'
import { createTaskAC } from '../../redux/action/taskAction'
import { Todo } from '../Todo/Todo'
import { FilteredValues } from '../../redux/types/business'
import { InputForm } from '../InputForm/InputForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoListCSS'
import { TaskStatus } from '../../api/typesAPI/todoListTypes'

type TProps = {
  todoListId: string
  title: string
  filterValue: string
}

export const TodoList = React.memo((props: TProps) => {
  const tasks = useAppSelector(state => state.tasks[props.todoListId])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksThunkCreator(props.todoListId))
  }, [dispatch, props.todoListId])

  // -------------------------------- Todo Lists -------------------------------
  const handleClickBtnFilter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const targetValue = event.currentTarget.value

      if (targetValue === FilteredValues.all) {
        const action = changeTodoListFilterAC(props.todoListId, FilteredValues.all)
        dispatch(action)
      }

      if (targetValue === FilteredValues.active) {
        const action = changeTodoListFilterAC(props.todoListId, FilteredValues.active)
        dispatch(action)
      }

      if (targetValue === FilteredValues.completed) {
        const action = changeTodoListFilterAC(props.todoListId, FilteredValues.completed)
        dispatch(action)
      }
    },
    [props.todoListId, dispatch],
  )

  const handleClickDeleteTodoList = useCallback(() => {
    const action = deleteTodoListAC(props.todoListId)
    dispatch(action)
  }, [props.todoListId, dispatch])

  const handleChangeTodoListTitle = useCallback(
    (newTitle: string) => {
      const action = changeTodoListTitleAC(props.todoListId, newTitle)
      dispatch(action)
    },
    [props.todoListId, dispatch],
  )

  // -------------------------------- Tasks -------------------------------
  const filteredTasks = useMemo(() => {
    let filterTasks = tasks

    if (props.filterValue == FilteredValues.active) {
      filterTasks = tasks.filter(task => task.status === TaskStatus.New)
    }

    if (props.filterValue == FilteredValues.completed) {
      filterTasks = tasks.filter(task => task.status === TaskStatus.Completed)
    }

    return filterTasks
  }, [props.filterValue, tasks])

  const createTask = useCallback(
    (title: string) => {
      const action = createTaskAC(props.todoListId, title)

      dispatch(action)
    },
    [dispatch, props.todoListId],
  )

  // -------------------------------- Custom Styles -------------------------------
  const styleInputForm = useMemo(
    () => ({
      styleWrapper: { marginBottom: '24px' },
      sx: { width: '100%' },
    }),
    [],
  )

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
        styleWrapper={styleInputForm.styleWrapper}
        sx={styleInputForm.sx}
        size="small"
      />

      <List sx={{ maxHeight: '120px', overflow: 'auto' }}>
        {filteredTasks.map(task => (
          <Todo key={task.id} todoListId={props.todoListId} task={task} />
        ))}
      </List>
      <Box sx={{ height: '30px', display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.all}
          variant={props.filterValue == FilteredValues.all ? 'contained' : 'outlined'}
          color="primary"
          children={'All'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.active}
          variant={props.filterValue == FilteredValues.active ? 'contained' : 'outlined'}
          color="secondary"
          children={'Active'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.completed}
          variant={props.filterValue == FilteredValues.completed ? 'contained' : 'outlined'}
          color="success"
          children={'Completed'}
          sx={{ height: '100%' }}
        />
      </Box>
    </Box>
  )
})
