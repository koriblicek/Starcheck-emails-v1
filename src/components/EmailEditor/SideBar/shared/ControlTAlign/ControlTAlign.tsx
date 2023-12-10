import { useState } from 'react';
import { Grid, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ITAlign } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlTAlignProps {
    propertyKey: string;
    data: ITAlign;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlTAlign({ propertyKey, data, handleUpdateProperty }: IControlTAlignProps) {

    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    function handleChange(event: React.MouseEvent<HTMLElement>, propertyValue: string) {
        if (propertyValue !== null) {
            setValue(propertyValue);
            handleUpdateProperty(propertyKey, propertyValue);
        }
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <ToggleButtonGroup exclusive color="primary" size="small" orientation='horizontal' fullWidth
                    value={value}
                    onChange={handleChange}
                >
                    <ToggleButton value={"left"} title={t('button.align_left')}><FormatAlignLeftIcon /></ToggleButton>
                    <ToggleButton value={"center"} title={t('button.align_center')}><FormatAlignCenterIcon /></ToggleButton>
                    <ToggleButton value={"right"} title={t('button.align_right')}><FormatAlignRightIcon /></ToggleButton>
                    <ToggleButton value={"justify"} title={t('button.align_justify')}><FormatAlignJustifyIcon /></ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item>
                <IconButton size="small" color="primary" onClick={(e) => handleChange(e, data.defaultValue)} title={t('button.default_value')}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
