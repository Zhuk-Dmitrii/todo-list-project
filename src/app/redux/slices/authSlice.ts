import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../../../api/auth-api'
import { dataLoginType, FieldErrorType } from '../../../api/typesAPI/authTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { IsAuthorizationType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatus } from './appSlice'
import { clearTodoListsAndTaskState } from '../common/actions/common.actions'

const initialState: IsAuthorizationType = {
  isLoggedIn: false,
}

export const login = createAsyncThunk<
  boolean,
  dataLoginType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] }; dispatch: AppDispatch }
>('auth/login', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))

  try {
    const res = await authAPI.login(data)

    if (res.data.resultCode == 0) {
      dispatch(setAppStatus('succeeded'))

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

export const logout = createAsyncThunk<
  boolean,
  void,
  { dispatch: AppDispatch; rejectValue: { errors: string[] } }
>('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await authAPI.logout()

    if (res.data.resultCode == 0) {
      dispatch(setAppStatus('succeeded'))
      dispatch(clearTodoListsAndTaskState())

      return false
    } else {
      handleServerErrorApp(res.data, dispatch)

      return rejectWithValue({ errors: res.data.messages })
    }
  } catch (err) {
    const error = err as AxiosError
    handleNetworkErrorApp(error.message, dispatch)

    return rejectWithValue({ errors: [error.message] })
  }
})

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
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInStatus } = authSlice.actions
