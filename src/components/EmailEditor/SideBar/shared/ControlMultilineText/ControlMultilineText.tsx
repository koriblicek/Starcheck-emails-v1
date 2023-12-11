import { useCallback, useMemo, useState } from 'react';
import { Grid, IconButton, TextField, Typography, useTheme, debounce } from '@mui/material';
import { IMultilineTextType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


interface IControlMultilineTextProps {
    propertyKey: string;
    data: IMultilineTextType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlMultilineText({ propertyKey, data, handleUpdateProperty }: IControlMultilineTextProps) {
    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    const theme = useTheme();

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
            <Grid item>
                <IconButton size="small" sx={{ color: theme.palette.error.light }} onClick={() => handleChange("")} title={t('button.delete_value')}>
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name={propertyKey+"multiline"}
                    type="text"
                    color='info'
                    multiline
                    rows={data.rows}
                    inputProps={{ style: { resize: "vertical" } }}
                    fullWidth
                    value={value}
                    size="small"
                    onChange={(e) => handleChange(e.currentTarget.value)}
                />
            </Grid>
        </Grid>
    );
}
