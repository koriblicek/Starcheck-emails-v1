import { useState } from 'react';
import { Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { ISelectionType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface IControlSelectionProps {
    propertyKey: string;
    data: ISelectionType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlSelection({ propertyKey, data, handleUpdateProperty }: IControlSelectionProps) {
    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    function handleChange(propertyValue: string) {
        setValue(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue);
    }

    return (
        <Grid container columnGap={1} alignItems='center'>
            <Grid item xs={5}>
                <Typography variant='caption' color="GrayText">{label}</Typography>
            </Grid>
            <Grid item xs>
                <Select
                    fullWidth
                    name={propertyKey}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    size='small'>
                    {data.options.map(item => {
                        return <MenuItem value={item.key} key={item.key}>{t("controls." + item.label)}</MenuItem>;
                    })}
                </Select>
            </Grid>
            <Grid item>
                <IconButton size="small" color="primary" onClick={() => handleChange(data.defaultValue)}  title={t('button.default_value')}>
                    <RefreshOutlinedIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
