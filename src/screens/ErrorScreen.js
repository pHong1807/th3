import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorScreen({ navigation, route }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRetry = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('Shop');
  };

  return (
    <View style={styles.overlay}>
      {/* Dimmed background */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />

      {/* Modal card */}
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={handleHome}>
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>

        {/* Illustration */}
        <View style={styles.illustration}>
          {/* Grocery bag emoji illustration */}
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationEmoji}>🛒</Text>
          </View>
        </View>

        {/* Error Text */}
        <Text style={styles.title}>Oops! Order Failed</Text>
        <Text style={styles.subtitle}>Something went terribly wrong.</Text>

        {/* Try Again Button */}
        <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
          <Text style={styles.retryBtnText}>Please Try Again</Text>
        </TouchableOpacity>

        {/* Back to home */}
        <TouchableOpacity style={styles.homeBtn} onPress={handleHome}>
          <Text style={styles.homeBtnText}>Back to home</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Tab Bar area blur */}
      <View style={styles.tabBarPlaceholder} />
    </View>
  );
}

// This screen can also be shown as a modal from CheckoutScreen via navigation
// or standalone as a full screen
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 28,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    marginTop: 16,
    marginBottom: 20,
  },
  illustrationCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#f0faf0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 28,
  },
  retryBtn: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  retryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  homeBtn: {
    paddingVertical: 8,
  },
  homeBtnText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  tabBarPlaceholder: {
    height: 80,
  },
});
