import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import { useTranslation } from "react-i18next";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export function PanelSelection() {

    const dispatch = useDispatch();
    
    const [selection, setSelection] = useState<string | null>("email");
    
    const { t } = useTranslation();

    const { selectedContainer, selectedBlock } = useAppSelector(state => state.emailsCurrentEmail);

    useEffect(() => {
        if (selectedContainer) {
            setSelection("container");
        } else {
            if (selectedBlock) {
                setSelection("block");
            } else {
                setSelection("email");
            }
        }

    }, [selectedContainer, selectedBlock]);

    return (
        <ToggleButtonGroup exclusive fullWidth value={selection} color="info">
            <ToggleButton color="primary" value="email" onClick={() => {
                dispatch(emailsCurrentEmailActions.clearSelection());
            }}><EmailOutlinedIcon sx={{ mr: 1 }} />{t('button.email')}</ToggleButton>
            <ToggleButton color="info" value="container" disabled><Inventory2OutlinedIcon sx={{ mr: 1 }} />{t('button.container')}</ToggleButton>
            <ToggleButton color="secondary" value="block" disabled><DatasetOutlinedIcon sx={{ mr: 1 }} />{t('button.block')}</ToggleButton>
        </ToggleButtonGroup>
    );
}
