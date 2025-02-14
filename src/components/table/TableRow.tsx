// src/components/table/TableRow.tsx
import React, { useState } from 'react';
import { Lead } from '../../store/leadsSlice';
import TableAccordion from './TableAccordion';

interface TableRowProps {
    lead: Lead;
    isSelected: boolean;
    onSelect: () => void;
    columnWidths: { [key: string]: number };
}

const TableRow: React.FC<TableRowProps> = ({ lead, isSelected, onSelect, columnWidths }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            {/* Main row */}
            <tr className="hover:bg-gray-50">
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
                <td className="p-2 border border-gray-300 text-sm text-center text-gray-700">{lead.id}</td>
                <td className="p-2 border border-gray-300 text-sm text-center text-gray-900">{lead.name}</td>
                <td className="p-2 border border-gray-300 text-sm text-center text-gray-700">{lead.company}</td>
                <td className="p-2 border border-gray-300 text-sm text-center text-gray-700">{lead.status}</td>
                <td className="p-2 border border-gray-300 text-sm text-center text-gray-700">{lead.leadScore}</td>
                <td className="p-2 border border-gray-300 text-sm text-center text-blue-600">
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
