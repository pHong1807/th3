import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image,
  StyleSheet, Modal, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { products, brands } from '../data/products';

const EXPLORE_CATEGORIES = [
  { name: 'Fresh Fruits\n& Vegetable', category: 'Fruits & Vegetable', bg: '#e8f5e9', image: require('../../assets/fruit.png') },
  { name: 'Cooking Oil\n& Grease',       category: 'Cooking Oil',      bg: '#fff8e1', image: require('../../assets/oil.png') },
  { name: 'Meat & Fish',               category: 'Meat',             bg: '#fce4ec', image: require('../../assets/meat.png') },
  { name: 'Bakery &\nSnacks',          category: 'Bakery & Snacks',  bg: '#fff3e0', image: require('../../assets/bread.png') },
  { name: 'Dairy & Eggs',              category: 'Dairy & Eggs',     bg: '#f3e5f5', image: require('../../assets/dairy.png') },
  { name: 'Beverages',                 category: 'Drinks',           bg: '#e3f2fd', image: require('../../assets/bevarage.png') },
  { name: 'Noodles &\nPasta',          category: 'Noodles & Pasta',  bg: '#fff9c4', image: require('../../assets/pasta.png') },
];

const FILTER_CATEGORIES = [
  'Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Bakery & Snacks',
  'Fruits & Vegetable', 'Drinks', 'Meat', 'Cooking Oil', 'Dairy & Eggs',
];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isSearching = query.length > 0 || selectedCategory !== '';

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchQ = query === '' || p.name.toLowerCase().includes(query.toLowerCase());
      const matchC = selectedCategory === '' || p.category === selectedCategory;
      return matchQ && matchC;
    });
  }, [query, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Products</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Search Store"
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#aaa"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={22} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {!isSearching ? (
        <FlatList
          data={EXPLORE_CATEGORIES}
          numColumns={2}
          keyExtractor={i => i.name}
          columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryCard, { backgroundColor: item.bg }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Category', { category: item.category })}
            >
              <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <Text style={styles.resultCount}>
            {filtered.length} kết quả{query ? ` cho "${query}"` : ''}
          </Text>
          <FlatList
            data={filtered}
            numColumns={2}
            keyExtractor={i => i.id}
            columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductDetail', { item })}
              >
                <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isFavorite(item.id) ? '#ff6b6b' : '#ccc'}
                  />
                </TouchableOpacity>
                <Image source={item.image} style={styles.productImg} resizeMode="contain" />
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productWeight}>{item.weight}, Price</Text>
                <View style={styles.rowBetween}>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Ionicons name="search" size={48} color="#ddd" />
                <Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>
              </View>
            }
          />
        </>
      )}

      {/* Filter Modal */}
      <Modal visible={showFilter} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => { setSelectedCategory(''); setSelectedBrand(''); }}>
                <Text style={{ color: '#4CAF50', fontSize: 13 }}>Reset</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.filterSection}>Categories</Text>
              {FILTER_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={styles.filterRow}
                  onPress={() => setSelectedCategory(prev => prev === cat ? '' : cat)}
                >
                  <View style={[styles.checkbox, selectedCategory === cat && styles.checkboxActive]}>
                    {selectedCategory === cat && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={[styles.filterLabel, selectedCategory === cat && { color: '#4CAF50' }]}>{cat}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.filterSection}>Brand</Text>
              {brands.map(brand => (
                <TouchableOpacity
                  key={brand}
                  style={styles.filterRow}
                  onPress={() => setSelectedBrand(prev => prev === brand ? '' : brand)}
                >
                  <View style={[styles.checkbox, selectedBrand === brand && styles.checkboxActive]}>
                    {selectedBrand === brand && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={[styles.filterLabel, selectedBrand === brand && { color: '#4CAF50' }]}>{brand}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
              <Text style={styles.applyBtnText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', textAlign: 'center' },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 12, marginBottom: 8 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginRight: 8, elevation: 1 },
  input: { flex: 1, fontSize: 14, color: '#333', padding: 0, marginLeft: 8 },
  filterBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 1 },
  resultCount: { paddingHorizontal: 16, fontSize: 13, color: '#666', marginBottom: 8 },

  // Category cards
  categoryCard: { flex: 1, borderRadius: 18, padding: 12, marginBottom: 12, minHeight: 120, justifyContent: 'flex-end', overflow: 'hidden' },
  categoryImage: { width: '100%', height: 70, marginBottom: 8 },
  categoryName: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', lineHeight: 20 },

  // Product cards
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, elevation: 2 },
  heartBtn: { position: 'absolute', top: 8, right: 8, zIndex: 1, padding: 4 },
  productImg: { width: '100%', height: 100, marginBottom: 8 },
  productName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  productWeight: { fontSize: 11, color: '#999', marginBottom: 8 },
  productPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  addBtn: { backgroundColor: '#4CAF50', borderRadius: 8, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: '#aaa', marginTop: 12 },

  // Filter modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  filterSection: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 12, marginTop: 8 },
  filterRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkboxActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  filterLabel: { fontSize: 15, color: '#333' },
  applyBtn: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  applyBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});