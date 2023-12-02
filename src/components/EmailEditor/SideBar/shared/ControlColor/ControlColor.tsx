import { useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { IColorType } from '../../../../../types';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { MuiColorInput } from 'mui-color-input';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlColorProps {
    propertyKey: string;
    data: IColorType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlColor({ propertyKey, data, handleUpdateProperty }: IControlColorProps) {

    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    function handleChange(propertyValue: string) {
        setValue(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue);
    }

    const debouncedOnChange = debounce(handleChange, 50);

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <MuiColorInput
                    name={propertyKey}
                    value={value}
                    size="small"
                    color='info'
                    onChange={debouncedOnChange} fullWidth
                />
            </Grid>
            <Grid item>
                <IconButton size="small" color="primary" onClick={() => handleChange(data.defaultValue)}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
