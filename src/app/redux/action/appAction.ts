// // ---------------------- TYPES ----------------------------
// export enum ActionTypeApp {
//   APP_SET_STATUS = 'APP_SET_STATUS',
//   APP_SET_ERROR = 'APP_SET_ERROR',
//   APP_SET_IS_INITIALIZED = 'APP_SET_IS_INITIALIZED',
// }

// export type AppStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

// export type TAction =
//   | SetAppStatusActionType
//   | SetAppErrorActionType
//   | ReturnType<typeof setIsInitializedAC>

// // ------------------ ACTION CREATORS ----------------------

// export function setAppStatusAC(status: AppStatus) {
//   return {
//     type: ActionTypeApp.APP_SET_STATUS,
//     status,
//   } as const
// }

// export function setAppErrorAC(error: string | null) {
//   return {
//     type: ActionTypeApp.APP_SET_ERROR,
//     error,
//   } as const
// }

// export function setIsInitializedAC(isInitialized: boolean) {
//   return {
//     type: ActionTypeApp.APP_SET_IS_INITIALIZED,
//     isInitialized,
//   } as const
// }
