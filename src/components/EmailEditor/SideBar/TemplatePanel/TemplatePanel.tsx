import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { ITemplate } from "../../../../types";
import { useState } from "react";
import { ControlColor } from "../shared/ControlColor";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { useTranslation } from "react-i18next";
import { ControlSize } from "../shared/ControlSize";
import { ControlText } from "../shared/ControlText";
import { ContainersList } from "./ContainersList";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

interface ITemplatePanelProps {
    template: ITemplate;
}
export function TemplatePanel({ template }: ITemplatePanelProps) {

    const dispatch = useDispatch();

    const [openContainers, setOpenContainers] = useState(true);
    const [openGeneral, setOpenGeneral] = useState(true);
    const [openEmailTemplate, setOpenEmailTemplate] = useState(true);

    const { t } = useTranslation();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateTemplateProperty({ propertyKey, value }));
    }
    return (
        <Box sx={{ mt: 2 }}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" color="primary" sx={{ p: 1 }}>
                        <Typography variant="h5" align="center">{t('templates.email_template_settings').toUpperCase()}</Typography>
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={() => setOpenContainers((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><Inventory2OutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('templates.containers').toUpperCase()} />
                    {openContainers ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openContainers} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }}>
                        <ContainersList />
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenGeneral((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('templates.general').toUpperCase()} />
                    {openGeneral ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openGeneral} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }}>
                        <ControlText propertyKey="name" data={template.name} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ m: 1 }} />
                        <ControlColor propertyKey="backgroundColor" data={template.backgroundColor} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ m: 1 }} />
                        <ControlColor propertyKey="textColor" data={template.textColor} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ m: 1 }} />
                        <ControlSize propertyKey="contentWidthPixels" data={template.contentWidthPixels} handleUpdateProperty={updateKey} />
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenEmailTemplate((state) => !state)} sx={{ pt: 0, pb: 0, backgroundColor: "lightgray" }}>
                    <ListItemIcon><EmailOutlinedIcon /></ListItemIcon>
                    <ListItemText primary={t('templates.template_header').toUpperCase()} />
                    {openEmailTemplate ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openEmailTemplate} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ padding: 1 }}>
                        <ControlText propertyKey="subjectLine" data={template.subjectLine} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ m: 1 }} />
                        <ControlText propertyKey="previewLine1" data={template.previewLine1} handleUpdateProperty={updateKey} />
                        <Divider light sx={{ m: 1 }} />
                        <ControlText propertyKey="previewLine2" data={template.previewLine2} handleUpdateProperty={updateKey} />
                    </List>
                </Collapse>
            </List>
        </Box>
    );
}