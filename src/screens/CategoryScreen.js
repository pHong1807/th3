import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';

export default function CategoryScreen({ navigation, route }) {
  const { category } = route.params;
  const [sortBy, setSortBy] = useState('default');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const filtered = products.filter(p => p.category === category);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={22} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Sort chips */}
      <View style={styles.sortRow}>
        {[
          { label: 'Default', value: 'default' },
          { label: 'Price ↑', value: 'price_asc' },
          { label: 'Price ↓', value: 'price_desc' },
          { label: 'Name', value: 'name' },
        ].map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, sortBy === opt.value && styles.chipActive]}
            onPress={() => setSortBy(opt.value)}
          >
            <Text style={[styles.chipText, sortBy === opt.value && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sorted}
        numColumns={2}
        keyExtractor={i => i.id}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={56} color="#ddd" />
            <Text style={styles.emptyText}>No products in this category</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { item })}
          >
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite(item.id) ? '#ff6b6b' : '#ccc'}
              />
            </TouchableOpacity>

            <Image source={item.image} style={styles.productImg} resizeMode="contain" />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.productWeight}>{item.weight}, Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 38, height: 38,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  filterBtn: {
    width: 38, height: 38,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  chipText: { fontSize: 12, color: '#666', fontWeight: '500' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  heartBtn: {
    position: 'absolute', top: 8, right: 8, zIndex: 1, padding: 4,
  },
  productImg: { width: '100%', height: 100, marginBottom: 8 },
  productName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  productWeight: { fontSize: 11, color: '#999', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  addBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 32, height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyText: { fontSize: 15, color: '#aaa', marginTop: 12 },
});
