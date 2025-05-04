import { Box, CircularProgress, Container, LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Header } from '../../components/Header'
import { CustomSnackbar } from '../../components/CustomSnackbar'
import { initializedApp, appSelectors } from '../redux/slices/appSlice'

export function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appSelectors.status)
  const isInitialized = useAppSelector(appSelectors.isInitialized)

  useEffect(() => {
    dispatch(initializedApp())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    )
  }

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
