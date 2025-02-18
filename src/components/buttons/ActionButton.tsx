import React from "react";

interface ActionButtonProps {
    label: string;
    onClick: (e: React.FormEvent) => void;
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
            ? "bluebtn"
            : variant === "secondary"
                ? "graybtn"
                : "redbtn";

    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {label}
        </button>
    );
};