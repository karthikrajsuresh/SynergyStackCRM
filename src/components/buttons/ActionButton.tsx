import React from "react";

interface ActionButtonProps {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    onClick,
    variant = "primary",
}) => {
    const baseClasses = "px-4 py-2 rounded font-semibold";
    const variantClasses =
        variant === "primary"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : variant === "secondary"
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-red-500 text-white hover:bg-red-600";

    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {label}
        </button>
    );
};
