import { Alert, Box, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { ITemplate } from "../../../types";
import { EmailTemplateActions } from "../EmailTemplateItem";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IEmailTemplatesCategoryProps {
    templates: ITemplate[];
    isCustomTemplate: boolean;
    errorMessage: string;
}

type TemplateSortField = 'name' | 'modificationDate';
type TemplateSortDirection = 'asc' | 'desc';
type StoredSortModel = Array<{ field: TemplateSortField; sort: TemplateSortDirection }>;

const defaultSortModel: GridSortModel = [{ field: 'modificationDate', sort: 'desc' }];

function getStorageKey(isCustomTemplate: boolean) {
    return `apiemails.template-table-sort.${isCustomTemplate ? 'custom' : 'builtin'}`;
}

function readSortModel(storageKey: string): GridSortModel {
    try {
        const storedValue: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? 'null');

        if (!Array.isArray(storedValue)) {
            return defaultSortModel;
        }

        const validSortModel = storedValue.filter((item): item is StoredSortModel[number] => (
            typeof item === 'object'
            && item !== null
            && (item.field === 'name' || item.field === 'modificationDate')
            && (item.sort === 'asc' || item.sort === 'desc')
        ));

        return validSortModel.slice(0, 1);
    } catch {
        return defaultSortModel;
    }
}

export function EmailTemplatesCategory({ templates, isCustomTemplate, errorMessage }: IEmailTemplatesCategoryProps) {
    const { t, i18n } = useTranslation();
    const storageKey = getStorageKey(isCustomTemplate);
    const [sortModel, setSortModel] = useState<GridSortModel>(() => readSortModel(storageKey));

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(sortModel));
    }, [sortModel, storageKey]);

    const columns: GridColDef<ITemplate>[] = [
        {
            field: 'name',
            headerName: t('table.templateName'),
            flex: 1,
            minWidth: 240,
            valueGetter: (params) => params.row.name.value,
        },
        {
            field: 'modificationDate',
            headerName: t('table.modificationDate'),
            minWidth: 190,
            flex: 0.5,
            renderCell: (params) => new Date(params.row.modificationDate).toLocaleString(i18n.language),
        },
        {
            field: 'actions',
            headerName: t('table.actions'),
            sortable: false,
            filterable: false,
            minWidth: isCustomTemplate ? 130 : 60,
            flex: 0.25,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <EmailTemplateActions template={params.row} isCustomTemplate={isCustomTemplate} />
            ),
        },
    ];

    if (templates.length === 0) {
        return (
            <Grid item>
                <Alert variant="standard" color="info">{errorMessage}</Alert>
            </Grid>
        );
    }

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    autoHeight
                    rows={templates}
                    columns={columns}
                    sortModel={sortModel}
                    onSortModelChange={(nextSortModel) => setSortModel(nextSortModel.slice(0, 1))}
                    disableRowSelectionOnClick
                    pagination
                    pageSizeOptions={[10, 25, 50]}
                    initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                    getRowClassName={(params) => (
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'template-row-even' : 'template-row-odd'
                    )}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(25, 118, 210, 0.10)',
                            color: 'primary.dark',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 700,
                        },
                        '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton': {
                            color: 'inherit',
                        },
                        '& .MuiDataGrid-row.template-row-even': {
                            backgroundColor: 'rgba(25, 118, 210, 0.035)',
                        },
                        '& .MuiDataGrid-row.template-row-odd': {
                            backgroundColor: 'background.paper',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                    }}
                />
            </Box>
        </Grid>
    );
}
