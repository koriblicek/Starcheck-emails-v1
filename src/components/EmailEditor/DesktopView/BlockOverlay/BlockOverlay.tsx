import { useDispatch } from "react-redux";
import { IBlock } from "../../../../types";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";
import { Fragment, useEffect, useState } from "react";
import { Box, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

interface IBlockOverlayProps {
  isOver: boolean;
  block: IBlock;
  columnPadding: number;
}
export function BlockOverlay({ isOver, block, columnPadding }: IBlockOverlayProps) {

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const theme = useTheme();

  const { selectedBlock } = useAppSelector(state => state.emailsCurrentEmail);

  const [selected, setSelected] = useState<boolean>(false);

  const { editorMobileView } = useAppSelector(state => state.emailsApp);

  const blockWidth = editorMobileView ? 320 - columnPadding * 2 : block.calculatedWidthPixels;

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
        border: !selected ? `1px ${theme.palette.secondary.main} dashed` : `1px ${theme.palette.secondary.main} solid`,
        visibility: (isOver || selected) ? "visible" : "hidden",
        pointerEvents: 'none',
        minWidth: blockWidth - block.paddingLeftRight.value * 2 - 2 + "px"
      }}
    >
      {(isOver && !selected) &&
        <Fragment>
          <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, left: 0, transform: 'translate(0,100%)', zIndex: 1310 }} >
            <Paper sx={{ pl: 1, pr: 1, mr: '-1px', mt: '0px', borderRadius: 0, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: theme.palette.secondary.main, color: 'white' }}>
              <Typography variant="subtitle2">{t('button.' + block.type)}</Typography>
            </Paper>
          </Box>
        </Fragment>
      }
      {selected &&
        <Fragment>
          <Box sx={{ pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, transform: 'translate(0,100%)', zIndex: 1310 }} >
            <Paper sx={{ mr: '-1px', mt: '0px', border: 1, borderRadius: 0, borderBottomLeftRadius: 4, borderBottomRightRadius: 3, borderColor: theme.palette.secondary.main }} elevation={5}>
              <Grid container columnGap={1}>
                <Grid item>
                  <IconButton color="error" sx={{ borderRadius: 1 }} size="small" title={t('button.delete')}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(emailsCurrentEmailActions.removeBlock({ blockId: block.id }));
                    }}
                  ><DeleteOutlinedIcon fontSize="small" /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="info" sx={{ borderRadius: 1 }} size="small" title={t('button.duplicate')}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(emailsCurrentEmailActions.duplicateBlock({ blockId: block.id }));
                    }}
                  ><ContentCopyOutlinedIcon fontSize="small" /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fragment>
      }
    </Box >
  );
}
