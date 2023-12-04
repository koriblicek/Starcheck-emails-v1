import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { IColumn } from "../../../../types";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { AddBlockMenu } from "../AddBlockMenu";

interface IDesktopItemEmptyBlockProps {
    column: IColumn;
}

export function DesktopItemEmptyBlock({ column }: IDesktopItemEmptyBlockProps) {

    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    //clicked add button
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //clear anchor
    function clearAnchorEl() {
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <Grid container justifyContent='center' alignContent='center'>
                <Grid item>
                    <Button size="small" variant="outlined" sx={{ m: 1 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                        }}
                    >{t('button.add_block')}</Button>
                </Grid>
            </Grid>
            <AddBlockMenu anchorEl={anchorEl} column={column} handleAnchorClear={clearAnchorEl} />
        </Fragment>
    );
}
