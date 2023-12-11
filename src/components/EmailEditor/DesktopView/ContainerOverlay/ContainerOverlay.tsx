import { Box,  Grid, IconButton, Paper, useTheme } from "@mui/material";
import { useAppSelector } from "../../../../store/hooks";
import { Fragment, useEffect, useState } from "react";
import { IContainer } from "../../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import { useTranslation } from "react-i18next";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

interface IContainerOverlayProps {
    isOver: boolean;
    container: IContainer;
}
export function ContainerOverlay({ isOver, container }: IContainerOverlayProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const theme = useTheme();

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
                border: !selected ? `1px ${theme.palette.info.main} dashed` : `1px ${theme.palette.info.main} solid`,
                visibility: (isOver || selected) ? "visible" : "hidden",
                pointerEvents: 'none',
                minWidth: container.calculatedWidthPixels - 2 + "px"
            }}
        >
            {selected &&
                <Fragment>
                    <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, transform: 'translate(0,100%)', zIndex: 1300 }} >
                        <Paper sx={{ mr: '-1px', mt: '0px', border: 1, borderRadius: 0, borderBottomLeftRadius: 4, borderBottomRightRadius: 3, borderColor: theme.palette.info.main }} elevation={5}>
                            <Grid container columnGap={1}>
                                <Grid item>
                                    <IconButton color="error" sx={{ borderRadius: 1 }} size="small" title={t('button.delete')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(emailsCurrentEmailActions.removeContainer({ containerId: container.id }));
                                        }}
                                    ><DeleteOutlinedIcon fontSize="small" /></IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton color="info" sx={{ borderRadius: 1 }} size="small" title={t('button.duplicate')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(emailsCurrentEmailActions.duplicateContainer({ containerId: container.id }));
                                        }}
                                    ><ContentCopyOutlinedIcon fontSize="small" /></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                    {/* <Box sx={{ pointerEvents: 'auto', position: 'absolute', top: 0, left: '50%', transform: 'translate(0,-100%)', zIndex: 10000 }} >
                        <Paper>
                            <Button variant="contained" sx={{ borderRadius: 0, p: 0 }} size="small" title={t('button.add_container')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(emailsCurrentEmailActions.duplicateBlock({ blockId: block.id }));
                                }}
                            ><AddBoxOutlinedIcon fontSize="small" /></Button>
                        </Paper>
                    </Box>
                    <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%,100%)', zIndex: 10000 }} >
                        <Paper>
                            <Button variant="contained" sx={{ borderRadius: 0, p: 0 }} size="small" title={t('button.add_container')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(emailsCurrentEmailActions.duplicateBlock({ blockId: block.id }));
                                }}
                            ><AddBoxOutlinedIcon fontSize="small" /></Button>
                        </Paper>
                    </Box> */}
                </Fragment>
            }
        </Box>

    );
}
