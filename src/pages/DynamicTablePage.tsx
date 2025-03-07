import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadsToolbar from '../components/LeadsToolbar';
import LeadsSearchBar from '../components/LeadsSearchBar';
import Table from '../components/Table';
import Pagination from '../components/table/Pagination';

interface DataType {
    [key: string]: any;
}

const DynamicTablePage: React.FC = () => {
    // Data state for the table
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Global search
    const [searchQuery, setSearchQuery] = useState('');

    const [sortBy, setSortBy] = useState<{ accessor: keyof DataType; order: 'asc' | 'desc' } | undefined>(undefined);

    const [columnSearchQueries, setColumnSearchQueries] = useState<{ [key: string]: string }>({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 10;

    // Fetch the dynamic data
    useEffect(() => {
        fetch('/data/leads.json')
            .then((res) => res.json())
            .then((jsonData) => {
                // If the fetched data is not an array, wrap it in one
                const tableData = Array.isArray(jsonData) ? jsonData : [jsonData];
                setData(tableData);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching JSON data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Loading data...</div>;
    }

    // global search filter
    const filteredData = data.filter(item => {
        return Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Pagination
    const totalItems = filteredData.length;
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-4">Dynamic Table</h1>
                {/* Global Search */}
                <LeadsSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                {/* Toolbar */}
                <LeadsToolbar
                    selectedIds={[]}  // yet to implement
                    onCreateClick={() => console.log("Create clicked")}
                    onEditClick={() => console.log("Edit clicked")}
                    onDeleteClick={() => console.log("Delete clicked")}
                    exportAllDropdownOpen={false}
                    toggleExportAllDropdown={() => { }}
                    onExportAllExcel={() => console.log("Export All Excel clicked")}
                    onExportAllCSV={() => console.log("Export All CSV clicked")}
                    exportSelectedDropdownOpen={false}
                    toggleExportSelectedDropdown={() => { }}
                    onExportSelectedExcel={() => console.log("Export Selected Excel clicked")}
                    onExportSelectedCSV={() => console.log("Export Selected CSV clicked")}
                />
                {/* Table Component with dynamic data */}
                <div className="overflow-x-auto">
                    <Table
                        data={paginatedData}
                        sortBy={sortBy} //yet to implement
                        filterBy={() => true}
                        className="w-full"
                    />
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                />
            </main>
            <Footer />
        </div>
    );
};

export default DynamicTablePage;
