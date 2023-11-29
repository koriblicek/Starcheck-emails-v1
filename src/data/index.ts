import { IContainer, ITemplate } from '../types';
import * as uuid from 'uuid';

export const emptyTemplate: ITemplate = {
    id: uuid.v4(),
    backgroundColor: "transparent",
    textColor: "#000000",
    widthPixels: 600,
    name: "Empty Template",
    subjectLine: "subject line",
    previewLine1: "preview line 1",
    previewLine2: "preview line 2",
    containers: [],
    modificationDate: 0
};

export const singleContainer: IContainer = {
    parentWidth: 600,
    id: 'uuid.v4()',
    backgroundColor: "transparent",
    contentBackgroundColor: "transparent",
    backgroundImage: null,
    paddingTopPixels: 0,
    paddingBottomPixels: 0,
    columns: []
};