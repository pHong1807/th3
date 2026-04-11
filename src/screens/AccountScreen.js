import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Ionicons name={icon} size={19} color="#4CAF50" />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={17} color="#ddd" />
  </TouchableOpacity>
);

export default function AccountScreen({ navigation }) {
  const { clearCart } = useCart();
  const { clearFavorites } = useFavorites();
  const { logout, user } = useAuth();

  const press = (label) => Alert.alert(label, 'Coming soon!', [{ text: 'OK' }]);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await clearCart();
            clearFavorites();
            await logout(); // Xóa token khỏi AsyncStorage
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../assets/Avatar.jpg')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.editBadge} onPress={() => press('Edit Profile')}>
              <Ionicons name="pencil" size={11} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Người dùng'}</Text>
            <Text style={styles.profileEmail}>{user?.email || ''}</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <MenuItem icon="receipt-outline" label="Orders" onPress={() => navigation.navigate('Orders')} />
          <MenuItem icon="person-outline" label="My Details" onPress={() => press('My Details')} />
          <MenuItem icon="location-outline" label="Delivery Address" onPress={() => press('Delivery Address')} />
          <MenuItem icon="card-outline" label="Payment Methods" onPress={() => press('Payment Methods')} />
          <MenuItem icon="pricetag-outline" label="Promo Card" onPress={() => press('Promo Card')} />
          <MenuItem icon="notifications-outline" label="Notifications" onPress={() => press('Notifications')} />
          <MenuItem icon="help-circle-outline" label="Help" onPress={() => press('Help')} />
          <MenuItem icon="information-circle-outline" label="About" onPress={() => press('About')} />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={19} color="#ff5252" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  profileSection: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24,
  },
  avatarWrap: { position: 'relative', marginRight: 16 },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#e8f5e9', elevation: 2,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 3 },
  profileEmail: { fontSize: 13, color: '#888' },
  menuCard: {
    backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 20, overflow: 'hidden',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6, marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 15,
    borderBottomWidth: 1, borderBottomColor: '#f6f6f6',
  },
  menuIcon: {
    width: 38, height: 38, borderRadius: 11, backgroundColor: '#f0faf0',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  menuLabel: { flex: 1, fontSize: 14.5, color: '#2a2a2a', fontWeight: '500' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16,
    paddingVertical: 15, elevation: 1, borderWidth: 1.5, borderColor: '#ffe0e0',
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#ff5252', marginLeft: 8 },
});