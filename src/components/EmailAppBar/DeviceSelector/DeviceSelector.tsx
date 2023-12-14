import { Fab, Grid } from "@mui/material";
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { useDispatch } from "react-redux";
import { emailsAppActions } from "../../../store/emails-data/emailsAppSlice";
import { useAppSelector } from "../../../store/hooks";
import { useTranslation } from "react-i18next";

export function DeviceSelector() {
    
    const dispatch = useDispatch();

    const { t } = useTranslation();
    
    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    return (
        <Grid item xs>

            <Grid container columnGap={1}>
                <Grid item>
                    <Fab color="info" size="medium"
                        disabled={!editorMobileView}
                        onClick={() => dispatch(emailsAppActions.setMobileView({ active: false }))}
                        title={t('button.desktop')}
                    >
                        <ComputerOutlinedIcon fontSize="medium" />
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab color="info" size="medium"
                        disabled={editorMobileView}
                        onClick={() => dispatch(emailsAppActions.setMobileView({ active: true }))}
                        title={t('button.mobile')}
                    >
                        <PhoneAndroidOutlinedIcon fontSize="medium" />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>

    );
}
