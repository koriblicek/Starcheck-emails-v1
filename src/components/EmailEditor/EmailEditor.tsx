import { Box, Grid } from "@mui/material";

export function EmailEditor() {

    return (
        <Grid container columnGap={1}>
            <Grid item xs style={{ overflow: 'auto' }}>
                <Box style={{ width: 700 }}>
                    1
                </Box>
            </Grid>
            <Grid item style={{ width: "350px" }}>
                2
            </Grid>
        </Grid>
    );
}
