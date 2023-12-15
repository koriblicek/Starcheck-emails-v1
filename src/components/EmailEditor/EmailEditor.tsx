import { Box, Grid } from "@mui/material";
import { DesktopView } from "./DesktopView/DesktopView";
import { SideBar } from "./SideBar";
import { PanelSelection } from "./SideBar/PanelSelection";

export function EmailEditor() {

    return (
        <Grid container sx={{}}>
            <Grid item xs style={{ overflow: 'auto', minHeight: 'calc(100vh - 115px)', maxHeight: 'calc(100vh - 115px)' }}>
                <Box style={{ minWidth: '460px' }}>
                    <DesktopView />
                </Box>
            </Grid>
            <Grid item sx={{ width: "430px", overflowY: 'scroll', minHeight: 'calc(100vh - 115px)', maxHeight: 'calc(100vh - 115px)' }}>
                <PanelSelection />
                <SideBar />
            </Grid>
        </Grid>
    );
}
