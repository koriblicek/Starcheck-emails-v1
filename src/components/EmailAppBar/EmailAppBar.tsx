import { AppBar, Box,  Fab, Grid, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { emailsCurrentEmailActions } from "../../store/debuilder-data/emailsCurrentEmailSlice";
import { SaveEmailBackdrop } from "./SaveEmailBackdrop";
import { DeviceSelector } from "./DeviceSelector";

export function EmailAppBar() {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    return (
        <AppBar position="static" sx={{ p: 1 }}>
            <Toolbar disableGutters>
                <Box sx={{ p: 2, flexFlow: 0 }}>
                    <EmailOutlinedIcon fontSize="large" sx={{ pl: 2 }} />
                </Box>
                <Box sx={{ p: 2, flexFlow: 0 }}>
                    <Typography variant="h6" component="i" >EMAILS API</Typography>
                </Box>
                <Grid container columnGap={1} justifyContent='end' alignItems='center'>
                    {template &&
                        <Fragment>
                            <Grid item xs>
                                <DeviceSelector />
                            </Grid>
                            <Grid item>
                                <Fab size="medium" color="info" variant="extended"
                                   onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }))}
                                >
                                    <HighlightOffOutlinedIcon sx={{ pr: 1 }} />
                                    {t('button.discardSaveAndCloseTemplate')}
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab size="medium" color="warning" variant="extended"
                                   onClick={() => dispatch(emailsCurrentEmailActions.saveTemplate())}
                                >
                                    <SaveAltOutlinedIcon sx={{ pr: 1 }} />
                                    {t('button.confirmSaveAndCloseTemplate')}
                                </Fab>
                            </Grid>
                            <SaveEmailBackdrop />
                        </Fragment>
                    }
                </Grid>
                <Box sx={{ p: 1 }}>
                    <LanguageSelector />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
