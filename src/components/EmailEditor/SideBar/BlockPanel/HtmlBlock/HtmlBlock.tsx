import { Fragment } from "react";
import { IBlockHtml } from "../../../../../types";
import { Divider } from "@mui/material";
import { ControlText } from "../../shared/ControlText";
import { emailsCurrentEmailActions } from "../../../../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { ControlSize } from "../../shared/ControlSize";
import { ControlSelection } from "../../shared/ControlSelection";
import { ControlColor } from "../../shared/ControlColor";
import { ControlTAlign } from "../../shared/ControlTAlign";
import { ControlMultilineText } from "../../shared/ControlMultilineText";

interface IHtmlBlockProps {
    block: IBlockHtml;
}
export function HtmlBlock({ block }: IHtmlBlockProps) {

    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

    return (
        <Fragment>
            <ControlMultilineText propertyKey={"html"} data={block.html} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"fontFamily"} data={block.fontFamily} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey={"fontSizePixels"} data={block.fontSizePixels} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey={"lineHeightPercent"} data={block.lineHeightPercent} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSelection propertyKey={"fontWeight"} data={block.fontWeight} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlColor propertyKey={"color"} data={block.color} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlTAlign propertyKey={"textAlign"} data={block.textAlign} handleUpdateProperty={updateKey} />
        </Fragment>
    );
}
