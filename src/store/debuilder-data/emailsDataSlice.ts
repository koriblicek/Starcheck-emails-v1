import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { emptyTemplate } from '../../data';
import { ITemplate } from '../../types';

interface IState {
    builtinTemplates: ITemplate[];
    customTemplates: ITemplate[];
}

const initialState: IState = {
    builtinTemplates: [
        emptyTemplate
    ],
    customTemplates: []
} as IState;

export const emailsDataSlice = createSlice({
    name: 'emailsData',
    initialState,
    reducers: {
        initCustomTemplates: (state, action: PayloadAction<{ templates: ITemplate[]; }>) => {
            state.customTemplates = action.payload.templates;
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsDataActions = emailsDataSlice.actions;
export const emailsDataReducer = emailsDataSlice.reducer;