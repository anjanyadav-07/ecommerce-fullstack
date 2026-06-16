import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check if user is already logged in when the app loads
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login Function
    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/'); // Go to home page after login
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    // Register Function
    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/'); // Go to home page after register
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    // Logout Function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;