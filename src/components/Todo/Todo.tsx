import { ChangeEvent } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { TTask } from '../App/App'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TTask
  removeTask: (todoListId: string, id: string) => void
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  changeTodoValue: (todoListId: string, taskId: string, title: string) => void
}

export function Todo(props: TProps) {
  function handleRemoveTask() {
    props.removeTask(props.todoListId, props.task.id)
  }

  function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const taskId = props.task.id
    const checked = event.currentTarget.checked

    props.changeStatus(props.todoListId, taskId, checked)
  }

  function handleChangeTodoValue(newValue: string) {
    props.changeTodoValue(props.todoListId, props.task.id, newValue)
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
        changeValue={handleChangeTodoValue}
        title={props.task.title}
        sx={customCSS.editableSpan}
      />
      <IconButton onClick={handleRemoveTask} sx={{ ml: 'auto' }} size="small">
        <Delete />
      </IconButton>
    </ListItem>
  )
}
