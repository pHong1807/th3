import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['+*#', '0', '⌫'],
];

export default function VerificationScreen({ navigation, route }) {
  const [code, setCode] = useState('');
  const phone = route?.params?.phone || '880';

  const handleKey = (key) => {
    if (key === '⌫') {
      setCode(p => p.slice(0, -1));
    } else if (key !== '+*#' && code.length < 4) {
      const newCode = code + key;
      setCode(newCode);
      if (newCode.length === 4) {
        // Auto-proceed after full code entry
        setTimeout(() => navigation.navigate('SelectLocation'), 300);
      }
    }
  };

  const renderDots = () => {
    return Array.from({ length: 4 }).map((_, i) => (
      <View key={i} style={[styles.dot, i < code.length && styles.dotFilled]}>
        {i < code.length ? (
          <View style={styles.dotInner} />
        ) : (
          <Text style={styles.dash}>-</Text>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your 4-digit{'\n'}code</Text>

        <Text style={styles.label}>Code</Text>
        <View style={styles.codeRow}>
          {renderDots()}
        </View>

        <TouchableOpacity style={styles.resendBtn}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      {code.length === 4 && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('SelectLocation')}
        >
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Keypad */}
      <View style={styles.keypad}>
        {KEYS.map((row, ri) => (
          <View key={ri} style={styles.keyRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyBtn}
                onPress={() => handleKey(key)}
                activeOpacity={0.6}
              >
                <Text style={[styles.keyText, key === '⌫' && styles.backKey]}>
                  {key}
                </Text>
                {key !== '+*#' && key !== '⌫' && key !== '0' && (
                  <Text style={styles.keySubText}>
                    {['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][parseInt(key)] || ''}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  back: { padding: 16, paddingBottom: 4 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 34,
    marginBottom: 32,
  },
  label: { fontSize: 13, color: '#aaa', marginBottom: 16 },
  codeRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0',
    marginBottom: 24,
  },
  dot: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotFilled: {},
  dotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
  },
  dash: {
    fontSize: 24,
    color: '#aaa',
    lineHeight: 28,
  },
  resendBtn: { alignSelf: 'flex-start' },
  resendText: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },
  nextBtn: {
    position: 'absolute',
    right: 24,
    bottom: 220,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  keypad: {
    paddingBottom: 8,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  keyRow: { flexDirection: 'row' },
  keyBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#fff',
  },
  keyText: { fontSize: 22, color: '#1a1a1a' },
  backKey: { fontSize: 20, color: '#555' },
  keySubText: { fontSize: 9, color: '#aaa', letterSpacing: 1, marginTop: 1 },
});
