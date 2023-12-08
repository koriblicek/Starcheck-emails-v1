import { useState } from 'react';
import { Grid, IconButton, Slider, Typography } from '@mui/material';
import { INumberArrayType, ISizeType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const minDistance = 10;

interface IControlMultiSliderProps {
    propertyKey: string;
    data: INumberArrayType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlMultiSlider({ propertyKey, data, handleUpdateProperty }: IControlMultiSliderProps) {
    const [value, setValue] = useState<number[]>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    function valueLabel(value: number) {
        return `${value}${data.typeSuffix}`;
    }

    function handleChange(event: Event, propertyValue: number | number[], activeThumb: number) {
        if (!Array.isArray(propertyValue)) {
            return;
        }
        let val = propertyValue[activeThumb];
        //if first handle

        if (activeThumb === 0) {
            // if just only one handle
            if (data.value.length === 1) {
                console.log(val);
                val = Math.max(data.min + minDistance, Math.min(val, data.max - minDistance));
            } else {
                val = Math.max(data.min + minDistance, Math.min(val, propertyValue[activeThumb + 1] - minDistance));
            }

        }
        console.log((propertyValue as number[]).splice(activeThumb, 1, val));
        setValue((propertyValue as number[]).splice(activeThumb, 1, val));
        handleUpdateProperty(propertyKey, (propertyValue as number[]).splice(activeThumb, 1, val).join("|"));
    }

    function reset(propertyValue: number | number[]) {
        setValue(propertyValue as number[]);
        handleUpdateProperty(propertyKey, (propertyValue as number[]).join("|"));
    }
    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs sx={{ pl: 2, pr: 2 }}>
                <Slider
                    size="small"
                    track={false}
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
