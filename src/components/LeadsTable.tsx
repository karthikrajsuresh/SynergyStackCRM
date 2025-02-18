import React from 'react';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import Pagination from './table/Pagination';
import { Lead } from '../store/leadsSlice';

interface LeadsTableProps {
    leads: Lead[];
    columnWidths: { [key: string]: number };
    sorting: { key: string; ascending: boolean } | null;
    onSort: (key: string) => void;
    onColumnResize: (key: string, newWidth: number) => void;
    columnSearchQueries: { [key: string]: string };
    onColumnSearchChange: (columnKey: string, query: string) => void;
    selectedIds: number[];
    onSelectRow: (id: number) => void;
    onSelectAll: () => void;
    onDragStart: (id: number) => void;
    onDrop: (id: number) => void;
    currentPage: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({
    leads,
    columnWidths,
    sorting,
    onSort,
    onColumnResize,
    columnSearchQueries,
    onColumnSearchChange,
    selectedIds,
    onSelectRow,
    onSelectAll,
    onDragStart,
    onDrop,
    currentPage,
    rowsPerPage,
    totalItems,
    onPageChange,
}) => {
    const calculateTotalWidth = (widths: { [key: string]: number }) =>
        Object.values(widths).reduce((acc, w) => acc + w, 0);
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                <table
                    id="my-table"
                    className="min-w-full text-sm divide-y divide-gray-200"
                    style={{ minWidth: calculateTotalWidth(columnWidths) }}
                >
                    <TableHeader
                        allSelected={leads.every((lead) => selectedIds.includes(lead.id))}
                        onSelectAll={onSelectAll}
                        sorting={sorting}
                        onSort={onSort}
                        columnWidths={columnWidths}
                        onColumnResize={onColumnResize}
                        columnSearchQueries={columnSearchQueries}
                        onColumnSearchChange={onColumnSearchChange}
                    />
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => (
                            <TableRow
                                key={lead.id}
                                lead={lead}
                                isSelected={selectedIds.includes(lead.id)}
                                onSelect={() => onSelectRow(lead.id)}
                                columnWidths={columnWidths}
                                onDragStart={() => onDragStart(lead.id)}
                                onDrop={() => onDrop(lead.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
};

export default LeadsTable;
