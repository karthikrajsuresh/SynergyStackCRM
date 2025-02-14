import React from 'react';
import { Lead } from '../../store/leadsSlice';
import ChildTable from './ChildTable';

interface TableAccordionProps {
    lead: Lead;
}

const badgeStyles = [
    {
        bg: "bg-gray-50",
        text: "text-gray-600",
        ring: "ring-gray-500/10"
    },
    {
        bg: "bg-red-50",
        text: "text-red-700",
        ring: "ring-red-600/10"
    },
    {
        bg: "bg-yellow-50",
        text: "text-yellow-800",
        ring: "ring-yellow-600/20"
    },
    {
        bg: "bg-green-50",
        text: "text-green-700",
        ring: "ring-green-600/20"
    },
    {
        bg: "bg-blue-50",
        text: "text-blue-700",
        ring: "ring-blue-700/10"
    },
    {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        ring: "ring-indigo-700/10"
    }
];

const DEFAULT_PROFILE_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const TableAccordion: React.FC<TableAccordionProps> = ({ lead }) => {
    const getBadgeStyle = (badge: string) => {
        const index = Math.abs(badge.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % badgeStyles.length;
        return badgeStyles[index];
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
    };

    return (
        <div className="p-4 bg-gray-50 text-gray-700">
            <div className="flex items-center space-x-4 mb-4">
                <div className="shrink-0">
                    <img
                        src={lead.profilePicture || DEFAULT_PROFILE_IMAGE}
                        onError={handleImageError}
                        alt={`${lead.name}'s profile`}
                        className="h-16 w-16 object-cover rounded-full border border-blue-600 shadow-lg"
                    />
                </div>
                <h3 className="text-lg font-semibold">{lead.name}</h3>
            </div>
            <p>
                <strong>Industry:</strong> {lead.industry}
            </p>
            <p>
                <strong>Location:</strong> {lead.location}
            </p>
            <p>
                <strong>Contact Email:</strong> {lead.contactInfo.email}
            </p>
            <p>
                <strong>Contact Phone:</strong> {lead.contactInfo.phone}
            </p>
            <div className="mt-2 mb-4">
                <strong>Badges:</strong>{' '}
                <div className="mt-1 flex flex-wrap gap-2">
                    {lead.badges.length > 0 ? (
                        lead.badges.map((badge, index) => {
                            const style = getBadgeStyle(badge);
                            return (
                                <span
                                    key={index}
                                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
                                >
                                    {badge}
                                </span>
                            );
                        })
                    ) : (
                        <span className="text-sm text-gray-500">None</span>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Interactions:</h4>
                {lead.interactions && lead.interactions.length > 0 ? (
                    <ChildTable interactions={lead.interactions} />
                ) : (
                    <p className="text-sm text-gray-500">No interactions available.</p>
                )}
            </div>
        </div>
    );
};

export default TableAccordion;