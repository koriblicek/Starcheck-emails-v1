import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import { EmailTemplateItem } from "./EmailTemplateItem";
import { Alert, Chip, CircularProgress, Divider, Grid } from "@mui/material";
import { ITemplate } from "../../types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emailsDataActions } from "../../store/debuilder-data/emailsDataSlice";
import useGetFromAPI from "../../hooks/useGetFromAPI";

export function EmailTemplatesView() {

    const dispatch = useDispatch();

    const { urls } = useAppSelector(state => state.emailsSettings);

    const { data, error, isLoading } = useGetFromAPI<ITemplate[]>(urls.dataURL + "/customTemplates");

    useEffect(() => {
        if (data) {
            dispatch(emailsDataActions.initCustomTemplates({ templates: data }));
        }
    }, [data, dispatch]);

    const { builtinTemplates, customTemplates } = useAppSelector(state => state.emailsData);

    const { t } = useTranslation();

    const bt = builtinTemplates.map((template) => {
        return (<Grid item key={template.id}><EmailTemplateItem template={template} isCustomTemplate={false} /></Grid>);
    });
    const ct = Object.values(customTemplates).map((value) => {
        return (<Grid item key={value.id}><EmailTemplateItem template={value} isCustomTemplate={true} /></Grid>);
    });
    // const ct = customTemplates.map((template) => {
    //     return (<Grid item key={template.id}><EmailTemplateItem template={template} isCustomTemplate={true} /></Grid>);
    // });

    return (
        <Grid container rowSpacing={2} spacing={2} justifyContent="center" pt={1}>
            <Grid item xs={12} >
                <Divider ><Chip label={t('title.builtinTemplates')} size="small" /></Divider>
            </Grid>
            {(bt.length !== 0) ? bt : <Grid item><Alert variant="standard" color="info">{t('message.noBuiltinTemplates')}</Alert></Grid>}
            <Grid item xs={12} >
                <Divider ><Chip label={t('title.customTemplates')} size="small" /></Divider>
            </Grid>
            {isLoading
                ?
                <Grid item><CircularProgress /></Grid>
                :
                error
                    ?
                    <Grid item><Alert variant="standard" color="error">{t('message.customTemplatesLoadingError')}</Alert></Grid>
                    :
                    (ct.length !== 0) ? ct : <Grid item><Alert variant="standard" color="info">{t('message.noCustomTemplates')}</Alert></Grid>
            }

        </Grid>
    );
}
