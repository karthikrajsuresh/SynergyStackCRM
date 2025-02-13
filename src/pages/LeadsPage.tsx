// src/pages/LeadsPage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableRow from '../components/table/TableRow';
import { Lead } from '../store/leadsSlice';
import TableHeader from '../components/table/TableHeader';

const LeadsPage: React.FC = () => {
    // State for leads data
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Row selection
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 10;

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch leads
    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('/data/leads.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch leads: ${response.statusText}`);
                }
                const data = (await response.json()) as Lead[];
                setLeads(data);
                setFilteredLeads(data);
            } catch (err: any) {
                console.error('Error fetching leads:', err);
                setError(err.message || 'An error occurred while fetching leads.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    // Calculate pagination values
    const totalItems = leads.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentLeads = leads.slice(startIndex, endIndex);

    // Filter leads by search query (name or company)
    useEffect(() => {
        if (!searchQuery) {
            setFilteredLeads(leads);
        } else {
            const lowerQ = searchQuery.toLowerCase();
            const filtered = leads.filter(
                (lead) =>
                    lead.name.toLowerCase().includes(lowerQ) ||
                    lead.company.toLowerCase().includes(lowerQ)
            );
            setFilteredLeads(filtered);
        }
    }, [searchQuery, leads]);

    // Handle row selection
    const handleRowSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // Select all for the currently filtered leads
    const handleSelectAll = () => {
        const allIds = filteredLeads.map((lead) => lead.id);
        const allSelected = allIds.every((id) => selectedIds.includes(id));
        if (allSelected) {
            // Unselect all
            setSelectedIds([]);
        } else {
            // Select all
            setSelectedIds(allIds);
        }
    };

    // Placeholder actions for selected rows
    const resetSelected = () => {
        // Example: set leadScore to 0 for selected leads
        const updated = leads.map((lead) =>
            selectedIds.includes(lead.id) ? { ...lead, leadScore: 0 } : lead
        );
        setLeads(updated);
        setFilteredLeads(updated);
        setSelectedIds([]);
    };

    const deleteSelected = () => {
        const updated = leads.filter((lead) => !selectedIds.includes(lead.id));
        setLeads(updated);
        setFilteredLeads(updated);
        setSelectedIds([]);
    };

    const exportSelected = () => {
        alert(`Exporting ${selectedIds.length} lead(s)...`);
    };

    if (loading) return <div className="p-4">Loading leads...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (filteredLeads.length === 0) {
        return (
            <div>
                <Header />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Leads</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name or company"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-64 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        />
                    </div>
                    <div>No leads found.</div>
                </div>
                <Footer />
            </div>
        );
    }

    // Check if all filtered leads are selected
    const allSelected = filteredLeads.every((lead) => selectedIds.includes(lead.id));

    // Pagination handlers
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Check if all rows on the current page are selected
    const allOnPageSelected = currentLeads.every(lead => selectedIds.includes(lead.id));

    // Render loading, error, or table UI
    if (loading) {
        return <div className="p-4">Loading leads...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    if (leads.length === 0) {
        return <div className="p-4">No leads found.</div>;
    }

    function handleSelectAllCurrentPage() {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            <Header />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Leads</h1>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or company"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-64 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                </div>

                {/* Dynamic toolbar */}
                {selectedIds.length === 0 ? (
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                        <div className="space-x-4">
                            <button className="hover:underline">Columns</button>
                            <button className="hover:underline">Add Filter</button>
                        </div>
                        <div className="space-x-4">
                            <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Create
                            </button>
                            <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                Export All
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between mb-3 bg-blue-50 p-2 rounded border border-blue-200">
                        <span className="text-sm text-blue-600 font-semibold">
                            {selectedIds.length} item{selectedIds.length > 1 && 's'} selected
                        </span>
                        <div className="space-x-4 text-sm">
                            <button onClick={resetSelected} className="hover:underline">
                                Reset
                            </button>
                            <button onClick={deleteSelected} className="hover:underline text-red-600 hover:text-red-800">
                                Delete
                            </button>
                            <button onClick={exportSelected} className="hover:underline text-green-600 hover:text-green-800">
                                Export
                            </button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded">
                    <table className="min-w-full text-sm">
                        <TableHeader allSelected={allSelected} onSelectAll={handleSelectAll} />
                        <tbody>
                            {filteredLeads.map((lead) => (
                                <TableRow
                                    key={lead.id}
                                    lead={lead}
                                    isSelected={selectedIds.includes(lead.id)}
                                    onSelect={() => handleRowSelect(lead.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                    <div>
                        Rows per page: <span className="font-semibold">{rowsPerPage}</span>
                    </div>
                    <div>
                        {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 border rounded ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-200'
                                }`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 border rounded ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-200'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LeadsPage;
