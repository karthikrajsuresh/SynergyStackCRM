import React from 'react';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChange,
    placeholder = '',
    type = 'text',
}) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">{label}</label>
            <input
                type={type}
                className="w-full p-2 border rounded"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};
