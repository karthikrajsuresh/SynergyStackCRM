// src/components/table/TableHeader.tsx
import React, { useRef } from 'react';

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
}

const TableHeader: React.FC<TableHeaderProps> = ({
    allSelected,
    onSelectAll,
    sorting,
    onSort,
    columnWidths,
    onColumnResize,
}) => {
    const resizingColumn = useRef<string | null>(null);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);

    const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
        e.stopPropagation();
        resizingColumn.current = columnKey;
        startX.current = e.clientX;
        startWidth.current = columnWidths[columnKey];
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (resizingColumn.current) {
            const delta = e.clientX - startX.current;
            const newWidth = Math.max(startWidth.current + delta, 50); // minimum 50px
            onColumnResize(resizingColumn.current, newWidth);
        }
    };

    const handleMouseUp = () => {
        resizingColumn.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const renderSortIndicator = (columnKey: string) => {
        if (!sorting || sorting.key !== columnKey) {
            return <span className="ml-1 text-gray-400">⇅</span>;
        }
        return (
            <span className="ml-1">
                {sorting.ascending ? (
                    <span>▲</span>
                ) : (
                    <span>▼</span>
                )}
            </span>
        );
    };

    return (
        <thead className="bg-gray-200">
            <tr className="relative">
                {/* Checkbox Column - non-resizable */}
                <th
                    // className="p-2 border border-gray-300 text-center sticky left-0 z-20 bg-gray-200"
                    // style={{ width: columnWidths['checkbox'] }}

                    // Update the frozen columns' JSX:
                    style={{
                        width: columnWidths.checkbox,
                        position: 'sticky',
                        left: 0,
                        zIndex: 20,
                        backgroundColor: '#e5e7eb', // bg-gray-200
                    }}
                    className="p-2 border border-gray-300 text-center"


                >
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onSelectAll}
                        className="w-5 h-5"
                    />
                </th>
                {/* ID Column */}
                <th
                    // className="p-2 border border-gray-300 text-center cursor-pointer sticky left-[50px] z-20 bg-gray-200"
                    // style={{ width: columnWidths['id'] }}
                    // onClick={() => onSort('id')}

                    style={{
                        width: columnWidths.id,
                        position: 'sticky',
                        left: columnWidths.checkbox,
                        zIndex: 20,
                        backgroundColor: '#e5e7eb',
                    }}
                    className="p-2 border border-gray-300 text-center cursor-pointer"
                    onClick={() => onSort('id')}
                >
                    ID {renderSortIndicator('id')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'id')}
                    ></div>
                </th>
                {/* Name Column */}
                <th
                    // className="p-2 border border-gray-300 text-center cursor-pointer sticky left-[130px] z-20 bg-gray-200"
                    // style={{ width: columnWidths['name'] }}
                    // onClick={() => onSort('name')}

                    style={{
                        width: columnWidths.name,
                        position: 'sticky',
                        left: columnWidths.checkbox + columnWidths.id,
                        zIndex: 20,
                        backgroundColor: '#e5e7eb',
                    }}
                    className="p-2 border border-gray-300 text-center cursor-pointer"
                    onClick={() => onSort('name')}

                >
                    Name {renderSortIndicator('name')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'name')}
                    ></div>
                </th>
                {/* Company Column */}
                <th
                    className="p-2 border border-gray-300 text-center cursor-pointer"
                    style={{ width: columnWidths['company'] }}
                    onClick={() => onSort('company')}
                >
                    Company {renderSortIndicator('company')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'company')}
                    ></div>
                </th>
                {/* Status Column */}
                <th
                    className="p-2 border border-gray-300 text-center cursor-pointer"
                    style={{ width: columnWidths['status'] }}
                    onClick={() => onSort('status')}
                >
                    Status {renderSortIndicator('status')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'status')}
                    ></div>
                </th>
                {/* Lead Score Column */}
                <th
                    className="p-2 border border-gray-300 text-center cursor-pointer"
                    style={{ width: columnWidths['leadScore'] }}
                    onClick={() => onSort('leadScore')}
                >
                    Lead Score {renderSortIndicator('leadScore')}
                    <div
                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(e, 'leadScore')}
                    ></div>
                </th>
                {/* Action Column - non-resizable */}
                <th
                    // className="p-2 border border-gray-300 text-center"
                    // style={{ width: columnWidths['action'] }}

                    style={{ width: columnWidths.action }}
                    className="p-2 border border-gray-300 text-center"
                >
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
