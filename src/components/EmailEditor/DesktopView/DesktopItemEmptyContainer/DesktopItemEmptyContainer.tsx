import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function DesktopItemEmptyContainer() {
    
    const { t } = useTranslation();
    
    const theme = useTheme()
    
    return (
        <Box sx={{ textAlign: 'center', border: `1px ${theme.palette.info.main} dashed`, padding: '10px' }}>
            <Typography variant="body1">{t('message.noContainerInTemplate')}</Typography>
        </Box>
    );
}
