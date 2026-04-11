import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const CART_KEY = '@nectar_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Khi app khởi động: tải giỏ hàng từ AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const json = await AsyncStorage.getItem(CART_KEY);
        if (json) {
          setCartItems(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Lỗi khi tải giỏ hàng:', e);
      } finally {
        setCartLoaded(true);
      }
    };
    loadCart();
  }, []);

  // Mỗi khi cartItems thay đổi: lưu vào AsyncStorage
  useEffect(() => {
    if (!cartLoaded) return;
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      } catch (e) {
        console.warn('Lỗi khi lưu giỏ hàng:', e);
      }
    };
    saveCart();
  }, [cartItems, cartLoaded]);

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

  const clearCart = async () => {
    setCartItems([]);
    try {
      await AsyncStorage.removeItem(CART_KEY);
    } catch (e) {
      console.warn('Lỗi khi xóa giỏ hàng:', e);
    }
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartLoaded, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
