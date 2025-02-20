import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../../api/auth-api'
import { dataLoginType } from '../../../api/typesAPI/authTypes'
import { handleNetworkErrorApp, handleServerErrorApp } from '../../../utils/error-utils'
import { IsAuthorizationType } from '../../types/businessTypes'
import { AppDispatch } from '../../types/storeTypes'
import { setAppStatusAC } from '../action/appAction'
// import { ActionTypeAuth, setIsLoggedInStatusAC, TAction } from '../action/authAction'
import { resetStateAC } from '../action/todoListsAction'

const initialState: IsAuthorizationType = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInStatusAC: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInStatusAC } = authSlice.actions

// export function authReducer(
//   state: IsAuthorizationType = initialState,
//   action: TAction,
// ): IsAuthorizationType {
//   switch (action.type) {
//     case ActionTypeAuth.SET_IS_LOGGED_IN_STATUS: {
//       return { ...state, isLoggedIn: action.isLoggedIn }
//     }
//     default:
//       return state
//   }
// }

// ------------------ THUNK CREATORS -------------------------------
export const loginTC = (data: dataLoginType) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))

    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode == 0) {
          dispatch(setIsLoggedInStatusAC(true))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerErrorApp(res.data, dispatch)
        }
      })
      .catch(error => handleNetworkErrorApp(error.message, dispatch))
  }
}

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
