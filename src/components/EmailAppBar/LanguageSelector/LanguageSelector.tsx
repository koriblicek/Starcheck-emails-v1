import { Button, ButtonGroup } from "@mui/material";
import { APP_LANGUAGES } from "../../../types";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {

    const { i18n } = useTranslation();


    return (
        <ButtonGroup orientation="vertical" >
            {APP_LANGUAGES.map(lng => {
                return <Button size="small" variant="contained" color="info" key={lng} sx={{ p: 0 }}
                    onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}
                >
                    {lng}
                </Button>;
            })}
        </ButtonGroup>
    );
}
