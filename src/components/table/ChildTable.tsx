import React from 'react';
import { Interaction } from '../../store/leadsSlice';

interface ChildTableProps {
    interactions: Interaction[];
}

const ChildTable: React.FC<ChildTableProps> = ({ interactions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Notes</th>
                        <th className="p-2 border">Sales Rep</th>
                    </tr>
                </thead>
                <tbody>
                    {interactions.map((interaction) => (
                        <tr key={interaction.interactionId} className="border">
                            <td className="p-2 border">{interaction.date}</td>
                            <td className="p-2 border">{interaction.type}</td>
                            <td className="p-2 border">{interaction.notes}</td>
                            <td className="p-2 border">{interaction.salesRep}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ChildTable;
