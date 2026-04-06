import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const addAllToCart = () => {
    favorites.forEach(item => addToCart(item));
    Alert.alert('Success', 'All favorites added to cart!', [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourite</Text>
        <Text style={styles.count}>{favorites.length} items</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptyText}>Save items you love for quick access</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favorites}
            keyExtractor={i => i.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.favItem}>
                <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemWeight}>{item.weight}, Price</Text>
                </View>
                <View style={styles.itemRight}>
                  <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.heartBtn}>
                    <Ionicons name="heart" size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.arrowBtn} onPress={() => addToCart(item)}>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.footer}>
            <TouchableOpacity style={styles.addAllBtn} onPress={addAllToCart}>
              <Text style={styles.addAllText}>Add All To Cart</Text>
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
  favItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', elevation: 1 },
  itemImg: { width: 60, height: 60, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  itemWeight: { fontSize: 12, color: '#999' },
  itemRight: { alignItems: 'flex-end', gap: 4 },
  heartBtn: { padding: 2 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  arrowBtn: { padding: 2 },
  footer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 8 },
  addAllBtn: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  addAllText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#aaa', marginTop: 4 },
});
