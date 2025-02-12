import React, { useState } from 'react';
import { Lead } from '../../store/leadsSlice';
import TableAccordion from './TableAccordion';

interface TableRowProps {
    lead: Lead;
}

const TableRow: React.FC<TableRowProps> = ({ lead }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr className="border">
                <td className="p-2 border">
                    <input type="checkbox" />
                </td>
                <td className="p-2 border">{lead.name}</td>
                <td className="p-2 border">{lead.company}</td>
                <td className="p-2 border">{lead.status}</td>
                <td className="p-2 border">
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Hide Details' : 'Show Details'}
                    </button>
                </td>
            </tr>
            {expanded && (
                <tr>
                    <td colSpan={5} className="p-2 border">
                        <TableAccordion lead={lead} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
