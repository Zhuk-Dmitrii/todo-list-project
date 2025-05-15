import React from 'react'
import { FastField, FieldProps } from 'formik'
import { Checkbox, FormControlLabel } from '@mui/material'

import { FormValueType } from '../formTypes'

type TProps = {
  name: keyof FormValueType
  label: string
}

export const FormikCheckbox = React.memo(({ name, label }: TProps) => {
  return (
    <FastField name={name}>
      {({ field }: FieldProps<boolean>) => (
        <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label={label} />
      )}
    </FastField>
  )
})
