import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white p-4 text-center shadow-inner mt-auto">
            <p className="text-sm">&copy; {(new Date().getFullYear())} SynergyStackCRM </p>
            <p className="text-sm" >Developed by <a href="https://github.com/karthikrajsuresh" target="_blank">Karthik Raj</a></p>
        </footer>
    );
};

export default Footer;