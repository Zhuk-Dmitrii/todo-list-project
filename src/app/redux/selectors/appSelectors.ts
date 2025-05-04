import { AppInitialStateType } from '../../types/businessTypes'

export const appSelectors = {
  status: (state: AppInitialStateType) => state.status,
  error: (state: AppInitialStateType) => state.error,
  isInitialized: (state: AppInitialStateType) => state.isInitialized,
}
