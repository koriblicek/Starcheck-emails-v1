import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData } from '../../types';

interface IState {
    urls: IAppData;
}

const initialState = {
} as IState;

export const emailsSettingsSlice = createSlice({
    name: 'emailsSettings',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<{ urls: IAppData; }>) => {
            state.urls = action.payload.urls;
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsSettingsActions = emailsSettingsSlice.actions;
export const emailsSettingsReducer = emailsSettingsSlice.reducer;