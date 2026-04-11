import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { OrderProvider } from './src/context/OrderContext';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import SelectLocationScreen from './src/screens/SelectLocationScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import ShopScreen from './src/screens/ShopScreen';
import SearchScreen from './src/screens/SearchScreen';
import CartScreen from './src/screens/CartScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AccountScreen from './src/screens/AccountScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderAcceptedScreen from './src/screens/OrderAcceptedScreen';
import ErrorScreen from './src/screens/ErrorScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import OrdersScreen from './src/screens/OrdersScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom + 4,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Shop') iconName = focused ? 'storefront' : 'storefront-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Favourite') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Account') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Explore" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavoritesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <OrderProvider>
              <NavigationContainer>
                <StatusBar style="dark" />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  {/* Auth Flow */}
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                  <Stack.Screen name="SignIn" component={SignInScreen} />
                  <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
                  <Stack.Screen name="Verification" component={VerificationScreen} />
                  <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />

                  {/* Main App */}
                  <Stack.Screen name="Main" component={TabNavigator} />
                  <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                  <Stack.Screen name="Category" component={CategoryScreen} />
                  <Stack.Screen name="Checkout" component={CheckoutScreen} />
                  <Stack.Screen name="Orders" component={OrdersScreen} />
                  <Stack.Screen
                    name="OrderAccepted"
                    component={OrderAcceptedScreen}
                    options={{ gestureEnabled: false }}
                  />
                  <Stack.Screen
                    name="OrderError"
                    component={ErrorScreen}
                    options={{ presentation: 'transparentModal', animation: 'fade' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </OrderProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
