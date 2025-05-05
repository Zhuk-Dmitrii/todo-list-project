import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IsAuthorizationType } from '../../types/businessTypes'
import { selectors } from '../selectors'
import { login, logout } from '../thunks'

const initialState: IsAuthorizationType = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload
    })

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload
    })
  },
  selectors: selectors.authSelectors,
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInStatus } = authSlice.actions
export const authSelectors = authSlice.selectors
