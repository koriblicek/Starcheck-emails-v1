import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBlock, IColorType, IColumn, IContainer, IPropertyBase, ISizeType, INumberArrayType, ITemplate, ITextType, ISelectionType, IImageType, IHAlign, THAlign, ITAlign, TTAlign, IMultilineTextType, IBlockHeading, IBlockText, IBlockImage, IBlockHtml } from '../../types';
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
            case "multilineText":
                (Object.values(object)[propertyIndex] as IMultilineTextType).value = value;
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
            case 'tAlign':
                (Object.values(object)[propertyIndex] as ITAlign).value = value as TTAlign;
                break;
        }
    }
}

function updateTemplate(template: ITemplate) {
    if (template) {
        //get template width
        const w = template.contentWidthPixels.value;
        template.containers.forEach(container => {
            //set width of all contrainers equal to template width
            container.calculatedWidthPixels = w;

            container.columns.forEach((column, index) => {
                //set width of all columns - based on column width percentage
                column.calculatedWidthPixels = container.calculatedWidthPixels * container.columnsWidthsPercents.value[index] / 100;

                column.blocks.forEach(block => {
                    //set width of all columns - based on column width - column padding * 2
                    block.calculatedWidthPixels = column.calculatedWidthPixels - 2 * column.padding.value;

                    //create block export text
                    block.exportedText = exportBlockText(block);
                });

                //create column export text
                column.exportedText = exportColumnText(column);
            });

            //create container export text
            container.exportedText = exportContainerText(container);
        });
        //create template export text
        template.exportedText = exportTemplateText(template);
    }
}

function exportTemplateText(template: ITemplate): string {
    let exportedText: string = template.htmlText;
    exportedText = exportedText.replaceAll('{{backgroundColor}}',
        template.backgroundColor.value === "transparent" ? "" : `background-color: ${template.backgroundColor.value};`);
    exportedText = exportedText.replaceAll('{{textColor}}',
        template.textColor.value === "transparent" ? "" : `color: ${template.textColor.value};`);
    exportedText = exportedText.replaceAll('{{subjectLine}}', template.subjectLine.value);
    exportedText = exportedText.replaceAll('{{previewLine1}}', template.previewLine1.value);
    exportedText = exportedText.replaceAll('{{previewLine2}}', template.previewLine2.value);
    exportedText = exportedText.replaceAll('{{contentWidthPixels}}', template.contentWidthPixels.value.toString());
    //width + padding value: 20
    exportedText = exportedText.replaceAll('{{contentWidthPixelsWithPadding}}', (template.contentWidthPixels.value + 20).toString());
    exportedText = exportedText.replaceAll('{{containers}}', template.containers.reduce((containersExportedText, container) => containersExportedText + container.exportedText, ""));
    //calculate css

    let exportedCss: string = "";
    template.containers.forEach(container => {
        container.columns.forEach((column) => {
            exportedCss = `${exportedCss}
                .u-row .u-col-${column.calculatedWidthPixels.toFixed(2).replace(".", "_")} {
                    width: ${column.calculatedWidthPixels}px !important;
                  }`;
        });
    });
    exportedText = exportedText.replaceAll('{{columnStyles}}', exportedCss);
    return exportedText;
}

function exportContainerText(container: IContainer): string {
    let exportedText: string = container.htmlText;
    exportedText = exportedText.replaceAll('{{backgroundColor}}',
        container.backgroundColor.value === "transparent" ? "" : `background-color: ${container.backgroundColor.value};`);
    exportedText = exportedText.replaceAll('{{contentBackgroundColor}}',
        container.contentBackgroundColor.value === "transparent" ? "" : `background-color: ${container.contentBackgroundColor.value};`);
    exportedText = exportedText.replaceAll('{{paddingTopPixels}}', container.paddingTopPixels.value.toString());
    exportedText = exportedText.replaceAll('{{paddingTopPixelsSuffix}}', container.paddingTopPixels.sizeSuffix);
    exportedText = exportedText.replaceAll('{{paddingBottomPixels}}', container.paddingBottomPixels.value.toString());
    exportedText = exportedText.replaceAll('{{paddingBottomPixelsSuffix}}', container.paddingBottomPixels.sizeSuffix);
    exportedText = exportedText.replaceAll('{{calculatedWidthPixels}}', container.calculatedWidthPixels.toString());
    exportedText = exportedText.replaceAll('{{columns}}', container.columns.reduce((columnsExportedText, column) => columnsExportedText + column.exportedText, ""));
    return exportedText;
}

function exportColumnText(column: IColumn): string {
    let exportedText: string = column.htmlText;
    exportedText = exportedText.replaceAll('{{backgroundColor}}',
        column.backgroundColor.value === "transparent" ? "" : `background-color: ${column.backgroundColor.value};`);
    exportedText = exportedText.replaceAll('{{padding}}', column.padding.value.toString());
    exportedText = exportedText.replaceAll('{{paddingSuffix}}', column.padding.sizeSuffix);
    exportedText = exportedText.replaceAll('{{borderWidthPixels}}', column.borderWidthPixels.value.toString());
    exportedText = exportedText.replaceAll('{{borderWidthPixelsSuffix}}', column.borderWidthPixels.sizeSuffix);
    exportedText = exportedText.replaceAll('{{borderColor}}', column.borderColor.value);
    exportedText = exportedText.replaceAll('{{borderType}}', column.borderType.value);
    exportedText = exportedText.replaceAll('{{calculatedWidthPixels}}', column.calculatedWidthPixels.toString());
    exportedText = exportedText.replaceAll('{{calculatedWidthPixelsToFixedString}}', column.calculatedWidthPixels.toFixed(2).replace(".", "_"));
    exportedText = exportedText.replaceAll('{{blocks}}', column.blocks.reduce((blocksExportedText, block) => blocksExportedText + block.exportedText, ""));
    return exportedText;
}

function exportBlockText(block: IBlock): string {
    let exportedText: string = block.htmlText;
    exportedText = exportedText.replaceAll('{{padding}}', block.padding.value.toString());
    exportedText = exportedText.replaceAll('{{paddingSuffix}}', block.padding.sizeSuffix);
    switch (block.type) {
        case "heading":
            const blockHeading = block as IBlockHeading;
            exportedText = exportedText.replaceAll('{{heading}}', blockHeading.heading.value);
            exportedText = exportedText.replaceAll('{{fontFamily}}', blockHeading.fontFamily.value);
            exportedText = exportedText.replaceAll('{{fontSizePixels}}', blockHeading.fontSizePixels.value.toString());
            exportedText = exportedText.replaceAll('{{fontSizePixelsSuffix}}', blockHeading.fontSizePixels.sizeSuffix);
            exportedText = exportedText.replaceAll('{{fontWeight}}', blockHeading.fontWeight.value);
            exportedText = exportedText.replaceAll('{{color}}',
                blockHeading.color.value === "transparent" ? "" : `color: ${blockHeading.color.value};`);
            exportedText = exportedText.replaceAll('{{lineHeightPercent}}', blockHeading.lineHeightPercent.value.toString());
            exportedText = exportedText.replaceAll('{{lineHeightPercentSuffix}}', blockHeading.lineHeightPercent.sizeSuffix);
            //line height pixels added to have extra pixels value due to Outlook
            exportedText = exportedText.replaceAll('{{lineHeightPixels}}', (blockHeading.lineHeightPercent.value * blockHeading.fontSizePixels.value / 100).toString());
            exportedText = exportedText.replaceAll('{{textAlign}}', blockHeading.textAlign.value);
            break;
        case "text":
            const blockText = block as IBlockText;
            exportedText = exportedText.replaceAll('{{text}}', blockText.text.value);
            exportedText = exportedText.replaceAll('{{fontFamily}}', blockText.fontFamily.value);
            exportedText = exportedText.replaceAll('{{fontSizePixels}}', blockText.fontSizePixels.value.toString());
            exportedText = exportedText.replaceAll('{{fontSizePixelsSuffix}}', blockText.fontSizePixels.sizeSuffix);
            exportedText = exportedText.replaceAll('{{fontWeight}}', blockText.fontWeight.value);
            exportedText = exportedText.replaceAll('{{color}}',
                blockText.color.value === "transparent" ? "" : `color: ${blockText.color.value};`);
            exportedText = exportedText.replaceAll('{{lineHeightPercent}}', blockText.lineHeightPercent.value.toString());
            exportedText = exportedText.replaceAll('{{lineHeightPercentSuffix}}', blockText.lineHeightPercent.sizeSuffix);
            //line height pixels added to have extra pixels value due to Outlook
            exportedText = exportedText.replaceAll('{{lineHeightPixels}}', (blockText.lineHeightPercent.value * blockText.fontSizePixels.value / 100).toString());
            exportedText = exportedText.replaceAll('{{textAlign}}', blockText.textAlign.value);
            break;
        case "image":
            const blockImage = block as IBlockImage;
            exportedText = exportedText.replaceAll('{{align}}', blockImage.align.value);
            exportedText = exportedText.replaceAll('{{imageSrc}}', blockImage.imageSrc.value);
            exportedText = exportedText.replaceAll('{{alternateText}}', blockImage.alternateText.value);
            exportedText = exportedText.replaceAll('{{widthPercent}}', blockImage.widthPercent.value.toString());
            exportedText = exportedText.replaceAll('{{widthPercentSuffix}}', blockImage.widthPercent.sizeSuffix);
            exportedText = exportedText.replaceAll('{{widthPixels}}', ((blockImage.calculatedWidthPixels-2*blockImage.padding.value) * blockImage.widthPercent.value / 100).toString());
            break;
        case "html":
            const blockHtml = block as IBlockHtml;
            exportedText = exportedText.replaceAll('{{html}}', blockHtml.html.value);
            exportedText = exportedText.replaceAll('{{fontFamily}}', blockHtml.fontFamily.value);
            exportedText = exportedText.replaceAll('{{fontSizePixels}}', blockHtml.fontSizePixels.value.toString());
            exportedText = exportedText.replaceAll('{{fontSizePixelsSuffix}}', blockHtml.fontSizePixels.sizeSuffix);
            exportedText = exportedText.replaceAll('{{fontWeight}}', blockHtml.fontWeight.value);
            exportedText = exportedText.replaceAll('{{color}}',
                blockHtml.color.value === "transparent" ? "" : `color: ${blockHtml.color.value};`);
            exportedText = exportedText.replaceAll('{{textAlign}}', blockHtml.textAlign.value);
            break;
    }
    return exportedText;
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
                state.template.containers = [...state.template.containers, container];
                updateTemplate(state.template);
            }
        },
        addContainerToIndex: (state, action: PayloadAction<{ container: IContainer; index: number; }>) => {
            if (state.template) {
                const container = JSON.parse(JSON.stringify(action.payload.container)) as IContainer;
                regenerateIDsContainer(container, true, true);
                state.template.containers.splice(action.payload.index, 0, container);
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
                    state.template.containers.splice(index + 1, 0, newContainer);
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
        addBlockToIndex: (state, action: PayloadAction<{ block: IBlock; containerIndex: number, columnIndex: number, blockIndex: number; }>) => {
            if (state.template) {
                const block = JSON.parse(JSON.stringify(action.payload.block)) as IBlock;
                regenerateIDsBlock(block);
                state.template.containers[action.payload.containerIndex].columns[action.payload.columnIndex].blocks.splice(action.payload.blockIndex, 0, block);
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
                state.template.containers = state.template.containers.map(container => {
                    if (container.id === action.payload.containerId) {
                        updateProperty(container, action.payload.propertyKey, action.payload.value);
                    }
                    return container;
                });
                updateTemplate(state.template);
            }
        },
        updateColumnProperty: (state, action: PayloadAction<{ columnId: string, propertyKey: string; value: string; }>) => {
            if (state.template) {
                state.template.containers = state.template.containers.map(container => {
                    return {
                        ...container,
                        columns: container.columns.map((column) => {
                            if (column.id === action.payload.columnId) {
                                updateProperty(column, action.payload.propertyKey, action.payload.value);
                            }
                            return column;
                        })
                    };

                });
                updateTemplate(state.template);
            }
        },
        updateBlockProperty: (state, action: PayloadAction<{ blockId: string, propertyKey: string; value: string; }>) => {
            if (state.template) {
                state.template.containers = state.template.containers.map(container => {
                    return {
                        ...container,
                        columns: container.columns.map(column => {
                            return {
                                ...column,
                                blocks: column.blocks.map(block => {
                                    if (block.id === action.payload.blockId) {
                                        updateProperty(block, action.payload.propertyKey, action.payload.value);
                                    }
                                    return block;
                                })
                            };
                        })
                    };
                });
                updateTemplate(state.template);
            }
        },
    }
});

// Action creators are generated for each case reducer function
export const emailsCurrentEmailActions = emailsCurrentEmailSlice.actions;
export const emailsCurrentEmailReducer = emailsCurrentEmailSlice.reducer;