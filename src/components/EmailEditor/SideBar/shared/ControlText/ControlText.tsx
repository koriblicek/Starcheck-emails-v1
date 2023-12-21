import { useCallback, useMemo, useState } from 'react';
import { Grid, IconButton, TextField, Typography, debounce, useTheme } from '@mui/material';
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

    /*function handleChange(propertyValue: string) {
        setValue(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue);
    }*/

    const debouncedUpdate = useMemo(
        () =>
            debounce((value) => {
                handleUpdateProperty(propertyKey, value);
            }, 200),
        [handleUpdateProperty, propertyKey]
    );

    const handleChange = useCallback(
        (propertyValue: string) => {
            setValue(propertyValue);
            debouncedUpdate(propertyValue);
        },
        [debouncedUpdate]
    );

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs={12}></Grid>
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
                <IconButton size="small" sx={{ color: theme.palette.error.light }} onClick={() => handleChange("")} title={t('button.delete_value')}>
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
