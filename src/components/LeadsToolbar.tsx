import React from 'react';

interface LeadsToolbarProps {
    selectedIds: number[];
    onCreateClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
    exportAllDropdownOpen: boolean;
    toggleExportAllDropdown: () => void;
    onExportAllExcel: () => void;
    onExportAllCSV: () => void;
    exportSelectedDropdownOpen: boolean;
    toggleExportSelectedDropdown: () => void;
    onExportSelectedExcel: () => void;
    onExportSelectedCSV: () => void;
}

const LeadsToolbar: React.FC<LeadsToolbarProps> = ({
    selectedIds,
    onCreateClick,
    onEditClick,
    onDeleteClick,
    exportAllDropdownOpen,
    toggleExportAllDropdown,
    onExportAllExcel,
    onExportAllCSV,
    exportSelectedDropdownOpen,
    toggleExportSelectedDropdown,
    onExportSelectedExcel,
    onExportSelectedCSV,
}) => {
    if (selectedIds.length === 0) {
        return (
            <div className="flex items-center justify-end mb-4 space-x-4">
                <button onClick={onCreateClick} className="bluebtn">
                    Create
                </button>
                <div className="relative inline-block">
                    <button onClick={toggleExportAllDropdown} className="greenbtn">
                        Export All
                    </button>
                    {exportAllDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                            <button onClick={onExportAllExcel} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Export as Excel
                            </button>
                            <button onClick={onExportAllCSV} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Export as CSV
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-between mb-4 p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
                <span className="text-blue-700 font-semibold">
                    {selectedIds.length} item{selectedIds.length > 1 && 's'} selected
                </span>
                <div className="flex space-x-4">
                    {selectedIds.length === 1 && (
                        <button onClick={onEditClick} className="bluebtn">
                            Edit
                        </button>
                    )}
                    <button onClick={onDeleteClick} className="redbtn">
                        Delete
                    </button>
                    <div className="relative inline-block">
                        <button onClick={toggleExportSelectedDropdown} className="greenbtn">
                            Export
                        </button>
                        {exportSelectedDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                                <button onClick={onExportSelectedExcel} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Export as Excel
                                </button>
                                <button onClick={onExportSelectedCSV} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Export as CSV
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default LeadsToolbar;
