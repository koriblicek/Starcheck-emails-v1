import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export function DesktopItemEmptyContainer() {
    const { t } = useTranslation();
    return (
        <Box sx={{ textAlign: 'center', border: '2px #0000ff80 dashed', padding: '10px' }}>
            {t('message.noContainerInTemplate')}
        </Box>
    );
}
