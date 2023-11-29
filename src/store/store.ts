import { configureStore } from '@reduxjs/toolkit';
import { emailsAppReducer } from './debuilder-data/emailsAppSlice';
import { emailsCurrentEmailReducer } from './debuilder-data/emailsCurrentEmailSlice';
import { emailsSettingsReducer } from './debuilder-data/emailsSettingsSlice';
import { emailsDataReducer } from './debuilder-data/emailsDataSlice';

export const store = configureStore({
  reducer: {
    emailsApp: emailsAppReducer,
    emailsCurrentEmail: emailsCurrentEmailReducer,
    emailsSettings: emailsSettingsReducer,
    emailsData: emailsDataReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;