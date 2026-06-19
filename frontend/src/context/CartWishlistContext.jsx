import React, { createContext, useContext, useState, useEffect } from 'react';

const StateHub = createContext(null);

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('eshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('eshop_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('eshop_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product) => {
    if (!product || !product._id) return;
    setCart((prev) => {
      const index = prev.findIndex((i) => i._id === product._id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: (updated[index].quantity || 1) + 1 };
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!productId) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    if (!product || !product._id) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      return exists ? prev.filter((item) => item._id !== product._id) : [...prev, product];
    });
  };

  // Helper function to check if item is in wishlist
  const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

  return (
    <StateHub.Provider value={{
      cart, 
      wishlist, 
      addToCart, 
      updateQuantity, 
      incrementQuantity, 
      decrementQuantity, 
      removeFromCart, 
      clearCart, 
      toggleWishlist,
      isInWishlist, // Added back to the provider value
      cartCount: cart.reduce((total, item) => total + (item.quantity || 0), 0),
      wishlistCount: wishlist.length
    }}>
      {children}
    </StateHub.Provider>
  );
};

export const useCartWishlist = () => useContext(StateHub);
export default StateHub;