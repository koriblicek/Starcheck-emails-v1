import { useCallback, useMemo, useState } from 'react';
import { Grid, IconButton, Slider, Typography, debounce } from '@mui/material';
import { ISizeType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlSliderProps {
    propertyKey: string;
    data: ISizeType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlSlider({ propertyKey, data, handleUpdateProperty }: IControlSliderProps) {
    const [value, setValue] = useState<number>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    function valueLabel(value: number) {
        return `${value}${data.sizeSuffix}`;
    }
    
    function reset(propertyValue: number | number[]) {
        setValue(propertyValue as number);
        handleUpdateProperty(propertyKey, propertyValue.toString());
    }

    const debouncedUpdate = useMemo(
        () =>
            debounce((value) => {
                handleUpdateProperty(propertyKey, value);
            }, 50),
        [handleUpdateProperty, propertyKey]
    );

    const handleChange = useCallback(
        (event: Event, propertyValue: number | number[]) => {
            setValue(propertyValue as number);
            debouncedUpdate(propertyValue.toString());
        },
        [debouncedUpdate]
    );

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs sx={{ pl: 2, pr: 2 }}>
                <Slider
                    size="small"
                    value={value}
                    step={data.step}
                    min={data.min}
                    max={data.max}
                    valueLabelDisplay="auto"
                    marks={[{ value: data.min, label: valueLabel(data.min) }, { value: data.max, label: valueLabel(data.max) }]}
                    onChange={handleChange}
                    valueLabelFormat={valueLabel}
                />
            </Grid>
            <Grid item>
                <IconButton size="small" color="primary" onClick={() => reset(data.defaultValue)} title={t('button.default_value')}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
