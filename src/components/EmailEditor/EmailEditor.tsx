import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { DesktopView } from "./DesktopView/DesktopView";
import { SideBar } from "./SideBar";

export function EmailEditor() {

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    return (
        <Grid container sx={{}}>
            <Grid item xs style={{ overflow: 'auto', minHeight: 'calc(100vh - 115px)', maxHeight: 'calc(100vh - 115px)' }}>
                <Box style={{ minWidth: '460px' }}>
                    {editorMobileView
                        ?
                        'Mobile todo'
                        :
                        <DesktopView />
                    }
                </Box>
            </Grid>
            <Grid item sx={{ width: "430px", overflow: 'auto', minHeight: 'calc(100vh - 115px)', maxHeight: 'calc(100vh - 115px)' }}>
                <SideBar />
            </Grid>
        </Grid>
    );
}
