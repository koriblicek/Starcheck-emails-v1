import { useState } from 'react';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import { INumberArrayType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlSliderProps {
    propertyKey: string;
    data: INumberArrayType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlSlider({ propertyKey, data, handleUpdateProperty }: IControlSliderProps) {
    const [value, setValue] = useState<number[]>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    const theme = useTheme();

    function handleChange(propertyValue: number[]) {
        setValue(propertyValue);
        console.log(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue.join("|"));
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <Grid container width='100%'>
                    {value.map((number, index) => {
                        return <Grid item key={index} xs sx={{ border: 1 }} textAlign='center' justifyItems='center'>{Math.round(number)}%</Grid>;
                    })}
                </Grid>
            </Grid>
            <Grid item>
                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={() => handleChange(data.defaultValue)}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
