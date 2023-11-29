import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITemplate } from '../../types';
import * as uuid from 'uuid';

interface IState {
    template: ITemplate | null;
    selectedContainer: string;
    selectedModule: string;
    saveIsRequired: boolean;
}

const initialState: IState = {
    template: null,
    selectedContainer: "",
    selectedModule: "",
    saveIsRequired: false
} as IState;

export const emailsCurrentEmailSlice = createSlice({
    name: 'emailsCurrentEmail',
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction<{ template: ITemplate | null; updateIds: boolean; }>) => {
            if (action.payload.template !== undefined) {
                const template = JSON.parse(JSON.stringify(action.payload.template)) as ITemplate;
                if (action.payload.updateIds) {
                    //re-generate id for template
                    template.id = uuid.v4();
                }
                state.template = template;
                state.selectedContainer = "";
                state.selectedModule = "";
                //update text export
                // updateExports(state.template.baseModule, state.template.baseModule);
            } else {
                state.template = null;
                //throw new Error("debuilderSaveSlice (setTemplate): NO email template provided!");
            }
        },
        saveTemplate: (state) => {
            if (state.template) {
                state.template.modificationDate = Date.now();
            }
            state.saveIsRequired = true;
        },
        cancelSave: (state) => {
            state.saveIsRequired = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsCurrentEmailActions = emailsCurrentEmailSlice.actions;
export const emailsCurrentEmailReducer = emailsCurrentEmailSlice.reducer;