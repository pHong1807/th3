import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ShopScreen({ navigation }) {
  const { addToCart, count } = useCart();
  const featured = products.slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.location}>📍 Hanoi, Vietnam</Text>
            <Text style={styles.headerTitle}>Good Morning! 👋</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartBtn}>
            <Ionicons name="cart-outline" size={24} color="#333" />
            {count > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <Text style={styles.searchPlaceholder}>Search for groceries...</Text>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSub}>Fresh & Organic</Text>
            <Text style={styles.bannerTitle}>Get Your Daily{'\n'}Groceries Fast!</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../assets/banana.png')} style={styles.bannerImg} resizeMode="contain" />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {['🥚 Eggs', '🍝 Noodles', '🍟 Chips', '🥤 Drinks', '🍌 Fruits', '🥦 Veggies'].map((cat, i) => (
            <TouchableOpacity key={i} style={styles.catCard} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.catText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featured}
          numColumns={2}
          keyExtractor={i => i.id}
          scrollEnabled={false}
          columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImg} resizeMode="contain" />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productWeight}>{item.weight}, Price</Text>
              <View style={styles.rowBetween}>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  location: { fontSize: 12, color: '#666' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginTop: 2 },
  cartBtn: { padding: 8, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  badge: { position: 'absolute', top: 4, right: 4, backgroundColor: '#4CAF50', borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, gap: 8, elevation: 1, marginBottom: 16 },
  searchPlaceholder: { color: '#aaa', fontSize: 14 },
  banner: { marginHorizontal: 16, backgroundColor: '#4CAF50', borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  bannerContent: { flex: 1 },
  bannerSub: { color: '#c8e6c9', fontSize: 12, marginBottom: 4 },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', lineHeight: 26, marginBottom: 12 },
  bannerBtn: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#4CAF50', fontWeight: '700', fontSize: 13 },
  bannerImg: { width: 90, height: 90 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', paddingHorizontal: 16, marginBottom: 12 },
  seeAll: { color: '#4CAF50', fontSize: 13, paddingHorizontal: 16, marginBottom: 12 },
  catRow: { paddingLeft: 16, marginBottom: 20 },
  catCard: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, elevation: 1 },
  catText: { fontSize: 13, color: '#333' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, elevation: 2 },
  productImg: { width: '100%', height: 100, marginBottom: 8 },
  productName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  productWeight: { fontSize: 11, color: '#999', marginBottom: 8 },
  productPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  addBtn: { backgroundColor: '#4CAF50', borderRadius: 8, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});
