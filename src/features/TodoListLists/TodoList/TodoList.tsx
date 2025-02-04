import React, { MouseEvent, useMemo, useCallback, useEffect } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks'
import { createTaskTC, getTasksTC } from '../../../app/redux/reducer/tasksReducer'
import { changeTodoListFilterAC } from '../../../app/redux/action/todoListsAction'
import {
  changeTodoListTitleTC,
  deleteTodoListTC,
} from '../../../app/redux/reducer/todoListsReducer'
import { FilteredValues, TodoListBusinessType } from '../../../app/types/businessTypes'
import { TaskStatus } from '../../../api/typesAPI/todoListTypes'
import { Todo } from './Todo'
import { InputForm } from '../../../components/InputForm'
import { EditableSpan } from '../../../components/EditableSpan'
import { customCSS } from './TodoListCSS'

type TProps = {
  todoList: TodoListBusinessType
}

export const TodoList = React.memo((props: TProps) => {
  const tasks = useAppSelector(state => state.tasks[props.todoList.id])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksTC(props.todoList.id))
  }, [dispatch, props.todoList.id])

  // -------------------------------- Todo Lists -------------------------------
  const handleClickBtnFilter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const targetValue = event.currentTarget.value

      if (targetValue === FilteredValues.all) {
        const action = changeTodoListFilterAC(props.todoList.id, FilteredValues.all)
        dispatch(action)
      }

      if (targetValue === FilteredValues.active) {
        const action = changeTodoListFilterAC(props.todoList.id, FilteredValues.active)
        dispatch(action)
      }

      if (targetValue === FilteredValues.completed) {
        const action = changeTodoListFilterAC(props.todoList.id, FilteredValues.completed)
        dispatch(action)
      }
    },
    [props.todoList.id, dispatch],
  )

  const handleClickDeleteTodoList = useCallback(() => {
    const thunk = deleteTodoListTC(props.todoList.id)
    dispatch(thunk)
  }, [props.todoList.id, dispatch])

  const handleChangeTodoListTitle = useCallback(
    (newTitle: string) => {
      const thunk = changeTodoListTitleTC(props.todoList.id, newTitle)
      dispatch(thunk)
    },
    [props.todoList.id, dispatch],
  )

  // -------------------------------- Tasks -------------------------------
  const filteredTasks = useMemo(() => {
    let filterTasks = tasks

    if (props.todoList.filter == FilteredValues.active) {
      filterTasks = tasks.filter(task => task.status === TaskStatus.New)
    }

    if (props.todoList.filter == FilteredValues.completed) {
      filterTasks = tasks.filter(task => task.status === TaskStatus.Completed)
    }

    return filterTasks
  }, [props.todoList.filter, tasks])

  const createTask = useCallback(
    (title: string) => {
      const thunk = createTaskTC(props.todoList.id, title)

      dispatch(thunk)
    },
    [dispatch, props.todoList.id],
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
          title={props.todoList.title}
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
          <Todo key={task.id} todoListId={props.todoList.id} task={task} />
        ))}
      </List>
      <Box sx={{ height: '30px', display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.all}
          variant={props.todoList.filter == FilteredValues.all ? 'contained' : 'outlined'}
          color="primary"
          children={'All'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.active}
          variant={props.todoList.filter == FilteredValues.active ? 'contained' : 'outlined'}
          color="secondary"
          children={'Active'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={FilteredValues.completed}
          variant={props.todoList.filter == FilteredValues.completed ? 'contained' : 'outlined'}
          color="success"
          children={'Completed'}
          sx={{ height: '100%' }}
        />
      </Box>
    </Box>
  )
})
