import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks'
import { setAppError, appSelectors } from '../../app/redux/slices/appSlice'

export function CustomSnackbar() {
  const error = useAppSelector(appSelectors.error)
  const dispatch = useAppDispatch()

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAppError(null))
  }

  const isOpen = error !== null

  if (!error) {
    return null
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
