import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { emptyContainer, emptyTemplate } from '../../data';
import { IContainer, ITemplate } from '../../types';
import * as uuid from 'uuid';
import logo_container_1 from '../../assets/images/container_1.png';
import logo_container_1_1 from '../../assets/images/container_1-1.png';
import logo_container_1_1_1 from '../../assets/images/container_1-1-1.png';

interface IState {
    builtinTemplates: ITemplate[];
    customTemplates: ITemplate[];
    builtinContainers: IContainer[];
}

const initialState: IState = {
    builtinTemplates: [],
    customTemplates: [],
    builtinContainers: []
} as IState;

export const emailsDataSlice = createSlice({
    name: 'emailsData',
    initialState,
    reducers: {
        initCustomTemplates: (state, action: PayloadAction<{ templates: ITemplate[]; }>) => {
            state.customTemplates = action.payload.templates;
        },
        initiBuiltinTemplates: (state) => {
            const template = JSON.parse(JSON.stringify(emptyTemplate)) as ITemplate;
            template.id = uuid.v4();
            state.builtinTemplates = [template];
        },
        initBuiltinContainers: (state) => {
            const container_1 = JSON.parse(JSON.stringify(emptyContainer)) as IContainer;
            container_1.id = uuid.v4();
            container_1.logo = logo_container_1;
            const container_1_1 = JSON.parse(JSON.stringify(emptyContainer)) as IContainer;
            container_1_1.id = uuid.v4();
            container_1_1.logo = logo_container_1_1;
            const container_1_1_1 = JSON.parse(JSON.stringify(emptyContainer)) as IContainer;
            container_1_1_1.id = uuid.v4();
            container_1_1_1.logo = logo_container_1_1_1;
            state.builtinContainers = [container_1, container_1_1, container_1_1_1];
        },
    }
});

// Action creators are generated for each case reducer function
export const emailsDataActions = emailsDataSlice.actions;
export const emailsDataReducer = emailsDataSlice.reducer;