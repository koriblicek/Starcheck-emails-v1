import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { IContainer } from "../../../../types";
import { useState } from "react";
import { ControlColor } from "../shared/ControlColor";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { useTranslation } from "react-i18next";
import { ControlSize } from "../shared/ControlSize";
import { ColumnsListItem } from "./ColumnsListItem";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';

interface IContainerPanelProps {
    container: IContainer;
}
export function ContainerPanel({ container }: IContainerPanelProps) {

    const dispatch = useDispatch();

    const [openBlocks, setOpenBlocks] = useState(true);
    const [openGeneral, setOpenGeneral] = useState(true);
    const [openColumns, setOpenColumns] = useState(true);

    const { t } = useTranslation();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateContainerProperty({ containerId: container.id, propertyKey: propertyKey, value }));
    }

    return (
        <Box sx={{ mt: 2 }}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" color="primary" sx={{ p: 1 }}>
                        <Typography variant="h5" align="center">{t('containers.container_settings').toUpperCase()}</Typography>
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={() => setOpenBlocks((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><DatasetOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('containers.blocks').toUpperCase()} />
                    {openBlocks ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBlocks} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }}>
                        {/* <ContainersList /> */}
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenGeneral((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('containers.general').toUpperCase()} />
                    {openGeneral ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openGeneral} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }} key={container.id}>
                        <ControlColor propertyKey="backgroundColor" data={container.backgroundColor} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ mt: 1, mb: 1 }} />
                        <ControlColor propertyKey="contentBackgroundColor" data={container.contentBackgroundColor} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ mt: 1, mb: 1 }} />
                        <ControlSize propertyKey="paddingTopPixels" data={container.paddingTopPixels} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ mt: 1, mb: 1 }} />
                        <ControlSize propertyKey="paddingBottomPixels" data={container.paddingBottomPixels} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ mt: 1, mb: 1 }} />
                        TODO PERCENTAGE SIZE
                        {/* <ControlSlider propertyKey="columnsWidthsPercents" data={container.columnsWidthsPercents} handleUpdateProperty={updateKey} /> */}
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenColumns((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><ViewWeekOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('containers.columns').toUpperCase()} />
                    {openColumns ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openColumns} timeout="auto" unmountOnExit>
                    <List component="div" >
                        <ColumnsListItem columns={container.columns} key={container.id} />
                    </List>
                </Collapse>
            </List>
        </Box>
    );
}
