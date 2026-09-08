import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    components: {
        MuiSelect: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
    },
});
