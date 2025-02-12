import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LeadDetailsPage: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-3xl font-bold mb-4">Lead Details - {id}</h1>
                {/* Detailed information for the lead */}
            </main>
            <Footer />
        </div>
    );
};

export default LeadDetailsPage;
