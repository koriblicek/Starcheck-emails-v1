import { Button, Grid } from "@mui/material";

export function DesktopItemEmptyBlock() {
    return (
        <Grid container justifyContent='center' alignContent='center'>
            <Grid item>
                <Button size="small" variant="outlined" sx={{m:1}}>Add Block</Button>
            </Grid>
        </Grid>
    );
}
