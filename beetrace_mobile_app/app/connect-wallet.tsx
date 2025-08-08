import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function ConnectWalletScreen() {
  const { connectWallet } = useUser();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (walletType: string) => {
    setConnecting(true);
    try {
      await connectWallet(walletType);
      router.replace('/user-type');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HoneycombBackground opacity={0.08} color="#F9A826" />
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/4dmnk004u7exw2azul4z3' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>BeeTrace</Text>
        <Text style={styles.subtitle}>Connect your wallet to continue</Text>
      </View>

      <View style={styles.walletContainer}>
        <WalletOption 
          name="Internet Identity" 
          icon="https://internetcomputer.org/img/IC_logo_horizontal.svg"
          onPress={() => handleConnect('internetIdentity')}
          disabled={connecting}
        />
        <WalletOption 
          name="NFID" 
          icon="https://nfid.one/icons/icon-512x512.png"
          onPress={() => handleConnect('nfid')}
          disabled={connecting}
        />
        <WalletOption 
          name="Plug Wallet" 
          icon="https://plugwallet.ooo/assets/images/plug-logo.svg"
          onPress={() => handleConnect('plug')}
          disabled={connecting}
        />
        <WalletOption 
          name="Stoic Wallet" 
          icon="https://www.stoicwallet.com/stoic-logo.png"
          onPress={() => handleConnect('stoic')}
          disabled={connecting}
        />
      </View>

      {connecting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#F9A826" />
          <Text style={styles.loadingText}>Connecting to wallet...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

interface WalletOptionProps {
  name: string;
  icon: string;
  onPress: () => void;
  disabled: boolean;
}

const WalletOption = ({ name, icon, onPress, disabled }: WalletOptionProps) => (
  <TouchableOpacity 
    style={[styles.walletOption, disabled && styles.disabled]} 
    onPress={onPress}
    disabled={disabled}
    testID={`wallet-option-${name.toLowerCase().replace(' ', '-')}`}
  >
    <Image source={{ uri: icon }} style={styles.walletIcon} resizeMode="contain" />
    <Text style={styles.walletName}>{name}</Text>
    <Wallet size={20} color="#555" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  walletContainer: {
    marginTop: 20,
  },
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  walletIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  walletName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A3500',
  },
});