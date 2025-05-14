import { Paper, Container } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks/reduxHooks'
import { authSelectors } from '../../app/redux/slices/authSlice'
import { PATHS } from '../../app/routers/path'
import { LoginDescription } from './LoginDescription'
import { LoginForm } from './LoginForm'

export function Login() {
  console.log('render login')

  const isLoggedInStatus = useAppSelector(authSelectors.isLoggedIn)

  if (isLoggedInStatus) {
    return <Navigate to={PATHS.HOME} />
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={5} sx={{ p: 3 }}>
        <LoginDescription />
        <LoginForm sx={{ mt: 3 }} />
      </Paper>
    </Container>
  )
}
