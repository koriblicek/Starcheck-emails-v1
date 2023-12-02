import { useState } from 'react';
import { Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ITextType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

interface IControlImageProps {
    propertyKey: string;
    data: ITextType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlImage({ propertyKey, data, handleUpdateProperty }: IControlImageProps) {
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
                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={() => console.log("TODO")} title={t('button.browse_images')} >
                    <MoreHorizOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton size="small" sx={{ color: theme.palette.error.light }} onClick={() => handleChange("")} title={t('button.delete_value')}>
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
