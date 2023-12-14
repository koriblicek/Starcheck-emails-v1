import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData, IAppInputData } from '../../types';

interface IState {
    urls: IAppData;
    inputData: IAppInputData;
}

const initialState = {
} as IState;

export const emailsSettingsSlice = createSlice({
    name: 'emailsSettings',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<{ urls: IAppData; inputData: IAppInputData; }>) => {
            state.urls = action.payload.urls;
            state.inputData = action.payload.inputData;
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsSettingsActions = emailsSettingsSlice.actions;
export const emailsSettingsReducer = emailsSettingsSlice.reducer;