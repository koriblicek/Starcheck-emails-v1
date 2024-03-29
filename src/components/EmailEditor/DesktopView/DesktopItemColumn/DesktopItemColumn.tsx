import { Fragment } from "react";
import { IColumn } from "../../../../types";
import { DesktopItemEmptyBlock } from "../DesktopItemEmptyBlock";
import { DesktopItemBlock } from "../DesktopItemBlock";
import * as uuid from 'uuid';
import { DropAreaBlock } from "../DropAreaBlock";
import { useAppSelector } from "../../../../store/hooks";

interface IDesktopItemColumnProps {
    column: IColumn;
    containerIndex: number;
    columnIndex: number;
    isContainerSelected: boolean;
}
export function DesktopItemColumn({ column, isContainerSelected, containerIndex, columnIndex }: IDesktopItemColumnProps) {

    const uid = uuid.v4();

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    const columnWidth = editorMobileView ? 320 : column.calculatedWidthPixels;

    const style = `
    .sc-container .sc-column-${uid} { width: ${columnWidth}px !important; }
    `;

    const blocks = column.blocks.map((block, index) => {
        return <DesktopItemBlock block={block} key={block.id} isContainerSelected={isContainerSelected} containerIndex={containerIndex} columnIndex={columnIndex} blockIndex={index + 1} columnPadding={column.paddingLeft.value + column.paddingRight.value} />;
    });

    return (
        <Fragment >
            <style>{style}</style>
            <div className={"sc-column sc-column-" + uid} style={{ maxWidth: '320px', minWidth: columnWidth + "px", display: 'table-cell', verticalAlign: 'top' }} >
                <div style={{ backgroundColor: column.backgroundColor.value, height: '100%', width: '100% !important', borderRadius: '0px', WebkitBorderRadius: '0px', MozBorderRadius: '0px' }}>
                    <div className={`${column.cssMobileClassNames.value}`} style={{ boxSizing: 'border-box', height: '100%', padding: column.paddingTop.value + column.paddingTop.sizeSuffix + " " + column.paddingRight.value + column.paddingRight.sizeSuffix + " " + column.paddingBottom.value + column.paddingBottom.sizeSuffix + " " + column.paddingLeft.value + column.paddingLeft.sizeSuffix, border: column.borderWidthPixels.value + column.borderWidthPixels.sizeSuffix + " " + column.borderType.value + " " + column.borderColor.value, borderRadius: '0px', WebkitBorderRadius: '0px', MozBorderRadius: '0px' }}>
                        {/* Drop Area */}
                        <div style={{ position: 'relative' }}>
                            {isContainerSelected && <DropAreaBlock containerIndex={containerIndex} columnIndex={columnIndex} blockIndex={0} />}
                        </div>

                        {/* ID */}
                        {/* <Box sx={{ fontSize: '9px' }}>{column.id}</Box> */}

                        {/* Blocks */}
                        {blocks}
                        {/* {(column.blocks.length === 0) && <DesktopItemEmptyBlock column={column} />} */}

                        {/* Empty block */}
                        {(column.blocks.length === 0 || isContainerSelected) && <DesktopItemEmptyBlock column={column} />}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
