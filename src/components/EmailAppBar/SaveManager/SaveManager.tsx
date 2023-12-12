import { Backdrop, CircularProgress, Fab, Grid } from '@mui/material';
import { Fragment, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { emailsCurrentEmailActions } from '../../../store/emails-data/emailsCurrentEmailSlice';
import { useAppSelector } from '../../../store/hooks';
import { IErrorObject, ITemplate } from '../../../types';
import axios, { AxiosError } from 'axios';

type State = {
    isUploading: boolean;
    isCompleted: boolean;
    error: IErrorObject | null;
};

type Action =
    | { type: "PUT_INIT"; }
    | { type: "PUT_SUCCESS"; }
    | { type: "PUT_FAILURE"; payload: IErrorObject; };

type Reducer = (state: State, action: Action) => State;

const initialState = {
    isUploading: false,
    isCompleted: false,
    error: null
} as State;

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "PUT_INIT":
            return {
                ...state,
                isUploading: true,
                isCompleted: false,
                error: null,
            };
        case "PUT_SUCCESS":
            return {
                ...state,
                isUploading: false,
                isCompleted: true,
                error: null,
            };
        case "PUT_FAILURE":
            return {
                ...state,
                isUploading: false,
                isCompleted: true,
                error: action.payload,
            };
        default:
            throw new Error("Unhandled action type!");
    }
}

export interface ISaveManagerProps {
    template: ITemplate;
}

export function SaveManager({ template }: ISaveManagerProps) {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    //save

    const { urls } = useAppSelector(state => state.emailsSettings);

    const [, dispatchReducer] = useReducer<Reducer>(reducer, initialState);

    const [isOpenedBackdrop, setIsOpenedBackdrop] = useState<boolean>(false);

    function saveTemplate() {
        const url = urls.dataURL + "/customTemplates/" + template.id;
        dispatchReducer({ type: "PUT_INIT" });
        setIsOpenedBackdrop(true);
        axios
            .put(url, template, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                dispatchReducer({ type: "PUT_SUCCESS" });
                setIsOpenedBackdrop(false);
                dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }));
                //TODO add notification
            })
            .catch((error: AxiosError) => {
                dispatchReducer({ type: "PUT_FAILURE", payload: { code: error.code ? error.code : "n/a", codeText: error.message, url: url } });
                setIsOpenedBackdrop(false);
                //TODO add notification
            });
    }

    return (
        <Fragment>
            <Grid item>
                <Fab size="medium" color="info" variant="extended"
                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }))}
                >
                    <HighlightOffOutlinedIcon sx={{ pr: 1 }} />
                    {t('button.discardSaveAndCloseTemplate')}
                </Fab>
            </Grid>
            <Grid item>
                <Fab size="medium" color="warning" variant="extended"
                    onClick={() => saveTemplate()}
                >
                    <SaveAltOutlinedIcon sx={{ pr: 1 }} />
                    {t('button.confirmSaveAndCloseTemplate')}
                </Fab>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpenedBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    );
}