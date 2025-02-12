import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../components/buttons/ActionButton';
import { TextInput } from '../components/forms/TextInput';
import LoginHeader from '../components/loginHeader';
import LoginFooter from '../components/loginFooter';


const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle the login form submission with error handling.
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            // Basic input validation
            if (!username || !password) {
                throw new Error('Username and Password are required.');
            }

            // Simulate an API call delay (replace this with your actual API call)
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Dispatch the login action
            dispatch(login(username));
            // Navigate to the dashboard on successful login
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'An error occurred during login.');
        } finally {
            console.log('Login attempt finished.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <LoginHeader />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <TextInput
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        type="password"
                    />
                    <ActionButton label="Login" onClick={() => handleLogin} variant="primary" />
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <LoginFooter />
        </div>
    );
};

export default LoginPage;
