import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { emailsCurrentEmailActions } from "../../../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { blockDivider, blockHeading, blockHtml, blockImage, blockText } from "../../../../data";
import { IColumn } from "../../../../types";
import { useTranslation } from "react-i18next";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ShortTextOutlinedIcon from '@mui/icons-material/ShortTextOutlined';
import CodeIcon from '@mui/icons-material/Code';
import HMobiledataOutlinedIcon from '@mui/icons-material/HMobiledataOutlined';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';

interface IAddBlockMenuProps {
    anchorEl: null | HTMLElement;
    column: IColumn;
    handleAnchorClear: () => void;
}
export function AddBlockMenu({ anchorEl, column, handleAnchorClear }: IAddBlockMenuProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    function handleSelectMenu(item: string) {
        switch (item) {
            case "image":
                dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockImage) }));
                break;
            case "heading":
                dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockHeading) }));
                break;
            case "text":
                dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockText) }));
                break;
            case "html":
                dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockHtml) }));
                break;
            case "divider":
                dispatch(emailsCurrentEmailActions.addBlock({ columnId: column.id, block: JSON.stringify(blockDivider) }));
                break;
        }
        handleAnchorClear();
    }

    const open = Boolean(anchorEl);

    return (

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleSelectMenu("")}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => handleSelectMenu("image")}>
                <ListItemIcon><InsertPhotoOutlinedIcon /></ListItemIcon>
                <ListItemText>{t('button.image')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu("heading")}>
                <ListItemIcon><HMobiledataOutlinedIcon /></ListItemIcon>
                <ListItemText>{t('button.heading')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu("text")}>
                <ListItemIcon><ShortTextOutlinedIcon /></ListItemIcon>
                <ListItemText>{t('button.text')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu("html")}>
                <ListItemIcon><CodeIcon /></ListItemIcon>
                <ListItemText>{t('button.html')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu("divider")}>
                <ListItemIcon><CommitOutlinedIcon /></ListItemIcon>
                <ListItemText>{t('button.divider')}</ListItemText>
            </MenuItem>
        </Menu>
    );
}
