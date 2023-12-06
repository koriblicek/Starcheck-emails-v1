import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { ITemplate } from "../../../types";
import usePutToAPI from "../../../hooks/usePutToAPI";
import { Backdrop, CircularProgress } from "@mui/material";
import { emailsCurrentEmailActions } from "../../../store/debuilder-data/emailsCurrentEmailSlice";

export function SaveEmailBackdrop() {

    const dispatch = useDispatch();

    const { urls } = useAppSelector(state => state.emailsSettings);

    const { template, saveIsRequired } = useAppSelector(state => state.emailsCurrentEmail);

    const { isUploading, isCompleted, error, handleSubmit } = usePutToAPI<ITemplate>(urls.dataURL + "/customTemplates/" + template?.id);

    console.log("isUploading: ", isUploading, "isCompleted: ", isCompleted, "error: ", error);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (saveIsRequired) {
            if (template) {
                console.log(template)
                handleSubmit(template);
                setOpen(true);
                dispatch(emailsCurrentEmailActions.cancelSave());
            }
        }

    }, [saveIsRequired, template, dispatch, handleSubmit]);

    //if upload completed
    useEffect(() => {
        if (isCompleted) {
            setOpen(false);
            dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }));
        }
    }, [isCompleted, dispatch]);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
