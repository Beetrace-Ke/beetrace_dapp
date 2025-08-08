import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hexagon, TrendingUp, Plus, ChevronRight, ThermometerSun, X } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

// Mock data for hives
const HIVES = [
  { 
    id: '1', 
    name: 'Hive #1', 
    location: 'North Field', 
    type: 'Langstroth',
    lastUpdated: '2 hours ago',
    weight: '32.5 kg',
    temperature: '35°C',
    humidity: '45%',
    health: 'Good',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  { 
    id: '2', 
    name: 'Hive #2', 
    location: 'East Field', 
    type: 'Top Bar',
    lastUpdated: '1 day ago',
    weight: '28.7 kg',
    temperature: '34°C',
    humidity: '42%',
    health: 'Good',
    image: 'https://images.unsplash.com/photo-1590075865003-e48b57580c41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  { 
    id: '3', 
    name: 'Hive #3', 
    location: 'South Field', 
    type: 'Langstroth',
    lastUpdated: '3 days ago',
    weight: '30.2 kg',
    temperature: '36°C',
    humidity: '40%',
    health: 'Needs Attention',
    image: 'https://images.unsplash.com/photo-1508057198894-a7b69aca6bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

export default function HivesScreen() {
  const [selectedHive, setSelectedHive] = useState<string | null>(null);
  const [addHiveModalVisible, setAddHiveModalVisible] = useState(false);
  const [hives, setHives] = useState(HIVES);
  const [newHive, setNewHive] = useState({
    name: '',
    location: '',
    type: 'Langstroth'
  });
  
  const handleHivePress = (id: string) => {
    setSelectedHive(id === selectedHive ? null : id);
  };
  
  const handleAddHive = () => {
    if (!newHive.name || !newHive.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const hive = {
      id: (hives.length + 1).toString(),
      name: newHive.name,
      location: newHive.location,
      type: newHive.type,
      lastUpdated: 'Just now',
      weight: '0 kg',
      temperature: '25°C',
      humidity: '50%',
      health: 'Good',
      image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
    };
    
    setHives([...hives, hive]);
    setNewHive({ name: '', location: '', type: 'Langstroth' });
    setAddHiveModalVisible(false);
    Alert.alert('Success', 'Hive added successfully!');
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Hives</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setAddHiveModalVisible(true)}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Hive</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            title="Total Hives" 
            value="12" 
            icon={<Hexagon size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Avg. Weight" 
            value="30.5 kg" 
            icon={<TrendingUp size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Avg. Temp" 
            value="35°C" 
            icon={<ThermometerSun size={20} color="#F9A826" />}
          />
        </View>
        
        <View style={styles.hivesContainer}>
          {hives.map(hive => (
            <HiveCard 
              key={hive.id}
              hive={hive}
              isExpanded={selectedHive === hive.id}
              onPress={() => handleHivePress(hive.id)}
            />
          ))}
        </View>
      </ScrollView>
      
      <AddHiveModal 
        visible={addHiveModalVisible}
        onClose={() => setAddHiveModalVisible(false)}
        newHive={newHive}
        setNewHive={setNewHive}
        onAdd={handleAddHive}
      />
    </SafeAreaView>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      {icon}
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

interface HiveCardProps {
  hive: {
    id: string;
    name: string;
    location: string;
    type: string;
    lastUpdated: string;
    weight: string;
    temperature: string;
    humidity: string;
    health: string;
    image: string;
  };
  isExpanded: boolean;
  onPress: () => void;
}

const HiveCard = ({ hive, isExpanded, onPress }: HiveCardProps) => (
  <View style={styles.hiveCardContainer}>
    <TouchableOpacity style={styles.hiveCard} onPress={onPress}>
      <Image source={{ uri: hive.image }} style={styles.hiveImage} />
      <View style={styles.hiveContent}>
        <View style={styles.hiveHeader}>
          <Text style={styles.hiveName}>{hive.name}</Text>
          <ChevronRight 
            size={20} 
            color="#6B6B6B" 
            style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
          />
        </View>
        <Text style={styles.hiveLocation}>{hive.location} • {hive.type}</Text>
        <Text style={styles.hiveUpdated}>Last updated: {hive.lastUpdated}</Text>
        
        <View style={styles.hiveBasicStats}>
          <View style={styles.hiveStat}>
            <Text style={styles.hiveStatLabel}>Weight</Text>
            <Text style={styles.hiveStatValue}>{hive.weight}</Text>
          </View>
          <View style={styles.hiveStat}>
            <Text style={styles.hiveStatLabel}>Health</Text>
            <Text 
              style={[
                styles.hiveStatValue, 
                hive.health === 'Good' ? styles.healthGood : styles.healthWarning
              ]}
            >
              {hive.health}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
    {isExpanded && (
      <View style={styles.expandedContent}>
        <View style={styles.divider} />
        
        <Text style={styles.expandedTitle}>Hive Details</Text>
        
        <View style={styles.detailsGrid}>
          <DetailItem label="Temperature" value={hive.temperature} />
          <DetailItem label="Humidity" value={hive.humidity} />
          <DetailItem label="Type" value={hive.type} />
          <DetailItem label="Location" value={hive.location} />
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Update Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

interface AddHiveModalProps {
  visible: boolean;
  onClose: () => void;
  newHive: { name: string; location: string; type: string };
  setNewHive: (hive: { name: string; location: string; type: string }) => void;
  onAdd: () => void;
}

const AddHiveModal = ({ visible, onClose, newHive, setNewHive, onAdd }: AddHiveModalProps) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.addModalContent}>
        <View style={styles.addModalHeader}>
          <Text style={styles.addModalTitle}>Add New Hive</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#4A3500" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.addModalBody}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hive Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter hive name"
              value={newHive.name}
              onChangeText={(text) => setNewHive({ ...newHive, name: text })}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter location"
              value={newHive.location}
              onChangeText={(text) => setNewHive({ ...newHive, location: text })}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hive Type</Text>
            <View style={styles.typeSelector}>
              {['Langstroth', 'Top Bar', 'Warre'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeOption,
                    newHive.type === type && styles.typeOptionSelected
                  ]}
                  onPress={() => setNewHive({ ...newHive, type })}
                >
                  <Text style={[
                    styles.typeOptionText,
                    newHive.type === type && styles.typeOptionTextSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.addModalFooter}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addModalButton} onPress={onAdd}>
            <Text style={styles.addModalButtonText}>Add Hive</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
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
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#F9A826',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  hivesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  hiveCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hiveCard: {
    flexDirection: 'row',
    padding: 15,
  },
  hiveImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  hiveContent: {
    flex: 1,
  },
  hiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiveName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  hiveLocation: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  hiveUpdated: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  hiveBasicStats: {
    flexDirection: 'row',
  },
  hiveStat: {
    marginRight: 20,
  },
  hiveStatLabel: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  hiveStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  healthGood: {
    color: '#4CAF50',
  },
  healthWarning: {
    color: '#FFC107',
  },
  expandedContent: {
    padding: 15,
    paddingTop: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 15,
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailItem: {
    width: '50%',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F9A826',
  },
  secondaryButtonText: {
    color: '#F9A826',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  addModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  addModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  addModalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  typeOptionSelected: {
    backgroundColor: '#F9A826',
    borderColor: '#F9A826',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  typeOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addModalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  addModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F9A826',
    alignItems: 'center',
  },
  addModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});