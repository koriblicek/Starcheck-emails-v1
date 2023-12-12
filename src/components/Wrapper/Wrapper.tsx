import { Box } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { EmailEditor } from "../EmailEditor";
import { APP_MIN_WIDTH } from "../../types";
import { EmailAppBar } from "../EmailAppBar";
import { EmailTemplatesView } from "../EmailTemplatesView";

export function Wrapper() {

    const template = useAppSelector(state => state.emailsCurrentEmail.template);

    return (
        <Box sx={{ minWidth: APP_MIN_WIDTH }}>
            <EmailAppBar />
            {template ?
                <EmailEditor />
                :
                <EmailTemplatesView />
            }
        </Box>
    );
}