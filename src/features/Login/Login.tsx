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
import { FormikHelpers, useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks'
import { loginTC } from '../../app/redux/slices/authSlice'
import { PATHS } from '../../app/routers/path'

type FormValueType = {
  email: string
  password: string
  rememberMe: boolean
}

export function Login() {
  const dispatch = useAppDispatch()
  const isLoggedInStatus = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: { email?: string; password?: string } = {}

      if (!values.email) {
        errors.email = 'Email is required'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      }

      return errors
    },
    onSubmit: async (values: FormValueType, formikHelpers: FormikHelpers<FormValueType>) => {
      const res = await dispatch(loginTC(values))

      if (loginTC.rejected.match(res)) {
        if (res.payload?.fieldsErrors?.length) {
          const field = res.payload.fieldsErrors[0].field
          const message = res.payload.fieldsErrors[0].error

          formikHelpers.setFieldError(field, message)
        }
      }
    },
  })

  if (isLoggedInStatus) {
    return <Navigate to={PATHS.HOME} />
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={5} sx={{ p: 3 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
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
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <Typography variant="subtitle2" color="error" children={formik.errors.email} />
              )}

              <TextField
                label={'Password'}
                type="password"
                variant="outlined"
                size="small"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography variant="subtitle2" color="error" children={formik.errors.password} />
              )}

              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />
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
