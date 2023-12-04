import { IBlockHeading, IBlockImage, IBlockText, IColumn, IContainer, ITemplate } from '../types';

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
export const blockHeading: IBlockHeading = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'heading',
    heading: {
        type:"text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "heading"
    },
    fontFamily: {
        type: "text",
        value: "Segoe UI",
        defaultValue: "Segoe UI",
        active: true,
        required: true,
        label: "font_family"
    },
    fontSizePixels: {
        type: "size",
        value: 20,
        defaultValue: 20,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
    },
    lineHeightPercent: {
        type: "size",
        value: 140,
        defaultValue: 100,
        max: 1000,
        min: 0,
        step: 10,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "line_height"
    },
    fontWeight: {
        value: '800',
        defaultValue: '800',
        options: [
            { key: "100", label: "control_font_weight_100" },
            { key: "200", label: "control_font_weight_200" },
            { key: "300", label: "control_font_weight_300" },
            { key: "400", label: "control_font_weight_400" },
            { key: "500", label: "control_font_weight_500" },
            { key: "600", label: "control_font_weight_600" },
            { key: "700", label: "control_font_weight_700" },
            { key: "800", label: "control_font_weight_800" },
            { key: "900", label: "control_font_weight_900" },
            { key: "950", label: "control_font_weight_950" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'font_weight'
    },
    color: {
        type: "color",
        value: "rgba(0,0,0,255)",
        defaultValue: "rgba(0,0,0,255)",
        active: true,
        required: true,
        label: "text_color"
    },
    textAlign: {
        value: 'left',
        defaultValue: 'left',
        type: 'tAlign',
        active: true,
        required: true,
        label: 'text_align'
    },
    padding: {
        type: "size",
        value: 2,
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
export const blockText: IBlockText = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'text',
    text: {
        type: "multilineText",
        rows: 3,
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "text"
    },
    fontFamily: {
        type: "text",
        value: "Segoe UI",
        defaultValue: "Segoe UI",
        active: true,
        required: true,
        label: "font_family"
    },
    fontSizePixels: {
        type: "size",
        value: 12,
        defaultValue: 12,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
    },
    lineHeightPercent: {
        type: "size",
        value: 130,
        defaultValue: 100,
        max: 1000,
        min: 0,
        step: 10,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "line_height"
    },
    fontWeight: {
        value: '400',
        defaultValue: '400',
        options: [
            { key: "100", label: "control_font_weight_100" },
            { key: "200", label: "control_font_weight_200" },
            { key: "300", label: "control_font_weight_300" },
            { key: "400", label: "control_font_weight_400" },
            { key: "500", label: "control_font_weight_500" },
            { key: "600", label: "control_font_weight_600" },
            { key: "700", label: "control_font_weight_700" },
            { key: "800", label: "control_font_weight_800" },
            { key: "900", label: "control_font_weight_900" },
            { key: "950", label: "control_font_weight_950" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'font_weight'
    },
    color: {
        type: "color",
        value: "rgba(0,0,0,255)",
        defaultValue: "rgba(0,0,0,255)",
        active: true,
        required: true,
        label: "text_color"
    },
    textAlign: {
        value: 'left',
        defaultValue: 'left',
        type: 'tAlign',
        active: true,
        required: true,
        label: 'text_align'
    },
    padding: {
        type: "size",
        value: 2,
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
export const blockImage: IBlockImage = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'image',
    imageSrc: {
        type: "image",
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
        type: 'hAlign',
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
