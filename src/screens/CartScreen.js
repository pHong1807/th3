import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQty, total } = useCart();

  const handleCheckout = () => {
    if (navigation) navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.count}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add items to get started</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={i => i.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemWeight}>{item.weight}, Price</Text>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                      <Ionicons name="remove" size={16} color="#4CAF50" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                      <Ionicons name="add" size={16} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                    <Ionicons name="close" size={18} color="#999" />
                  </TouchableOpacity>
                  <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
                </View>
              </View>
            )}
          />

          {/* Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>Free</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Go to Checkout</Text>
              <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  count: { fontSize: 14, color: '#999' },
  list: { paddingHorizontal: 16, paddingTop: 4 },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', elevation: 1 },
  itemImg: { width: 70, height: 70, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  itemWeight: { fontSize: 12, color: '#999', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, borderColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', minWidth: 20, textAlign: 'center' },
  itemRight: { alignItems: 'flex-end', justifyContent: 'space-between', height: 70 },
  deleteBtn: { padding: 2 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  summary: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, elevation: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#999' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 12, marginTop: 4, marginBottom: 16 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },
  checkoutBtn: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  checkoutTotal: { color: '#c8e6c9', fontSize: 14, fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#aaa', marginTop: 4 },
});
