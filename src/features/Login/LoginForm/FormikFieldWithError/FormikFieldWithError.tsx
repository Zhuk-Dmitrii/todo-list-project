import React, { HTMLInputTypeAttribute } from 'react'
import { TextField, TextFieldVariants, Typography, TypographyOwnProps } from '@mui/material'
import { FastField, FieldProps } from 'formik'

import { FormValueType } from '../formTypes'

type TProps = {
  type: HTMLInputTypeAttribute
  name: keyof FormValueType
  label?: string
  variant?: TextFieldVariants
  size?: 'small' | 'medium'
  margin?: 'dense' | 'normal' | 'none'
  errorVariant?: TypographyOwnProps['variant']
  errorColor?: TypographyOwnProps['color']
}

export const FormikFieldWithError = React.memo(
  ({
    type,
    name,
    label = '',
    variant = 'outlined',
    size = 'small',
    margin = 'normal',
    errorVariant = 'subtitle2',
    errorColor = 'error',
  }: TProps) => {
    return (
      <FastField name={name}>
        {({ field, meta }: FieldProps<FormValueType>) => (
          <>
            <TextField
              label={label}
              type={type}
              variant={variant}
              size={size}
              margin={margin}
              {...field}
            />
            {meta.touched && meta.error && (
              <Typography variant={errorVariant} color={errorColor} children={meta.error} />
            )}
          </>
        )}
      </FastField>
    )
  },
)
