import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { FormikHelpers, useFormik } from 'formik'

import { login } from '../../../app/redux/thunks'
import { useAppDispatch } from '../../../app/hooks/reduxHooks'

type FormValueType = {
  email: string
  password: string
  rememberMe: boolean
}

type TProps = {
  sx?: SxProps<Theme>
}

export const LoginForm = React.memo(({ sx }: TProps) => {
  console.log('render LoginForm')

  const dispatch = useAppDispatch()

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
      const res = await dispatch(login(values))
      if (login.rejected.match(res)) {
        if (res.payload?.fieldsErrors?.length) {
          const field = res.payload.fieldsErrors[0].field
          const message = res.payload.fieldsErrors[0].error

          formikHelpers.setFieldError(field, message)
        }
      }
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={sx}>
      <FormControl fullWidth={true}>
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
        <Button type="submit" variant="contained" children={'LOGIN'} size="small" sx={{ mt: 3 }} />
      </FormControl>
    </Box>
  )
})
