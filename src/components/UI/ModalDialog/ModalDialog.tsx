import { Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface IModalDialog {
    title: string;
    open: boolean;
    onClose: (status: boolean) => void;
    closeButton?: boolean;
    fullWidth?: boolean;
    disabledConfirm?: boolean;
    maxWidth?: false | Breakpoint | undefined;
};

export function ModalDialog({ title, onClose, fullWidth = true, open = false, maxWidth = 'md', disabledConfirm = false, closeButton = true, ...props }: PropsWithChildren<IModalDialog>) {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            onClose={onClose}
            open={open}
            scroll='paper'
            maxWidth={maxWidth}
            fullWidth={fullWidth}
        // PaperProps={{ sx: { position: "fixed", bottom: 10, m: 0 } }}
        >
            <DialogTitle borderBottom='1px lightgray solid' >
                <Grid container alignItems='baseline' >
                    <Grid item flex={1}>
                        <Typography variant="h6" component="strong" sx={{ mr: 2, flexGrow: 1, flexBasis: 'baseline' }}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            edge="end"
                            onClick={() => onClose(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                {props.children}
            </DialogContent>
            {closeButton &&
                <DialogActions sx={{ borderTop: '1px lightgray solid' }}>
                    <Button size="small" color="error" onClick={() => onClose(false)} variant='outlined' startIcon={<ClearOutlinedIcon />}>Zrušiť</Button>
                    <Button size="small" color="success" onClick={() => onClose(true)} variant='contained' disabled={disabledConfirm} autoFocus startIcon={<CheckOutlinedIcon />}>Potvrdiť</Button>
                </DialogActions>
            }
        </Dialog>
    );

}
