import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated, Text } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initializeApp = async () => {
      // Animation sequence
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          })
        ]),
        Animated.delay(1000)
      ]).start(async () => {
        // Check connection status from AsyncStorage
        try {
          const walletAddress = await AsyncStorage.getItem('walletAddress');
          const userType = await AsyncStorage.getItem('userType');
          
          if (walletAddress && userType) {
            router.replace('/(tabs)/dashboard');
          } else if (walletAddress) {
            router.replace('/user-type');
          } else {
            router.replace('/connect-wallet');
          }
        } catch (error) {
          console.error('Error checking connection status:', error);
          router.replace('/connect-wallet');
        }
        setIsLoading(false);
      });
    };
    
    initializeApp();
  }, [opacityAnim, scaleAnim]);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HoneycombBackground opacity={0.15} color="#F9A826" />
      <Animated.View style={[
        styles.logoContainer,
        { 
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }] 
        }
      ]}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/4dmnk004u7exw2azul4z3' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>BeeTrace</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logo: {
    width: 180,
    height: 180,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A3500',
    marginTop: 20,
    textAlign: 'center',
  }
});