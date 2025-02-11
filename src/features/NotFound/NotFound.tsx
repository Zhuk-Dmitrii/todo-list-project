import { Container, Typography } from '@mui/material'

export function NotFound() {
  return (
    <Container
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h1" color="error" children={'Not Found'} />
    </Container>
  )
}
