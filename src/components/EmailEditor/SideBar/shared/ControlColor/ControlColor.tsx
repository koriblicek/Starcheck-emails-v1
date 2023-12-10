import { useCallback,  useMemo, useState } from 'react';
import { Checkbox, Grid, IconButton, TextField, Typography, debounce } from '@mui/material';
import { IColorType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlColorProps {
    propertyKey: string;
    data: IColorType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlColor({ propertyKey, data, handleUpdateProperty }: IControlColorProps) {

    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const [checked, setChecked] = useState<boolean>(value !== "transparent");

    const label = t("controls." + data.label);

    function handleCheckClick(event: React.ChangeEvent<HTMLInputElement>) {
        setChecked(event.target.checked);
        if (event.target.checked) {
            setValue(data.defaultValue);
            handleUpdateProperty(propertyKey, data.defaultValue);
        } else {
            handleUpdateProperty(propertyKey, "transparent");
        }
    };

    const debouncedUpdate = useMemo(
        () =>
            debounce((value) => {
                handleUpdateProperty(propertyKey, value);
            }, 200),
        [handleUpdateProperty, propertyKey]
    );

    const handleChange = useCallback(
        (propertyValue: string) => {
            if (checked) {
                setValue(propertyValue);
                debouncedUpdate(propertyValue);
            }
        },
        [debouncedUpdate, checked]
    );

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                {checked
                    ?
                    <TextField
                        name={propertyKey}
                        value={value}
                        type="color"
                        size="small"
                        color='info'
                        onChange={(e) => handleChange(e.currentTarget.value)}
                        fullWidth
                    >
                    </TextField>
                    :
                    <TextField
                        name={propertyKey}
                        value={t('controls.not_set')}
                        type="text"
                        size="small"
                        color='info'
                        InputProps={{
                            inputProps: {
                                style: { textAlign: 'center' },
                            }
                        }}
                        disabled
                        fullWidth
                    >
                    </TextField>
                }
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckClick}
                />
            </Grid>
            <Grid item>
                <IconButton size="small" color="primary" onClick={() => handleChange(data.defaultValue)} title={t('button.default_value')}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
