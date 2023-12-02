import { useDispatch } from "react-redux";
import { IBlock } from "../../../../types";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface IBlockOverlayProps {
  isOver: boolean;
  block: IBlock;
}
export function BlockOverlay({ isOver, block }: IBlockOverlayProps) {

  const dispatch = useDispatch();

  const { t } = useTranslation();

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
        border: !selected ? '2px #00ff0080 dotted' : '2px #00ff0080 solid',
        visibility: (isOver || selected) ? "visible" : "hidden",
        pointerEvents: 'none',
        minWidth: block.calculatedWidthPixels-block.padding.value*2-4 + "px"
      }}
    >
      {selected && <></>}
    </Box>
  );
}
