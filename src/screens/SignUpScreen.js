import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const validateEmail = (val) => {
    setEmail(val);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };

  const handleSignUp = () => {
    if (username && emailValid && password.length >= 6) {
      navigation.navigate('SelectLocation');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>

          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#aaa"
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter email"
              placeholderTextColor="#aaa"
            />
            {emailValid && (
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.validIcon} />
            )}
          </View>
          <View style={styles.inputUnderline} />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter password"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputUnderline} />

          <Text style={styles.terms}>
            By continuing you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>
            {'\n'}and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
            .
          </Text>

          <TouchableOpacity
            style={[styles.signupBtn, (!username || !emailValid || password.length < 6) && styles.disabled]}
            onPress={handleSignUp}
          >
            <Text style={styles.signupBtnText}>Sing Up</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginHint}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>SingIn</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f0faf0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 36,
  },
  label: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 6,
  },
  input: {
    fontSize: 15,
    color: '#1a1a1a',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validIcon: { paddingBottom: 4 },
  eyeBtn: { paddingHorizontal: 8, paddingBottom: 4 },
  inputUnderline: {
    height: 1.5,
    backgroundColor: '#e0e0e0',
    marginBottom: 24,
  },
  terms: {
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
    marginBottom: 28,
  },
  link: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  signupBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabled: { backgroundColor: '#a5d6a7' },
  signupBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginHint: { fontSize: 14, color: '#666' },
  loginLink: { fontSize: 14, color: '#4CAF50', fontWeight: '700' },
});
