// src/pages/RegistrationPage.tsx
import React, { useState } from 'react';
import { ActionButton } from '../components/buttons/ActionButton';
import { TextInput } from '../components/forms/TextInput';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    // Handle the registration form submission with error handling.
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            // Basic input validation
            if (!username || !password || !email || !reEnterPassword) {
                throw new Error('All fields are required.');
            }

            if (password !== reEnterPassword) {
                throw new Error('Passwords do not match.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format.');
            }
            console.log('User Registration Details:', { username, email, password });
            console.log(`${JSON.stringify({ username, email, password })}`);

            // Simulate an API call delay (replace this with your actual registration API call)
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Registration successful; navigate back to the login page
            navigate('/login');
        } catch (error: any) {
            console.error('Registration error:', error);
            setErrorMessage(error.message || 'An error occurred during registration.');
        } finally {
            console.log('Registration attempt finished.');
        }
    };

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <TextInput
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
                <TextInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    type="email"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    type="password"
                />
                <TextInput
                    label="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    placeholder="Re-enter password"
                    type="password"
                />
                <ActionButton label="Register" onClick={() => handleRegister} variant="primary" />
                <ActionButton label="Back" onClick={() => navigate('/')} variant="secondary" />

            </form>
        </div>
    );
};


export default RegistrationPage;
