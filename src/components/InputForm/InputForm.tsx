import { ChangeEvent, FormEvent, useState } from 'react'
import { Box, TextField } from '@mui/material'

type TInputForm = {
  createItem: (title: string) => void
  styleWrapper?: object
  sx?: object
  children?: JSX.Element
  size?: 'medium' | 'small'
}

export function InputForm(props: TInputForm) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (title.trim() === '') {
      setError('Title is required')
      setTitle('')

      return
    }

    props.createItem(title.trim())
    setTitle('')
  }

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
      />
      {props.children}
    </Box>
  )
}
