import React from 'react';
import { Lead } from '../store/leadsSlice';

interface Interaction {
    interactionId: number;
    date: string;
    type: string;
    notes: string;
    salesRep: string;
}

interface LeadFormDrawerProps {
    isEditing: boolean;
    lead: Lead;
    badgesInput: string;
    newInteraction: Interaction;
    onChange: (updatedLead: Lead) => void;
    onBadgesChange: (value: string) => void;
    onNewInteractionChange: (updatedInteraction: Interaction) => void;
    onAddInteraction: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const LeadFormDrawer: React.FC<LeadFormDrawerProps> = ({
    isEditing,
    lead,
    badgesInput,
    newInteraction,
    onChange,
    onBadgesChange,
    onNewInteractionChange,
    onAddInteraction,
    onFileChange,
    onSubmit,
    onCancel,
}) => {
    return (
        <div className="fixed right-0 top-0 h-full w-2/4 bg-white shadow-2xl z-50 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'Edit Lead' : 'Create New Lead'}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        value={lead.name}
                        onChange={(e) => onChange({ ...lead, name: e.target.value })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Company</label>
                    <input
                        type="text"
                        value={lead.company}
                        onChange={(e) => onChange({ ...lead, company: e.target.value })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        value={lead.contactInfo.email}
                        onChange={(e) =>
                            onChange({ ...lead, contactInfo: { ...lead.contactInfo, email: e.target.value } })
                        }
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Phone</label>
                    <input
                        type="text"
                        value={lead.contactInfo.phone}
                        onChange={(e) =>
                            onChange({ ...lead, contactInfo: { ...lead.contactInfo, phone: e.target.value } })
                        }
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                {/* Additional Fields */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Industry</label>
                    <input
                        type="text"
                        value={lead.industry}
                        onChange={(e) => onChange({ ...lead, industry: e.target.value })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Location</label>
                    <input
                        type="text"
                        value={lead.location}
                        onChange={(e) => onChange({ ...lead, location: e.target.value })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Badges (comma separated)</label>
                    <input
                        type="text"
                        value={badgesInput}
                        onChange={(e) => onBadgesChange(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* File Upload */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                {/* Interaction Section */}
                <div className="border p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Add Interaction</h3>
                    <div className="mb-3">
                        <label className="block text-lg font-semibold mb-1">Date</label>
                        <input
                            type="date"
                            value={newInteraction.date}
                            onChange={(e) => onNewInteractionChange({ ...newInteraction, date: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-lg font-semibold mb-1">Type</label>
                        <input
                            type="text"
                            value={newInteraction.type}
                            onChange={(e) => onNewInteractionChange({ ...newInteraction, type: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-lg font-semibold mb-1">Notes</label>
                        <input
                            type="text"
                            value={newInteraction.notes}
                            onChange={(e) => onNewInteractionChange({ ...newInteraction, notes: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1">Sales Rep</label>
                        <input
                            type="text"
                            value={newInteraction.salesRep}
                            onChange={(e) => onNewInteractionChange({ ...newInteraction, salesRep: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onAddInteraction}
                        className="mt-4 w-full py-2 greenbtn rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Add Interaction
                    </button>
                    {lead.interactions && lead.interactions.length > 0 && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Added Interactions:</p>
                            <ul className="list-disc pl-5 text-gray-700">
                                {lead.interactions.map((interaction) => (
                                    <li key={interaction.interactionId}>
                                        {interaction.date} - {interaction.type} ({interaction.salesRep})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Lead Score</label>
                    <input
                        type="number"
                        value={lead.leadScore}
                        onChange={(e) => onChange({ ...lead, leadScore: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">Status</label>
                    <select
                        value={lead.status}
                        onChange={(e) => onChange({ ...lead, status: e.target.value })}
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="Hot">Hot</option>
                        <option value="Warm">Warm</option>
                        <option value="Cold">Cold</option>
                        <option value="New">New</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="graybtn"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="bluebtn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeadFormDrawer;
