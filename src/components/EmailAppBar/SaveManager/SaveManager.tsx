import { Backdrop, CircularProgress, Fab, Grid, Typography } from '@mui/material';
import { Fragment, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { emailsCurrentEmailActions } from '../../../store/emails-data/emailsCurrentEmailSlice';
import { useAppSelector } from '../../../store/hooks';
import { IErrorObject, ITemplate } from '../../../types';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
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

    const { saveIsRequired } = useAppSelector(state => state.emailsCurrentEmail);

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
                //dispatch(emailsCurrentEmailActions.setTemplate({ template: null, updateIds: false }));
                dispatch(emailsCurrentEmailActions.saveCompleted());
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
                <Fab size="small" color="warning" variant="extended"
                    onClick={() => saveTemplate()}
                    disabled={!saveIsRequired}
                >
                    <SaveAltOutlinedIcon fontSize="small" sx={{ pr: 1 }} /><Typography variant='body2' sx={{ pr: 1 }}>{t('button.confirmSaveTemplate')}</Typography>
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
