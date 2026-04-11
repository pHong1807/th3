import React from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function OrdersScreen({ navigation }) {
  const { orders } = useOrders();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.date}>{formatDate(item.placedAt)}</Text>

      {/* Danh sách sản phẩm */}
      {item.items.map((p, idx) => (
        <View key={idx} style={styles.productRow}>
          <Ionicons name="ellipse" size={6} color="#4CAF50" style={{ marginTop: 5 }} />
          <Text style={styles.productText}>
            {p.name}  ×{p.qty}  — ${(p.price * p.qty).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.deliveryLabel}>{item.deliveryMethod}</Text>
        <Text style={styles.totalLabel}>Tổng: <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text></Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Đơn hàng của tôi</Text>
        <View style={{ width: 40 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
          <Text style={styles.emptyText}>Hãy đặt hàng để xem lịch sử ở đây</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  title: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },
  statusBadge: { backgroundColor: '#e8f5e9', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  statusText: { fontSize: 11, color: '#4CAF50', fontWeight: '600' },
  date: { fontSize: 12, color: '#999', marginBottom: 10 },
  productRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 3 },
  productText: { fontSize: 13, color: '#444', flex: 1 },
  divider: { height: 1, backgroundColor: '#f2f2f2', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deliveryLabel: { fontSize: 12, color: '#999' },
  totalLabel: { fontSize: 13, color: '#666' },
  totalAmount: { fontWeight: '800', color: '#4CAF50', fontSize: 15 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  emptyText: { fontSize: 14, color: '#999' },
});
