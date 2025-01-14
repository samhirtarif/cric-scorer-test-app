import { configureStore } from '@reduxjs/toolkit'
import { crickerScorerApi } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [crickerScorerApi.reducerPath]: crickerScorerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crickerScorerApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch