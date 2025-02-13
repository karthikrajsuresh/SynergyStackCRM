import React from 'react';
import { Lead } from '../../store/leadsSlice';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
    data: Lead[];
    allSelected: boolean;
    onSelectAll: () => void;
    isSelected: (leadId: number) => boolean;
    onSelect: (leadId: number) => void;
}

const Table: React.FC<TableProps> = ({
    data,
    allSelected,
    onSelectAll,
    isSelected,
    onSelect,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <TableHeader allSelected={allSelected} onSelectAll={onSelectAll} />
                <tbody>
                    {data.map((lead) => (
                        <TableRow
                            key={lead.id}
                            lead={lead}
                            isSelected={isSelected(lead.id)}
                            onSelect={() => onSelect(lead.id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
