import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useAppSelector } from "../../store/hooks";

import { DeviceSelector } from "./DeviceSelector";
import { SaveManager } from "./SaveManager";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export function EmailAppBar() {

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
                            <DeviceSelector />
                            <SaveManager template={template} />
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
