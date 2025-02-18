import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../components/buttons/ActionButton';
import { TextInput } from '../components/forms/TextInput';
import LoginHeader from '../components/loginHeader';
import LoginFooter from '../components/loginFooter';

interface UserCredential {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [allowedUsers, setAllowedUsers] = useState<UserCredential[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fetch default credentials from public/data/usercredentials.json on mount
    useEffect(() => {
        fetch('/data/usercredentials.json')
            .then((res) => res.json())
            .then((data: UserCredential | UserCredential[]) => {
                let credentials: UserCredential[] = [];
                if (Array.isArray(data)) {
                    credentials = data;
                } else {
                    credentials.push(data);
                }
                // Check for registered user in localStorage
                const regUserStr = localStorage.getItem('registeredUser');
                if (regUserStr) {
                    try {
                        const regUser = JSON.parse(regUserStr) as UserCredential;
                        credentials.push(regUser);
                    } catch (e) {
                        console.error('Error parsing registered user:', e);
                    }
                }
                setAllowedUsers(credentials);
            })
            .catch((err) => {
                console.error('Error fetching user credentials:', err);
                setErrorMessage('Failed to load user credentials.');
            });
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!username || !password) {
            setErrorMessage('Username and Password are required.');
            return;
        }

        // Check if entered credentials match any allowed user
        const isValid = allowedUsers.some(
            (user) => user.username === username && user.password === password
        );

        if (!isValid) {
            setErrorMessage('Invalid username or password.');
            return;
        }

        // Dispatch login action and navigate to dashboard
        dispatch(login(username));
        navigate('/dashboard');
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
                    <ActionButton label="Login" onClick={handleLogin} variant="primary" />
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
