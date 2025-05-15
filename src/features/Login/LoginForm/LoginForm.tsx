import React, { useCallback } from 'react'
import { Box, Button, FormControl, FormGroup, SxProps, Theme } from '@mui/material'
import { FormikHelpers, Formik, Form } from 'formik'

import { login } from '../../../app/redux/thunks'
import { useAppDispatch } from '../../../app/hooks/reduxHooks'
import { FormikFieldWithError } from './FormikFieldWithError'
import { FormikCheckbox } from './FormikCheckbox'
import { FormValueType } from './formTypes'

type TProps = {
  sx?: SxProps<Theme>
}

export const LoginForm = React.memo(({ sx }: TProps) => {
  const dispatch = useAppDispatch()

  const validate = useCallback((values: FormValueType) => {
    const error: { email?: string; password?: string } = {}
    if (!values.email) error.email = 'Email is required'
    if (!values.password) error.password = 'Password is required'
    return error
  }, [])

  const onSubmit = useCallback(
    async (values: FormValueType, formikHelpers: FormikHelpers<FormValueType>) => {
      const res = await dispatch(login(values))
      if (login.rejected.match(res) && res.payload?.fieldsErrors?.length) {
        const { field, error } = res.payload.fieldsErrors[0]
        formikHelpers.setFieldError(field as keyof FormValueType, error)
      }
    },
    [dispatch],
  )

  const initialValue: FormValueType = {
    email: '',
    password: '',
    rememberMe: false,
  }

  return (
    <Formik initialValues={initialValue} validate={validate} onSubmit={onSubmit}>
      <Form>
        <Box sx={sx}>
          <FormControl fullWidth={true}>
            <FormGroup>
              <FormikFieldWithError type="email" name="email" label="Email" />
              <FormikFieldWithError type="password" name="password" label="Password" />
              <FormikCheckbox name="rememberMe" label="Remember me" />
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
      </Form>
    </Formik>
  )
})
