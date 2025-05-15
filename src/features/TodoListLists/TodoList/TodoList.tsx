import React, { MouseEvent, useMemo, useCallback } from 'react'
import { Box, IconButton, List, Button } from '@mui/material'
import { Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks'
import { tasksSelectors } from '../../../app/redux/slices/tasksSlice'
import { changeTodoListFilter } from '../../../app/redux/slices/todoListsSlice'
import { createTask, changeTodoListTitle, deleteTodoList } from '../../../app/redux/thunks'
import { FilteredValuesType, TodoListBusinessType } from '../../../app/types/businessTypes'
import { TaskStatus } from '../../../api/typesAPI/todoListTypes'
import { Todo } from './Todo'
import { InputFormToAdd } from '../../../components/InputFormToAdd'
import { EditableSpan } from '../../../components/EditableSpan'
import { customCSS } from './TodoListCSS'

type TProps = {
  todoList: TodoListBusinessType
}

export const TodoList = React.memo(({ todoList }: TProps) => {
  const tasksForTodoList = useAppSelector(state =>
    tasksSelectors.tasksForTodoList(state, todoList.id),
  )
  const dispatch = useAppDispatch()

  const isDisabled = todoList.entityStatus === 'loading'

  // -------------------------------- Todo Lists -------------------------------
  const handleClickBtnFilter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const targetValue = event.currentTarget.value as FilteredValuesType

      const action = changeTodoListFilter({ id: todoList.id, filter: targetValue })
      dispatch(action)
    },
    [todoList.id, dispatch],
  )

  const handleClickDeleteTodoList = useCallback(() => {
    const thunk = deleteTodoList(todoList.id)
    dispatch(thunk)
  }, [todoList.id, dispatch])

  const handleChangeTodoListTitle = useCallback(
    (newTitle: string) => {
      const thunk = changeTodoListTitle({ id: todoList.id, title: newTitle })
      dispatch(thunk)
    },
    [todoList.id, dispatch],
  )

  // -------------------------------- Tasks -------------------------------
  const filteredTasks = useMemo(() => {
    let filterTasks = tasksForTodoList

    if (todoList.filter === 'active') {
      filterTasks = tasksForTodoList.filter(task => task.status === TaskStatus.New)
    }

    if (todoList.filter === 'completed') {
      filterTasks = tasksForTodoList.filter(task => task.status === TaskStatus.Completed)
    }

    return filterTasks
  }, [todoList.filter, tasksForTodoList])

  const addTask = useCallback(
    (title: string) => {
      const thunk = createTask({ todoListId: todoList.id, title })

      dispatch(thunk)
    },
    [dispatch, todoList.id],
  )

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
          title={todoList.title}
          changeValue={handleChangeTodoListTitle}
          sx={customCSS.editableSpan}
          disabled={isDisabled}
        />
      </Box>

      <InputFormToAdd createItem={addTask} size="small" disabled={isDisabled} />

      <Box sx={{ mt: 3 }}>
        <List sx={{ maxHeight: '120px', overflow: 'auto' }}>
          {filteredTasks.map(task => (
            <Todo key={task.id} todoListId={todoList.id} task={task} />
          ))}
        </List>
      </Box>

      <Box sx={{ height: '30px', display: 'flex', gap: 1, mt: 'auto' }}>
        <Button
          onClick={handleClickBtnFilter}
          value={'all'}
          variant={todoList.filter === 'all' ? 'contained' : 'outlined'}
          color="primary"
          children={'All'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={'active'}
          variant={todoList.filter === 'active' ? 'contained' : 'outlined'}
          color="secondary"
          children={'Active'}
          sx={{ height: '100%' }}
        />
        <Button
          onClick={handleClickBtnFilter}
          value={'completed'}
          variant={todoList.filter == 'completed' ? 'contained' : 'outlined'}
          color="success"
          children={'Completed'}
          sx={{ height: '100%' }}
        />
      </Box>
    </Box>
  )
})
