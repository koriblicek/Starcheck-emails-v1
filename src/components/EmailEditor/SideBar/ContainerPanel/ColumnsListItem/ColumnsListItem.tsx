import { Tab, Tabs } from "@mui/material";
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setColumnId(newValue);
    };
    return (
        <Fragment>
            <Tabs variant="fullWidth" onChange={handleChange} value={columnId}>
                {container.columns.map((column, index) => {
                    return <Tab key={column.id} value={index} label={t('containers.column') + " " + (index + 1)} />;
                })}
            </Tabs>
            <ColumnPanel column={container.columns[columnId]} key={columnId} />
        </Fragment>

    );
}
