import {
  Paper,
  Box,
  Container,
  FormControl,
  FormGroup,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material'

export function Login() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10%' }}>
      <Paper elevation={5} sx={{ p: 3 }}>
        <Box component="form">
          <Typography variant="body2" sx={{ display: 'inline-block' }} color="textSecondary">
            To log in get registered{' '}
            <Link
              href="https://social-network.samuraijs.com/"
              variant={'body2'}
              children={'here'}
              target={'_blank'}
            />
          </Typography>
          <Typography
            variant="body2"
            children={'or use common test account credentials'}
            color="textSecondary"
          />
          <Typography
            variant="body2"
            children={'Email: free@samuraijs.com'}
            color="textSecondary"
          />
          <Typography variant="body2" children={'Password: free'} color="textSecondary" />
          <FormControl fullWidth={true} sx={{ mt: 3 }}>
            <FormGroup>
              <TextField
                label={'Email'}
                type="email"
                variant="outlined"
                size="small"
                margin="normal"
                required
              />
              <TextField
                label={'Password'}
                type="password"
                variant="outlined"
                size="small"
                margin="normal"
                required
              />
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              children={'LOGIN'}
              size="small"
              sx={{ mt: 3 }}
            />
          </FormControl>
        </Box>
      </Paper>
    </Container>
  )
}
