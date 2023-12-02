import { AppBar, Tab, Tabs, useTheme } from "@mui/material";
import { IColumn } from "../../../../../types";
import { useTranslation } from "react-i18next";
import { Fragment, useEffect, useState } from "react";
import { ColumnPanel } from "./ColumnPanel";

interface IColumnsListItemProps {
    columns: IColumn[];
}
export function ColumnsListItem({ columns }: IColumnsListItemProps) {

    const { t } = useTranslation();

    const [columnId, setColumnId] = useState<number>(0);

    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setColumnId(newValue);
    };

    const [columnPanel, setColumnPanel] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setColumnPanel(<ColumnPanel column={columns[columnId]} key={columns[columnId].id} />);
    }, [columnId, columns]);

    return (
        <Fragment>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.grey[200] }}>
                <Tabs variant="fullWidth" onChange={handleChange} value={columnId}>
                    {columns.map((column, index) => {
                        return <Tab key={column.id} value={index} label={t('containers.column') + " " + (index + 1)} />;
                    })}
                </Tabs>
            </AppBar>
            {columnPanel}
        </Fragment>

    );
}
