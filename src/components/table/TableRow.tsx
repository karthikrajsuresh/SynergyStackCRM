// src/components/table/TableRow.tsx
import React, { useState } from 'react';
import { Lead } from '../../store/leadsSlice';
import TableAccordion from './TableAccordion';

interface TableRowProps {
    lead: Lead;
    isSelected: boolean;
    onSelect: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ lead, isSelected, onSelect }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            {/* Main row */}
            <tr className="hover:bg-gray-50">
                <td className="p-2 border-b text-center">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onSelect}
                        className="w-4 h-4"
                    />
                </td>
                <td className="p-2 border-b text-sm text-center text-gray-700">{lead.id}</td>
                <td className="p-2 border-b text-sm text-center text-gray-900">{lead.name}</td>
                <td className="p-2 border-b text-sm text-center text-gray-700">{lead.company}</td>
                <td className="p-2 border-b text-sm text-center text-gray-700">{lead.status}</td>
                <td className="p-2 border-b text-sm text-center text-center">{lead.leadScore}</td>
                <td className="p-2 border-b text-blue-600 text-sm text-center">
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
                    <td colSpan={7} className="border-b">
                        <TableAccordion lead={lead} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
