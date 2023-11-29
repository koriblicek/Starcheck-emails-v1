import { Fragment } from "react";
import { useAppSelector } from "../../../../../store/hooks";
import { ContainerItem } from "./ContainerItem";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function ContainersList() {
    const { builtinContainers } = useAppSelector(state => state.emailsData);

    const { t } = useTranslation();

    const items = builtinContainers.map(container => {
        return <Grid item key={container.id} ><ContainerItem container={container} /></Grid>;
    });

    return (
        <Fragment>
            <Grid container columnGap={1} rowGap={1}>
                {items}
            </Grid>
            {items.length === 0 &&
                <Alert variant="standard" color="error">
                    <AlertTitle>{t('message.error')}</AlertTitle>
                    <Typography variant="body1">{t('message.noBuiltinContainers')}</Typography>
                </Alert>
            }
        </Fragment>
    );
}
