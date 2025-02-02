import { rootReducer, store } from '../redux/store'

// ---------------------------- STORE TYPES -----------------------------

// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
