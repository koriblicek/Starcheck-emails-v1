import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBlock, IColorType, IContainer, IPropertyBase, ISizeType, ITemplate } from '../../types';
import * as uuid from 'uuid';

interface IState {
    template: ITemplate | null;
    selectedContainer: IContainer | null;
    selectedBlock: IBlock | null;
    saveIsRequired: boolean;
}

const initialState: IState = {
    template: null,
    selectedContainer: null,
    selectedBlock: null,
    saveIsRequired: false
} as IState;

export const emailsCurrentEmailSlice = createSlice({
    name: 'emailsCurrentEmail',
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction<{ template: ITemplate | null; updateIds: boolean; }>) => {
            if (action.payload.template !== null) {
                const template = JSON.parse(JSON.stringify(action.payload.template)) as ITemplate;
                if (action.payload.updateIds) {
                    //re-generate id for template
                    template.id = uuid.v4();
                }
                state.template = template;
                //update text export
                // updateExports(state.template.baseModule, state.template.baseModule);
            } else {
                state.template = null;
                //throw new Error("debuilderSaveSlice (setTemplate): NO email template provided!");
            }
            state.selectedContainer = null;
            state.selectedBlock = null;;
        },
        saveTemplate: (state) => {
            if (state.template) {
                state.template.modificationDate = Date.now();
            }
            state.saveIsRequired = true;
        },
        cancelSave: (state) => {
            state.saveIsRequired = false;
        },
        updateModuleProperty: (state, action: PayloadAction<{ propertyIndex: number; value: string; }>) => {
            if (state.template) {
                //if module exists - update value
                switch ((Object.values(state.template)[action.payload.propertyIndex] as IPropertyBase).type) {
                    case "color":
                        (Object.values(state.template)[action.payload.propertyIndex] as IColorType).value = action.payload.value;
                        break;
                    case "size":
                        (Object.values(state.template)[action.payload.propertyIndex] as ISizeType).value = Number(action.payload.value);
                        break;
                }
            }
        },
        clearSelection: (state) => {
            state.selectedContainer = null;
            state.selectedBlock = null;
        },
    }
});

// Action creators are generated for each case reducer function
export const emailsCurrentEmailActions = emailsCurrentEmailSlice.actions;
export const emailsCurrentEmailReducer = emailsCurrentEmailSlice.reducer;