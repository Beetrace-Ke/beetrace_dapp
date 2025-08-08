import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

type UserType = 'beekeeper' | 'investor' | 'consumer' | null;

interface UserContextType {
  isConnected: boolean;
  userType: UserType;
  walletAddress: string | null;
  walletType: string | null;
  connectWallet: (walletType: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  setUserType: (type: UserType) => void;
}

export const [UserProvider, useUser] = createContextHook<UserContextType>(() => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedWalletAddress = await AsyncStorage.getItem('walletAddress');
        const storedWalletType = await AsyncStorage.getItem('walletType');
        const storedUserType = await AsyncStorage.getItem('userType');
        
        if (storedWalletAddress && storedWalletType) {
          setWalletAddress(storedWalletAddress);
          setWalletType(storedWalletType);
          setIsConnected(true);
          
          if (storedUserType) {
            setUserType(storedUserType as UserType);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    
    loadUserData();
  }, []);

  // Connect wallet function (simulated for demo)
  const connectWallet = async (walletType: string) => {
    try {
      // In a real app, this would interact with the actual wallet
      // For demo purposes, we'll simulate a successful connection
      const mockAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
      
      // Save to state
      setWalletAddress(mockAddress);
      setWalletType(walletType);
      setIsConnected(true);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('walletAddress', mockAddress);
      await AsyncStorage.setItem('walletType', walletType);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return Promise.reject(error);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      // Clear state
      setWalletAddress(null);
      setWalletType(null);
      setUserType(null);
      setIsConnected(false);
      
      // Clear AsyncStorage
      await AsyncStorage.removeItem('walletAddress');
      await AsyncStorage.removeItem('walletType');
      await AsyncStorage.removeItem('userType');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      return Promise.reject(error);
    }
  };

  // Set user type function
  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    
    // Save to AsyncStorage
    if (type) {
      AsyncStorage.setItem('userType', type);
    }
  };

  return {
    isConnected,
    userType,
    walletAddress,
    walletType,
    connectWallet,
    disconnectWallet,
    setUserType: handleSetUserType,
  };
});