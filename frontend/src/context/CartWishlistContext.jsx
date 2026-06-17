import React, { createContext, useContext, useState, useEffect } from 'react';

const CartWishlistContext = createContext(null);

export const CartWishlistProvider = ({ children }) => {
  // Safe initialization fetching from persistent browser storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eshop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('eshop_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sync state mutations directly to localStorage to handle unexpected refreshes
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Operational Action: Add Item to Cart (or increment quantity if already present)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item._id === product._id);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Operational Action: Remove entire product entry row from Cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Operational Action: Toggle items cleanly inside the Wishlist array
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadySaved = prevWishlist.some((item) => item._id === product._id);
      if (isAlreadySaved) {
        return prevWishlist.filter((item) => item._id !== product._id);
      }
      return [...prevWishlist, product];
    });
  };

  // Utility checking helper for styling or icon transformations
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <CartWishlistContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      toggleWishlist,
      isInWishlist,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      wishlistCount: wishlist.length
    }}>
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be utilized within a valid CartWishlistProvider wrap.');
  }
  return context;
};