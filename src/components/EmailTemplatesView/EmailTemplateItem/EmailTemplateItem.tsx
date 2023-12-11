import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Fade, Grid, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment, useReducer, useState } from "react";
import { IErrorObject, ITemplate } from "../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../store/emails-data/emailsCurrentEmailSlice";
import { useAppSelector } from "../../../store/hooks";
import { emailsDataActions } from "../../../store/emails-data/emailsDataSlice";
import axios, { AxiosError } from "axios";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

type State = {
    isDeleting: boolean;
    isCompleted: boolean;
    error: IErrorObject | null;
};

type Action =
    | { type: "DELETE_INIT"; }
    | { type: "DELETE_SUCCESS"; }
    | { type: "DELETE_FAILURE"; payload: IErrorObject; };

type Reducer = (state: State, action: Action) => State;

const initialState = {
    isDeleting: false,
    isCompleted: false,
    error: null
} as State;

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "DELETE_INIT":
            return {
                ...state,
                isDeleting: true,
                isCompleted: false,
                error: null,
            };
        case "DELETE_SUCCESS":
            return {
                ...state,
                isDeleting: false,
                isCompleted: true,
                error: null,
            };
        case "DELETE_FAILURE":
            return {
                ...state,
                isDeleting: false,
                isCompleted: true,
                error: action.payload,
            };
        default:
            throw new Error("Unhandled action type!");
    }
}

interface IEmailTemplateItemProps {
    template: ITemplate;
    isCustomTemplate: boolean;
}
export function EmailTemplateItem({ template, isCustomTemplate }: IEmailTemplateItemProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [cursorOver, setCursorOver] = useState<boolean>(false);

    const [fadeIn, setFadeIn] = useState<boolean>(true);

    //delete
    const { urls } = useAppSelector(state => state.emailsSettings);

    const [, dispatchReducer] = useReducer<Reducer>(reducer, initialState);

    const [isOpenedBackdrop, setIsOpenedBackdrop] = useState<boolean>(false);


    function deleteTemplate(template: ITemplate) {
        const url = urls.dataURL + "/customTemplates/" + template.id;
        dispatchReducer({ type: "DELETE_INIT" });
        setIsOpenedBackdrop(true);
        axios
            .delete(url)
            .then((response) => {
                dispatchReducer({ type: "DELETE_SUCCESS" });
                setIsOpenedBackdrop(false);
                setFadeIn(false);
            })
            .catch((error: AxiosError) => {
                dispatchReducer({ type: "DELETE_FAILURE", payload: { code: error.code ? error.code : "n/a", codeText: error.message, url: url } });
                setIsOpenedBackdrop(false);
            });
    }

    function fadeOutCompleted() {
        if (fadeIn === false) {
            dispatch(emailsDataActions.deleteCustomTemplate({ template: template }));
        }
    }

    return (
        <Fragment>
            <Fade appear in={fadeIn} timeout={500} addEndListener={
                (node, done) => {
                    // use the css transitionend event to mark the finish of a transition
                    node.addEventListener('transitionend', fadeOutCompleted);
                }
            }>
                <Card
                    elevation={cursorOver ? 6 : 1}
                    onPointerEnter={() => setCursorOver(true)}
                    onPointerLeave={() => setCursorOver(false)}
                // sx={{ width: '300px' }}
                >
                    <CardHeader title={template.name.value} action={(isCustomTemplate &&
                        <IconButton size="small" color="primary"
                            onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: false }))}
                            title={t('button.editTemplate')}
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                    )}
                    /*subheader={template.id} subheaderTypographyProps={{ variant: "subtitle2" }} */
                    />
                    <CardContent sx={{ p: 1 }}>
                        <Grid container justifyContent='space-evenly' columnGap={2}>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item><CalendarMonthOutlinedIcon fontSize="small" /></Grid><Grid item><Typography variant="body1">{(new Date(template.modificationDate)).toLocaleDateString('sk')}</Typography></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item><Typography variant="body1">{(new Date(template.modificationDate)).toLocaleTimeString('sk')}</Typography></Grid><Grid item><AccessTimeOutlinedIcon fontSize="small" /></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    {
                        isCustomTemplate ?
                            <CardActions sx={{ p: 1, pb: 1, justifyContent: "center" }}>
                                {/* <Button size="small" color="info" variant="contained" startIcon={<EditNoteOutlinedIcon />}
                                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: false }))}
                                >
                                    {t('button.editTemplate')}
                                </Button> */}
                                <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: true }))}
                                >
                                    {t('button.createCopyTemplate')}
                                </Button>
                                <Button size="small" color="error" variant="contained" startIcon={<DeleteOutlineOutlinedIcon />}
                                    onClick={() => deleteTemplate(template)}
                                >
                                    {t('button.delete')}
                                </Button>
                            </CardActions>
                            :
                            <CardActions sx={{ p: 1, justifyContent: "center" }}>
                                <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: true }))}
                                >{t('button.createCopyTemplate')}</Button>
                            </CardActions>
                    }
                </Card >
            </Fade>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpenedBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    );
};
