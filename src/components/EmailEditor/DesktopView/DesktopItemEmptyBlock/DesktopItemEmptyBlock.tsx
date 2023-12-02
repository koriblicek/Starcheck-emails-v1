import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { IColumn } from "../../../../types";
import { blockImage } from "../../../../data";
import { useTranslation } from "react-i18next";

interface IDesktopItemEmptyBlockProps {
    column: IColumn;
}
export function DesktopItemEmptyBlock({ column }: IDesktopItemEmptyBlockProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();
    return (
        <Grid container justifyContent='center' alignContent='center'>
            <Grid item>
                <Button size="small" variant="outlined" sx={{ m: 1 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        //TODO change from image to menu
                        dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockImage) }));
                    }}
                >{t('button.add_block')}</Button>
            </Grid>
        </Grid>
    );
}
