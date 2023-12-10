import { useState } from 'react';
import { Grid, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { IHAlign } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import AlignHorizontalLeftOutlinedIcon from '@mui/icons-material/AlignHorizontalLeftOutlined';
import AlignHorizontalCenterOutlinedIcon from '@mui/icons-material/AlignHorizontalCenterOutlined';
import AlignHorizontalRightOutlinedIcon from '@mui/icons-material/AlignHorizontalRightOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlHAlignProps {
    propertyKey: string;
    data: IHAlign;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlHAlign({ propertyKey, data, handleUpdateProperty }: IControlHAlignProps) {

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
                    <ToggleButton value={"left"} title={t('button.align_left')}><AlignHorizontalLeftOutlinedIcon /></ToggleButton>
                    <ToggleButton value={"center"} title={t('button.align_center')}><AlignHorizontalCenterOutlinedIcon /></ToggleButton>
                    <ToggleButton value={"right"} title={t('button.align_right')}><AlignHorizontalRightOutlinedIcon /></ToggleButton>
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
