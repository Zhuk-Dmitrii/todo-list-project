import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppInitialStateType } from '../../types/businessTypes'
import { AppStatus } from '../../types/businessTypes'
import { selectors } from '../selectors'
import { initializedApp } from '../thunks'

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

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
