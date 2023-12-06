import { Fragment, useState } from "react";
import { IBlock, IBlockHeading, IBlockHtml, IBlockImage, IBlockText } from "../../../../types";
import { BlockImage } from "./BlockImage";
import { Box } from "@mui/material";
import { BlockOverlay } from "../BlockOverlay";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { BlockText } from "./BlockText";
import { BlockHeading } from "./BlockHeading";
import { DropAreaBlock } from "../DropAreaBlock";
import { BlockHtml } from "./BlockHtml";

interface IDesktopItemBlockProps {
  block: IBlock;
  containerIndex: number;
  columnIndex: number;
  blockIndex: number;
  isContainerSelected: boolean;
}
export function DesktopItemBlock({ block, containerIndex, columnIndex, blockIndex, isContainerSelected }: IDesktopItemBlockProps) {

  const dispatch = useDispatch();

  const [over, setOver] = useState<boolean>(false);

  let blockElement = null;
  switch (block.type) {
    case "image":
      blockElement = <BlockImage block={block as IBlockImage} />;
      break;
    case "text":
      blockElement = <BlockText block={block as IBlockText} />;
      break;
    case "heading":
      blockElement = <BlockHeading block={block as IBlockHeading} />;
      break;
    case "html":
      blockElement = <BlockHtml block={block as IBlockHtml} />;
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
        {/* <DropAreaBlock blockIndex={0}/> */}
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
        <div style={{ position: 'relative' }}>
          {isContainerSelected && <DropAreaBlock containerIndex={containerIndex} columnIndex={columnIndex} blockIndex={blockIndex} />}
        </div>
        {/* Overlay */}
        <BlockOverlay isOver={over} block={block} />
      </Box>
    </Fragment>

  );
}
