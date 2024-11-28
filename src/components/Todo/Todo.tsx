import React, { ChangeEvent, useCallback } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useAppDispatch } from '../../redux/hooks'
import {
  createActionDeleteTask,
  createActionChangeStatusTask,
  createActionChangeTaskTitle,
} from '../../redux/action/taskAction'
import { TTask } from '../../types/todoTypes'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TTask
}

export const Todo = React.memo((props: TProps) => {
  console.log('render Todo', props.task.id)

  const dispatch = useAppDispatch()

  const handleDeleteTask = useCallback(() => {
    const action = createActionDeleteTask(props.todoListId, props.task.id)

    dispatch(action)
  }, [props.todoListId, props.task.id, dispatch])

  const handleChangeCheckbox = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const taskId = props.task.id
      const checked = event.currentTarget.checked
      const action = createActionChangeStatusTask(props.todoListId, taskId, checked)

      dispatch(action)
    },
    [props.task.id, props.todoListId, dispatch],
  )

  const handleChangeTaskTitle = useCallback(
    (newValue: string) => {
      const action = createActionChangeTaskTitle(props.todoListId, props.task.id, newValue)

      dispatch(action)
    },
    [props.todoListId, props.task.id, dispatch],
  )

  return (
    <ListItem sx={{ p: 0, opacity: props.task.isDone ? 0.5 : 1 }}>
      <Checkbox
        onChange={handleChangeCheckbox}
        checked={props.task.isDone}
        size="small"
        color="success"
        sx={{ mr: 1 }}
      />
      <EditableSpan
        changeValue={handleChangeTaskTitle}
        title={props.task.title}
        sx={customCSS.editableSpan}
      />
      <IconButton onClick={handleDeleteTask} sx={{ ml: 'auto' }} size="small">
        <Delete />
      </IconButton>
    </ListItem>
  )
})
