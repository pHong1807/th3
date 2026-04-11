import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const exclusiveOffers = [
  { id: '7', name: 'Organic Bananas', weight: '7pcs', price: 4.99, category: 'Fruits', image: require('../../assets/banana.png') },
  { id: 'r1', name: 'Red Apple', weight: '1kg', price: 4.99, category: 'Fruits', image: require('../../assets/redapple.png') },
];

const bestSelling = [
  { id: 'b1', name: 'Bell Pepper Red', weight: '1kg', price: 4.99, category: 'Vegetables', image: require('../../assets/bellpepper.png') },
  { id: 'b2', name: 'Ginger', weight: '250gm', price: 2.99, category: 'Vegetables', image: require('../../assets/ginger.png') },
];

const groceryCategories = [
  { name: 'Pulses', bg: '#fff8ee', image: require('../../assets/pulses.png') },
  { name: 'Rice', bg: '#f2f9ee', image: require('../../assets/rice.png') },
  { name: 'Oil', bg: '#fff0f0', image: require('../../assets/oil.png') },
  { name: 'Bread', bg: '#f0f4ff', image: require('../../assets/bread.png') },
];

const groceryProducts = [
  { id: 'g1', name: 'Beef Bone', weight: '1kg', price: 4.99, image: require('../../assets/beefbone.png') },
  { id: 'g2', name: 'Broiler Chicken', weight: '1kg', price: 4.99, image: require('../../assets/broilerchicken.png') },
];

function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProductCard({ item, onAdd, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.85}>
      <Image source={item.image} style={styles.productImg} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productWeight}>{item.weight}, Priceg</Text>
      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function ShopScreen({ navigation }) {
  const { addToCart, count } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Image source={require('../../assets/carrot.png')} style={styles.carrotIcon} resizeMode="contain" />
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={14} color="#4CAF50" />
              <Text style={styles.locationText}>Trần Tuấn Phong, 23810310316</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <Text style={styles.searchPlaceholder}>Search Store</Text>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.bannerWrap}>
          <Image source={require('../../assets/banner.png')} style={styles.bannerImg} resizeMode="cover" />
        </View>

        {/* Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" onSeeAll={() => navigation.navigate('Explore')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {exclusiveOffers.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={() => addToCart(item)}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            />
          ))}
        </ScrollView>

        {/* Best Selling */}
        <SectionHeader title="Best Selling" onSeeAll={() => navigation.navigate('Explore')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {bestSelling.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={() => addToCart(item)}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            />
          ))}
        </ScrollView>

        {/* Groceries */}
        <SectionHeader title="Groceries" onSeeAll={() => navigation.navigate('Explore')} />

        {/* Category chips horizontal */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {groceryCategories.map(cat => (
            <TouchableOpacity
              key={cat.name}
              style={[styles.groceryCat, { backgroundColor: cat.bg }]}
              onPress={() => navigation.navigate('Explore')}
            >
              <Image source={cat.image} style={styles.groceryCatImg} resizeMode="contain" />
              <Text style={styles.groceryCatName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grocery products grid */}
        <View style={styles.gridRow}>
          {groceryProducts.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={() => addToCart(item)}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            />
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_WIDTH = 174;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  carrotIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f3f2',
    marginHorizontal: 16,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchPlaceholder: { color: '#7c7c7c', fontSize: 14, marginLeft: 8 },

  // Banner
  bannerWrap: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 130,
    marginBottom: 20,
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'right',
  },
  bannerSub: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'right',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },
  dotActive: {
    backgroundColor: '#4CAF50',
    width: 16,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  seeAll: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },

  // Horizontal scroll
  hScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 8,
    marginBottom: 12,
  },

  // Product card
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  productImg: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  productName: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  productWeight: { fontSize: 12, color: '#7c7c7c', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  addBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 17,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Grocery categories
  groceryCat: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 12,
    minWidth: 110,
  },
  groceryCatImg: { width: 36, height: 36, marginRight: 8 },
  groceryCatName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },

  // Grid row for grocery products
  gridRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
});