import { Backdrop, CircularProgress, IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ITemplate } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { emailsCurrentEmailActions } from "../../../store/emails-data/emailsCurrentEmailSlice";
import { emailsDataActions } from "../../../store/emails-data/emailsDataSlice";
import axios from "axios";
import { useState } from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface IEmailTemplateActionsProps {
    template: ITemplate;
    isCustomTemplate: boolean;
}

/** Actions rendered in a template-table row. */
export function EmailTemplateActions({ template, isCustomTemplate }: IEmailTemplateActionsProps) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { urls } = useAppSelector(state => state.emailsSettings);
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteTemplate() {
        const url = `${urls.dataURL}/customTemplates/${template.id}`;

        setIsDeleting(true);
        try {
            await axios.delete(url);
            setIsDeleting(false);
            dispatch(emailsDataActions.deleteCustomTemplate({ template }));
        } catch {
            // The previous UI did not show a request error here; keep the row available for retry.
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                {isCustomTemplate && (
                    <IconButton
                        size="small"
                        color="primary"
                        title={t('button.editTemplate')}
                        onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template, updateIds: false }))}
                    >
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                )}
                <IconButton
                    size="small"
                    color="primary"
                    title={t('button.createCopyTemplate')}
                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template, updateIds: true }))}
                >
                    <AddCircleOutlineOutlinedIcon fontSize="small" />
                </IconButton>
                {isCustomTemplate && (
                    <IconButton
                        size="small"
                        color="error"
                        title={t('button.delete')}
                        onClick={deleteTemplate}
                    >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                )}
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isDeleting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
