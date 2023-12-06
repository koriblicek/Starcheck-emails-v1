import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../../store/hooks";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { BlockItem } from "./BlockItem";

export function BlocksList() {

    const { builtinBlocks } = useAppSelector(state => state.emailsData);

    const { t } = useTranslation();

    const items = builtinBlocks.map((block, index) => {
        return <Grid item key={block.id + "_" + index} xs><BlockItem block={block} /></Grid>;
    });

    return (
        <Fragment>
            <Grid container columnGap={1} rowGap={1}>
                {items}
            </Grid>
            {items.length === 0 &&
                <Alert variant="standard" color="error">
                    <AlertTitle>{t('message.error')}</AlertTitle>
                    <Typography variant="body1">{t('message.noBuiltinBlock')}</Typography>
                </Alert>
            }
        </Fragment>
    );
}

