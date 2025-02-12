import React from 'react';
import { Lead } from '../../store/leadsSlice';
import ChildTable from './ChildTable';

interface TableAccordionProps {
    lead: Lead;
}

const TableAccordion: React.FC<TableAccordionProps> = ({ lead }) => {
    return (
        <div className="p-2 bg-gray-50">
            <h3 className="font-semibold mb-2">Interactions</h3>
            {lead.interactions && lead.interactions.length > 0 ? (
                <ChildTable interactions={lead.interactions} />
            ) : (
                <div>No interactions available.</div>
            )}
        </div>
    );
};

export default TableAccordion;
