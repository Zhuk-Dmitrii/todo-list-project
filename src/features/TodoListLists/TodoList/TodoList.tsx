import React, { MouseEvent, useMemo, useCallback } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks'
import { createTask } from '../../../app/redux/slices/tasksSlice'
import { changeTodoListFilter } from '../../../app/redux/slices/todoListsSlice'
import { changeTodoListTitle, deleteTodoList } from '../../../app/redux/slices/todoListsSlice'
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

  const isDisabled = props.todoList.entityStatus === 'loading'

  // -------------------------------- Todo Lists -------------------------------
  const handleClickBtnFilter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const targetValue = event.currentTarget.value

      if (targetValue === FilteredValues.all) {
        const action = changeTodoListFilter({ id: props.todoList.id, filter: FilteredValues.all })
        dispatch(action)
      }

      if (targetValue === FilteredValues.active) {
        const action = changeTodoListFilter({
          id: props.todoList.id,
          filter: FilteredValues.active,
        })
        dispatch(action)
      }

      if (targetValue === FilteredValues.completed) {
        const action = changeTodoListFilter({
          id: props.todoList.id,
          filter: FilteredValues.completed,
        })
        dispatch(action)
      }
    },
    [props.todoList.id, dispatch],
  )

  const handleClickDeleteTodoList = useCallback(() => {
    const thunk = deleteTodoList(props.todoList.id)
    dispatch(thunk)
  }, [props.todoList.id, dispatch])

  const handleChangeTodoListTitle = useCallback(
    (newTitle: string) => {
      const thunk = changeTodoListTitle({ id: props.todoList.id, title: newTitle })
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

  const addTask = useCallback(
    (title: string) => {
      const thunk = createTask({ todoListId: props.todoList.id, title })

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
        disabled={isDisabled}
      >
        <Clear />
      </IconButton>
      <Box sx={{ mb: 2, height: '28px', display: 'flex', justifyContent: 'center' }}>
        <EditableSpan
          title={props.todoList.title}
          changeValue={handleChangeTodoListTitle}
          sx={customCSS.editableSpan}
          disabled={isDisabled}
        />
      </Box>

      <InputForm
        createItem={addTask}
        styleWrapper={styleInputForm.styleWrapper}
        sx={styleInputForm.sx}
        size="small"
        disabled={isDisabled}
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
