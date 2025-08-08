import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, Plus, Filter, Share2, Calendar, MapPin, X } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

// Mock data for honey batches
const HONEY_BATCHES = [
  {
    id: 'NFT-32425',
    type: 'Acacia',
    quantity: '20kg',
    harvestDate: 'June 15, 2025',
    location: 'North Field',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NFT-32425',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'NFT-32426',
    type: 'Wildflower',
    quantity: '15kg',
    harvestDate: 'June 10, 2025',
    location: 'East Field',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NFT-32426',
    image: 'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'NFT-32427',
    type: 'Sunflower',
    quantity: '18kg',
    harvestDate: 'June 5, 2025',
    location: 'South Field',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NFT-32427',
    image: 'https://images.unsplash.com/photo-1558642891-54be180ea339?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

export default function HoneyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [addBatchModalVisible, setAddBatchModalVisible] = useState(false);
  const [batches, setBatches] = useState(HONEY_BATCHES);
  const [newBatch, setNewBatch] = useState({
    type: 'Acacia',
    quantity: '',
    location: ''
  });
  
  const filteredBatches = batches.filter(batch => 
    batch.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddBatch = () => {
    if (!newBatch.quantity || !newBatch.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const batch = {
      id: `NFT-${Math.floor(Math.random() * 100000)}`,
      type: newBatch.type,
      quantity: newBatch.quantity,
      harvestDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      location: newBatch.location,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NFT-${Math.floor(Math.random() * 100000)}`,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
    };
    
    setBatches([batch, ...batches]);
    setNewBatch({ type: 'Acacia', quantity: '', location: '' });
    setAddBatchModalVisible(false);
    Alert.alert('Success', 'Honey batch added and NFT minted successfully!');
  };
  
  const handleBatchPress = (batch: any) => {
    setSelectedBatch(batch);
    setModalVisible(true);
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Honey Batches</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setAddBatchModalVisible(true)}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Batch</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search honey batches..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B6B6B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.batchesContainer}>
          {filteredBatches.map(batch => (
            <HoneyBatchCard 
              key={batch.id}
              batch={batch}
              onPress={() => handleBatchPress(batch)}
            />
          ))}
        </View>
      </ScrollView>
      
      <BatchDetailsModal 
        visible={modalVisible}
        batch={selectedBatch}
        onClose={() => setModalVisible(false)}
      />
      
      <AddBatchModal 
        visible={addBatchModalVisible}
        onClose={() => setAddBatchModalVisible(false)}
        newBatch={newBatch}
        setNewBatch={setNewBatch}
        onAdd={handleAddBatch}
      />
    </SafeAreaView>
  );
}

interface HoneyBatchCardProps {
  batch: {
    id: string;
    type: string;
    quantity: string;
    harvestDate: string;
    location: string;
    image: string;
  };
  onPress: () => void;
}

const HoneyBatchCard = ({ batch, onPress }: HoneyBatchCardProps) => (
  <TouchableOpacity style={styles.batchCard} onPress={onPress}>
    <Image source={{ uri: batch.image }} style={styles.batchImage} />
    <View style={styles.batchContent}>
      <Text style={styles.batchType}>{batch.type} Honey</Text>
      <Text style={styles.batchId}>{batch.id}</Text>
      
      <View style={styles.batchDetails}>
        <View style={styles.batchDetailItem}>
          <Calendar size={14} color="#6B6B6B" />
          <Text style={styles.batchDetailText}>{batch.harvestDate}</Text>
        </View>
        <View style={styles.batchDetailItem}>
          <MapPin size={14} color="#6B6B6B" />
          <Text style={styles.batchDetailText}>{batch.location}</Text>
        </View>
      </View>
      
      <View style={styles.batchQuantityContainer}>
        <Text style={styles.batchQuantity}>{batch.quantity}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

interface BatchDetailsModalProps {
  visible: boolean;
  batch: any;
  onClose: () => void;
}

const BatchDetailsModal = ({ visible, batch, onClose }: BatchDetailsModalProps) => {
  if (!batch) return null;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Honey Batch Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <Image source={{ uri: batch.image }} style={styles.modalImage} />
            
            <View style={styles.modalDetails}>
              <Text style={styles.modalHoneyType}>{batch.type} Honey</Text>
              <Text style={styles.modalHoneyId}>{batch.id}</Text>
              
              <View style={styles.detailsGrid}>
                <DetailItem label="Quantity" value={batch.quantity} />
                <DetailItem label="Harvest Date" value={batch.harvestDate} />
                <DetailItem label="Location" value={batch.location} />
                <DetailItem label="NFT Status" value="Minted" />
              </View>
              
              <View style={styles.qrCodeContainer}>
                <Text style={styles.qrCodeTitle}>QR Code</Text>
                <Text style={styles.qrCodeSubtitle}>Scan to verify authenticity</Text>
                <Image source={{ uri: batch.qrCode }} style={styles.qrCodeImage} />
              </View>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <QrCode size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Download QR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <Share2 size={20} color="#F9A826" />
                  <Text style={styles.secondaryButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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

interface AddBatchModalProps {
  visible: boolean;
  onClose: () => void;
  newBatch: { type: string; quantity: string; location: string };
  setNewBatch: (batch: { type: string; quantity: string; location: string }) => void;
  onAdd: () => void;
}

const AddBatchModal = ({ visible, onClose, newBatch, setNewBatch, onAdd }: AddBatchModalProps) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.addModalOverlay}>
      <View style={styles.addBatchModalContent}>
        <View style={styles.addBatchModalHeader}>
          <Text style={styles.addBatchModalTitle}>Add New Honey Batch</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#4A3500" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.addBatchModalBody}>
          <View style={styles.batchInputGroup}>
            <Text style={styles.batchInputLabel}>Honey Type</Text>
            <View style={styles.honeyTypeSelector}>
              {['Acacia', 'Wildflower', 'Sunflower', 'Clover', 'Manuka'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.honeyTypeOption,
                    newBatch.type === type && styles.honeyTypeOptionSelected
                  ]}
                  onPress={() => setNewBatch({ ...newBatch, type })}
                >
                  <Text style={[
                    styles.honeyTypeOptionText,
                    newBatch.type === type && styles.honeyTypeOptionTextSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.batchInputGroup}>
            <Text style={styles.batchInputLabel}>Quantity (kg) *</Text>
            <TextInput
              style={styles.batchTextInput}
              placeholder="Enter quantity in kg"
              value={newBatch.quantity}
              onChangeText={(text) => setNewBatch({ ...newBatch, quantity: text })}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.batchInputGroup}>
            <Text style={styles.batchInputLabel}>Harvest Location *</Text>
            <TextInput
              style={styles.batchTextInput}
              placeholder="Enter harvest location"
              value={newBatch.location}
              onChangeText={(text) => setNewBatch({ ...newBatch, location: text })}
            />
          </View>
          
          <View style={styles.nftInfoContainer}>
            <Text style={styles.nftInfoTitle}>NFT Minting</Text>
            <Text style={styles.nftInfoText}>
              This batch will be automatically minted as an NFT on the Internet Computer blockchain for traceability and authenticity verification.
            </Text>
          </View>
        </ScrollView>
        
        <View style={styles.addBatchModalFooter}>
          <TouchableOpacity style={styles.batchCancelButton} onPress={onClose}>
            <Text style={styles.batchCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBatchButton} onPress={onAdd}>
            <Text style={styles.addBatchButtonText}>Mint NFT & Add Batch</Text>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  batchesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  batchCard: {
    flexDirection: 'row',
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
  batchImage: {
    width: 100,
    height: 100,
  },
  batchContent: {
    flex: 1,
    padding: 15,
  },
  batchType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  batchId: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  batchDetails: {
    marginBottom: 8,
  },
  batchDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  batchDetailText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 5,
  },
  batchQuantityContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#FEF0CD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  batchQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  closeButton: {
    fontSize: 16,
    color: '#F9A826',
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalDetails: {
    padding: 20,
  },
  modalHoneyType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  modalHoneyId: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 20,
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
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  qrCodeSubtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 15,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F9A826',
  },
  secondaryButtonText: {
    color: '#F9A826',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBatchModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '85%',
  },
  addBatchModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  addBatchModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  addBatchModalBody: {
    padding: 20,
  },
  batchInputGroup: {
    marginBottom: 20,
  },
  batchInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  batchTextInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  honeyTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  honeyTypeOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  honeyTypeOptionSelected: {
    backgroundColor: '#F9A826',
    borderColor: '#F9A826',
  },
  honeyTypeOptionText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  honeyTypeOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nftInfoContainer: {
    backgroundColor: '#FEF0CD',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  nftInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  nftInfoText: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  addBatchModalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
  },
  batchCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  batchCancelButtonText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  addBatchButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F9A826',
    alignItems: 'center',
  },
  addBatchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});