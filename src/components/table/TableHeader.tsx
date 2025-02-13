import React from 'react';

interface TableHeaderProps {
    allSelected: boolean;
    onSelectAll: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ allSelected, onSelectAll }) => {
    return (
        <thead className="bg-gray-100">
            <tr>
                {/* Checkbox column */}
                <th className="p-2 border-b">
                    <label className="ml-2">Select all</label>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onSelectAll}
                        className="w-5 h-5 ml-2 "
                    />
                </th>
                {/* ID column */}
                <th className="p-2 border-b text-center">ID</th>
                {/* Name column */}
                <th className="p-2 border-b text-center">Name</th>
                {/* Company column */}
                <th className="p-2 border-b text-center">Company</th>
                {/* Status column */}
                <th className="p-2 border-b text-center">Status</th>
                {/* Lead Score column */}
                <th className="p-2 border-b text-center">Lead Score</th>
                {/* Action column (SHOW/HIDE) */}
                <th className="p-2 border-b text-center">Action</th>
            </tr>
        </thead>
    );
};

export default TableHeader;
