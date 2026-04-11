import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('phongtan1098@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } else {
      setError(result.error || 'Đăng nhập thất bại.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoRow}>
            <Image
              source={require('../../assets/carrot.png')}
              style={styles.carrot}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Enter your email and password</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputUnderline} />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.loginBtn, loading && { opacity: 0.7 }]} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.loginBtnText}>Log In</Text>
            }
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupHint}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  carrot: { width: 40, height: 40, tintColor: '#fff', marginRight: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 36 },
  errorText: { color: '#e53935', fontSize: 13, marginBottom: 12, backgroundColor: '#fff3f3', padding: 10, borderRadius: 8 },
  label: { fontSize: 13, color: '#aaa', marginBottom: 6 },
  input: { fontSize: 15, color: '#1a1a1a', borderBottomWidth: 1.5, borderBottomColor: '#e0e0e0', paddingVertical: 10, marginBottom: 24 },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: { paddingHorizontal: 8, paddingVertical: 10 },
  inputUnderline: { height: 1.5, backgroundColor: '#e0e0e0', marginBottom: 12 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 32 },
  forgotText: { fontSize: 13, color: '#4CAF50', fontWeight: '600' },
  loginBtn: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupHint: { fontSize: 14, color: '#666' },
  signupLink: { fontSize: 14, color: '#4CAF50', fontWeight: '700' },
});
