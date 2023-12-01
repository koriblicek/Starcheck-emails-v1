import { useState } from 'react';
import { Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ITextType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
interface IControlTextProps {
    propertyKey: string;
    data: ITextType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlText({ propertyKey, data, handleUpdateProperty }: IControlTextProps) {
    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    const theme = useTheme();

    function handleChange(propertyValue: string) {
        setValue(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue);
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <TextField
                    name={propertyKey}
                    type="text"
                    color='info'
                    fullWidth
                    value={value}
                    size="small"
                    onChange={(e) => handleChange(e.currentTarget.value)}
                />
            </Grid>
            <Grid item>
                <IconButton size="small" sx={{ color: theme.palette.error.light }} onClick={() => handleChange("")}>
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
