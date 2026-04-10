import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, total, removeFromCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery');
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoModal, setShowPromoModal] = useState(false);

  const deliveryOptions = ['Standard Delivery', 'Express Delivery', 'Pick Up'];
  const promoCodes = ['SAVE10', 'FRESH20', 'NEWUSER'];

  const handlePlaceOrder = () => {
  if (cartItems.length === 3) {
    navigation.navigate('OrderError');
  } else {
    navigation.navigate('OrderAccepted');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cart List (scrollable background) */}
      <ScrollView style={styles.cartList} contentContainerStyle={{ paddingBottom: 320 }}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.map((item) => (
          // THAY bằng đoạn này
<View key={item.id} style={styles.cartItem}>
  <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
  <View style={styles.itemLeft}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemSub}>{item.weight}, Price</Text>
    <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
  </View>
  <TouchableOpacity>
    <Ionicons name="close" size={18} color="#aaa" />
  </TouchableOpacity>
</View>
        ))}
      </ScrollView>

      {/* Checkout bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Checkout</Text>
          <TouchableOpacity onPress={() => navigation && navigation.goBack && navigation.goBack()}>
            <Ionicons name="close" size={22} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Delivery */}
        <TouchableOpacity style={styles.row} onPress={() => setShowDeliveryModal(true)}>
          <Text style={styles.rowLabel}>Delivery</Text>
          <View style={styles.rowRight}>
            <Text style={styles.rowValue}>{deliveryMethod}</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </View>
        </TouchableOpacity>

        {/* Payment */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Payment</Text>
          <View style={styles.rowRight}>
            <View style={styles.paymentBadge}>
              <Text style={styles.paymentText}>💳</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </View>
        </TouchableOpacity>

        {/* Promo Code */}
        <TouchableOpacity style={styles.row} onPress={() => setShowPromoModal(true)}>
          <Text style={styles.rowLabel}>Promo Code</Text>
          <View style={styles.rowRight}>
            <Text style={[styles.rowValue, { color: promoCode ? '#4CAF50' : '#aaa' }]}>
              {promoCode || 'Pick discount'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </View>
        </TouchableOpacity>

        {/* Total */}
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Total Cost</Text>
          <View style={styles.rowRight}>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </View>
        </View>

        <Text style={styles.terms}>
          By placing an order you agree to our{' '}
          <Text style={styles.termsLink}>Terms</Text> And{' '}
          <Text style={styles.termsLink}>Conditions</Text>
        </Text>

        <TouchableOpacity style={styles.placeBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Modal */}
      <Modal visible={showDeliveryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Delivery</Text>
            {deliveryOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalOption}
                onPress={() => { setDeliveryMethod(opt); setShowDeliveryModal(false); }}
              >
                <Text style={[styles.modalOptionText, deliveryMethod === opt && { color: '#4CAF50', fontWeight: '700' }]}>{opt}</Text>
                {deliveryMethod === opt && <Ionicons name="checkmark" size={18} color="#4CAF50" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowDeliveryModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Promo Modal */}
      <Modal visible={showPromoModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Pick a Discount</Text>
            {promoCodes.map((code) => (
              <TouchableOpacity
                key={code}
                style={styles.modalOption}
                onPress={() => { setPromoCode(code); setShowPromoModal(false); }}
              >
                <Text style={[styles.modalOptionText, promoCode === code && { color: '#4CAF50', fontWeight: '700' }]}>{code}</Text>
                {promoCode === code && <Ionicons name="checkmark" size={18} color="#4CAF50" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowPromoModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', paddingHorizontal: 16, paddingTop: 8, marginBottom: 12 },
  cartList: { flex: 1 },
  cartItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, padding: 14, elevation: 1
  },
  itemLeft: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  itemSub: { fontSize: 12, color: '#999', marginTop: 2 },

  // Checkout Sheet
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30,
    elevation: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 12,
  },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },

  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f2f2f2'
  },
  rowLabel: { fontSize: 14, color: '#666' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowValue: { fontSize: 14, color: '#333', fontWeight: '500' },
  paymentBadge: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  paymentText: { fontSize: 14 },
  totalAmount: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },

  terms: { fontSize: 11, color: '#999', marginTop: 12, marginBottom: 14, lineHeight: 16 },
  termsLink: { color: '#4CAF50', fontWeight: '600' },

  placeBtn: {
    backgroundColor: '#4CAF50', borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', elevation: 2
  },
  placeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 36 },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
  modalOption: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5'
  },
  modalOptionText: { fontSize: 15, color: '#333' },
  modalCancel: { marginTop: 16, alignItems: 'center' },
  modalCancelText: { fontSize: 15, color: '#999', fontWeight: '600' },
  itemImg: { width: 60, height: 60, marginRight: 12, borderRadius: 10 },
  itemPrice: { fontSize: 13, fontWeight: '700', color: '#4CAF50', marginTop: 4 },
});

