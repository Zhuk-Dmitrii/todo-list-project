import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

type TInputForm = {
  createItem: (title: string) => void
  styleWrapper?: object
  sx?: object
  size?: 'medium' | 'small'
  disabled?: boolean
}

export const InputForm = React.memo(({ disabled = false, ...props }: TInputForm) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (error !== null) setError(null)

      setTitle(event.target.value)
    },
    [error],
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (title.trim() === '') {
        setError('Title is required')
        setTitle('')

        return
      }

      props.createItem(title.trim())
      setTitle('')
    },
    [title, props.createItem],
  )

  return (
    <Box
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: '100%', ...props.styleWrapper }}
      onSubmit={handleSubmit}
    >
      <TextField
        sx={props.sx}
        label="title for todo list"
        variant="outlined"
        size={props.size}
        helperText={error}
        error={!!error}
        value={title}
        onChange={handleChangeTitle}
        disabled={disabled}
      />
      <IconButton type="submit" color="primary" sx={{ ml: 1, mb: 'auto' }} disabled={disabled}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
})
