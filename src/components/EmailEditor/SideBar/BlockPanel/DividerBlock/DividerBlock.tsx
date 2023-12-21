import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../../store/emails-data/emailsCurrentEmailSlice";
import { IBlockDivider } from "../../../../../types";
import { Fragment } from "react";
import { ControlSlider } from "../../shared/ControlSlider";
import { Divider } from "@mui/material";
import { ControlHAlign } from "../../shared/ControlHAlign";
import { ControlSize } from "../../shared/ControlSize";
import { ControlColor } from "../../shared/ControlColor";
import { ControlSelection } from "../../shared/ControlSelection";

export interface IDividerBlockProps {
    block: IBlockDivider;
}

export function DividerBlock({ block }: IDividerBlockProps) {
    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

    return (
        <Fragment>
            <ControlSlider propertyKey={"widthPercent"} data={block.widthPercent} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey="lineWidthPixels" data={block.lineWidthPixels} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlColor propertyKey="lineColor" data={block.lineColor} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSelection propertyKey="lineType" data={block.lineType} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlHAlign propertyKey={"align"} data={block.align} handleUpdateProperty={updateKey} />
        </Fragment>
    );
}
