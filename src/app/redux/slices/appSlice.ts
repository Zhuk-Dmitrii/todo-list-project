import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../../../api/auth-api'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { AppInitialStateType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { AppStatus } from '../../types/businessTypes'
import { setIsLoggedInStatus } from './authSlice'
import { selectors } from '../selectors'

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload
    },
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(initializedApp.fulfilled, (state, action) => {
      state.isInitialized = action.payload
    })
  },
  selectors: selectors.appSelectors,
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError } = appSlice.actions
export const appSelectors = appSlice.selectors
