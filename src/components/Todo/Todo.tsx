import React, { ChangeEvent, useCallback } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useAppDispatch } from '../../redux/hooks'
import { deleteTaskTC, updateTaskTC } from '../../redux/reducer/tasksReducer'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { TaskStatus, TaskType } from '../../api/typesAPI/todoListTypes'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TaskType
}

export const Todo = React.memo((props: TProps) => {
  const dispatch = useAppDispatch()

  const handleDeleteTask = useCallback(() => {
    const action = deleteTaskTC(props.todoListId, props.task.id)

    dispatch(action)
  }, [props.todoListId, props.task.id, dispatch])

  const handleChangeCheckbox = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const taskId = props.task.id
      const checked = event.currentTarget.checked
      const status = checked ? TaskStatus.Completed : TaskStatus.New
      const action = updateTaskTC(props.todoListId, taskId, { status })

      dispatch(action)
    },
    [props.task.id, props.todoListId, dispatch],
  )

  const handleChangeTaskTitle = useCallback(
    (newValue: string) => {
      const action = updateTaskTC(props.todoListId, props.task.id, { title: newValue })

      dispatch(action)
    },
    [props.todoListId, props.task.id, dispatch],
  )

  return (
    <ListItem sx={{ p: 0, opacity: props.task.status === TaskStatus.Completed ? 0.5 : 1 }}>
      <Checkbox
        onChange={handleChangeCheckbox}
        checked={props.task.status === TaskStatus.Completed}
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
