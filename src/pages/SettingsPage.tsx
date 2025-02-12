import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SettingsPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-3xl font-bold mb-4">Settings</h1>
                {/* Settings content */}
            </main>
            <Footer />
        </div>
    );
};

export default SettingsPage;
