import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

// A simple temporary Home component just to show if you are logged in
const Home = () => {
    const { user, logout } = useContext(AuthContext);
    
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the E-Commerce Store</h1>
            {user ? (
                <div>
                    <h3>Hello, {user.name}! (Role: {user.role})</h3>
                    <button onClick={logout} style={{ padding: '10px', cursor: 'pointer', background: 'red', color: 'white' }}>Logout</button>
                </div>
            ) : (
                <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
            )}
        </div>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div style={{ padding: '20px', backgroundColor: '#f4f4f4', marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
                    <Link to="/login">Login</Link>
                </div>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;