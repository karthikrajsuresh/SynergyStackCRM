import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white shadow-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4">
                    <h1 className="text-4xl font-extrabold mb-4 md:mb-0">SynergyStackCRM</h1>
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
                        >
                            Register
                        </Link>
                        <Link
                            to="/"
                            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </header>  
    );
};

export default LoginHeader;