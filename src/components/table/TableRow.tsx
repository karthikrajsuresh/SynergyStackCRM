// src/components/table/TableRow.tsx
import React, { useState } from 'react';
import { Lead } from '../../store/leadsSlice';
import TableAccordion from './TableAccordion';

interface TableRowProps {
    lead: Lead;
    isSelected: boolean;
    onSelect: () => void;
    columnWidths: { [key: string]: number };
    onDragStart: () => void;
    onDrop: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ lead, isSelected, onSelect, columnWidths, onDragStart, onDrop }) => {
    const [expanded, setExpanded] = useState(false);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <>
            {/* Main row */}
            <tr

                className={`hover:bg-gray-50 ${isDraggedOver ? 'border-t-2 border-cyan-400' : ''} ${isDragging ? 'bg-gray-100' : ''}`}
                draggable={true}
                onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData('text/plain', lead.id.toString());
                    onDragStart();
                    setIsDragging(true);
                }}
                onDragEnd={() => setIsDragging(false)}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggedOver(true);
                }}
                onDragEnter={(e) => {
                    e.preventDefault();
                    setIsDraggedOver(true);
                }}
                onDragLeave={() => setIsDraggedOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggedOver(false);
                    onDrop();
                }}

            >

                <td
                    // className="p-2 border border-gray-300 text-center"

                    style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 10,
                        backgroundColor: 'white',
                        width: columnWidths.checkbox,
                    }}
                    className="p-2 border border-gray-300 text-center"

                >
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onSelect}
                        className="w-4 h-4"
                    />
                </td>
                <td
                    style={{
                        position: 'sticky',
                        left: columnWidths.checkbox,
                        zIndex: 10,
                        width: columnWidths.id,
                    }}
                    className="p-2 border border-gray-300 text-sm text-center text-gray-700 bg-white"
                >
                    {lead.id}
                </td>
                <td
                    style={{
                        position: 'sticky',
                        left: columnWidths.checkbox + columnWidths.id,
                        zIndex: 10,
                        width: columnWidths.name,
                    }}
                    className="p-2 border border-gray-300 text-sm text-center text-gray-900 bg-white"
                >
                    {lead.name}
                </td>
                <td
                    style={{ width: columnWidths.company }}
                    className="p-2 border border-gray-300 text-sm text-center text-gray-700"
                >
                    {lead.company}
                </td>
                <td
                    style={{ width: columnWidths.status }}
                    className="p-2 border border-gray-300 text-sm text-center text-gray-700">
                    {lead.status}
                </td>
                <td
                    style={{ width: columnWidths.leadScore }}
                    className="p-2 border border-gray-300 text-sm text-center text-gray-700"
                >
                    {lead.leadScore}
                </td>
                <td
                    style={{ width: columnWidths.actions }}
                    className="p-2 border border-gray-300 text-sm text-center text-blue-600"
                >
                    <button
                        className="hover:underline"
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? 'HIDE' : 'SHOW'}
                    </button>
                </td>
            </tr>

            {/* Accordion row */}
            {expanded && (
                <tr>
                    <td colSpan={7} className="p-2 border border-gray-300">
                        <TableAccordion lead={lead} />
                    </td>
                </tr>
            )}
            {/* At the end of your row (inside the fragment, after the accordion row) */}
            {/* <tr className="relative">
                <td colSpan={7} className="p-0">
                    <div
                        className="h-2 cursor-row-resize bg-transparent"
                    // Implement similar mouse event handlers as in column resizing.
                    // For example, use onMouseDown to start tracking vertical movement.
                    ></div>
                </td>
            </tr> */}

        </>
    );
};

export default TableRow;
