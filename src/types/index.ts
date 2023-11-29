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
    imagesURL: string;
    dataURL: string;
    outputURL: string;
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
export interface ITemplate extends ISharedHtml {
    id: string;
    modificationDate: number;
    name: ITextType;
    backgroundColor: IColorType;
    textColor: IColorType;
    contentWidthPixels: ISizeType;
    subjectLine: ITextType;
    previewLine1: ITextType;
    previewLine2: ITextType;
    containers: IContainer[];
}
//#endregion

//#region CONTAINER
export interface IContainer extends ISharedProps, ISharedHtml {
    logo: string;
    backgroundColor: IColorType;
    contentBackgroundColor: IColorType;
    backgroundImage: string | null;
    paddingTopPixels: ISizeType;
    paddingBottomPixels: ISizeType;
    columns: IColumn[];
}
//#endregion

//#region COLUMN
export interface IColumn extends ISharedProps, ISharedHtml {
    widthPercent: number;
    widthPixels: number;
}
//#endregion

//#region BLOCK
export interface IBlock extends ISharedProps, ISharedHtml {
}
//#endregion

//#region SHARED PROPS
export interface ISharedProps {
    parentWidthPixels: number;
    id: string;
}
export interface ISharedHtml {
    htmlText: string;
    exportedText: string;
}
//#endregion

export interface ITextType extends IPropertyBase {
    value: string;
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

export type TPropertyIdentifiers = "color" | "size" | "text";
export type TPropertyTypes = IColorType | ISizeType | ITextType;

export interface IProperty {
    [name: string]: TPropertyTypes;
}

//#endregion

