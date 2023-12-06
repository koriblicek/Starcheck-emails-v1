import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import usePutToAPI from "../../../../hooks/usePutToAPI";

export function SendPreviewMail() {

    const { urls } = useAppSelector(state => state.emailsSettings);

    const { template } = useAppSelector(state => state.emailsCurrentEmail);


    const { isUploading, isCompleted, handleSubmit } = usePutToAPI<Object>(urls.outputURL);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isCompleted) {
            setOpen(false);
        }
    }, [isCompleted]);

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Button fullWidth disabled={isUploading} variant="contained" onClick={() => {
                setOpen(true);
                handleSubmit({ emailTo: "koriblik@gmail.com", emailBody: template!.exportedText, subjectLine: template!.subjectLine.value });
            }}>DEV: Poslať preview mail</Button>
        </>
    );
}
