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
  const [titleTodo, setTitleTodo] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitleTodo(event.target.value)
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (titleTodo.trim() === '') {
      setError('Title is required')
      setTitleTodo('')

      return
    }

    props.createItem(titleTodo.trim())
    setTitleTodo('')
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
        value={titleTodo}
        onChange={handleChangeTitle}
      />
      {props.children}
    </Box>
  )
}
