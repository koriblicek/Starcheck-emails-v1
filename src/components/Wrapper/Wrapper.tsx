import { Box } from "@mui/material";
import { EmailTemplatesView } from "../EmailTemplatesView";
import { useAppSelector } from "../../store/hooks";
import { EmailEditor } from "../EmailEditor";
import { APP_MIN_WIDTH } from "../../types";
import { EmailAppBar } from "../EmailAppBar";


export function Wrapper() {

    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    console.log("Wrapper");
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
