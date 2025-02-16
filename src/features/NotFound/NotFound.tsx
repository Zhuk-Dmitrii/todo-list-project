import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../app/routers/path'

export function NotFound() {
  const navigate = useNavigate()

  function handleBackHome() {
    navigate(PATHS.HOME)
  }

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" color="error" children={'Not Found'} />
      <Button children={'вернуться на главную'} onClick={handleBackHome} sx={{ mt: 3 }} />
    </Container>
  )
}
