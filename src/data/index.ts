import { IBlockImage, IColumn, IContainer, ITemplate } from '../types';

//MAIN email template
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
        value: "rgba(255,255,255,255)",
        defaultValue: "rgba(255,255,255,255)",
        active: true,
        required: true,
        label: "background_color"
    },
    textColor: {
        type: "color",
        value: "rgba(0,0,0,255)",
        defaultValue: "rgba(0,0,0,255)",
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

//CONTAINER to be is used as base for all types of containers in app
export const baseContainer: IContainer = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    backgroundColor: {
        type: "color",
        value: "rgba(255,255,255,0)",
        defaultValue: "rgba(255,255,255,0)",
        active: true,
        required: true,
        label: "background_color"
    },
    contentBackgroundColor: {
        type: "color",
        value: "rgba(250,250,250,255)",
        defaultValue: "rgba(0,0,0,0)",
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
    columnsWidthsPercents: {
        type: 'numberArray',
        value: [],
        defaultValue: [],
        min: 0,
        max: 100,
        step: 1,
        active: true,
        required: true,
        label: 'columns_width'
    },
    htmlText: "",
    exportedText: "",
    columns: []
};

//COLUMN to be used as base for all columns in app
export const baseColumn: IColumn = {
    calculatedWidthPixels: 0,
    id: '',
    widthPixels: 0,
    backgroundColor: {
        type: "color",
        value: "rgba(255,255,255,0)",
        defaultValue: "rgba(255,255,255,0)",
        active: true,
        required: true,
        label: "background_color"
    },
    padding: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    borderWidthPixels: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 10,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "border_width"
    },
    borderColor: {
        type: "color",
        value: "rgba(0,0,0,255)",
        defaultValue: "rgba(0,0,0,255)",
        active: true,
        required: true,
        label: "border_color"
    },
    borderType: {
        value: 'solid',
        defaultValue: 'solid',
        options: [{ key: "solid", label: "border_type_solid" }, { key: "dashed", label: "border_type_dashed" }, { key: "dotted", label: "border_type_dotted" }],
        type: 'selection',
        active: true,
        required: true,
        label: 'border_style'
    },
    htmlText: '',
    exportedText: '',
    blocks: []
};

//BLOCKS
export const blockImage: IBlockImage = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'image',
    imageSrc: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "image_source_url"
    },
    widthPercent: {
        type: "size",
        value: 100,
        defaultValue: 100,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "image_width"
    },
    align: {
        value: 'center',
        defaultValue: 'center',
        options: [{ key: "left", label: "align_type_left" }, { key: "center", label: "align_type_center" }, { key: "right", label: "align_type_right" }],
        type: 'selection',
        active: true,
        required: true,
        label: 'align_type'
    },
    alternateText: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "image_alternate_text"
    },
    padding: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    htmlText: '',
    exportedText: ''
};
