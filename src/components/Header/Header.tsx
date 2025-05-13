import React, { useCallback } from 'react'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks'
import { authSelectors } from '../../app/redux/slices/authSlice'
import { logout } from '../../app/redux/thunks'

export const Header = React.memo(() => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
})
