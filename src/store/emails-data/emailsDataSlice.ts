import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseColumn, baseContainer, blockButton, blockDivider, blockHeading, blockHtml, blockImage, blockText, emptyTemplate } from '../../data';
import { IBlock, IContainer, ICustomTemplates, ITemplate } from '../../types';
import * as uuid from 'uuid';
import logo_container_1 from '../../assets/images/container_1.png';
import logo_container_1_1 from '../../assets/images/container_1-1.png';
import logo_container_1_1_1 from '../../assets/images/container_1-1-1.png';
import logo_container_1_2 from '../../assets/images/container_1-2.png';
import logo_container_2_1 from '../../assets/images/container_2-1.png';
import logo_block_image from '../../assets/images/block_image.png';
import logo_block_text from '../../assets/images/block_text.png';
import logo_block_heading from '../../assets/images/block_heading.png';
import logo_block_html from '../../assets/images/block_html.png';
import logo_block_divider from '../../assets/images/block_divider.png';
import logo_block_button from '../../assets/images/block_button.png';

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
        initCustomTemplates: (state, action: PayloadAction<{ templates: ICustomTemplates; }>) => {
            state.customTemplates = Object.values(action.payload.templates).map((template) => {
                return template;
            });
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
            container_1.columnsWidthsPercents.value.push(0);
            container_1.columnsWidthsPercents.defaultValue.push(0);
            container_1.columnsWidthsPercents.value.push(100);
            container_1.columnsWidthsPercents.defaultValue.push(100);

            const container_1_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1_1.logo = logo_container_1_1;
            container_1_1.columnsWidthsPercents.value.push(0);
            container_1_1.columnsWidthsPercents.defaultValue.push(0);
            for (let i = 0; i < 2; i++) {
                container_1_1.columns.push(baseColumn);
                if (i !== 0) {
                    container_1_1.columnsWidthsPercents.value.push(i * (100 / 2));
                    container_1_1.columnsWidthsPercents.defaultValue.push(i * (100 / 2));
                }
            }
            container_1_1.columnsWidthsPercents.value.push(100);
            container_1_1.columnsWidthsPercents.defaultValue.push(100);

            const container_1_2 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1_2.logo = logo_container_1_2;
            container_1_2.columnsWidthsPercents.value.push(0);
            container_1_2.columnsWidthsPercents.defaultValue.push(0);
            for (let i = 0; i < 2; i++) {
                container_1_2.columns.push(baseColumn);
                if (i !== 0) {
                    container_1_2.columnsWidthsPercents.value.push(i * 33);
                    container_1_2.columnsWidthsPercents.defaultValue.push(i * 33);
                }
            }
            container_1_2.columnsWidthsPercents.value.push(100);
            container_1_2.columnsWidthsPercents.defaultValue.push(100);

            const container_2_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_2_1.logo = logo_container_2_1;
            container_2_1.columnsWidthsPercents.value.push(0);
            container_2_1.columnsWidthsPercents.defaultValue.push(0);
            for (let i = 0; i < 2; i++) {
                container_2_1.columns.push(baseColumn);
                if (i !== 0) {
                    container_2_1.columnsWidthsPercents.value.push(i * 67);
                    container_2_1.columnsWidthsPercents.defaultValue.push(i * 67);
                }
            }
            container_2_1.columnsWidthsPercents.value.push(100);
            container_2_1.columnsWidthsPercents.defaultValue.push(100);

            const container_1_1_1 = JSON.parse(JSON.stringify(baseContainer)) as IContainer;
            container_1_1_1.logo = logo_container_1_1_1;
            container_1_1_1.columnsWidthsPercents.value.push(0);
            container_1_1_1.columnsWidthsPercents.defaultValue.push(0);
            for (let i = 0; i < 3; i++) {
                container_1_1_1.columns.push(baseColumn);
                if (i !== 0) {
                    container_1_1_1.columnsWidthsPercents.value.push(i * (100 / 3));
                    container_1_1_1.columnsWidthsPercents.defaultValue.push(i * (100 / 3));
                }
            }
            container_1_1_1.columnsWidthsPercents.value.push(100);
            container_1_1_1.columnsWidthsPercents.defaultValue.push(100);

            state.builtinContainers = [container_1, container_1_1, container_1_2, container_2_1, container_1_1_1];
        },
        deleteCustomTemplate: (state, action: PayloadAction<{ template: ITemplate; }>) => {
            const index = state.customTemplates.findIndex((template) => template.id === action.payload.template.id);
            state.customTemplates.splice(index, 1);
        },
        initBuiltinBlocks: (state) => {
            const block_image = JSON.parse(JSON.stringify(blockImage)) as IBlock;
            block_image.logo = logo_block_image;
            const block_heading = JSON.parse(JSON.stringify(blockHeading)) as IBlock;
            block_heading.logo = logo_block_heading;
            const block_text = JSON.parse(JSON.stringify(blockText)) as IBlock;
            block_text.logo = logo_block_text;
            const block_html = JSON.parse(JSON.stringify(blockHtml)) as IBlock;
            block_html.logo = logo_block_html;
            const block_divider = JSON.parse(JSON.stringify(blockDivider)) as IBlock;
            block_divider.logo = logo_block_divider;
            const block_button = JSON.parse(JSON.stringify(blockButton)) as IBlock;
            block_button.logo = logo_block_button;
            state.builtinBlocks = [block_image, block_heading, block_text, block_html, block_divider /*, block_button*/];
        }
    }
});

// Action creators are generated for each case reducer function
export const emailsDataActions = emailsDataSlice.actions;
export const emailsDataReducer = emailsDataSlice.reducer;