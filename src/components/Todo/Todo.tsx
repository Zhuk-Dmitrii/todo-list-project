import { ChangeEvent } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { TTask } from '../App/App'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { customCSS } from './TodoCSS'

type TProps = {
  todoListId: string
  task: TTask
  deleteTask: (todoListId: string, id: string) => void
  changeStatusTask: (todoListId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
}

export function Todo(props: TProps) {
  function handleDeleteTask() {
    props.deleteTask(props.todoListId, props.task.id)
  }

  function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const taskId = props.task.id
    const checked = event.currentTarget.checked

    props.changeStatusTask(props.todoListId, taskId, checked)
  }

  function handleChangeTaskTitle(newValue: string) {
    props.changeTaskTitle(props.todoListId, props.task.id, newValue)
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
