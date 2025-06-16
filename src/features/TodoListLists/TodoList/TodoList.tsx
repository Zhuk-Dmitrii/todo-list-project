import React, { useMemo, useCallback } from 'react'
import { Box, IconButton, List } from '@mui/material'
import { Clear } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks'
import { tasksSelectors } from '../../../app/redux/slices/tasksSlice'
import { createTask, changeTodoListTitle, deleteTodoList } from '../../../app/redux/thunks'
import { TodoListBusinessType } from '../../../app/types/businessTypes'
import { TaskStatus } from '../../../api/typesAPI/todoListTypes'
import { Todo } from './Todo'
import { InputFormToAdd } from '../../../components/InputFormToAdd'
import { EditableSpan } from '../../../components/EditableSpan'
import { customCSS } from './TodoListCSS'
import { BtnFilterGroup } from './BtnFilterGroup'

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
    switch (todoList.filter) {
      case 'active':
        return tasksForTodoList.filter(task => task.status === TaskStatus.New)
      case 'completed':
        return tasksForTodoList.filter(task => task.status === TaskStatus.Completed)
      default:
        return tasksForTodoList
    }
  }, [tasksForTodoList, todoList.filter])

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

      <BtnFilterGroup todoListId={todoList.id} todoListFilter={todoList.filter} />
    </Box>
  )
})
