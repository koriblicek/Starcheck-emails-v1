import { useReducer } from 'react';
import { IErrorObject } from '../types';
import axios, { AxiosError } from 'axios';

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

/**
 * Hook to DELETE data from REST Api
 * 
 * @param url Request url
 * @returns [ isUploading: boolean, isCompleted: boolean, error: IErrorObject | null, handleSubmit: callback for submit]
 */
function useDeleteFromAPI<T>(url: string) {

    const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

    function deleteData() {
        dispatch({ type: "DELETE_INIT" });
        axios
            .delete(url)
            .then((response) => {
                dispatch({ type: "DELETE_SUCCESS" });
            })
            .catch((error: AxiosError) => {
                dispatch({ type: "DELETE_FAILURE", payload: { code: error.code ? error.code : "n/a", codeText: error.message, url: url } });
            });
    };

    function handleSubmit(data: T) {
        if (url !== "") {
            deleteData();
        }
    }

    return { ...state, handleSubmit };
}

export default useDeleteFromAPI;