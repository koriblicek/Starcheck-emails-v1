import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
    language: string;
    editorMobileView: boolean;
    containerDrag: boolean;
}

const initialState = {
    language: "en",
    editorMobileView: false,
    containerDrag: false
} as IState;

export const emailsAppSlice = createSlice({
    name: 'emailsApp',
    initialState,
    reducers: {
        setMobileView: (state, action: PayloadAction<{ active: boolean; }>) => {
            state.editorMobileView = action.payload.active;
        },
        setContainerDrag: (state, action: PayloadAction<{ status: boolean; }>) => {
            state.containerDrag = action.payload.status;
        },
    }
});

// Action creators are generated for each case reducer function
export const emailsAppActions = emailsAppSlice.actions;
export const emailsAppReducer = emailsAppSlice.reducer;