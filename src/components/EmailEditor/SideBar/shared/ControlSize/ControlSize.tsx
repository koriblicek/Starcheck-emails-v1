import { useState } from 'react';
import { Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { ISizeType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

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
        const val = Math.max(data.min, Math.min(data.max, (Number(propertyValue))));
        setValue(val);
        handleUpdateProperty(propertyKey, val.toString());
    }

    function add(propertyValue: string) {
        const val = Math.max(data.min, Math.min(data.max, (value + Number(propertyValue))));
        setValue(val);
        handleUpdateProperty(propertyKey, val.toString());
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={4}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <Grid container alignItems='center' justifyContent='end'>
                    <Grid item>
                        <Button size="small" variant='outlined' color="primary" sx={{ borderRadius: 0 }}

                            onClick={() => add("-" + data.step)}
                        ><Typography variant='body1'>-</Typography></Button>
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            p: '3px',
                            border: `1px ${theme.palette.info.main} solid`,
                            width: '30px',
                            textAlign: 'center'
                        }}>{value}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            p: '3px 5px',
                            border: `1px ${theme.palette.grey[400]} solid`,
                            backgroundColor: theme.palette.grey[200],
                            color: theme.palette.grey[500],
                        }}>{data.sizeSuffix}</Typography>
                    </Grid>
                    <Grid item>
                        <Button size="small" variant='outlined' color="primary" sx={{ borderRadius: 0 }}
                            onClick={() => add("+" + data.step)}
                        ><Typography variant='body1'>+</Typography></Button>
                    </Grid>
                    <Grid item sx={{ pl: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleChange(data.defaultValue.toString())} title={t('button.default_value')}>
                            <RefreshOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
