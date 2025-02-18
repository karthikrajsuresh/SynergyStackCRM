import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadsToolbar from '../components/LeadsToolbar';
import LeadsSearchBar from '../components/LeadsSearchBar';
import LeadsTable from '../components/LeadsTable';
import LeadFormDrawer from '../components/LeadFormDrawer';
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

interface Sorting {
    key: string;
    ascending: boolean;
}

const LeadsPage: React.FC = () => {
    // Data and state management
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);

    // Row selection
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Search states
    const [searchQuery, setSearchQuery] = useState('');
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

    // Column widths
    const [columnWidths, setColumnWidths] = useState({
        checkbox: 100,
        id: 200,
        name: 450,
        company: 450,
        status: 290,
        leadScore: 265,
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

    // Unique id for new leads
    const [nextId, setNextId] = useState<number>(1);
    useEffect(() => {
        if (leads.length > 0) {
            const maxId = Math.max(...leads.map((l) => l.id));
            setNextId(maxId + 1);
        }
    }, [leads]);

    // Filter leads
    useEffect(() => {
        let filtered = leads;
        Object.entries(columnSearchQueries).forEach(([key, query]) => {
            if (query) {
                const lowerQuery = query.toLowerCase();
                filtered = filtered.filter((lead) => {
                    const value = (lead as any)[key];
                    return value && value.toString().toLowerCase().includes(lowerQuery);
                });
            }
        });
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
            return newSorting.ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
        });
        setFilteredLeads(sorted);
    };

    const handleDrop = (targetLeadId: number) => {
        if (draggedLeadId === null || draggedLeadId === targetLeadId) return;
        const updatedLeads = [...leads];
        const draggedIndex = updatedLeads.findIndex((lead) => lead.id === draggedLeadId);
        const targetIndex = updatedLeads.findIndex((lead) => lead.id === targetLeadId);
        if (draggedIndex === -1 || targetIndex === -1) return;
        const [draggedLead] = updatedLeads.splice(draggedIndex, 1);
        updatedLeads.splice(targetIndex, 0, draggedLead);
        setLeads(updatedLeads);
        setDraggedLeadId(null);
    };

    // Pagination calculations
    const totalItems = filteredLeads.length;
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const currentLeads = filteredLeads.slice(startIdx, endIdx);

    // Row selection handlers
    const handleRowSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllCurrentPage = () => {
        const currentPageIds = currentLeads.map((lead) => lead.id);
        const allCurrentSelected = currentPageIds.every((id) => selectedIds.includes(id));
        if (allCurrentSelected) {
            setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
        }
    };

    // Delete action
    const deleteSelected = () => {
        const updated = leads.filter((lead) => !selectedIds.includes(lead.id));
        setLeads(updated);
        setFilteredLeads(updated);
        setSelectedIds([]);
    };

    // Export functions (Excel and CSV)
    const exportAsExcel = (data: Lead[], fileName: string) => {
        let tableHTML = '<table border="1"><thead><tr><th>ID</th><th>Name</th><th>Company</th><th>Status</th><th>Lead Score</th></tr></thead><tbody>';
        data.forEach((lead) => {
            tableHTML += `<tr><td>${lead.id}</td><td>${lead.name}</td><td>${lead.company}</td><td>${lead.status}</td><td>${lead.leadScore}</td></tr>`;
        });
        tableHTML += '</tbody></table>';
        const dataType = 'application/vnd.ms-excel';
        const downloadLink = document.createElement('a');
        const blob = new Blob(['\ufeff', tableHTML], { type: dataType });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(url);
    };

    const exportAsCSV = (data: Lead[], fileName: string) => {
        let csvContent = "ID,Name,Company,Status,Lead Score\n";
        data.forEach((lead) => {
            csvContent += `${lead.id},"${lead.name}","${lead.company}",${lead.status},${lead.leadScore}\n`;
        });
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Drawer State & Editing
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [badgesInput, setBadgesInput] = useState('');
    const [newLead, setNewLead] = useState<Lead>({
        id: 0,
        name: '',
        company: '',
        contactInfo: { email: '', phone: '' },
        leadScore: 0,
        status: 'New',
        assignedTo: '',
        industry: '',
        location: '',
        badges: [],
        profilePicture: '',
        interactions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [newInteraction, setNewInteraction] = useState({
        interactionId: Date.now(),
        date: '',
        type: '',
        notes: '',
        salesRep: '',
    });

    const addInteraction = () => {
        if (
            newInteraction.date ||
            newInteraction.type ||
            newInteraction.notes ||
            newInteraction.salesRep
        ) {
            setNewLead((prev) => ({
                ...prev,
                interactions: [...prev.interactions, newInteraction],
            }));
            setNewInteraction({
                interactionId: Date.now(),
                date: '',
                type: '',
                notes: '',
                salesRep: '',
            });
        }
    };

    // Handle profile picture upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setNewLead({ ...newLead, profilePicture: ev.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const badgesArray = badgesInput
            .split(',')
            .map((badge) => badge.trim())
            .filter((badge) => badge);
        const leadToSubmit = { ...newLead, badges: badgesArray, updatedAt: new Date().toISOString() };
        if (isEditing) {
            setLeads((prev) => prev.map((l) => (l.id === leadToSubmit.id ? leadToSubmit : l)));
            setFilteredLeads((prev) => prev.map((l) => (l.id === leadToSubmit.id ? leadToSubmit : l)));
            console.log('Edited Lead:', JSON.stringify(leadToSubmit, null, 2));
            setIsEditing(false);
        } else {
            const createdLead = { ...leadToSubmit, id: nextId, createdAt: new Date().toISOString() };
            setLeads((prev) => [...prev, createdLead]);
            setFilteredLeads((prev) => [...prev, createdLead]);
            console.log('New Lead:', JSON.stringify(createdLead, null, 2));
            setNextId(nextId + 1);
        }
        setNewLead({
            id: 0,
            name: '',
            company: '',
            contactInfo: { email: '', phone: '' },
            leadScore: 0,
            status: 'New',
            assignedTo: '',
            industry: '',
            location: '',
            badges: [],
            profilePicture: '',
            interactions: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        setBadgesInput('');
        setIsDrawerOpen(false);
    };

    const handleEditClick = () => {
        const leadToEdit = leads.find((l) => l.id === selectedIds[0]);
        if (leadToEdit) {
            setNewLead(leadToEdit);
            setBadgesInput(leadToEdit.badges.join(', '));
            setIsEditing(true);
            setIsDrawerOpen(true);
        }
    };

    // Dropdown States for Export Buttons
    const [exportAllDropdown, setExportAllDropdown] = useState(false);
    const [exportSelectedDropdown, setExportSelectedDropdown] = useState(false);

    const handleExportAllExcel = () => {
        exportAsExcel(leads, 'leads_export.xls');
        setExportAllDropdown(false);
    };
    const handleExportAllCSV = () => {
        exportAsCSV(leads, 'leads_export.csv');
        setExportAllDropdown(false);
    };
    const handleExportSelectedExcel = () => {
        const selectedData = leads.filter((l) => selectedIds.includes(l.id));
        exportAsExcel(selectedData, 'selected_leads_export.xls');
        setExportSelectedDropdown(false);
    };
    const handleExportSelectedCSV = () => {
        const selectedData = leads.filter((l) => selectedIds.includes(l.id));
        exportAsCSV(selectedData, 'selected_leads_export.csv');
        setExportSelectedDropdown(false);
    };

    if (loading) return <div className="p-8">Loading leads...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
    if (filteredLeads.length === 0)
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6">Leads</h1>
                    <LeadsSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                    <div className="text-center text-xl text-gray-600">No leads found.</div>
                </div>
                <Footer />
            </div>
        );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <div className="p-8 flex-grow">
                <h1 className="text-3xl font-bold mb-6 text-center ">Leads</h1>
                <LeadsSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <LeadsToolbar
                    selectedIds={selectedIds}
                    onCreateClick={() => setIsDrawerOpen(true)}
                    onEditClick={handleEditClick}
                    onDeleteClick={deleteSelected}
                    exportAllDropdownOpen={exportAllDropdown}
                    toggleExportAllDropdown={() => setExportAllDropdown(!exportAllDropdown)}
                    onExportAllExcel={handleExportAllExcel}
                    onExportAllCSV={handleExportAllCSV}
                    exportSelectedDropdownOpen={exportSelectedDropdown}
                    toggleExportSelectedDropdown={() => setExportSelectedDropdown(!exportSelectedDropdown)}
                    onExportSelectedExcel={handleExportSelectedExcel}
                    onExportSelectedCSV={handleExportSelectedCSV}
                />
                <LeadsTable
                    leads={currentLeads}
                    columnWidths={columnWidths}
                    sorting={sorting}
                    onSort={handleSort}
                    onColumnResize={handleColumnResize}
                    columnSearchQueries={columnSearchQueries}
                    onColumnSearchChange={handleColumnSearchChange}
                    selectedIds={selectedIds}
                    onSelectRow={handleRowSelect}
                    onSelectAll={handleSelectAllCurrentPage}
                    onDragStart={(id: number) => setDraggedLeadId(id)}
                    onDrop={(id: number) => handleDrop(id)}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                />
            </div>
            <Footer />
            {isDrawerOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={() => {
                            setIsDrawerOpen(false);
                            setIsEditing(false);
                        }}
                    ></div>
                    <LeadFormDrawer
                        isEditing={isEditing}
                        lead={newLead}
                        badgesInput={badgesInput}
                        newInteraction={newInteraction}
                        onChange={setNewLead}
                        onBadgesChange={setBadgesInput}
                        onNewInteractionChange={setNewInteraction}
                        onAddInteraction={addInteraction}
                        onFileChange={handleFileChange}
                        onSubmit={handleCreateSubmit}
                        onCancel={() => {
                            setIsDrawerOpen(false);
                            setIsEditing(false);
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default LeadsPage;
