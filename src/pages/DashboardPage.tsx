import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ActionButton } from '../components/buttons/ActionButton';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                {/* Example dashboard content */}
                <div className="flex space-x-4">
                    <ActionButton label="Home" onClick={() => navigate('/')} variant="secondary" />
                    <ActionButton label="View Leads" onClick={() => navigate('/leads')} variant="primary" />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
