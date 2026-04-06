import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Ionicons name={icon} size={20} color="#4CAF50" />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={18} color="#ccc" />
  </TouchableOpacity>
);

export default function AccountScreen() {
  const press = (label) => Alert.alert(label, 'Coming soon!', [{ text: 'OK' }]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Nguyen Van A</Text>
          <Text style={styles.email}>nguyenvana@email.com</Text>
        </View>
      </View>
      <View style={styles.menu}>
        <MenuItem icon="receipt-outline" label="My Orders" onPress={() => press('My Orders')} />
        <MenuItem icon="location-outline" label="Delivery Address" onPress={() => press('Delivery Address')} />
        <MenuItem icon="card-outline" label="Payment Methods" onPress={() => press('Payment Methods')} />
        <MenuItem icon="notifications-outline" label="Notifications" onPress={() => press('Notifications')} />
        <MenuItem icon="help-circle-outline" label="Help & Support" onPress={() => press('Help & Support')} />
        <MenuItem icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => press('Privacy Policy')} />
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => press('Logout')}>
        <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  title: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', paddingHorizontal: 16, paddingTop: 8, marginBottom: 16 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, padding: 16, gap: 16, elevation: 2, marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  email: { fontSize: 13, color: '#999', marginTop: 2 },
  menu: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f0faf0', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, color: '#333' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginTop: 20, backgroundColor: '#fff0f0', borderRadius: 14, paddingVertical: 14, gap: 8 },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#ff6b6b' },
});
