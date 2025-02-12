import React from 'react';

const LoginFooter: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-4 text-center shadow-inner">
            <p className="text-sm">&copy; {(new Date().getFullYear())} SynergyStackCRM </p>
            <p className="text-sm" >Developed by <a href="https://github.com/karthikrajsuresh" target="_blank">Karthik Raj</a></p>
        </footer>
    );
};

export default LoginFooter;