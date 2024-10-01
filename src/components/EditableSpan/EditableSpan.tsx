import { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'

type TEditableSpan = {
  title: string
  changeValue: (newValue: string) => void
  sx?: {
    textField?: Array<object | boolean> | object
    typography?: Array<object | boolean> | object
  }
}

export function EditableSpan(props: TEditableSpan) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  function activateEditMode() {
    setEditMode(true)
    setTitle(props.title)
  }

  function disableEditMode() {
    setEditMode(false)
    props.changeValue(title)
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value)
  }

  return editMode ? (
    <TextField
      variant="standard"
      onChange={handleChangeInput}
      onBlur={disableEditMode}
      value={title}
      sx={props.sx?.textField}
      autoFocus
    />
  ) : (
    <Typography component={'span'} onDoubleClick={activateEditMode} sx={props.sx?.typography}>
      {props.title}
    </Typography>
  )
}
