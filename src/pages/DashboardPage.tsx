import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ActionButton } from '../components/buttons/ActionButton';
import LeadsChart from '../components/LeadsChart';
import LeadsScoreChart from '../components/LeadsScoreChart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchLeads } from '../store/leadsSlice';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const { leads, loading, error } = useSelector((state: RootState) => state.leads);

    useEffect(() => {
        if (leads.length === 0) {
            dispatch(fetchLeads());
        }
    }, [dispatch, leads]);

    if (loading) {
        return <div className="p-8 text-center">Loading leads...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow p-6">
                <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
                {/* Flex container */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
                    <div className="w-full md:w-1/2">
                        <LeadsChart leads={leads} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <LeadsScoreChart leads={leads} />
                    </div>
                </div>
                {/* Dashboard Action Buttons */}
                <div className="flex justify-center space-x-6">
                    <ActionButton label="Home" onClick={() => navigate('/')} variant="secondary" />
                    <ActionButton label="View Leads" onClick={() => navigate('/leads')} variant="primary" />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
