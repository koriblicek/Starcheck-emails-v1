import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseColumn, baseContainer, blockImage, emptyTemplate } from '../../data';
import { IBlock, IContainer, ITemplate } from '../../types';
import * as uuid from 'uuid';
import logo_container_1 from '../../assets/images/container_1.png';
import logo_container_1_1 from '../../assets/images/container_1-1.png';
import logo_container_1_1_1 from '../../assets/images/container_1-1-1.png';

interface IState {
    builtinTemplates: ITemplate[];
    customTemplates: ITemplate[];
    builtinContainers: IContainer[];
    builtinBlocks: IBlock[];
}

const initialState: IState = {
    builtinTemplates: [],
    customTemplates: [],
    builtinContainers: [],
    builtinBlocks: []
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
            const container_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1.logo = logo_container_1;
            container_1.columns.push(baseColumn);
            container_1.columnsWidthsPercents.value.push(100);
            container_1.columnsWidthsPercents.defaultValue.push(100);

            const container_1_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1_1.logo = logo_container_1_1;
            for (let i = 0; i < 2; i++) {
                container_1_1.columns.push(baseColumn);
                container_1_1.columnsWidthsPercents.value.push((100 / 2));
                container_1_1.columnsWidthsPercents.defaultValue.push(100 / 2);
            }

            const container_1_1_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1_1_1.logo = logo_container_1_1_1;
            for (let i = 0; i < 3; i++) {
                container_1_1_1.columns.push(baseColumn);
                container_1_1_1.columnsWidthsPercents.value.push(100 / 3);
                container_1_1_1.columnsWidthsPercents.defaultValue.push(100 / 3);
            }
            state.builtinContainers = [container_1, container_1_1, container_1_1_1];
        },
        initBuiltinBlocks: (state) => {
            state.builtinBlocks = [blockImage];
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsDataActions = emailsDataSlice.actions;
export const emailsDataReducer = emailsDataSlice.reducer;