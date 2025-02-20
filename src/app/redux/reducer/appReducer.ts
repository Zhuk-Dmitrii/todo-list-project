import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../../api/auth-api'
import { handleNetworkErrorApp } from '../../../utils/error-utils'
import { AppInitialStateType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { AppStatus } from '../../types/businessTypes'
import { setIsLoggedInStatusAC } from '../reducer/authReducer'

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload
    },
    setAppErrorAC: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setIsInitializedAC: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = appSlice.actions

// ------------------------ THUNKS ------------------------------------
export function initializedAppTC() {
  return (dispatch: AppDispatch) => {
    authAPI
      .me()
      .then(res => {
        if (res.data.resultCode == 0) {
          dispatch(setIsLoggedInStatusAC(true))
        }

        dispatch(setIsInitializedAC(true))
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}
