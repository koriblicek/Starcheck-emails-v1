import { Fragment, useState } from 'react';
import { Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ITextType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ModalDialog } from '../../../../UI/ModalDialog';
import { ImagesContainer } from './ImagesContainer';

interface IControlImageProps {
    propertyKey: string;
    data: ITextType;
    handleUpdateProperty: (propertyKey: string, value: string) => void;
}

export function ControlImage({ propertyKey, data, handleUpdateProperty }: IControlImageProps) {
    const [value, setValue] = useState<string>(data.value);

    const { t } = useTranslation();

    const label = t("controls." + data.label);

    const theme = useTheme();

    const [openedModal, setOpenedModal] = useState<boolean>(false);

    function handleChange(propertyValue: string) {
        setValue(propertyValue);
        handleUpdateProperty(propertyKey, propertyValue);
    }

    function handleCloseModal(state: boolean) {
        setOpenedModal(false);
    }

    function handleImageSelect(imageSrc: string) {
        setValue(imageSrc);
        setOpenedModal(false);
        handleUpdateProperty(propertyKey, imageSrc);
    }


    return (
        <Fragment>
            <Grid container columnGap={1} alignItems='center'>
                <Grid item xs={5}>
                    <Typography variant='caption' color="GrayText">{label}</Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        name={propertyKey}
                        type="text"
                        color='info'
                        fullWidth
                        value={value}
                        size="small"
                        onChange={(e) => handleChange(e.currentTarget.value)}
                    />
                </Grid>
                <Grid item>
                    <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={() => setOpenedModal(true)} title={t('button.browse_images')} >
                        <MoreHorizOutlinedIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton size="small" sx={{ color: theme.palette.error.light }} onClick={() => handleChange("")} title={t('button.delete_value')}>
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <ModalDialog title={t('title.selectImage')} open={openedModal} onClose={handleCloseModal} maxWidth="md" disabledConfirm={false}>
                <ImagesContainer onImageSelected={handleImageSelect} />
            </ModalDialog>
        </Fragment>
    );
}
