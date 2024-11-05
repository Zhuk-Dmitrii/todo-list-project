import { ChangeEvent } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useAppDispatch } from '../../redux/hooks'
import {
  createActionDeleteTask,
  createActionChangeStatusTask,
  createActionChangeTaskTitle,
} from '../../redux/action/taskAction'
import { TTask } from '../App/App'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TTask
}

export function Todo(props: TProps) {
  const dispatch = useAppDispatch()

  function handleDeleteTask() {
    const action = createActionDeleteTask(props.todoListId, props.task.id)

    dispatch(action)
  }

  function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const taskId = props.task.id
    const checked = event.currentTarget.checked
    const action = createActionChangeStatusTask(props.todoListId, taskId, checked)

    dispatch(action)
  }

  function handleChangeTaskTitle(newValue: string) {
    const action = createActionChangeTaskTitle(props.todoListId, props.task.id, newValue)

    dispatch(action)
  }

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
}
