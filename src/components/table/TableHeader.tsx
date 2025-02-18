import React, { useRef, useState, useCallback } from 'react';

interface Sorting {
    key: string;
    ascending: boolean;
}

interface TableHeaderProps {
    allSelected: boolean;
    onSelectAll: () => void;
    sorting: Sorting | null;
    onSort: (key: string) => void;
    columnWidths: { [key: string]: number };
    onColumnResize: (key: string, newWidth: number) => void;
    columnSearchQueries: { [key: string]: string };
    onColumnSearchChange: (columnKey: string, query: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
    allSelected,
    onSelectAll,
    sorting,
    onSort,
    columnWidths,
    onColumnResize,
    columnSearchQueries,
    onColumnSearchChange,
}) => {
    // Refs for resizing
    const resizingColumn = useRef<string | null>(null);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);

    // Local state to toggle search box per column
    const [visibleSearch, setVisibleSearch] = useState<{ [key: string]: boolean }>({});

    const toggleSearchVisibility = useCallback((columnKey: string) => {
        setVisibleSearch((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (resizingColumn.current) {
                const delta = e.clientX - startX.current;
                const newWidth = Math.max(startWidth.current + delta, 50); // minimum width 50px
                onColumnResize(resizingColumn.current, newWidth);
            }
        },
        [onColumnResize]
    );

    const handleMouseUp = useCallback(() => {
        resizingColumn.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, columnKey: string) => {
            e.stopPropagation();
            resizingColumn.current = columnKey;
            startX.current = e.clientX;
            startWidth.current = columnWidths[columnKey];
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },
        [columnWidths, handleMouseMove, handleMouseUp]
    );

    const renderSortButton = useCallback(
        (columnKey: string) => {
            const isSorted = sorting?.key === columnKey;
            const sortIndicator = isSorted ? (sorting.ascending ? '⬇️' : '⬆️') : '↕️';
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSort(columnKey);
                    }}
                    className="ml-2 p-1 rounded hover:bg-gray-300 focus:outline-none"
                    title={isSorted ? (sorting.ascending ? 'Sorted ascending' : 'Sorted descending') : 'Sort column'}
                >
                    {sortIndicator}
                </button>
            );
        },
        [onSort, sorting]
    );

    const renderHeaderCell = useCallback(
        (columnKey: string, label: string) => {
            return (
                <div className="flex flex-col">
                    <div className="flex items-center justify-center">
                        <span>{label}</span>
                        {renderSortButton(columnKey)}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSearchVisibility(columnKey);
                            }}
                            className="ml-2 p-1 rounded hover:bg-gray-300 focus:outline-none"
                            title="Search column"
                        >
                            🔍
                        </button>
                    </div>
                    {visibleSearch[columnKey] && (
                        <div className="mt-1">
                            <input
                                type="text"
                                value={columnSearchQueries[columnKey] || ''}
                                onChange={(e) => onColumnSearchChange(columnKey, e.target.value)}
                                className="w-full p-1 border rounded"
                                placeholder={`Search ${label}`}
                            />
                        </div>
                    )}
                </div>
            );
        },
        [columnSearchQueries, onColumnSearchChange, renderSortButton, toggleSearchVisibility, visibleSearch]
    );

    return (
        <thead className="bg-gray-200">
            <tr className="relative">
                {/* Checkbox Column */}
                <th
                    style={{
                        width: columnWidths.checkbox,
                        position: 'sticky',
                        left: 0,
                        zIndex: 20,
                    }}
                    className="p-2 border border-gray-300 text-center bg-gray-200"
                >
                    <input type="checkbox" checked={allSelected} onChange={onSelectAll} className="w-5 h-5" />
                </th>
                {/* ID Column */}
                <th
                    style={{
                        width: columnWidths.id,
                        position: 'sticky',
                        left: columnWidths.checkbox,
                        zIndex: 20,
                    }}
                    className="p-2 border border-gray-300 text-center bg-gray-200"
                >
                    {renderHeaderCell('id', 'ID')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'id')}
                    ></div>
                </th>
                {/* Name Column */}
                <th
                    style={{
                        width: columnWidths.name,
                        position: 'sticky',
                        left: columnWidths.checkbox + columnWidths.id,
                        zIndex: 20,
                    }}
                    className="p-2 border border-gray-300 text-center bg-gray-200"
                >
                    {renderHeaderCell('name', 'Name')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'name')}
                    ></div>
                </th>
                {/* Company Column */}
                <th style={{ width: columnWidths.company, position: 'relative' }} className="p-2 border border-gray-300 text-center">
                    {renderHeaderCell('company', 'Company')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'company')}
                    ></div>
                </th>
                {/* Status Column */}
                <th style={{ width: columnWidths.status, position: 'relative' }} className="p-2 border border-gray-300 text-center">
                    {renderHeaderCell('status', 'Status')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'status')}
                    ></div>
                </th>
                {/* Lead Score Column */}
                <th style={{ width: columnWidths.leadScore, position: 'relative' }} className="p-2 border border-gray-300 text-center">
                    {renderHeaderCell('leadScore', 'Lead Score')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'leadScore')}
                    ></div>
                </th>
                {/* Action Column */}
                <th style={{ width: columnWidths.action, position: 'relative' }} className="p-2 border border-gray-300 text-center">
                    Action
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'action')}
                    ></div>
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;
