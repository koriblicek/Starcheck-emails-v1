import { Grid, IconButton } from "@mui/material";
import { IColumn } from "../../../../types";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { AddBlockMenu } from "../AddBlockMenu";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

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
                    <IconButton color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                        }}
                        title={t('button.add_block')}
                    >
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
            <AddBlockMenu anchorEl={anchorEl} column={column} handleAnchorClear={clearAnchorEl} />
        </Fragment>
    );
}
