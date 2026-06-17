import React, { createContext, useContext, useState, useEffect } from 'react';

// Initialize a singular global memory store
const StateHub = createContext(null);

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('eshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('eshop_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Automatically update the browser cache whenever things change
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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

  // Explicitly adds 1 item to the quantity
  const incrementQuantity = (productId) => {
    if (!productId) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Explicitly removes 1 item from the quantity
  const decrementQuantity = (productId) => {
    if (!productId) return;
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Removes the item if quantity drops to 0
    );
  };

  const removeFromCart = (productId) => {
    if (!productId) return;
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const toggleWishlist = (product) => {
    if (!product || !product._id) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <StateHub.Provider value={{
      cart,
      wishlist,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      toggleWishlist,
      isInWishlist,
      cartCount: cart.reduce((total, item) => total + (item.quantity || 0), 0),
      wishlistCount: wishlist.length
    }}>
      {children}
    </StateHub.Provider>
  );
};

// Export the customized processing hook explicitly
export const useCartWishlist = () => {
  const activeContext = useContext(StateHub);
  if (!activeContext) {
    throw new Error('useCartWishlist must be inside a CartWishlistProvider block.');
  }
  return activeContext;
};

export default StateHub;