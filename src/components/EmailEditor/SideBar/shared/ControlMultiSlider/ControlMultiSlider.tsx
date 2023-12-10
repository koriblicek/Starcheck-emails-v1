import { useCallback, useMemo, useState } from 'react';
import { Grid, IconButton, Slider, Typography, debounce } from '@mui/material';
import { INumberArrayType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

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
    /*
        function handleChange(event: Event, propertyValue: number | number[], activeThumb: number) {
            if (!Array.isArray(propertyValue)) {
                return;
            }
            let val = propertyValue[activeThumb];
            let array = propertyValue as number[];
            //if first handle
    
            // if  the most left handle - it should be only min
            if (activeThumb === 0) {
                //val = data.min;
                val = data.min;
            } else {
                //if the most right handle - it should be only max
                if (activeThumb === propertyValue.length - 1) {
                    val = data.max;
                } else {
                    //val = Math.max(propertyValue[activeThumb - 1] + minDistance, Math.min(val, propertyValue[activeThumb + 1] - minDistance));
                    //console.log(activeThumb, val);
                }
            }
            array.splice(activeThumb, 1, val);
            setValue(array);
            handleUpdateProperty(propertyKey, array.join("|"));
        }
    */
    function reset(propertyValue: number | number[]) {
        setValue(propertyValue as number[]);
        handleUpdateProperty(propertyKey, (propertyValue as number[]).join("|"));
    }

    const debouncedUpdate = useMemo(
        () =>
            debounce((value) => {
                handleUpdateProperty(propertyKey, value);
            }, 50),
        [handleUpdateProperty, propertyKey]
    );

    const handleChange = useCallback(
        (event: Event, propertyValue: number | number[], activeThumb: number) => {
            if (!Array.isArray(propertyValue)) {
                return;
            }
            let val = propertyValue[activeThumb];
            let array = propertyValue as number[];
            // if  the most left handle - it should be only min
            if (activeThumb === 0) {
                val = data.min;
            } else {
                //if the most right handle - it should be only max
                if (activeThumb === propertyValue.length - 1) {
                    val = data.max;
                } else {
                    //no calculations needed - there is no restriction
                }
            }
            array.splice(activeThumb, 1, val);
            setValue(array);
            debouncedUpdate(array.join("|"));
        },
        [debouncedUpdate, data]
    );

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
