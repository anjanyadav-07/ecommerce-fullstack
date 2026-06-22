import React, { useState } from 'react';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Adjust this URL to match your user login route
            const { data } = await axios.post('/api/users/login', { email, password });
            
            // Save the user info (including token) to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            alert('Login successful! You can now see your orders.');
            window.location.href = '/my-orders'; // Redirect to your orders page
        } catch (error) {
            alert('Invalid email or password');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default LoginScreen;