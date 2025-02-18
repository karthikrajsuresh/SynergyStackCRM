import React from 'react';

interface LeadsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const LeadsSearchBar: React.FC<LeadsSearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search by name or company"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default LeadsSearchBar;
