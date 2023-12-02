import { Box, Divider } from "@mui/material";
import { IColumn } from "../../../../../../types";
import { ControlColor } from "../../../shared/ControlColor";
import { useDispatch } from "react-redux";
import { ControlSize } from "../../../shared/ControlSize";
import { emailsCurrentEmailActions } from "../../../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { ControlSelection } from "../../../shared/ControlSelection";

interface IColumnPanelProps {
    column: IColumn;
}
export function ColumnPanel({ column}: IColumnPanelProps) {
    
    const dispatch = useDispatch();
    
    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateColumnProperty({ columnId: column.id, propertyKey: propertyKey, value }));
    }
    
    return (
        <Box sx={{ p: 1 }}>
            <ControlColor propertyKey="backgroundColor" data={column.backgroundColor} handleUpdateProperty={updateKey}/>
            <Divider light sx={{ m: 1 }} />
            <ControlSize propertyKey="padding" data={column.padding} handleUpdateProperty={updateKey} />
            <Divider light sx={{ m: 1 }} />
            <ControlSize propertyKey="borderWidthPixels" data={column.borderWidthPixels} handleUpdateProperty={updateKey} />
            <Divider light sx={{ m: 1 }} />
            <ControlColor propertyKey="borderColor" data={column.borderColor} handleUpdateProperty={updateKey} />
            <Divider light sx={{ m: 1 }} />
            <ControlSelection propertyKey="borderType" data={column.borderType} handleUpdateProperty={updateKey} />
        </Box>

    );
}
