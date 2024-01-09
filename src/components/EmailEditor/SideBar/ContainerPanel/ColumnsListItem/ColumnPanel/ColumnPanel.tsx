import { Box, Divider } from "@mui/material";
import { IColumn } from "../../../../../../types";
import { ControlColor } from "../../../shared/ControlColor";
import { useDispatch } from "react-redux";
import { ControlSize } from "../../../shared/ControlSize";
import { emailsCurrentEmailActions } from "../../../../../../store/emails-data/emailsCurrentEmailSlice";
import { ControlText } from "../../../shared/ControlText";

interface IColumnPanelProps {
    column: IColumn;
}
export function ColumnPanel({ column }: IColumnPanelProps) {

    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateColumnProperty({ columnId: column.id, propertyKey: propertyKey, value }));
    }

    return (
        <Box sx={{ p: 1 }}>
            <ControlColor propertyKey="backgroundColor" data={column.backgroundColor} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey="paddingTop" data={column.paddingTop} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey="paddingLeft" data={column.paddingLeft} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey="paddingRight" data={column.paddingRight} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlSize propertyKey="paddingBottom" data={column.paddingBottom} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ControlText propertyKey={"cssMobileClassNames"} data={column.cssMobileClassNames} handleUpdateProperty={updateKey} />
            {/* Border removed as it makes unexpected results on Outlook */}
            {/* <Divider sx={{ mt: 1, mb:1 }} />
            <ControlSize propertyKey="borderWidthPixels" data={column.borderWidthPixels} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb:1 }} />
            <ControlColor propertyKey="borderColor" data={column.borderColor} handleUpdateProperty={updateKey} />
            <Divider sx={{ mt: 1, mb:1 }} />
            <ControlSelection propertyKey="borderType" data={column.borderType} handleUpdateProperty={updateKey} /> */}
        </Box>

    );
}
