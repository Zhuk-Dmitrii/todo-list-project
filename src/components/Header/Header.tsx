import { AppBar, LinearProgress } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'

import { useAppSelector } from '../../app/hooks/reduxHooks'

export function Header() {
  const status = useAppSelector(state => state.app.status)

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      {status === 'loading' && (
        <LinearProgress sx={{ position: 'absolute', left: '0px', right: '0px', bottom: '0px' }} />
      )}
    </AppBar>
  )
}
