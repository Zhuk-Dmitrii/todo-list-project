import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

type TInputForm = {
  createItem: (title: string) => void
  size?: 'medium' | 'small'
  disabled?: boolean
  maxWidth?: string
}

export const InputFormToAdd = React.memo(
  ({ createItem, size, disabled = false, maxWidth = '100%' }: TInputForm) => {
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

        createItem(title.trim())
        setTitle('')
      },
      [createItem, title],
    )

    return (
      <Box
        component="form"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ maxWidth, width: '100%' }}
          label="title for todo list"
          variant="outlined"
          size={size}
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
  },
)
