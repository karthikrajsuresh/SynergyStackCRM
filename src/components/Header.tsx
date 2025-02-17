import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white p-4 flex justify-between items-center">
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