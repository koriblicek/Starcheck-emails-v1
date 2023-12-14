import { IBlockButton } from "../../../../../types";
import { ControlText } from "../../shared/ControlText";
import { emailsCurrentEmailActions } from "../../../../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { ControlSize } from "../../shared/ControlSize";
import { ControlSelection } from "../../shared/ControlSelection";
import { ControlColor } from "../../shared/ControlColor";
import { Fragment } from "react";
import { Divider } from "@mui/material";
import { ControlHAlign } from "../../shared/ControlHAlign";

interface IButtonBlockProps {
    block: IBlockButton;
}
export function ButtonBlock({ block }: IButtonBlockProps) {

    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

    return (
        <Fragment>
            <ControlText propertyKey={"buttonText"} data={block.buttonText} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"anchor"} data={block.anchor} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlSelection propertyKey={"target"} data={block.target} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"fontFamily"} data={block.fontFamily} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey={"fontSizePixels"} data={block.fontSizePixels} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlSelection propertyKey={"fontWeight"} data={block.fontWeight} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlColor propertyKey={"color"} data={block.color} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlColor propertyKey={"backgroundColor"} data={block.backgroundColor} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlHAlign propertyKey={"align"} data={block.align} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey={"widthPixels"} data={block.widthPixels} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey={"heightPixels"} data={block.heightPixels} handleUpdateProperty={updateKey} />
            <Divider light sx={{ mt: 1, mb:1 }} />
            <ControlSize propertyKey="borderRadius" data={block.borderRadius} handleUpdateProperty={updateKey} />
        </Fragment>
    );
}