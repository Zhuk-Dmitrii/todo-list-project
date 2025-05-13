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
  console.log('render editable span')

  const { changeValue, title, sx } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const activateEditMode = useCallback(() => {
    if (disabled) return

    setEditMode(true)
    setValue(title)
  }, [title, disabled])

  const disableEditMode = useCallback(() => {
    setEditMode(false)

    if (value !== title) changeValue(value)
  }, [changeValue, value, title])

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return editMode ? (
    <TextField
      variant="standard"
      onChange={handleChangeInput}
      onBlur={disableEditMode}
      value={value}
      sx={sx?.textField}
      autoFocus
    />
  ) : (
    <Typography
      component={'span'}
      onDoubleClick={activateEditMode}
      sx={(sx?.typography, { opacity: disabled ? '0.5' : '1' })}
    >
      {title}
    </Typography>
  )
})
