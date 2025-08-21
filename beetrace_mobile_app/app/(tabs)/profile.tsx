import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Camera, MapPin, Mail, Phone, Edit2, LogOut } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function ProfileScreen() {
  const { userType, disconnectWallet } = useUser();
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock profile data
  const [profile, setProfile] = useState({
    name: userType === 'beekeeper' ? 'John\'s Apiary' : 'Sarah Johnson',
    email: 'user@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    bio: userType === 'beekeeper' 
      ? 'Passionate beekeeper with 5 years of experience. Specializing in organic honey production and sustainable beekeeping practices.'
      : 'Impact investor focused on sustainable agriculture and biodiversity conservation projects in East Africa.',
    notifications: true,
  });
  
  const handleLogout = async () => {
    await disconnectWallet();
    router.replace('/connect-wallet');
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditing(!editing)}
          >
            {editing ? (
              <Text style={styles.editButtonText}>Save</Text>
            ) : (
              <>
                <Edit2 size={16} color="#F9A826" />
                <Text style={styles.editButtonText}>Edit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <User size={60} color="#AAAAAA" />
            </View>
          )}
          
          {editing && (
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.profileTypeContainer}>
          <Text style={styles.profileType}>{userType}</Text>
        </View>
        
        <View style={styles.profileDetailsContainer}>
          <ProfileField 
            label="Name"
            value={profile.name}
            editing={editing}
            onChangeText={(text) => setProfile({...profile, name: text})}
          />
          
          <ProfileField 
            label="Email"
            value={profile.email}
            editing={editing}
            onChangeText={(text) => setProfile({...profile, email: text})}
            keyboardType="email-address"
            icon={<Mail size={18} color="#6B6B6B" />}
          />
          
          <ProfileField 
            label="Phone"
            value={profile.phone}
            editing={editing}
            onChangeText={(text) => setProfile({...profile, phone: text})}
            keyboardType="phone-pad"
            icon={<Phone size={18} color="#6B6B6B" />}
          />
          
          <ProfileField 
            label="Location"
            value={profile.location}
            editing={editing}
            onChangeText={(text) => setProfile({...profile, location: text})}
            icon={<MapPin size={18} color="#6B6B6B" />}
          />
          
          <View style={styles.bioContainer}>
            <Text style={styles.bioLabel}>Bio</Text>
            {editing ? (
              <TextInput
                style={styles.bioInput}
                value={profile.bio}
                onChangeText={(text) => setProfile({...profile, bio: text})}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.bioText}>{profile.bio}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={profile.notifications}
              onValueChange={(value) => setProfile({...profile, notifications: value})}
              trackColor={{ false: '#E0E0E0', true: '#F9A826' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#E53935" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
 
interface ProfileFieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  icon?: React.ReactNode;
}

const ProfileField = ({ label, value, editing, onChangeText, keyboardType = 'default', icon }: ProfileFieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldValueContainer}>
      {icon && <View style={styles.fieldIcon}>{icon}</View>}
      {editing ? (
        <TextInput
          style={[styles.fieldInput, icon ? styles.fieldInputWithIcon : null]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={[styles.fieldValue, icon ? styles.fieldValueWithIcon : null]}>{value}</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#F9A826',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#F9A826',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileTypeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileType: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#F9A826',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    textTransform: 'capitalize',
  },
  profileDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 5,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldValue: {
    fontSize: 16,
    color: '#4A3500',
  },
  fieldValueWithIcon: {
    marginLeft: 5,
  },
  fieldInput: {
    fontSize: 16,
    color: '#4A3500',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 5,
    flex: 1,
  },
  fieldInputWithIcon: {
    marginLeft: 5,
  },
  bioContainer: {
    marginTop: 10,
  },
  bioLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 5,
  },
  bioText: {
    fontSize: 16,
    color: '#4A3500',
    lineHeight: 24,
  },
  bioInput: {
    fontSize: 16,
    color: '#4A3500',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#4A3500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});