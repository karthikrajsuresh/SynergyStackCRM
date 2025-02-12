import React from "react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
}) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="font-semibold">{label}</label>
        </div>
    );
};
