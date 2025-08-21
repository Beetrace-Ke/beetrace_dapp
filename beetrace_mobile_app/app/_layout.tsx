import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useUser, UserProvider } from '@/context/UserContext'; // Import UserProvider here
import { Image, StyleSheet, Text, View } from 'react-native';
import { Home, BarChart3, QrCode, User, Settings, Hexagon, Wallet } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandler
import React from 'react';

// This component remains the same
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { userType, walletAddress } = useUser();
  const insets = useSafeAreaInsets();
  
  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{ paddingTop: insets.top, flex: 1 }}
    >
      <View style={styles.drawerHeader}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/4dmnk004u7exw2azul4z3' }} 
          style={styles.drawerLogo}
          resizeMode="contain"
        />
        <Text style={styles.drawerTitle}>BeeTrace</Text>
        <View style={styles.userTypeChip}>
          <Text style={styles.userTypeText}>{userType}</Text>
        </View>
        <View style={styles.walletContainer}>
          <Wallet size={14} color="#6B6B6B" />
          <Text style={styles.walletText}>
            {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Not connected'}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// 1. We've extracted your Drawer navigator into its own component.
//    This component is INSIDE the context, so useUser() will work here.
function DrawerNavigator() {
  const { userType } = useUser();
  
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFF8E1' },
        headerTintColor: '#4A3500',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveBackgroundColor: '#FEF0CD',
        drawerActiveTintColor: '#4A3500',
        drawerInactiveTintColor: '#6B6B6B',
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Dashboard', drawerIcon: ({ color }) => <Home size={22} color={color} /> }} />
      <Drawer.Screen name="hives" options={{ title: 'My Hives', drawerIcon: ({ color }) => <Hexagon size={22} color={color} />, drawerItemStyle: { display: userType === 'beekeeper' ? 'flex' : 'none' } }} />
      <Drawer.Screen name="investments" options={{ title: 'My Investments', drawerIcon: ({ color }) => <BarChart3 size={22} color={color} />, drawerItemStyle: { display: userType === 'investor' ? 'flex' : 'none' } }} />
      <Drawer.Screen name="scan" options={{ title: 'Scan QR Code', drawerIcon: ({ color }) => <QrCode size={22} color={color} />, drawerItemStyle: { display: userType === 'consumer' ? 'flex' : 'none' } }} />
      <Drawer.Screen name="profile" options={{ title: 'Profile', drawerIcon: ({ color }) => <User size={22} color={color} /> }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings', drawerIcon: ({ color }) => <Settings size={22} color={color} /> }} />
    </Drawer>
  );
}

// 2. The Root Layout now PROVIDES the context, and the DrawerNavigator is inside it.
export default function RootLayout() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DrawerNavigator />
      </GestureHandlerRootView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  // ... your styles are unchanged
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 10,
    alignItems: 'center',
  },
  drawerLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  userTypeChip: {
    backgroundColor: '#F9A826',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginVertical: 5,
  },
  userTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  walletText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginLeft: 5,
  },
});