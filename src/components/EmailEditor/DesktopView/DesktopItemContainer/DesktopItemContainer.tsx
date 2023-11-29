import { Box } from "@mui/material";
import { Fragment, useState } from "react";
//import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useAppSelector } from "../../../../store/hooks";

export function DesktopItemContainer() {
    const [visible, setVisible] = useState<boolean>(false);

    const { selectedContainer } = useAppSelector(state => state.emailsCurrentEmail);

    return (
        <Fragment>
            <Box sx={{ position: 'relative' }}
                onPointerEnter={() => setVisible(true)}
                onPointerLeave={() => setVisible(false)}
            >
                test
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: "#00000010",
                        left: '-50px',
                        right: '-50px',
                        top: 0,
                        bottom: 0,
                        border: selectedContainer ? '1px blue dashed' : '1px lightblue dashed',
                        //visibility: (visible) ? "visible" : "hidden",
                        opacity: visible ? 1:.000001,
                        pointerEvents: 'none'
                    }}
                >
                    <Box sx={{ pointerEvents: 'auto', position: 'absolute', right: 0 }} onClick={() => setVisible(false)}>
                        asd
                    </Box>
                </Box>
            </Box>
        </Fragment >

    );
}
