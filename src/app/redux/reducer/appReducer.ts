import { authAPI } from '../../../api/auth-api'
import { handleNetworkErrorApp } from '../../../utils/error-utils'
import { AppDispatch } from '../../types/storeTypes'
import { AppStatus, TAction, ActionTypeApp, setIsInitializedAC } from '../action/appAction'
import { setIsLoggedInStatusAC } from '../action/authAction'

export type AppInitialStateType = {
  status: AppStatus
  error: string | null
  isInitialized: boolean
}

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

export function appReducer(
  state: AppInitialStateType = initialState,
  action: TAction,
): AppInitialStateType {
  switch (action.type) {
    case ActionTypeApp.APP_SET_STATUS: {
      return { ...state, status: action.status }
    }

    case ActionTypeApp.APP_SET_ERROR: {
      return { ...state, error: action.error }
    }

    case ActionTypeApp.APP_SET_IS_INITIALIZED: {
      return { ...state, isInitialized: action.isInitialized }
    }

    default:
      return state
  }
}

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
