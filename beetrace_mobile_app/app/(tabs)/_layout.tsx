import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useUser } from '@/context/UserContext';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Home, BarChart3, QrCode, User, Settings, Hexagon, Wallet } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { userType, walletAddress } = useUser();
  const insets = useSafeAreaInsets();
  
  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{
        paddingTop: insets.top,
        flex: 1,
      }}
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

export default function TabLayout() {
  const { userType } = useUser();
  
  return (
    <Drawer
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFF8E1',
        },
        headerTintColor: '#4A3500',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: '#FEF0CD',
        drawerActiveTintColor: '#4A3500',
        drawerInactiveTintColor: '#6B6B6B',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }: { color: string }) => <Home size={22} color={color} />,
        }}
      />
      
      {userType === 'beekeeper' && (
        <>
          <Drawer.Screen
            name="hives"
            options={{
              title: 'My Hives',
              drawerIcon: ({ color }: { color: string }) => <Hexagon size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="honey"
            options={{
              title: 'Honey Batches',
              drawerIcon: ({ color }: { color: string }) => <QrCode size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="projects"
            options={{
              title: 'My Projects',
              drawerIcon: ({ color }: { color: string }) => <BarChart3 size={22} color={color} />,
            }}
          />
        </>
      )}
      
      {userType === 'investor' && (
        <>
          <Drawer.Screen
            name="investments"
            options={{
              title: 'My Investments',
              drawerIcon: ({ color }: { color: string }) => <BarChart3 size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="discover"
            options={{
              title: 'Discover Projects',
              drawerIcon: ({ color }: { color: string }) => <Hexagon size={22} color={color} />,
            }}
          />
        </>
      )}
      
      {userType === 'consumer' && (
        <Drawer.Screen
          name="scan"
          options={{
            title: 'Scan QR Code',
            drawerIcon: ({ color }: { color: string }) => <QrCode size={22} color={color} />,
          }}
        />
      )}
      
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }: { color: string }) => <User size={22} color={color} />,
        }}
      />
      
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color }: { color: string }) => <Settings size={22} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
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