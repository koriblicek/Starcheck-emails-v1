import { Button, Card, CardActions, CardContent, CardHeader, Fade, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ITemplate } from "../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../store/debuilder-data/emailsCurrentEmailSlice";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

interface IEmailTemplateItemProps {
    template: ITemplate;
    isCustomTemplate: boolean;
}

export function EmailTemplateItem({ template, isCustomTemplate }: IEmailTemplateItemProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [cursorOver, setCursorOver] = useState<boolean>(false);

    return (
        <Fade in timeout={1000}>
            <Card
                elevation={cursorOver ? 6 : 1}
                onPointerEnter={() => setCursorOver(true)}
                onPointerLeave={() => setCursorOver(false)}
                sx={{ width: '300px' }}
            >
                <CardHeader title={template.name} subheader={template.id} subheaderTypographyProps={{ variant: "subtitle2" }} />
                <CardContent sx={{ p: 1 }}>
                    <Grid container justifyContent='space-evenly'>
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item><CalendarMonthOutlinedIcon fontSize="small" /></Grid><Grid item><Typography variant="body1">{(new Date(template.modificationDate)).toLocaleDateString('sk')}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item><Typography variant="body1">{(new Date(template.modificationDate)).toLocaleTimeString('sk')}</Typography></Grid><Grid item><AccessTimeOutlinedIcon fontSize="small" /></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>

                {
                    isCustomTemplate ?
                        <Fade in={cursorOver} timeout={600}>
                            <CardActions sx={{ p: 0, pb: 1, justifyContent: "center" }}>
                                <Button size="small" color="info" variant="contained" startIcon={<EditNoteOutlinedIcon />}
                                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: false }))}
                                >
                                    {t('button.editTemplate')}</Button>
                                <Button size="small" color="error" variant="contained" startIcon={<DeleteOutlineOutlinedIcon />}
                                    onClick={() => console.log("TODO")}
                                >
                                    {t('button.removeTemplate')}</Button>
                            </CardActions>
                        </Fade>
                        :
                        <Fade in={cursorOver} timeout={600}>
                            <CardActions sx={{ p: 1, justifyContent: "center" }}>
                                <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => dispatch(emailsCurrentEmailActions.setTemplate({ template: template, updateIds: true }))}
                                >{t('button.createCopyTemplate')}</Button>
                            </CardActions>
                        </Fade>
                }
            </Card >
        </Fade>
    );
}
