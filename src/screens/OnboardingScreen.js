import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ImageBackground
        source={require('../../assets/onbording.png')}
        style={styles.imageArea}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Image
           source={require('../../assets/Carrot1.png')}
           style={styles.logo}
           resizeMode="contain"
          />
          <Text style={styles.title}>Welcome{'\n'}to our store</Text>
          <Text style={styles.subtitle}>
            Get your groceries in as fast as one hour
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageArea: {
    flex: 1,                    
    justifyContent: 'flex-end', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 150,
    alignItems: 'center',
  },
  logo: {
   width: 60,
   height: 60,
   marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 42,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
    lineHeight: 22,
  },
  btn: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});