import { useDispatch } from "react-redux";
import { IBlock } from "../../../../types";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";
import { Fragment, useEffect, useState } from "react";
import { Box, Grid, IconButton, Paper, useTheme } from "@mui/material";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

interface IBlockOverlayProps {
  isOver: boolean;
  block: IBlock;
}
export function BlockOverlay({ isOver, block }: IBlockOverlayProps) {

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const theme = useTheme();

  const { selectedBlock } = useAppSelector(state => state.emailsCurrentEmail);

  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedBlock) {
      setSelected(block.id === selectedBlock.id);
    } else {
      setSelected(false);
    }
  }, [selectedBlock, block.id]);


  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: (isOver && (!selected)) ? "#00000005" : "transparent",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        border: !selected ? `2px ${theme.palette.secondary.dark} dashed` : `2px ${theme.palette.secondary.dark} solid`,
        visibility: (isOver || selected) ? "visible" : "hidden",
        pointerEvents: 'none',
        minWidth: block.calculatedWidthPixels - block.padding.value * 2 - 4 + "px"
      }}
    >
      {selected &&
        <Fragment>
          <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, transform: 'translate(0,100%)', zIndex: 10000 }} >
            <Paper sx={{ m: 1 }}>
              <Grid container columnGap={1}>
                <Grid item>
                  <IconButton color="error" sx={{ borderRadius: 1 }} size="small" title={t('button.delete')}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(emailsCurrentEmailActions.removeBlock({ blockId: block.id }));
                    }}
                  ><DeleteOutlinedIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="info" sx={{ borderRadius: 1 }} size="small" title={t('button.duplicate')}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(emailsCurrentEmailActions.duplicateBlock({ blockId: block.id }));
                    }}
                  ><ContentCopyOutlinedIcon/></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          {/* <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%,100%)', zIndex: 10000 }} >
            <Paper>
              <IconButton color="secondary" sx={{ borderRadius: 1, p: 0 }} size="small" title={t('button.add_block')}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(emailsCurrentEmailActions.duplicateBlock({ blockId: block.id }));
                }}
              ><AddBoxOutlinedIcon fontSize="small" /></IconButton>
            </Paper>
          </Box> */}
        </Fragment>
      }
    </Box >
  );
}
