import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductDetailScreen({ navigation, route }) {
  const { item } = route.params;
  const [qty, setQty] = useState(1);
  const [detailOpen, setDetailOpen] = useState(true);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(item);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageArea}>
          <Image source={item.image} style={styles.productImage} resizeMode="contain" />
          {/* Dots indicator */}
          <View style={styles.dots}>
            {[0, 1, 2].map((d, i) => (
              <View key={d} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {/* Title row */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productWeight}>{item.weight}, Price</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Ionicons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={26}
                color={isFavorite(item.id) ? '#ff6b6b' : '#ccc'}
              />
            </TouchableOpacity>
          </View>

          {/* Qty + Price */}
          <View style={styles.qtyRow}>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQty(q => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQty(q => q + 1)}
              >
                <Ionicons name="add" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${(item.price * qty).toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* Product Detail accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setDetailOpen(p => !p)}
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Ionicons
              name={detailOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#666"
            />
          </TouchableOpacity>
          {detailOpen && (
            <Text style={styles.detailText}>
              {item.name} is a fresh and high-quality product. It is nutritious, may be good
              for weight loss, and good for your heart. As part of a healthy and varied diet,
              it provides essential nutrients your body needs every day.
            </Text>
          )}

          <View style={styles.divider} />

          {/* Nutritions row */}
          <TouchableOpacity style={styles.infoRow} onPress={() => {}}>
            <Text style={styles.infoLabel}>Nutritions</Text>
            <View style={styles.infoRight}>
              <View style={styles.tag}><Text style={styles.tagText}>100g</Text></View>
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Review row */}
          <TouchableOpacity style={styles.infoRow} onPress={() => {}}>
            <Text style={styles.infoLabel}>Review</Text>
            <View style={styles.infoRight}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Ionicons key={s} name="star" size={14} color="#F9A825" />
                ))}
              </View>
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add to Basket */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconBtn: {
    width: 40, height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageArea: {
    backgroundColor: '#f9f9f9',
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  productImage: {
    width: '70%',
    height: '80%',
  },
  dots: {
    position: 'absolute',
    bottom: 14,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7, height: 7,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  dotActive: { backgroundColor: '#4CAF50', width: 20 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productWeight: { fontSize: 13, color: '#aaa' },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  qtyBtn: { padding: 4 },
  qtyText: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', minWidth: 24, textAlign: 'center' },
  price: { fontSize: 24, fontWeight: '800', color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 14 },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accordionTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  detailText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  infoRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { fontSize: 11, color: '#666' },
  starsRow: { flexDirection: 'row', gap: 2 },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
