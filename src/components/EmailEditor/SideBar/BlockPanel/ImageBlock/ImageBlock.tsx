import { Fragment } from "react";
import { IBlockImage } from "../../../../../types";
import { ControlImage } from "../../shared/ControlImage";
import { Divider } from "@mui/material";
import { ControlText } from "../../shared/ControlText";
import { ControlSlider } from "../../shared/ControlSlider";
import { ControlHAlign } from "../../shared/ControlHAlign";
import { emailsCurrentEmailActions } from "../../../../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { ControlSelection } from "../../shared/ControlSelection";

interface IImageBlockProps {
    block: IBlockImage;
}
export function ImageBlock({ block }: IImageBlockProps) {

    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }
    return (
        <Fragment>
            <ControlImage propertyKey={"imageSrc"} data={block.imageSrc} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"alternateText"} data={block.alternateText} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSlider propertyKey={"widthPercent"} data={block.widthPercent} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSlider propertyKey={"widthMobilePercent"} data={block.widthMobilePercent} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"anchor"} data={block.anchor} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSelection propertyKey={"target"} data={block.target} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlHAlign propertyKey={"align"} data={block.align} handleUpdateProperty={updateKey} />
        </Fragment>
    );
}
