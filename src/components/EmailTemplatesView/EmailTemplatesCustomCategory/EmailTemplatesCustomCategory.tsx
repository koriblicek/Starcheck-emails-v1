import { Alert, Grid } from "@mui/material";
import { ITemplate } from "../../../types";
import { EmailTemplateItem } from "../EmailTemplateItem";
import { Fragment } from "react";

interface IEmailTemplatesCustomCategoryProps {
    templates: ITemplate[];
    errorMessage: string;
}
export function EmailTemplatesCustomCategory({ templates, errorMessage }: IEmailTemplatesCustomCategoryProps) {

    const items = Object.values(templates).map((template) => {
        return (<Grid item key={template.id}><EmailTemplateItem template={template} isCustomTemplate={true} /></Grid>);
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
