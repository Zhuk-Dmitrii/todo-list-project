// ---------------------- TYPES ----------------------------
export enum ActionTypeAuth {
  SET_IS_LOGGED_IN_STATUS = 'SET_IS_LOGGED_IN_STATUS',
}

export type TAction = ReturnType<typeof setIsLoggedInStatusAC>

// ------------------ ACTION CREATORS ----------------------
export function setIsLoggedInStatusAC(isLoggedIn: boolean) {
  return {
    type: ActionTypeAuth.SET_IS_LOGGED_IN_STATUS,
    isLoggedIn,
  } as const
}
