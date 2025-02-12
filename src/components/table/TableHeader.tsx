import React from 'react';

const TableHeader: React.FC = () => {
    return (
        <thead className="bg-gray-200">
            <tr>
                <th className="p-2 border">Select</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
            </tr>
        </thead>
    );
};

export default TableHeader;
