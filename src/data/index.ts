import { IContainer, ITemplate } from '../types';

export const emptyTemplate: ITemplate = {
    id: '',
    modificationDate: 0,
    name: {
        type: "text",
        value: "Empty template",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_name"
    },
    backgroundColor: {
        type: "color",
        value: "#ffffff",
        defaultValue: "transparent",
        active: true,
        required: true,
        label: "background_color"
    },
    textColor: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "text_color"
    },
    contentWidthPixels: {
        type: "size",
        value: 600,
        defaultValue: 650,
        max: 800,
        min: 400,
        step: 10,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "content_width"
    },
    subjectLine: {
        type: "text",
        value: "subject line",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_subject_line"
    },
    previewLine1: {
        type: "text",
        value: "preview line 1",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_preview_line_1"
    },
    previewLine2: {
        type: "text",
        value: "preview line 2",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_preview_line_2"
    },
    htmlText: "",
    exportedText: "",
    containers: []
};

//This container is used to display in app
export const emptyContainer: IContainer = {
    parentWidthPixels: 600,
    id: '',
    logo: '',
    backgroundColor: {
        type: "color",
        value: "transparent",
        defaultValue: "transparent",
        active: true,
        required: true,
        label: "background_color"
    },
    contentBackgroundColor: {
        type: "color",
        value: "#f5f5f5",
        defaultValue: "transparent",
        active: true,
        required: true,
        label: "content_background_color"
    },
    backgroundImage: null,
    paddingTopPixels: {
        type: "size",
        value: 10,
        defaultValue: 10,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingBottomPixels: {
        type: "size",
        value: 10,
        defaultValue: 10,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: "",
    exportedText: "",
    columns: []
};