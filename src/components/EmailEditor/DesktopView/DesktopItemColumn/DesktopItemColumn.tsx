import { Fragment } from "react";
import { IColumn } from "../../../../types";
import { DesktopItemEmptyBlock } from "../DesktopItemEmptyBlock";
import * as uuid from 'uuid';
import { Box } from "@mui/material";

interface IDesktopItemColumnProps {
    column: IColumn;
}

export function DesktopItemColumn({ column }: IDesktopItemColumnProps) {

    const addBlock = <DesktopItemEmptyBlock />;
    const uid = uuid.v4();
    const style = `
    .u-row .u-col-${uid} {
        width: ${column.calculatedWidthPixels}px !important;
      }
    `;
    return (
        <Fragment >
            <style>{style}</style>
            <div className={"u-col u-col-" + uid} style={{ maxWidth: '320px', minWidth: column.calculatedWidthPixels + "px", display: 'table-cell', verticalAlign: 'top' }} >
                <div style={{ backgroundColor: column.backgroundColor.value, height: '100%', width: '100% !important', borderRadius: '0px', WebkitBorderRadius: '0px', MozBorderRadius: '0px' }}>
                    <div style={{ boxSizing: 'border-box', height: '100%', padding: column.padding.value + column.padding.sizeSuffix, border: column.borderWidthPixels.value + column.borderWidthPixels.sizeSuffix + " " + column.borderType.value + " " + column.borderColor.value, borderRadius: '0px', WebkitBorderRadius: '0px', MozBorderRadius: '0px' }}>
                        <Box sx={{fontSize:'9px'}}>{column.id}</Box>
                        {column.blocks.length === 0 && addBlock}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}