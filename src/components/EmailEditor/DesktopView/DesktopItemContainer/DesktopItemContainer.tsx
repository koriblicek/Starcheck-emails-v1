import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { IContainer } from "../../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import { DesktopItemColumn } from "../DesktopItemColumn";
import { ContainerOverlay } from "../ContainerOverlay";
import { useAppSelector } from "../../../../store/hooks";
import { DropAreaContainer } from "../DropAreaContainer";

interface IDesktopItemContainerProps {
    container: IContainer;
    containerIndex: number;
}

export function DesktopItemContainer({ container, containerIndex }: IDesktopItemContainerProps) {
    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);

    const { selectedContainer } = useAppSelector(state => state.emailsCurrentEmail);

    const [isSelected, setIsSelected] = useState<boolean>(false);

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    const containerWidth = editorMobileView ? 320 : container.calculatedWidthPixels;

    useEffect(() => {
        if (selectedContainer) {
            if (selectedContainer.id === container.id) {
                setIsSelected(true);
            } else {
                setIsSelected(false);
            }
        } else {
            setIsSelected(false);
        }
    }, [selectedContainer, container.id]);

    const items = container.columns.map((column, index) => {
        return <DesktopItemColumn column={column} isContainerSelected={isSelected} containerIndex={containerIndex} columnIndex={index} key={column.id} />;
    });

    return (
        <Fragment>
            <Box sx={{ position: 'relative' }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setOver(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setOver(false);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(emailsCurrentEmailActions.selectContainer({ container: container }));
                }}
            >
                <div className="sc-container-parent" style={{ paddingTop: container.paddingTopPixels.value + container.paddingTopPixels.sizeSuffix, paddingBottom: container.paddingBottomPixels.value + container.paddingBottomPixels.sizeSuffix, ...(container.backgroundColor.value !== "transparent" ? { backgroundColor: container.backgroundColor.value } : {}) }}>
                    <div className="sc-container" style={{ margin: '0 auto',minWidth: '320px', maxWidth: containerWidth + "px", overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', ...(container.contentBackgroundColor.value !== "transparent" ? { backgroundColor: container.contentBackgroundColor.value } : {}) }}>
                        <div style={{ borderCollapse: 'collapse', display: 'table', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                            {items}
                        </div>
                    </div>
                </div>
                <DropAreaContainer containerIndex={containerIndex + 1} />
                {/* Overlay */}
                <ContainerOverlay isOver={over} container={container} />
                {/* ID */}
                {/* <Box sx={{ position: 'absolute', top: 0, left: 0, fontSize: '9px' }}>{container.id}</Box> */}
            </Box>
        </Fragment >

    );
}
