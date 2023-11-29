import { Box, Card, CardActions, Grid } from "@mui/material";
import { IContainer } from "../../../../../../types";
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useDispatch } from "react-redux";
import { emailsAppActions } from "../../../../../../store/debuilder-data/emailsAppSlice";

interface IContainerItemProps {
    container: IContainer;
}
export function ContainerItem({ container }: IContainerItemProps) {
    const dispatch = useDispatch();

    function handleOnDragStart(e: React.DragEvent, container: IContainer) {
        e.dataTransfer.setData("data", JSON.stringify(container));
        e.dataTransfer.setData("dragType", "addContainer");
        dispatch(emailsAppActions.setContainerDrag({ status: true }));
    }

    function handleOnDragEnd(e: React.DragEvent) {
        dispatch(emailsAppActions.setContainerDrag({ status: false }));
    }

    function handleOnClick(e: React.MouseEvent<HTMLElement>) {
        switch (e.detail) {
            case 2:
                //double click
                //TODO
                console.log("TODO");
                //dispatch(debuilderSaveActions.addModuleEnd({ module: JSON.parse(JSON.stringify(module)), selectAddedModule: false }));
                break;
        }
    }
    return (
        <Card elevation={1} sx={{ cursor: 'grab', ':hover': { boxShadow: 5 } }}
            draggable
            onDragStart={(e) => handleOnDragStart(e, container)}
            onDragEnd={(e) => handleOnDragEnd(e)}
            onClick={(e) => handleOnClick(e)}
        >
            <CardActions>
                <Grid container alignItems='center' justifyContent='center' justifyItems='center'>
                    <Grid item>
                        <DragIndicatorOutlinedIcon sx={{ mr: 1 }} />
                    </Grid>
                    <Grid item xs >
                        <img src={container.logo} alt='' style={{ display: 'block' }} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
