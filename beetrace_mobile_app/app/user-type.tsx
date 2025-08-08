import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, TrendingUp, ShoppingBag } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function UserTypeScreen() {
  const { setUserType } = useUser();

  const handleSelectType = (type: 'beekeeper' | 'investor' | 'consumer') => {
    setUserType(type);
    router.replace('/(tabs)/dashboard');
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
        <Text style={styles.title}>Welcome to BeeTrace</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>
      </View>

      <View style={styles.optionsContainer}>
        <UserTypeOption 
          title="Beekeeper"
          description="Manage your hives, mint honey NFTs, and get funding"
          icon={<User size={32} color="#4A3500" />}
          onPress={() => handleSelectType('beekeeper')}
        />
        
        <UserTypeOption 
          title="Investor"
          description="Fund beekeeping projects and track your investments"
          icon={<TrendingUp size={32} color="#4A3500" />}
          onPress={() => handleSelectType('investor')}
        />
        
        <UserTypeOption 
          title="Consumer"
          description="Verify honey authenticity and learn about its origin"
          icon={<ShoppingBag size={32} color="#4A3500" />}
          onPress={() => handleSelectType('consumer')}
        />
      </View>
    </SafeAreaView>
  );
}

interface UserTypeOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const UserTypeOption = ({ title, description, icon, onPress }: UserTypeOptionProps) => (
  <TouchableOpacity 
    style={styles.optionCard} 
    onPress={onPress}
    testID={`user-type-${title.toLowerCase()}`}
  >
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.optionContent}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
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
    marginVertical: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEF0CD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B6B6B',
  },
});