import React, { ChangeEvent, useCallback, useState, useRef, useEffect } from 'react'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'

import { AppStatus } from '../../app/types/businessTypes'

type TEditableSpan = {
  title: string
  changeValue: (newValue: string) => void
  sx?: {
    textField?: Array<object | boolean> | object
    typography?: Array<object | boolean> | object
  }
  disabled?: boolean
  status?: AppStatus
}

export const EditableSpan = React.memo(
  ({ disabled = false, changeValue, title, sx, status }: TEditableSpan) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const fieldInput = useRef<HTMLInputElement>(null)

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

    useEffect(() => {
      if (status === 'failed') {
        const focus = setTimeout(() => {
          setEditMode(true)
          fieldInput.current?.focus()
        })

        return () => clearInterval(focus)
      }
    }, [status])

    return editMode ? (
      <TextField
        variant="standard"
        onChange={handleChangeInput}
        onBlur={disableEditMode}
        value={value}
        sx={sx?.textField}
        autoFocus
        multiline
        inputRef={fieldInput}
      />
    ) : (
      <Typography
        component={'span'}
        onDoubleClick={activateEditMode}
        sx={(sx?.typography, { opacity: disabled ? '0.5' : '1', overflowWrap: 'anywhere' })}
      >
        {status === 'failed' ? value : title}
      </Typography>
    )
  },
)
