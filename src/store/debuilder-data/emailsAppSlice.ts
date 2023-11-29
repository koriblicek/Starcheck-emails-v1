import { createSlice } from '@reduxjs/toolkit';

interface IState {
    language: string;
}

const initialState = {
    language: "en"
} as IState;

export const emailsAppSlice = createSlice({
    name: 'emailsApp',
    initialState,
    reducers: {
    }
});

// Action creators are generated for each case reducer function
export const emailsAppActions = emailsAppSlice.actions;
export const emailsAppReducer = emailsAppSlice.reducer;