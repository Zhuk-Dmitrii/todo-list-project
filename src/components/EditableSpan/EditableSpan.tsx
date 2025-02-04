import React, { ChangeEvent, useCallback, useState } from 'react'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'

type TEditableSpan = {
  title: string
  changeValue: (newValue: string) => void
  sx?: {
    textField?: Array<object | boolean> | object
    typography?: Array<object | boolean> | object
  }
  disabled?: boolean
}

export const EditableSpan = React.memo(({ disabled = false, ...props }: TEditableSpan) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateEditMode = useCallback(() => {
    if (disabled) return

    setEditMode(true)
    setTitle(props.title)
  }, [props.title, disabled])

  const disableEditMode = useCallback(() => {
    setEditMode(false)
    props.changeValue(title)
  }, [props.changeValue, title])

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }, [])

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
    <Typography
      component={'span'}
      onDoubleClick={activateEditMode}
      sx={(props.sx?.typography, { opacity: disabled ? '0.5' : '1' })}
    >
      {props.title}
    </Typography>
  )
})
