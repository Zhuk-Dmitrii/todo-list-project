import { store } from '../store'

// ---------------------------- STORE TYPES -----------------------------
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
