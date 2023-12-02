import { useDispatch } from "react-redux";
import { IBlock } from "../../../../types";
import { useState } from "react";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ControlSize } from "../shared/ControlSize";

interface IBlockPanelProps {
    block: IBlock;
}
export function BlockPanel({ block }: IBlockPanelProps) {
    const dispatch = useDispatch();

    const [openGeneral, setOpenGeneral] = useState(true);

    const { t } = useTranslation();

    function updateKey(propertyKey: string, value: string) {
        //dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

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
                    <List component="div" sx={{ padding: 1 }}>
                        <ControlSize propertyKey="padding" data={block.padding} handleUpdateProperty={updateKey} />
                    </List>
                </Collapse>
                {/* <ListItemButton onClick={() => setOpenColumns((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><ViewWeekOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('containers.columns').toUpperCase()} />
                    {openColumns ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openColumns} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ColumnsListItem container={container} />
                    </List>
                </Collapse> */}
            </List>
        </Box>
    );
}
