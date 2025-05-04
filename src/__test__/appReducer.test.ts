import { setAppError, setAppStatus } from '../app/redux/slices/appSlice'
import { appReducer } from '../app/redux/slices/appSlice'
import { AppInitialStateType, AppStatus } from '../app/types/businessTypes'

// --------------------------- INITIAL DATA -----------------------------
let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: true,
  }
})

// ------------------------------- TESTS -------------------------
test('new status should be set in App ', () => {
  const newStatus: AppStatus = 'succeeded'
  const action = setAppStatus(newStatus)
  const endState = appReducer(startState, action)

  expect(endState.status).toBe(newStatus)
})

// --------------------------------------------------------
test('error message should be set in App ', () => {
  const errorMessage: string = 'error message'
  const action = setAppError(errorMessage)
  const endState = appReducer(startState, action)

  expect(endState.error).toBe(errorMessage)
})
