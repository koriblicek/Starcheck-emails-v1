import { AppBar, Box,  Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useAppSelector } from "../../store/hooks";
import { DeviceSelector } from "./DeviceSelector";
import { emailsCurrentEmailActions } from "../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SaveManager } from "./SaveManager";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export function EmailAppBar() {

    const dispatch = useDispatch();
    
    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    const { t } = useTranslation();
    
    return (
        <AppBar position="static" sx={{ p: 1 }}>
            <Toolbar disableGutters>
                {template &&
                    <Box sx={{ p: 2, flexFlow: 0 }}>
                        <IconButton size="large" color="inherit"
                            onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }))}
                            title={t('button.discardSaveTemplate')}
                        >
                            <ArrowBackOutlinedIcon />
                        </IconButton>
                    </Box>
                }
                <Box sx={{ p: 2, flexFlow: 0 }}>
                    <EmailOutlinedIcon fontSize="large" sx={{ pl: 2 }} />
                </Box>
                <Box sx={{ p: 2, flexFlow: 0 }}>
                    <Typography variant="h6" component="i" >EMAILS API</Typography>
                </Box>
                <Grid container columnGap={1} justifyContent='end' alignItems='center'>
                    {template &&
                        <Fragment>
                            <DeviceSelector />
                            <SaveManager template={template} />
                        </Fragment>
                    }
                </Grid>
                <Box sx={{ p: 1 }}>
                    <LanguageSelector />
                </Box>
                <Box sx={{ p: 1 }}>

                </Box>
            </Toolbar>
        </AppBar>
    );
}
