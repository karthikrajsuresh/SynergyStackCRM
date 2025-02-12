import React from 'react';
import { Lead } from '../../store/leadsSlice';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
    data: Lead[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <TableHeader />
                <tbody>
                    {data.map((lead) => (
                        <TableRow key={lead.id} lead={lead} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
