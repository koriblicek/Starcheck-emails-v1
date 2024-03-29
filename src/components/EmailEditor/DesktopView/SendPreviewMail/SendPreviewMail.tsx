import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { useTranslation } from "react-i18next";
import usePutToAPI from "../../../../hooks/usePutToAPI";
import SendIcon from '@mui/icons-material/Send';

export function SendPreviewMail() {

    const { urls, inputData } = useAppSelector(state => state.emailsSettings);

    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    const { t } = useTranslation();

    const { isUploading, isCompleted, handleSubmit } = usePutToAPI<Object>(urls.previewURL);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isCompleted) {
            setOpen(false);
        }
    }, [isCompleted]);

    const extraEmails = (template!.previewEmailAddresses.value === "")
        ?
        ""
        :
        "," + template?.previewEmailAddresses.value;
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Button size="small" disabled={isUploading} variant="contained"
                startIcon={<SendIcon />}
                onClick={() => {
                    setOpen(true);
                    handleSubmit({ emailTo: urls.emailAdressTest + extraEmails, emailBody: template!.exportedText, subjectLine: template!.subjectLine.value, id: inputData.dataId, templateName: template!.name.value });

                }}>{t('button.send_preview_mail')}</Button>
        </>
    );
}
