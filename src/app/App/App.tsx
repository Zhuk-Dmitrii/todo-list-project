import { Box, Container, LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks/reduxHooks'
import { Header } from '../../components/Header'
import { CustomSnackbar } from '../../components/CustomSnackbar'

export function App() {
  const status = useAppSelector(state => state.app.status)

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Header />
        {status === 'loading' && (
          <LinearProgress sx={{ position: 'absolute', left: '0px', right: '0px', bottom: '0px' }} />
        )}
      </Box>
      <Container sx={{ pt: 6, pb: 2 }}>
        <Outlet />
      </Container>
      <CustomSnackbar />
    </>
  )
}
