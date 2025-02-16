import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableHeader from '../components/table/TableHeader';
import TableRow from '../components/table/TableRow';
import Pagination from '../components/table/Pagination';
import { Lead } from '../store/leadsSlice';

export interface ColumnConfig {
    key: string;
    label: string;
    frozen: boolean;
    width: number;
}

export const columns: ColumnConfig[] = [
    { key: 'checkbox', label: '', frozen: true, width: 50 },
    { key: 'id', label: 'ID', frozen: true, width: 80 },
    { key: 'name', label: 'Name', frozen: true, width: 150 },
    { key: 'company', label: 'Company', frozen: false, width: 150 },
    { key: 'status', label: 'Status', frozen: false, width: 100 },
    { key: 'leadScore', label: 'Lead Score', frozen: false, width: 100 },
    { key: 'action', label: 'Action', frozen: false, width: 100 },
];

const calculateTotalWidth = (columnWidths: { [key: string]: number }) =>
    Object.values(columnWidths).reduce((acc, width) => acc + width, 0);

interface Sorting {
    key: string;
    ascending: boolean;
}


const LeadsPage: React.FC = () => {
    // Data states
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);

    const handleDragStart = (leadId: number) => {
        setDraggedLeadId(leadId);
    };

    // Row selection
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Global search state
    const [searchQuery, setSearchQuery] = useState('');
    // New: state for per-column search queries
    const [columnSearchQueries, setColumnSearchQueries] = useState({
        id: '',
        name: '',
        company: '',
        status: '',
        leadScore: '',
    });

    // Sorting state
    const [sorting, setSorting] = useState<Sorting | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 10;

    // New: Column resizing state
    const [columnWidths, setColumnWidths] = useState({
        checkbox: 100,
        id: 200,
        name: 450,
        company: 450,
        status: 300,
        leadScore: 285,
        action: 100,
    });

    const handleColumnResize = (key: string, newWidth: number) => {
        setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
    };

    const handleColumnSearchChange = (columnKey: string, query: string) => {
        setColumnSearchQueries((prev) => ({ ...prev, [columnKey]: query }));
    };

    // Fetch leads data
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

    // Filter leads based on both per‐column and global search queries
    useEffect(() => {
        let filtered = leads;
        // Apply per-column search filters (using AND logic)
        Object.entries(columnSearchQueries).forEach(([key, query]) => {
            if (query) {
                const lowerQuery = query.toLowerCase();
                filtered = filtered.filter((lead) => {
                    const value = (lead as any)[key];
                    return value && value.toString().toLowerCase().includes(lowerQuery);
                });
            }
        });
        // Global search filter (example: filtering name or company)
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (lead) =>
                    lead.name.toLowerCase().includes(lowerQ) ||
                    lead.company.toLowerCase().includes(lowerQ)
            );
        }
        setFilteredLeads(filtered);
        setCurrentPage(1);
    }, [leads, columnSearchQueries, searchQuery]);

    // Sorting handler
    const handleSort = (key: string) => {
        let newSorting: Sorting;
        if (sorting && sorting.key === key) {
            newSorting = { key, ascending: !sorting.ascending };
        } else {
            newSorting = { key, ascending: true };
        }
        setSorting(newSorting);

        const sorted = [...filteredLeads].sort((a, b) => {
            const aValue = (a as any)[key];
            const bValue = (b as any)[key];
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return newSorting.ascending ? aValue - bValue : bValue - aValue;
            }
            const aStr = aValue?.toString() || '';
            const bStr = bValue?.toString() || '';
            return newSorting.ascending
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr);
        });
        setFilteredLeads(sorted);
    };

    const handleDrop = (targetLeadId: number) => {
        if (draggedLeadId === null || draggedLeadId === targetLeadId) return;

        const updatedLeads = [...leads];
        const draggedIndex = updatedLeads.findIndex(lead => lead.id === draggedLeadId);
        const targetIndex = updatedLeads.findIndex(lead => lead.id === targetLeadId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const [draggedLead] = updatedLeads.splice(draggedIndex, 1);
        updatedLeads.splice(targetIndex, 0, draggedLead);

        setLeads(updatedLeads);
        setDraggedLeadId(null);
    };

    // Pagination calculations
    const totalItems = filteredLeads.length;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentLeads = filteredLeads.slice(startIndex, endIndex);

    // Row selection handlers
    const handleRowSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllCurrentPage = () => {
        const currentPageIds = currentLeads.map((lead) => lead.id);
        const allCurrentSelected = currentPageIds.every((id) =>
            selectedIds.includes(id)
        );
        if (allCurrentSelected) {
            setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
        }
    };

    // Placeholder actions
    const resetSelected = () => {
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

    const allOnPageSelected = currentLeads.every((lead) =>
        selectedIds.includes(lead.id)
    );

    if (loading) return <div className="p-4">Loading leads...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (filteredLeads.length === 0)
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="p-4 flex-grow">
                    <h1 className="text-2xl font-bold mb-4">Leads</h1>
                    <input
                        type="text"
                        placeholder="Search by name or company"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-64 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />

                    <div>No leads found.</div>
                </div>
                <Footer />
            </div>
        );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="p-4 flex-grow">
                <h1 className="text-2xl font-bold mb-4">Leads</h1>
                {/* Global Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or company"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 placeholder:italic placeholder:text-slate-400 block bg-white w-64 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                </div>
                {/* Toolbar */}
                {selectedIds.length === 0 ? (
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                        <div className="space-x-4">
                            <button className="hover:underline">Columns</button>
                            <button className="hover:underline">Add Filter</button>
                        </div>
                        <div className="space-x-4">
                            <button className="bluebtn">
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
                            <button onClick={deleteSelected} className="hover:underline text-red-600">
                                Delete
                            </button>
                            <button onClick={exportSelected} className="hover:underline text-green-600">
                                Export
                            </button>
                        </div>
                    </div>
                )}
                {/* Table */}
                <div className="overflow-x-auto border border-gray-300 rounded">
                    <table
                        className="min-w-full text-sm border-collapse relative"
                        style={{ minWidth: calculateTotalWidth(columnWidths) }}
                    >
                        <TableHeader
                            allSelected={allOnPageSelected}
                            onSelectAll={handleSelectAllCurrentPage}
                            sorting={sorting}
                            onSort={handleSort}
                            columnWidths={columnWidths}
                            onColumnResize={handleColumnResize}
                            columnSearchQueries={columnSearchQueries}
                            onColumnSearchChange={handleColumnSearchChange}
                        />
                        <tbody>
                            {currentLeads.map((lead) => (
                                <TableRow
                                    key={lead.id}
                                    lead={lead}
                                    isSelected={selectedIds.includes(lead.id)}
                                    onSelect={() => handleRowSelect(lead.id)}
                                    columnWidths={columnWidths}
                                    onDragStart={() => handleDragStart(lead.id)}
                                    onDrop={() => handleDrop(lead.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
            <Footer />
        </div>
    );
};

export default LeadsPage;
