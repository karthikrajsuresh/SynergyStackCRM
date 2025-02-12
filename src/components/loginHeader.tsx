import React from 'react';

const LoginHeader: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-sky-700 to-blue-600 text-white p-4 text-center shadow-lg">
            <h1 className="text-2xl font-bold">SynergyStackCRM</h1>
            <nav>
                <ul className="flex justify-center space-x-4">
                    <li><a href="/home" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/services" className="hover:underline">Services</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default LoginHeader;
