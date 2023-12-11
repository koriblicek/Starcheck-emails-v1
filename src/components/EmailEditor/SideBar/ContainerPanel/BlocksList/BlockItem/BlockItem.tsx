import { useDispatch } from "react-redux";
import { IBlock } from "../../../../../../types";
import { emailsAppActions } from "../../../../../../store/emails-data/emailsAppSlice";
import { Card, CardActions, Grid, Typography } from "@mui/material";
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useTranslation } from "react-i18next";

interface IBlockItemProps {
    block: IBlock;
}
export function BlockItem({ block }: IBlockItemProps) {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    function handleOnDragStart(e: React.DragEvent, block: IBlock) {
        e.dataTransfer.setData("data", JSON.stringify(block));
        e.dataTransfer.setData("dragType", "addBlock");
        dispatch(emailsAppActions.setBlockDrag({ status: true }));
    }

    function handleOnDragEnd(e: React.DragEvent) {
        dispatch(emailsAppActions.setBlockDrag({ status: false }));
    }

    return (
        <Card elevation={1} sx={{ cursor: 'grab', ':hover': { boxShadow: 5 } }}
            draggable
            onDragStart={(e) => handleOnDragStart(e, block)}
            onDragEnd={(e) => handleOnDragEnd(e)}
        >
            <CardActions sx={{ p: '5px' }}>
                <Grid container alignItems='center' wrap="nowrap">
                    <Grid item>
                        <DragIndicatorOutlinedIcon sx={{ mr: 1 }} />
                    </Grid>
                    <Grid item xs>
                        <Grid container rowGap={1} justifyContent='center'>
                            <Grid item>
                                <img src={block.logo} alt='' style={{ display: 'block' }} />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}><Typography variant="caption" > {t('button.' + block.type)}</Typography></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
