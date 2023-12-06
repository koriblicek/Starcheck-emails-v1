import { useState } from 'react';
import {  Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ISizeType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IControlSizeProps {
    propertyKey: string;
    data: ISizeType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlSize({ propertyKey, data, handleUpdateProperty }: IControlSizeProps) {
    const [value, setValue] = useState<number>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    const theme = useTheme();

    function handleChange(propertyValue: string) {
        setValue(Number(propertyValue));
    }

    function handleConfirm() {
        const val = Math.max(data.min, Math.min(data.max, (value)));
        setValue(val);
        handleUpdateProperty(propertyKey, value.toString());
    }

    function add(propertyValue: string) {
        const val = Math.max(data.min, Math.min(data.max, (value + Number(propertyValue))));
        setValue(val);
        handleUpdateProperty(propertyKey, val.toString());
    }

    function handleReset() {
        setValue(data.defaultValue);
        handleUpdateProperty(propertyKey, data.defaultValue.toString());
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <Grid container alignItems='center' justifyContent='end'>
                    <Grid item>
                        {/* <Button size="small" variant='outlined' color="primary" sx={{ borderRadius: 0}}

                            onClick={() => add("-" + data.step)}
                        ><Typography variant='body1'>-</Typography></Button> */}
                        <IconButton size="medium" color='primary' sx={{ borderRadius: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, border: 1, padding: '9px' }}
                            onClick={() => add("-" + data.step)}
                        >
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            type="number"
                            value={value}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            inputProps={{ style: { textAlign: 'center' } }}
                            size="small"
                            InputProps={{ sx: { borderRadius: 0 } }}
                            onChange={(e) => handleChange(e.currentTarget.value)}
                            onBlur={handleConfirm}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleConfirm();
                                }
                            }}
                        >

                        </TextField>
                        {/* <Typography sx={{
                            p: '6px',
                            border: `1px ${theme.palette.info.main} solid`,
                            textAlign: 'center'
                        }}>{value}</Typography> */}
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            p: '6px 5px',
                            border: `1px ${theme.palette.grey[400]} solid`,
                            backgroundColor: theme.palette.grey[200],
                            color: theme.palette.grey[500],
                        }}>{data.sizeSuffix}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="medium" color='primary' sx={{ borderRadius: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, border: 1, padding: '9px' }}
                            onClick={() => add("+" + data.step)}
                        >
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{ pl: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleReset()} title={t('button.default_value')}>
                            <RefreshOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
