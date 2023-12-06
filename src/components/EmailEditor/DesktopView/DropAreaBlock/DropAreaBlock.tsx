import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../../store/hooks";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { IBlock } from "../../../../types";
import { useTranslation } from "react-i18next";

interface IDropAreaBlockProps {
    containerIndex: number;
    columnIndex: number;
    blockIndex: number;
}
export function DropAreaBlock({ containerIndex, columnIndex, blockIndex }: IDropAreaBlockProps) {

    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);

    const theme = useTheme();

    const { t } = useTranslation();

    const { blockDrag } = useAppSelector(state => state.emailsApp);

    function handleOnDragOver(e: React.DragEvent) {
        setOver(true);
        e.preventDefault();
    }

    function handleOnDragOut(e: React.DragEvent) {
        setOver(false);
    }

    function handleOnDrop(e: React.DragEvent) {
        setOver(false);
        const data = e.dataTransfer.getData("data");
        if (data) {
            dispatch(emailsCurrentEmailActions.addBlockToIndex({ block: JSON.parse(data) as IBlock, containerIndex, columnIndex, blockIndex }));
        }
    }

    return (
        <Fragment>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', transform: 'translate(0,50%)', zIndex: 8000, visibility: blockDrag ? 'visible' : 'hidden' }}>
                <Box sx={{ border: `.5px ${theme.palette.secondary.light} dashed`, opacity: over ? 1 : 0, transition: 'opacity 0.2s' }}>
                </Box>
            </Box>
            <div style={{ position: 'absolute', width: '100%', transform: 'translate(0,50%)', height: '20px', bottom: 0, left: 0, zIndex: 8002, visibility: blockDrag ? 'visible' : 'hidden' }}
                onDragOver={handleOnDragOver}
                onDragLeave={handleOnDragOut}
                onDrop={(e) => handleOnDrop(e)}
            ></div>
            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%,50%)', zIndex: 8000, visibility: blockDrag ? 'visible' : 'hidden' }}>
                <Paper sx={{ backgroundColor: theme.palette.secondary.light, p: '3px 7px', borderRadius: 6, opacity: over ? 1 : 0.3, transition: 'opacity 0.2s' }}>
                    <Typography variant="subtitle2" component="b" color="white">{t('message.dropBlockHere')}</Typography>
                </Paper>
            </Box>
        </Fragment>
    );
}