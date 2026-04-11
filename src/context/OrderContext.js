import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderContext = createContext();

const ORDERS_KEY = '@nectar_orders';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Tải danh sách đơn hàng khi khởi động
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const json = await AsyncStorage.getItem(ORDERS_KEY);
        if (json) setOrders(JSON.parse(json));
      } catch (e) {
        console.warn('Lỗi khi tải đơn hàng:', e);
      }
    };
    loadOrders();
  }, []);

  // Đặt hàng: lưu đơn hàng mới vào AsyncStorage
  const placeOrder = async ({ items, total, deliveryMethod }) => {
    const newOrder = {
      id: 'ORD-' + Date.now(),
      items: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
      deliveryMethod,
      placedAt: new Date().toISOString(),
      status: 'Đang xử lý',
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Lỗi khi lưu đơn hàng:', e);
    }
    return newOrder;
  };

  // Xóa toàn bộ đơn hàng (dùng khi logout nếu muốn)
  const clearOrders = async () => {
    setOrders([]);
    try {
      await AsyncStorage.removeItem(ORDERS_KEY);
    } catch (e) {
      console.warn('Lỗi khi xóa đơn hàng:', e);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
