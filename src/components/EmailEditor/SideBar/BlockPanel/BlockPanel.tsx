import { useDispatch } from "react-redux";
import { IBlock, IBlockButton, IBlockDivider, IBlockHeading, IBlockHtml, IBlockImage, IBlockText } from "../../../../types";
import { useEffect, useState } from "react";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ControlSize } from "../shared/ControlSize";
import { useAppSelector } from "../../../../store/hooks";
import { ImageBlock } from "./ImageBlock";
import { TextBlock } from "./TextBlock";
import { HeadingBlock } from "./HeadingBlock";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import { HtmlBlock } from "./HtmlBlock";
import { DividerBlock } from "./DividerBlock";
import { ButtonBlock } from "./ButtonBlock";

interface IBlockPanelProps {
    block: IBlock;
}
export function BlockPanel({ block }: IBlockPanelProps) {
    const dispatch = useDispatch();

    const { selectedBlock } = useAppSelector(state => state.emailsCurrentEmail);

    const [openGeneral, setOpenGeneral] = useState(true);
    const [openBlockProperties, setOpenBlockProperties] = useState(true);

    const [blockPanel, setBlockPanel] = useState<JSX.Element | null>(null);

    const { t } = useTranslation();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

    useEffect(() => {
        if (selectedBlock)
            switch (selectedBlock.type) {
                case "image":
                    setBlockPanel(<ImageBlock block={selectedBlock as IBlockImage} key={block.id} />);
                    break;
                case "text":
                    setBlockPanel(<TextBlock block={selectedBlock as IBlockText} key={block.id} />);
                    break;
                case "heading":
                    setBlockPanel(<HeadingBlock block={selectedBlock as IBlockHeading} key={block.id} />);
                    break;
                case "html":
                    setBlockPanel(<HtmlBlock block={selectedBlock as IBlockHtml} key={block.id} />);
                    break;
                case "divider":
                    setBlockPanel(<DividerBlock block={selectedBlock as IBlockDivider} key={block.id} />);
                    break;
                case "button":
                    setBlockPanel(<ButtonBlock block={selectedBlock as IBlockButton} key={block.id} />);
                    break;
            }
    }, [selectedBlock, block.id]);

    return (
        <Box sx={{ mt: 2 }}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" color="primary" sx={{ p: 1 }}>
                        <Typography variant="h5" align="center">{t('blocks.block_settings').toUpperCase()}</Typography>
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={() => setOpenGeneral((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('blocks.general').toUpperCase()} />
                    {openGeneral ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openGeneral} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }} key={block.id}>
                        <ControlSize propertyKey="paddingTop" data={block.paddingTop} handleUpdateProperty={updateKey} />
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <ControlSize propertyKey="paddingLeftRight" data={block.paddingLeftRight} handleUpdateProperty={updateKey} />
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <ControlSize propertyKey="paddingBottom" data={block.paddingBottom} handleUpdateProperty={updateKey} />
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenBlockProperties((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><DatasetOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('blocks.element').toUpperCase()} />
                    {openBlockProperties ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBlockProperties} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }}>
                        {blockPanel}
                    </List>
                </Collapse>
            </List>
        </Box>
    );
}
