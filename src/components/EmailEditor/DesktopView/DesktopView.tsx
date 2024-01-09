import { Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { DesktopItemContainer } from "./DesktopItemContainer";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../store/emails-data/emailsCurrentEmailSlice";
import { DesktopItemEmptyContainer } from "./DesktopItemEmptyContainer";
import { useTranslation } from "react-i18next";
import { DropAreaContainer } from "./DropAreaContainer";
import { SendPreviewMail } from "./SendPreviewMail";
import transparency_background from "../../../assets/images/transparency_background.png";
import HtmlIcon from '@mui/icons-material/Html';
import { useState } from "react";

const mobileWidth: number = 320;
export function DesktopView() {

    const dispatch = useDispatch();

    const theme = useTheme();

    const { t, i18n } = useTranslation();

    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    const { urls } = useAppSelector(state => state.emailsSettings);

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    const [toggle, setToggle] = useState<string[]>([]);

    function handleToggle(event: React.MouseEvent<HTMLElement>, newData: string[]) {
        setToggle(newData);
    };

    if (!template)
        return null;

    const templateWidth = editorMobileView ? mobileWidth : template.contentWidthPixels.value;
    const innerBoxWidth = editorMobileView ? { width: '320px' } : {};
    //all containers
    const css = editorMobileView ?
        `
        .sc-container-parent { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; }
        .sc-container .sc-column { min-width: 320px !important; max-width: 100% !important; display: block !important; }
        .sc-container { width: 100% !important; }
        .sc-column { width: 100% !important; }
        .sc-column > div { margin: 0 auto; }
        p { margin: 0; }
        ${template.mobileCss.value}
    `
        : `
        p { margin: 0; }
        .sc-container { width: ${templateWidth + template.contentWidthPixels.sizeSuffix} !important; }
        .sc-container .sc-column { vertical-align: top; }
    `;

    const items = template.containers.map((container, index) => {
        return <DesktopItemContainer container={container} key={container.id} containerIndex={index} />;
    });

    return (
        <Box sx={{ minWidth: (templateWidth + 60) + template.contentWidthPixels.sizeSuffix, margin: '0px', padding: '30px', background: `url(${transparency_background})` }}
            onClick={() => dispatch(emailsCurrentEmailActions.clearSelection())}
        >
            <Box sx={{ backgroundColor: 'white', m: 2, margin: 'auto auto', ...innerBoxWidth }}>
                <Box sx={{ border: '1px gray dotted', borderLeft: `3px ${theme.palette.primary.main} solid`, backgroundColor: 'white' }}>
                    <Grid container p={1}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="GrayText">{t('templates.sender_adress')} </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color={theme.palette.primary.main}>{template.subjectLine.value !== "" ? template.subjectLine.value : " "}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color={theme.palette.primary.main}>{new Date(template.modificationDate).toLocaleString(i18n.language)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="GrayText">{template.previewLine1.value}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="GrayText">{template.previewLine2.value}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="CaptionText">{t('templates.preview_email_adress') + ": "}<i>{urls.emailAdressTest + " / " + template.previewEmailAddresses.value}</i></Typography>
                        </Grid>

                        <Grid item>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </Box>
                <Grid container sx={{ p: 1 }} justifyContent='end' alignItems='center' rowGap={1} columnGap={1}>
                    <Grid item >
                        <SendPreviewMail />
                    </Grid>
                    {!editorMobileView &&
                        <Grid item>
                            <ToggleButtonGroup size="small" value={toggle} color="secondary" onChange={handleToggle}>
                                <ToggleButton value="html" size="small" ><HtmlIcon fontSize="small" /></ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>

                    }
                    {(!editorMobileView && toggle[0] === "html") &&
                        <Grid item xs={12}><TextField fullWidth value={template.exportedText} multiline rows={8} sx={{ fontSize: 6 }}></TextField></Grid>
                    }
                </Grid>
            </Box>
            <Box sx={{ borderTop: '1px gray dotted', margin: 'auto', padding: '0px', backgroundColor: template.backgroundColor.value, ...(template.textColor.value !== "transparent" ? { color: template.textColor.value } : {}), ...innerBoxWidth }}>
                <style>
                    {css}
                </style>
                <table cellSpacing={0} cellPadding={0} style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0, verticalAlign: 'top', minWidth: '320px', margin: '0 auto', ...(template.backgroundColor.value !== "transparent" ? { backgroundColor: template.backgroundColor.value } : { backgroundColor: '#ffffff' }) }}>
                    <tbody>
                        <tr style={{ verticalAlign: 'top' }}>
                            <td style={{ borderCollapse: 'collapse', verticalAlign: 'top' }}>
                                {/* if no items in container */}

                                <div style={{ position: 'relative' }}>
                                    <DropAreaContainer containerIndex={0} />
                                </div>
                                {template.containers.length === 0
                                    ?
                                    <DesktopItemEmptyContainer />
                                    :
                                    items
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Box >
    );

}
