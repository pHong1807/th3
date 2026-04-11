import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen({ navigation }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Chờ AuthContext kiểm tra AsyncStorage xong
    if (loading) return;

    const timer = setTimeout(() => {
      if (user) {
        // Đã có session -> vào thẳng màn hình chính (auto-login)
        navigation.replace('Main');
      } else {
        // Chưa đăng nhập -> đi qua Onboarding
        navigation.replace('Onboarding');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#53B175" barStyle="light-content" />
      <View style={styles.logoRow}>
        <Image
          source={require('../../assets/Carrot1.png')}
          style={styles.carrot}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.brand}>nectar</Text>
          <Text style={styles.tagline}>online groceries</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', alignItems: 'center', justifyContent: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  carrot: { width: 40, height: 40, tintColor: '#fff', marginRight: 10 },
  brand: { fontSize: 40, fontWeight: '600', color: '#fff', letterSpacing: 1, lineHeight: 44 },
  tagline: { fontSize: 12, color: '#fff', letterSpacing: 2, opacity: 0.85, textAlign: 'center' },
});
