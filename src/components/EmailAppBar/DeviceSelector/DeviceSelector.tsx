import { Fab, Grid } from "@mui/material";
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { useDispatch } from "react-redux";
import { emailsAppActions } from "../../../store/debuilder-data/emailsAppSlice";
import {  useAppSelector } from "../../../store/hooks";

export function DeviceSelector() {
    const dispatch = useDispatch();

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    return (
        <Grid container columnGap={1}>
            <Grid item>
                <Fab color="info" size="medium"
                    disabled={!editorMobileView}
                    onClick={() => dispatch(emailsAppActions.setMobileView({ active: false }))}
                >
                    <ComputerOutlinedIcon fontSize="medium" />
                </Fab>
            </Grid>
            <Grid item>
                <Fab color="info" size="medium"
                    disabled={editorMobileView}
                    onClick={() => dispatch(emailsAppActions.setMobileView({ active: true }))}
                >
                    <PhoneAndroidOutlinedIcon fontSize="medium" />
                </Fab>
            </Grid>
        </Grid>
    );
}
