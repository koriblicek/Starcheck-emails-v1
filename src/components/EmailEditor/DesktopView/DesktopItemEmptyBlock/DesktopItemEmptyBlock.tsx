import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { IColumn } from "../../../../types";
import { blockImage } from "../../../../data";

interface IDesktopItemEmptyBlockProps {
    column: IColumn;
}
export function DesktopItemEmptyBlock({ column }: IDesktopItemEmptyBlockProps) {

    const dispatch = useDispatch();
    
    return (
        <Grid container justifyContent='center' alignContent='center'>
            <Grid item>
                <Button size="small" variant="outlined" sx={{ m: 1 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        //TODO change from image to menu
                        dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockImage) }));
                    }}
                >Add Block</Button>
            </Grid>
        </Grid>
    );
}
