import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import { Alert, Chip, CircularProgress, Divider, Grid } from "@mui/material";
import { ICustomTemplates } from "../../types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { emailsDataActions } from "../../store/emails-data/emailsDataSlice";
import { EmailTemplatesCategory } from "./EmailTemplatesCategory";
import useGetFromAPI from "../../hooks/useGetFromAPI";

export function EmailTemplatesView() {

    const dispatch = useDispatch();

    const { urls } = useAppSelector(state => state.emailsSettings);

    const { data, error, isLoading } = useGetFromAPI<ICustomTemplates>(urls.dataURL + "/customTemplates");

    const [showCustomTemplates, setShowCustomTemplates] = useState<boolean>(false);

    const builtinTemplates = useAppSelector(state => state.emailsData.builtinTemplates);
    const customTemplates = useAppSelector(state => state.emailsData.customTemplates);

    useEffect(() => {
        if (data) {
            dispatch(emailsDataActions.initCustomTemplates({ templates: data }));
            setShowCustomTemplates(true);
        }
    }, [data, dispatch]);

    const { t } = useTranslation();

    return (
        <Grid container rowSpacing={2} spacing={2} justifyContent="center" pt={1}>
            <Grid item xs={12} >
                <Divider><Chip label={t('title.builtinTemplates')} size="small" /></Divider>
            </Grid>
            <EmailTemplatesCategory templates={builtinTemplates} isCustomTemplate={false} errorMessage={t('message.noBuiltinTemplates')} />
            <Grid item xs={12} >
                <Divider><Chip label={t('title.customTemplates')} size="small" /></Divider>
            </Grid>
            {/* is loading or data and error is null - to prevent showing no custom templates message*/}
            {(isLoading || (data === null && error === null))
                ?
                // loading progress 
                <Grid item>
                    <CircularProgress />
                </Grid>
                :
                // is error?
                error
                    ?
                    //error
                    <Grid item>
                        <Alert variant="standard" color="error">{t('message.customTemplatesLoadingError')}</Alert>
                    </Grid>
                    :
                    // something loaded?
                    showCustomTemplates && <EmailTemplatesCategory templates={customTemplates} isCustomTemplate={true} errorMessage={t('message.noCustomTemplates')} />
            }
        </Grid>
    );
}
