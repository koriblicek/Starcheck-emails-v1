import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBlock, IColorType, IColumn, IContainer, IPropertyBase, ISizeType, INumberArrayType, ITemplate, ITextType, ISelectionType, IImageType, IHAlign, THAlign } from '../../types';
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

function regenerateIDsTemplate(template: ITemplate, templateIDs: boolean = true, containersIds: boolean = true, columnsIds: boolean = true, blocksIds: boolean = true) {
    if (templateIDs) {
        template.id = uuid.v4();
    }
    template.containers.forEach((container) => {
        regenerateIDsContainer(container, containersIds, columnsIds, blocksIds);
    });

}
function regenerateIDsContainer(container: IContainer, containersIds: boolean = true, columnsIds: boolean = true, blocksIds: boolean = true) {
    if (containersIds) {
        container.id = uuid.v4();
    }
    container.columns.forEach((column) => {
        regenerateIDsColumn(column, columnsIds, blocksIds);
    });
}
function regenerateIDsColumn(column: IColumn, columnsIds: boolean = true, blocksIds: boolean = true) {
    if (columnsIds) {
        column.id = uuid.v4();
    }
    column.blocks.forEach((block) => {
        regenerateIDsBlock(block, blocksIds);
    });
}
function regenerateIDsBlock(block: IBlock, blocksIds: boolean = true) {
    if (blocksIds) {
        block.id = uuid.v4();
    }
}

function updateProperty(object: Object, propertyKey: string, value: string) {
    const propertyIndex = Object.keys(object).findIndex(key => key === propertyKey);
    //if property exists - update value
    if (propertyIndex > 0) {
        switch ((Object.values(object)[propertyIndex] as IPropertyBase).type) {
            case "color":
                (Object.values(object)[propertyIndex] as IColorType).value = value;
                break;
            case "size":
                (Object.values(object)[propertyIndex] as ISizeType).value = Number(value);
                break;
            case "text":
                (Object.values(object)[propertyIndex] as ITextType).value = value;
                break;
            case "numberArray":
                (Object.values(object)[propertyIndex] as INumberArrayType).value = value.split("|").map(item => Number(item));
                break;
            case 'selection':
                (Object.values(object)[propertyIndex] as ISelectionType).value = value;
                break;
            case 'image':
                (Object.values(object)[propertyIndex] as IImageType).value = value;
                break;
            case 'hAlign':
                (Object.values(object)[propertyIndex] as IHAlign).value = value as THAlign;
                break;
        }
    }
}

function updateTemplate(template: ITemplate) {
    if (template) {
        //set width of the contrainers
        const w = template.contentWidthPixels.value;
        template.containers.forEach(container => {
            container.calculatedWidthPixels = w;
            //set width of the columns
            container.columns.forEach((column, index) => {
                column.calculatedWidthPixels = container.calculatedWidthPixels * container.columnsWidthsPercents.value[index] / 100;
                column.blocks.forEach(block => {
                    block.calculatedWidthPixels = column.calculatedWidthPixels - 2 * column.padding.value;
                });
            });
        });
    }
}
export const emailsCurrentEmailSlice = createSlice({
    name: 'emailsCurrentEmail',
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction<{ template: ITemplate | null; updateIds: boolean; }>) => {
            if (action.payload.template !== null) {
                const template = JSON.parse(JSON.stringify(action.payload.template)) as ITemplate;
                if (action.payload.updateIds) {
                    //re-generate id for template
                    regenerateIDsTemplate(template);
                }

                //TODO update exports
                updateTemplate(template);
                state.template = template;

            } else {
                state.template = null;
                //throw new Error("debuilderSaveSlice (setTemplate): NO email template provided!");
            }
            //clear selection
            emailsCurrentEmailSlice.caseReducers.clearSelection(state);
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
        updateTemplateProperty: (state, action: PayloadAction<{ propertyKey: string; value: string; }>) => {
            if (state.template) {
                //if module exists - update value
                updateProperty(state.template, action.payload.propertyKey, action.payload.value);
                updateTemplate(state.template);
            }
        },
        clearSelection: (state) => {
            state.selectedContainer = null;
            state.selectedBlock = null;
        },
        addContainer: (state, action: PayloadAction<{ container: IContainer; }>) => {
            if (state.template) {
                const container = JSON.parse(JSON.stringify(action.payload.container)) as IContainer;
                regenerateIDsContainer(container, true, true);
                container.id = uuid.v4();
                state.template.containers.push(container);
                updateTemplate(state.template);
            }
        },
        duplicateContainer: (state, action: PayloadAction<{ containerId: string; }>) => {
            if (state.template) {
                const container = state.template.containers.find(container => container.id === action.payload.containerId);
                const index = state.template.containers.findIndex(container => container.id === action.payload.containerId);
                if (container) {
                    const newContainer = JSON.parse(JSON.stringify(container)) as IContainer;
                    regenerateIDsContainer(newContainer);
                    state.template.containers.splice(index + 1, 0, ...[newContainer]);
                    updateTemplate(state.template);
                }
            }
        },
        removeContainer: (state, action: PayloadAction<{ containerId: string; }>) => {
            if (state.template) {
                state.template.containers = state.template.containers.filter(container => container.id !== action.payload.containerId);
                updateTemplate(state.template);
                //clear selection
                emailsCurrentEmailSlice.caseReducers.clearSelection(state);
            }
        },
        selectContainer: (state, action: PayloadAction<{ container: IContainer; }>) => {
            //clear selection
            emailsCurrentEmailSlice.caseReducers.clearSelection(state);
            if (state.template) {
                const selContainer = state.template.containers.find(container => container.id === action.payload.container.id);
                if (selContainer) {
                    //set selected container
                    state.selectedContainer = selContainer;
                }
            }
        },
        addBlock: (state, action: PayloadAction<{ columnId: string; block: string; }>) => {
            if (state.template) {
                state.template.containers.forEach((container, index) => {
                    const column = container.columns.find(column => column.id === action.payload.columnId);
                    if (column) {
                        const newBlock = JSON.parse(action.payload.block) as IBlock;
                        regenerateIDsBlock(newBlock);
                        column.blocks = [...column.blocks, newBlock];
                    }
                });
                updateTemplate(state.template);
            }
        },
        duplicateBlock: (state, action: PayloadAction<{ blockId: string; }>) => {
            if (state.template) {
                state.template.containers.forEach(container => {
                    container.columns.forEach(column => {
                        const block = column.blocks.find(block => block.id === action.payload.blockId);
                        const index = column.blocks.findIndex(block => block.id === action.payload.blockId);
                        if (block) {
                            const newBlock = JSON.parse(JSON.stringify(block)) as IBlock;
                            regenerateIDsBlock(newBlock);
                            column.blocks.splice(index + 1, 0, ...[newBlock]);
                        }

                    });
                });
                updateTemplate(state.template);
            }
        },
        removeBlock: (state, action: PayloadAction<{ blockId: string; }>) => {
            if (state.template) {
                state.template.containers.forEach((container) => {
                    container.columns.forEach(column => {
                        column.blocks = column.blocks.filter(block => block.id !== action.payload.blockId);
                    });
                });
                updateTemplate(state.template);
                //clear selection
                emailsCurrentEmailSlice.caseReducers.clearSelection(state);
            }
        },
        selectBlock: (state, action: PayloadAction<{ block: IBlock; }>) => {
            //clear selection
            emailsCurrentEmailSlice.caseReducers.clearSelection(state);
            if (state.template) {
                state.template.containers.forEach((container, index) => {
                    container.columns.forEach(column => {
                        const block = column.blocks.find(block => block.id === action.payload.block.id);
                        if (block) {
                            state.selectedBlock = block;
                        }
                    });
                });
            }
        },
        updateContainerProperty: (state, action: PayloadAction<{ containerId: string, propertyKey: string; value: string; }>) => {
            if (state.template) {
                const container = state.template.containers.find(container => container.id === action.payload.containerId);
                if (container) {
                    updateProperty(container, action.payload.propertyKey, action.payload.value);
                }
                updateTemplate(state.template);
            }
        },
        updateColumnProperty: (state, action: PayloadAction<{ columnId: string, propertyKey: string; value: string; }>) => {
            if (state.template) {
                state.template.containers.forEach((container, index) => {
                    const column = container.columns.find(column => column.id === action.payload.columnId);
                    if (column) {
                        updateProperty(column, action.payload.propertyKey, action.payload.value);
                    }
                });
                updateTemplate(state.template);
            }
        },
        updateBlockProperty: (state, action: PayloadAction<{ blockId: string, propertyKey: string; value: string; }>) => {
            if (state.template) {
                state.template.containers.forEach((container, index) => {
                    container.columns.forEach(column => {
                        const block = column.blocks.find(block => block.id === action.payload.blockId);
                        if (block) {
                            updateProperty(block, action.payload.propertyKey, action.payload.value);
                        }
                    });
                });
                updateTemplate(state.template);
            }
        },
    }
});

// Action creators are generated for each case reducer function
export const emailsCurrentEmailActions = emailsCurrentEmailSlice.actions;
export const emailsCurrentEmailReducer = emailsCurrentEmailSlice.reducer;