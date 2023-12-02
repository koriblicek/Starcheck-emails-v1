import { Fragment, useState } from "react";
import { IBlock, IBlockImage } from "../../../../types";
import { BlockImage } from "./BlockImage";
import { Box } from "@mui/material";
import { BlockOverlay } from "../BlockOverlay";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";

interface IDesktopItemBlockProps {
  block: IBlock;
}
export function DesktopItemBlock({ block }: IDesktopItemBlockProps) {

  const dispatch = useDispatch();

  const [over, setOver] = useState<boolean>(false);

  let blockElement = null;
  switch (block.type) {
    case "image":
      blockElement = <BlockImage block={block as IBlockImage} />;
      break;
  }

  return (
    <Fragment >
      <Box sx={{ position: 'relative' }}
        onPointerEnter={() => setOver(true)}
        onPointerLeave={() => setOver(false)}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(emailsCurrentEmailActions.selectBlock({ block: block }));
        }}
      >
        <table cellPadding={0} cellSpacing={0} width="100%" border={0}>
          <tbody>
            <tr>
              <td style={{ overflowWrap: 'break-word', wordBreak: 'break-word', padding: block.padding.value + block.padding.sizeSuffix }} align="left">
                {/* ID */}
                {/* <Box sx={{ fontSize: '9px' }}>{block.id}</Box> */}
                {blockElement}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Overlay */}
        <BlockOverlay isOver={over} block={block} />
      </Box>
    </Fragment>

  );
}
