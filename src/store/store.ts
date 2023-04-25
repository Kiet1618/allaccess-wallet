import { configureStore } from '@reduxjs/toolkit'
import loginreducer from './features/login/checkLoginReducer'
export const store = configureStore({
    reducer: {
        login: loginreducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch