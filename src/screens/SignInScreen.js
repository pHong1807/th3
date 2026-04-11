import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top image area */}
      <View style={styles.imageArea}>
        <View style={styles.imageBg}>
          <Image source={require('../../assets/signin.png')} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

        {/* Phone input */}
        <TouchableOpacity
          style={styles.phoneRow}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          <Text style={styles.flag}>🇻🇳</Text>
          <Text style={styles.code}>+84</Text>
          <View style={styles.phoneDivider} />
          <Text style={styles.phonePlaceholder}>Enter phone number</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>Or connect with social media</Text>
          <View style={styles.orLine} />
        </View>

        {/* Google */}
        <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.socialBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={[styles.socialBtn, styles.fbBtn]}>
          <Ionicons name="logo-facebook" size={20} color="#fff" />
          <Text style={styles.socialBtnText}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginHint}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageArea: {
    height: height * 0.32,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 34,
    marginBottom: 24,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
    marginBottom: 28,
    gap: 10,
  },
  flag: { fontSize: 20 },
  phoneCode: { fontSize: 15, color: '#333', fontWeight: '600' },
  phoneDivider: { width: 1, height: 18, backgroundColor: '#ddd' },
  phonePlaceholder: { fontSize: 15, color: '#aaa' },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  orLine: { flex: 1, height: 1, backgroundColor: '#eee' },
  orText: { fontSize: 12, color: '#999' },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 14,
    gap: 10,
  },
  googleBtn: { backgroundColor: '#5383EC' },
  fbBtn: { backgroundColor: '#3B5998' },
  socialBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginHint: { fontSize: 14, color: '#666' },
  loginLink: { fontSize: 14, color: '#4CAF50', fontWeight: '700' },
});
