import React from "react";

interface IconButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    tooltip?: string;
    variant?: "primary" | "secondary" | "danger";
}

export const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    icon,
    tooltip,
    variant = "primary",
}) => {
    const baseClasses = "p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses =
        variant === "primary"
            ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
            : variant === "secondary"
                ? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500"
                : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses}`} title={tooltip}>
            {icon}
        </button>
    );
};
