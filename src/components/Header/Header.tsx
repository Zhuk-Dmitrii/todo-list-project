import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}
