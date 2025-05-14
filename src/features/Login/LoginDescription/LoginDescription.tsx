import React from 'react'
import { Box, Link, Typography } from '@mui/material'

export const LoginDescription = React.memo(() => {
  console.log('render LoginDescription')

  const linkToRegistered = 'https://social-network.samuraijs.com/'

  return (
    <Box>
      <Typography variant="body2" sx={{ display: 'inline-block' }} color="textSecondary">
        To log in get registered{' '}
        <Link href={linkToRegistered} variant={'body2'} children={'here'} target={'_blank'} />
      </Typography>
      <Typography
        variant="body2"
        children={'or use common test account credentials'}
        color="textSecondary"
      />
      <Typography variant="body2" children={'Email: free@samuraijs.com'} color="textSecondary" />
      <Typography variant="body2" children={'Password: free'} color="textSecondary" />
    </Box>
  )
})
