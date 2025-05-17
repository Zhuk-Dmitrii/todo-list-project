import React, { ChangeEvent, useCallback } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useAppDispatch } from '../../../../app/hooks/reduxHooks'
import { deleteTask, updateTask } from '../../../../app/redux/thunks'
import { EditableSpan } from '../../../../components/EditableSpan'
import { TaskStatus } from '../../../../api/typesAPI/todoListTypes'
import { TaskBusinessType } from '../../../../app/types/businessTypes'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TaskBusinessType
  disabled?: boolean
}

export const Todo = React.memo(({ todoListId, task, disabled = false }: TProps) => {
  const dispatch = useAppDispatch()

  const taskIsDisabled = task.entityStatus === 'loading'

  const handleDeleteTask = useCallback(() => {
    const action = deleteTask({ taskId: task.id, todoListId: todoListId })

    dispatch(action)
  }, [todoListId, task.id, dispatch])

  const handleChangeCheckbox = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked
      const status = checked ? TaskStatus.Completed : TaskStatus.New
      const action = updateTask({
        todoListId: todoListId,
        taskId: task.id,
        businessModel: { status },
      })

      dispatch(action)
    },
    [task.id, todoListId, dispatch],
  )

  const handleChangeTaskTitle = useCallback(
    (newValue: string) => {
      const action = updateTask({
        todoListId: todoListId,
        taskId: task.id,
        businessModel: { title: newValue },
      })

      dispatch(action)
    },
    [todoListId, task.id, dispatch],
  )

  return (
    <ListItem sx={{ p: 0, opacity: task.status === TaskStatus.Completed ? 0.5 : 1 }}>
      <Checkbox
        onChange={handleChangeCheckbox}
        checked={task.status === TaskStatus.Completed}
        size="small"
        color="success"
        sx={{ mr: 1 }}
        disabled={disabled || taskIsDisabled}
      />
      <EditableSpan
        changeValue={handleChangeTaskTitle}
        title={task.title}
        sx={customCSS.editableSpan}
        disabled={disabled || taskIsDisabled}
      />
      <IconButton
        onClick={handleDeleteTask}
        sx={{ ml: 'auto' }}
        size="small"
        disabled={disabled || taskIsDisabled}
      >
        <Delete />
      </IconButton>
    </ListItem>
  )
})
