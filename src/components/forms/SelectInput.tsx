import React from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
    label,
    value,
    onChange,
    options,
}) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
