import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-200 text-center p-4">
            <p className="text-sm">&copy; {(new Date().getFullYear())} SynergyStackCRM </p>
            <p className="text-sm" >Developed by <a href="https://github.com/karthikrajsuresh" target="_blank">Karthik Raj</a></p>
        </footer>
    );
};

export default Footer;
