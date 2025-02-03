import { AppStatus, TAction, ActionTypeApp } from '../action/appAction'

export type AppInitialStateType = {
  status: AppStatus
  error: string | null
}

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
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

    default:
      return state
  }
}
