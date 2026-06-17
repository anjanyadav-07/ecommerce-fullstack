import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';

// Import all functional subcomponents properly
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; 
import Dashboard from './pages/Dashboard';
import ProductCatalog from './components/ProductCatalog'; 

// Main Home Page that fetches live backend database products
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                if (data && Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    throw new Error("Empty response array from API.");
                }
            } catch (err) {
                console.warn("API offline or empty database. Activating high-fidelity fallback catalog.");
                // Shared reliable structural mock array
                setProducts([
                    { _id: "m1", name: "Premium Wireless Headphones", description: "Active adaptive noise cancellation.", price: 199, category: "Electronics", rating: 4.8 },
                    { _id: "m2", name: "Vintage Leather Jacket", description: "Top-grain premium style.", price: 145, category: "Clothing", rating: 4.6 },
                    { _id: "m3", name: "Mechanical Gaming Keyboard", description: "Ultra-responsive tactile key switches.", price: 89, category: "Electronics", rating: 4.7 },
                    { _id: "m4", name: "Ergonomic Office Chair", description: "High-back mesh comfort and lumbar support.", price: 249, category: "Furniture", rating: 4.5 },
                    { _id: "m5", name: "Stainless Steel Water Bottle", description: "Double-walled vacuum insulated flask.", price: 29, category: "Fitness", rating: 4.3 },
                    { _id: "m6", name: "Ultra-Wide Curved Monitor", description: "Immersive high refresh rate widescreen.", price: 349, category: "Electronics", rating: 4.9 }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#06b6d4' }}>Loading catalog items...</h2>
            ) : (
                <ProductCatalog initialProducts={products} />
            )}
        </div>
    );
};

// Global Navigation Bar with live context counter badges
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount, wishlistCount } = useCartWishlist();

    return (
        <div style={{ 
            padding: '15px 20px', 
            backgroundColor: '#111827', 
            borderBottom: '1px solid #1f2937', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#fff', fontSize: '1.2rem' }}>🏪 E-Shop</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#9ca3af' }}>Catalog</Link>
                {user && <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#3b82f6' }}>📊 My Dashboard</Link>}
                
                <Link to="/wishlist" style={{ textDecoration: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ❤️ Wishlist {wishlistCount > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>{wishlistCount}</span>}
                </Link>
                
                <Link to="/cart" style={{ textDecoration: 'none', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🛒 Cart {cartCount > 0 && <span style={{ background: '#10b981', color: '#fff', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>{cartCount}</span>}
                </Link>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {user ? (
                    <>
                        <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                            {user.username || user.name} <span style={{ color: '#06b6d4', fontSize: '0.8rem', background: 'rgba(6,182,212,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{user.role}</span>
                        </span>
                        <button onClick={logout} style={{ 
                            padding: '6px 12px', 
                            background: '#ef4444', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none', color: '#9ca3af' }}>Login</Link>
                        <Link to="/register" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold' }}>Register</Link>
                    </>
                )
                }
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
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </CartWishlistProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;