import { configureStore } from '@reduxjs/toolkit'
import trainReducer from './slices/trainSlice'
export const store = configureStore({
  reducer: {
    train: trainReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch