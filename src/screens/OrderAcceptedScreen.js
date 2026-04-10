import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function OrderAcceptedScreen({ navigation }) {
  const { clearCart } = useCart();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Clear cart on order success
    if (clearCart) clearCart();

    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative floating dots */}
      <View style={[styles.dot, styles.dotTL, { backgroundColor: '#4CAF50' }]} />
      <View style={[styles.dot, styles.dotTR, { backgroundColor: '#FF6B6B' }]} />
      <View style={[styles.dot, styles.dotBL, { backgroundColor: '#FFD166' }]} />
      <View style={[styles.dot, styles.dotBR, { backgroundColor: '#4CAF50', opacity: 0.4 }]} />
      <View style={[styles.dot, styles.dotMid, { backgroundColor: '#06D6A0', width: 10, height: 10, borderRadius: 5 }]} />

      {/* Curved decorative lines */}
      <View style={styles.curlTop} />
      <View style={styles.curlBottom} />

      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={52} color="#fff" />
          </View>
        </Animated.View>

        {/* Text */}
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>
          <Text style={styles.subtitle}>
            Your items has been placed and is on{'\n'}it's way to being processed
          </Text>
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View style={[styles.buttons, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => navigation.navigate('Main', { screen: 'Shop' })}
        >
          <Text style={styles.trackBtnText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Main', { screen: 'Shop' })}
        >
          <Text style={styles.homeBtnText}>Back to home</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Decorative dots
  dot: { position: 'absolute', width: 14, height: 14, borderRadius: 7 },
  dotTL: { top: 120, left: 40 },
  dotTR: { top: 200, right: 30 },
  dotBL: { bottom: 260, left: 50 },
  dotBR: { bottom: 300, right: 50 },
  dotMid: { top: '40%', left: 25 },

  // Decorative swirl lines (simulated with borders)
  curlTop: {
    position: 'absolute', top: 100, right: 20,
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 2, borderColor: '#FFD166', borderStyle: 'dashed',
    opacity: 0.5,
  },
  curlBottom: {
    position: 'absolute', bottom: 180, left: 20,
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2, borderColor: '#FF6B6B', borderStyle: 'dashed',
    opacity: 0.4,
  },

  // Icon
  iconWrap: { marginBottom: 36 },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#4CAF50',
    alignItems: 'center', justifyContent: 'center',
    elevation: 8,
    shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 16,
  },

  title: {
    fontSize: 26, fontWeight: '800', color: '#1a1a1a',
    textAlign: 'center', lineHeight: 34, marginBottom: 14
  },
  subtitle: {
    fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22
  },

  // Buttons
  buttons: {
    paddingHorizontal: 24, paddingBottom: 40, gap: 12
  },
  trackBtn: {
    backgroundColor: '#4CAF50', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center', elevation: 2,
    shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
  },
  trackBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  homeBtn: {
    paddingVertical: 14, alignItems: 'center'
  },
  homeBtnText: { color: '#666', fontSize: 15, fontWeight: '500' },
});
