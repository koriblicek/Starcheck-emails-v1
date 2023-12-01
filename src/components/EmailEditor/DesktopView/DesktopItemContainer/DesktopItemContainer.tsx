import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import { IContainer } from "../../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { DesktopItemColumn } from "../DesktopItemColumn";
import { ContainerOverlay } from "./ContainerOverlay";

interface IDesktopItemContainerProps {
    container: IContainer;
}

export function DesktopItemContainer({ container }: IDesktopItemContainerProps) {
    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);

    const items = container.columns.map((column, index) => {
        return <DesktopItemColumn column={column} key={column.id} />;
    });


    return (
        <Fragment>
            <Box sx={{ position: 'relative' }}
                onPointerEnter={() => setOver(true)}
                onPointerLeave={() => setOver(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(emailsCurrentEmailActions.selectContainer({ container: container }));
                }}
            >
                <div className="u-row-container" style={{ paddingTop: container.paddingTopPixels.value + container.paddingTopPixels.sizeSuffix, paddingBottom: container.paddingBottomPixels.value + container.paddingBottomPixels.sizeSuffix, backgroundColor: container.backgroundColor.value }}>
                    <div className="u-row" style={{ margin: '0 auto', minWidth: '320px', maxWidth: container.calculatedWidthPixels + "px", overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: container.contentBackgroundColor.value }}>
                        <div style={{ borderCollapse: 'collapse', display: 'table', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                            {items}
                        </div>
                    </div>
                </div>
                {/* Overlay */}
                <ContainerOverlay isOver={over} container={container} />
                <Box sx={{ position: 'absolute', top: 0, left: 0, fontSize: '9px' }}>{container.id}</Box>
            </Box>
        </Fragment >

    );
}
