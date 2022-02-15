import { configureStore } from '@reduxjs/toolkit';
import { ExamReducer } from './reducer';

const store = configureStore(
    {
        reducer: {
            exam: ExamReducer
        }
    }
)

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;