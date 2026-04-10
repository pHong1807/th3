import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Bell Pepper Red', weight: '1kg', price: 4.99, qty: 1, image: require('../../assets/bellpepper.png') },
    { id: '2', name: 'Egg Chicken Red', weight: '4pcs', price: 1.99, qty: 1, image: require('../../assets/banana.png') },
    { id: '3', name: 'Organic Bananas', weight: '12kg', price: 3.00, qty: 1, image: require('../../assets/banana.png') },
    { id: '4', name: 'Ginger', weight: '250gm', price: 2.99, qty: 1, image: require('../../assets/ginger.png') },
  ]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
