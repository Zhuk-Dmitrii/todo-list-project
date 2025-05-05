import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../../../api/auth-api'
import { setIsLoggedInStatus } from '../slices/authSlice'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { AppDispatch } from '../../types/storeTypes'

export const initializedApp = createAsyncThunk<boolean, void, { dispatch: AppDispatch }>(
  'app/initializedApp',
  async (_, { dispatch }) => {
    try {
      const res = await authAPI.me()

      if (res.data.resultCode == 0) {
        dispatch(setIsLoggedInStatus(true))
      } else {
        handleServerErrorApp(res.data, dispatch)
      }

      return true
    } catch (err) {
      const error = err as AxiosError

      handleNetworkErrorApp(error.message, dispatch)

      return true
    }
  },
)
