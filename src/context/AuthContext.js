import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AUTH_KEY = '@nectar_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true khi đang kiểm tra auto-login

  // Khi app mở: đọc user từ AsyncStorage để auto-login
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(AUTH_KEY);
        if (json) {
          setUser(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Lỗi khi tải user:', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Đăng nhập: lưu user vào AsyncStorage
  const login = async (email, password) => {
    // Giả lập xác thực (thay bằng API thật nếu cần)
    const userData = {
      id: '1',
      name: 'Trần Tuấn Phong',
      email: email || 'phongtan1098@gmail.com',
      token: 'fake-jwt-token-' + Date.now(),
    };
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (e) {
      console.warn('Lỗi khi lưu user:', e);
      return { success: false, error: 'Không thể lưu thông tin đăng nhập.' };
    }
  };

  // Đăng xuất: xóa user khỏi AsyncStorage
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.warn('Lỗi khi xóa user:', e);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
