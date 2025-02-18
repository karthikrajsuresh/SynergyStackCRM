import React, { useState } from 'react';
import { ActionButton } from '../components/buttons/ActionButton';
import { TextInput } from '../components/forms/TextInput';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/loginHeader';
import LoginFooter from '../components/loginFooter';

interface UserCredential {
    username: string;
    password: string;
    email: string;
}

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!username || !password || !email || !reEnterPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format.');
            return;
        }

        const newUser: UserCredential = { username, password, email };
        console.log('User Registration Details:', newUser);
        console.log(JSON.stringify(newUser));

        // Store the new user in localStorage (simulate saving registration)
        localStorage.setItem('registeredUser', JSON.stringify(newUser));

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <LoginHeader />
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
                    <ActionButton label="Register" onClick={handleRegister} variant="primary" />
                    <ActionButton label="Back" onClick={() => navigate('/login')} variant="secondary" />
                </form>
            </div>
            <LoginFooter />
        </div>
    );
};

export default RegistrationPage;
