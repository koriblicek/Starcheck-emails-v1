import { AppBar, Tab, Tabs, useTheme } from "@mui/material";
import { IContainer } from "../../../../../types";
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { ColumnPanel } from "./ColumnPanel";

interface IColumnsListItemProps {
    container: IContainer;
}
export function ColumnsListItem({ container }: IColumnsListItemProps) {

    const { t } = useTranslation();

    const [columnId, setColumnId] = useState<number>(0);

    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setColumnId(newValue);
    };

    return (
        <Fragment>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.grey[200] }}>
                <Tabs variant="fullWidth" onChange={handleChange} value={columnId}>
                    {container.columns.map((column, index) => {
                        return <Tab key={column.id} value={index} label={t('containers.column') + " " + (index + 1)} />;
                    })}
                </Tabs>
            </AppBar>
            <ColumnPanel column={container.columns[columnId]} />
        </Fragment>

    );
}
