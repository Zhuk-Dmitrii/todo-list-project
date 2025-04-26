import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../../../api/auth-api'
import { dataLoginType, FieldErrorType } from '../../../api/typesAPI/authTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { IsAuthorizationType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatusAC } from './appSlice'
import { resetStateAC } from './todoListsSlice'

const initialState: IsAuthorizationType = {
  isLoggedIn: false,
}

export const loginTC = createAsyncThunk<
  boolean,
  dataLoginType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] }; dispatch: AppDispatch }
>('auth/login', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC('loading'))

  try {
    const res = await authAPI.login(data)

    if (res.data.resultCode == 0) {
      dispatch(setAppStatusAC('succeeded'))

      return true
    } else {
      handleServerErrorApp(res.data, dispatch)

      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInStatusAC: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload
    })
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInStatusAC } = authSlice.actions

// ------------------ THUNK CREATORS -------------------------------
export const logoutTC = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    authAPI
      .logout()
      .then(res => {
        if (res.data.resultCode == 0) {
          dispatch(setIsLoggedInStatusAC(false))
          dispatch(setAppStatusAC('succeeded'))
          dispatch(resetStateAC())
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}
