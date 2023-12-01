import { Box, Grid, IconButton, Paper } from "@mui/material";
import { useAppSelector } from "../../../../../store/hooks";
import { useEffect, useState } from "react";
import { IContainer } from "../../../../../types";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { useTranslation } from "react-i18next";

interface IContainerOverlayProps {
    isOver: boolean;
    container: IContainer;
}
export function ContainerOverlay({ isOver, container }: IContainerOverlayProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { selectedContainer } = useAppSelector(state => state.emailsCurrentEmail);

    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if (selectedContainer) {
            setSelected(container.id === selectedContainer.id);
        } else {
            setSelected(false);
        }
    }, [selectedContainer, container.id]);

    return (
        <Box
            sx={{
                position: 'absolute',
                backgroundColor: (isOver && (!selected)) ? "#00000005" : "transparent",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: !selected ? '2px #0000ff80 dotted' : '2px #0000ff80 solid',
                visibility: (isOver || selected) ? "visible" : "hidden",
                pointerEvents: 'none',
                minWidth: container.calculatedWidthPixels + "px"
            }}
        >
            {selected &&
                <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, transform: 'translate(0,0)' }} >
                    <Paper sx={{ m: 1 }}>
                        <Grid container columnGap={1}>
                            <Grid item>
                                <IconButton color="error" sx={{ borderRadius: 1 }} size="small" title={t('button.delete')}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(emailsCurrentEmailActions.removeContainer({ containerId: container.id }));
                                    }}
                                ><DeleteOutlinedIcon /></IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton color="info" sx={{ borderRadius: 1 }} size="small" title={t('button.duplicate')}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(emailsCurrentEmailActions.duplicateContainer({ containerId: container.id }));
                                    }}
                                ><ContentCopyOutlinedIcon /></IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            }
        </Box>

    );
}
