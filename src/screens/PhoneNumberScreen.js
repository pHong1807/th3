import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['+*#', '0', '⌫'],
];

export default function PhoneNumberScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleKey = (key) => {
    if (key === '⌫') {
      setPhone(p => p.slice(0, -1));
    } else if (key === '+*#') {
      // ignore
    } else if (phone.length < 11) {
      setPhone(p => p + key);
    }
  };

  const canProceed = phone.length >= 8;

  return (
    <SafeAreaView style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile{'\n'}number</Text>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputRow}>
          <Text style={styles.flag}>🇻🇳</Text>
          <Text style={styles.code}>+84</Text>
          <Text style={styles.phoneText}>{phone}</Text>
          <View style={styles.cursor} />
        </View>
      </View>

      {/* Next button */}
      <View style={styles.nextRow}>
        <TouchableOpacity
          style={[styles.nextBtn, !canProceed && styles.nextBtnDisabled]}
          onPress={() => {
            if (canProceed) navigation.navigate('Verification', { phone });
          }}
        >
          <Text style={styles.nextBtnText}>{' > '}</Text>
        </TouchableOpacity>
      </View>

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
                {!['⌫', '+*#', '0'].includes(key) && (
                  <Text style={styles.keySubText}>
                    {['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][parseInt(key)]}
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 34,
    marginBottom: 32,
  },
  label: { fontSize: 13, color: '#aaa', marginBottom: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  flag: { fontSize: 20, marginRight: 8 },
  code: { fontSize: 16, color: '#333', fontWeight: '600', marginRight: 8 },
  phoneText: { fontSize: 16, color: '#1a1a1a', letterSpacing: 2 },
  cursor: { width: 2, height: 20, backgroundColor: '#4CAF50', marginLeft: 2 },

  nextRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  nextBtn: {
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
  nextBtnDisabled: {
    backgroundColor: '#a5d6a7',
    elevation: 0,
  },
  nextBtnText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    includeFontPadding: false,
  },

  keypad: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f5f5f5',
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