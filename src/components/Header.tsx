import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">SynergyStackCRM</h1>
            <nav>
                <Link className="mr-4" to="/dashboard">Dashboard</Link>
                <Link className="mr-4" to="/leads">Leads</Link>
                <Link className="mr-4" to="/settings">Settings</Link>
                <Link to="/login">Logout</Link>
            </nav>
        </header>
    );
};

export default Header;
