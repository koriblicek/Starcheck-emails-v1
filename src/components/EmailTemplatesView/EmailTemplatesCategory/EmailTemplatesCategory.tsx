import { Alert, Grid } from "@mui/material";
import { ITemplate } from "../../../types";
import { EmailTemplateItem } from "../EmailTemplateItem";
import { Fragment } from "react";

interface IEmailTemplatesCategoryProps {
    templates: ITemplate[];
    isCustomTemplate: boolean;
    errorMessage: string;
}
export function EmailTemplatesCategory({ templates, isCustomTemplate, errorMessage }: IEmailTemplatesCategoryProps) {

    const items = templates.map((template) => {
        return (<Grid item key={template.id}><EmailTemplateItem template={template} isCustomTemplate={isCustomTemplate} /></Grid>);
    });

    return (
        <Fragment>
            {/* builtin templates */}
            {(items.length !== 0)
                ?
                items
                :
                <Grid item>
                    <Alert variant="standard" color="info">{errorMessage}</Alert>
                </Grid>
            }
        </Fragment>
    );
}
