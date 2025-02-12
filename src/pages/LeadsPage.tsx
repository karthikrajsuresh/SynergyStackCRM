import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchLeads } from '../store/leadsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '../components/table/Table';

const LeadsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { leads, loading, error } = useSelector((state: RootState) => state.leads);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-3xl font-bold mb-4">Leads</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Table data={leads} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default LeadsPage;
