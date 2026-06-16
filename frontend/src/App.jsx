import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartWishlistProvider } from './context/CartWishlistContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductCatalog from './components/ProductCatalog';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

// Main Home Page that fetches live backend database products
const Home = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products from backend:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1>Welcome to the E-Commerce Store</h1>
                {user && <h3>Hello, {user.name}! Enjoy your shopping session.</h3>}
            </div>
            {loading ? <h2>Loading catalog items...</h2> : <ProductCatalog products={products} />}
        </div>
    );
};

// Global Navigation Bar
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <div style={{ 
            padding: '15px 20px', 
            backgroundColor: 'var(--bg)', 
            borderBottom: '1px solid var(--border)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <div style={{ display: 'flex', gap: '25px' }}>
                <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'var(--text-h)' }}>🏪 E-Shop</Link>
                <Link to="/" style={{ textDecoration: 'none' }}>Catalog</Link>
                <Link to="/wishlist" style={{ textDecoration: 'none' }}>❤️ Wishlist</Link>
                <Link to="/cart" style={{ textDecoration: 'none' }}>🛒 Cart</Link>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {user ? (
                    <>
                        <span style={{ fontSize: '14px', color: 'var(--text)' }}>
                            {user.name} ({user.role})
                        </span>
                        <button onClick={logout} style={{ 
                            padding: '6px 12px', 
                            background: '#ff4d4d', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartWishlistProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </CartWishlistProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;