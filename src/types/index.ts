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
export interface ITemplate {
    id: string;
    name: string;
    modificationDate: number;
    backgroundColor: string;
    textColor: string;
    widthPixels: number;
    subjectLine: string;
    previewLine1: string;
    previewLine2: string;
    containers: IContainer[];
}
//#endregion

//#region CONTAINER
export interface IContainer extends ISharedProps {
    backgroundColor: string;
    contentBackgroundColor: string;
    backgroundImage: string | null;
    paddingTopPixels: number;
    paddingBottomPixels: number;
    columns: IColumn[];
}
//#endregion

//#region COLUMN
export interface IColumn extends ISharedProps {
    widthPercent: number;
    widthPixels: number;
}
//#endregion

//#region BLOCK
export interface IBlock extends ISharedProps {
}
//#endregion

//#region SHARED PROPS
export interface ISharedProps {
    parentWidth: number;
    id: string;
}
//#endregion

//#endregion

