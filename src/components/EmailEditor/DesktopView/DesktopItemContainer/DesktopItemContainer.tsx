import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { IContainer } from "../../../../types";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../../store/debuilder-data/emailsCurrentEmailSlice";
import { DesktopItemColumn } from "../DesktopItemColumn";
import { ContainerOverlay } from "../ContainerOverlay";
import { useAppSelector } from "../../../../store/hooks";
import { DropAreaContainer } from "../DropAreaContainer";

interface IDesktopItemContainerProps {
    container: IContainer;
    index: number;
}

export function DesktopItemContainer({ container, index }: IDesktopItemContainerProps) {
    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);

    const { selectedContainer } = useAppSelector(state => state.emailsCurrentEmail);

    const [isSelected, setIsSelected] = useState<boolean>(false);

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

    const items = container.columns.map(column => {
        return <DesktopItemColumn column={column} isSelected={isSelected} key={column.id} />;
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
                <DropAreaContainer containerIndex={index + 1} />
                {/* Overlay */}
                <ContainerOverlay isOver={over} container={container} />
                {/* ID */}
                {/* <Box sx={{ position: 'absolute', top: 0, left: 0, fontSize: '9px' }}>{container.id}</Box> */}
            </Box>
        </Fragment >

    );
}
