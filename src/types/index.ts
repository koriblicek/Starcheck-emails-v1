export const APP_NAME = "APIEMAILS";
export const APP_LANGUAGES = ["sk", "en"];
export const APP_MIN_WIDTH = '900px';
//#region APP
//Input data via div/scriptst
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
    dataVersion: string;
}

//Settings from API
export interface IAppData {
    dataURL: string;
    emailAdressTest: string;
    imagesURL: string;
    outputURL: string;
    previewURL: string;
}

//Error object
export interface IErrorObject {
    code: string;
    codeText: string;
    url: string;
}
//#endregion

//#region EMAIL DATA


//#region TEMPLATE
export interface ICustomTemplates {
    [id: string]: ITemplate;
}
export interface ITemplate extends ISharedHtml {
    id: string;
    modificationDate: number;
    name: ITextType;
    backgroundColor: IColorType;
    textColor: IColorType;
    contentWidthPixels: ISizeType;
    previewEmailAddresses: ITextType;
    subjectLine: ITextType;
    previewLine1: ITextType;
    previewLine2: ITextType;
    containers: IContainer[];
    mobileCss: IMultilineTextType;
}
//#endregion

//#region CONTAINER
export interface IContainer extends ISharedProps, ISharedHtml {
    logo: string;
    backgroundColor: IColorType;
    contentBackgroundColor: IColorType;
    paddingTopPixels: ISizeType;
    paddingBottomPixels: ISizeType;
    columnsWidthsPercents: INumberArrayType;
    columns: IColumn[];
}
//#endregion

//#region COLUMN
export interface IColumn extends ISharedProps, ISharedHtml {
    widthPixels: number;
    backgroundColor: IColorType;
    paddingTop: ISizeType;
    paddingLeft: ISizeType;
    paddingRight: ISizeType;
    paddingBottom: ISizeType;
    cssMobileClassNames: ITextType;
    borderWidthPixels: ISizeType;
    borderColor: IColorType;
    borderType: ISelectionType;
    blocks: IBlock[];
}
//#endregion

//#region BLOCK
export interface IBlockButton extends IBlock {
    buttonText: ITextType;
    anchor: ITextType;
    target: ISelectionType;
    fontFamily: ITextType;
    fontSizePixels: ISizeType;
    fontWeight: ISelectionType;
    color: IColorType;
    backgroundColor: IColorType;
    align: IHAlign;
    widthPixels: ISizeType;
    heightPixels: ISizeType;
    borderRadius: ISizeType;
}

export interface IBlockHtml extends IBlock {
    html: IMultilineTextType;
    fontFamily: ITextType;
    fontSizePixels: ISizeType;
    lineHeightPercent: ISizeType;
    fontWeight: ISelectionType;
    color: IColorType;
    textAlign: ITAlign;
}

export interface IBlockHeading extends IBlock {
    heading: IMultilineTextType;
    fontFamily: ITextType;
    fontSizePixels: ISizeType;
    lineHeightPercent: ISizeType;
    fontWeight: ISelectionType;
    color: IColorType;
    textAlign: ITAlign;
}

export interface IBlockText extends IBlock {
    text: IMultilineTextType;
    fontFamily: ITextType;
    fontSizePixels: ISizeType;
    lineHeightPercent: ISizeType;
    fontWeight: ISelectionType;
    color: IColorType;
    textAlign: ITAlign;
}

export interface IBlockImage extends IBlock {
    imageSrc: IImageType;
    widthPercent: ISizeType;
    widthMobilePercent: ISizeType;
    anchor: ITextType;
    target: ISelectionType;
    align: IHAlign;
    alternateText: ITextType;
}

export interface IBlockDivider extends IBlock {
    widthPercent: ISizeType;
    lineWidthPixels: ISizeType;
    lineColor: IColorType;
    lineType: ISelectionType;
    align: IHAlign;
}

export interface IBlock extends ISharedProps, ISharedHtml {
    logo: string;
    type: TBlockIdentifiers;
    paddingTop: ISizeType;
    paddingLeftRight: ISizeType;
    paddingBottom: ISizeType;
}
//#endregion

//#region SHARED PROPS
export interface ISharedProps {
    calculatedWidthPixels: number;
    id: string;
}
export interface ISharedHtml {
    htmlText: string;
    exportedText: string;
}
//#endregion

export interface ITAlign extends IPropertyBase {
    value: TTAlign;
    defaultValue: TTAlign;
}

export interface IHAlign extends IPropertyBase {
    value: THAlign;
    defaultValue: THAlign;
}

export interface IImageType extends IPropertyBase {
    value: string;
    defaultValue: string;
};

export interface INumberArrayType extends IPropertyBase {
    value: number[];
    defaultValue: number[];
    max: number;
    min: number;
    step: number;
    typeSuffix: string;
}

export interface ISelectionType extends IPropertyBase {
    value: string;
    defaultValue: string;
    options: ISelectionTypeOptions[];
}
export interface ISelectionTypeOptions {
    key: string;
    label: string;
}

export interface ITextType extends IPropertyBase {
    value: string;
    defaultValue: string;
};

export interface IMultilineTextType extends IPropertyBase {
    value: string;
    rows: number;
    defaultValue: string;
};

export interface IColorType extends IPropertyBase {
    value: string;
    defaultValue: string;
};

export interface ISizeType extends IPropertyBase {
    value: number;
    defaultValue: number;
    max: number;
    min: number;
    step: number;
    sizeSuffix: string;
};

export interface IPropertyBase {
    type: TPropertyIdentifiers; //property identifier
    active: boolean; //is property exposed for edit
    required: boolean; //is property required
    label: string; //property label
};

export type TBlockIdentifiers = "image" | "heading" | "text" | "html" | "divider" | "button";

export type TPropertyIdentifiers = "color" | "size" | "text" | "multilineText" | "selection" | "numberArray" | "image" | "hAlign" | "tAlign";
export type TPropertyTypes = IColorType | ISizeType | ITextType | IMultilineTextType | INumberArrayType | ISelectionType | IImageType | IHAlign | ITAlign;
export type THAlign = "left" | "center" | "right";
export type TTAlign = "left" | "center" | "right" | "justify";
export interface IProperty {
    [name: string]: TPropertyTypes;
}

//#endregion

