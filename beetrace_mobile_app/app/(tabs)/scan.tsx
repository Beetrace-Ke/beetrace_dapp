import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MapPin, Calendar, User, ArrowLeft } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<null | HoneyData>(null);
  const [scanning, setScanning] = useState(true);
  const [loading, setLoading] = useState(false);

  // Mock honey data that would come from blockchain
  interface HoneyData {
    id: string;
    beekeeper: string;
    location: string;
    harvestDate: string;
    honeyType: string;
    quantity: string;
    image: string;
  }

  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanning(false);
    setLoading(true);
    
    // Simulate API call to blockchain
    setTimeout(() => {
      // Mock data - in a real app, this would be fetched from the blockchain
      const mockHoneyData: HoneyData = {
        id: "NFT-32425",
        beekeeper: "John's Apiary",
        location: "Nairobi, Kenya",
        harvestDate: "June 15, 2025",
        honeyType: "Acacia",
        quantity: "500g",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
      };
      
      setScannedData(mockHoneyData);
      setLoading(false);
    }, 2000);
  };

  const resetScan = () => {
    setScannedData(null);
    setScanning(true);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <HoneycombBackground opacity={0.05} color="#F9A826" />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>We need camera permission to scan QR codes</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      {scanning ? (
        <View style={styles.scannerContainer}>
          <Text style={styles.scannerTitle}>Scan Honey QR Code</Text>
          <Text style={styles.scannerSubtitle}>Position the QR code within the frame</Text>
          
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={'back'}
              onBarcodeScanned={handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            >
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerFrame} />
              </View>
            </CameraView>
          </View>
          
          <Text style={styles.scannerHint}>
            Scanning will verify the authenticity and origin of your honey
          </Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F9A826" />
              <Text style={styles.loadingText}>Verifying honey on blockchain...</Text>
            </View>
          ) : (
            <>
              <View style={styles.resultHeader}>
                <TouchableOpacity onPress={resetScan} style={styles.backButton}>
                  <ArrowLeft size={24} color="#4A3500" />
                </TouchableOpacity>
                <Text style={styles.resultTitle}>Verified Honey</Text>
              </View>
              
              <View style={styles.honeyCard}>
                <Image 
                  source={{ uri: scannedData?.image }} 
                  style={styles.honeyImage}
                />
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
                
                <View style={styles.honeyDetails}>
                  <Text style={styles.honeyType}>{scannedData?.honeyType} Honey</Text>
                  <Text style={styles.honeyQuantity}>{scannedData?.quantity}</Text>
                  <Text style={styles.honeyId}>NFT ID: {scannedData?.id}</Text>
                  
                  <View style={styles.detailItem}>
                    <User size={18} color="#6B6B6B" />
                    <Text style={styles.detailText}>{scannedData?.beekeeper}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <MapPin size={18} color="#6B6B6B" />
                    <Text style={styles.detailText}>{scannedData?.location}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Calendar size={18} color="#6B6B6B" />
                    <Text style={styles.detailText}>Harvested: {scannedData?.harvestDate}</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.scanAgainButton} onPress={resetScan}>
                <Text style={styles.scanAgainText}>Scan Another</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#4A3500',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  scannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  scannerSubtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 30,
    textAlign: 'center',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
  },
  scannerHint: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  resultContainer: {
    flex: 1,
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  honeyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  honeyImage: {
    width: '100%',
    height: 200,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  honeyDetails: {
    padding: 20,
  },
  honeyType: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  honeyQuantity: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 5,
  },
  honeyId: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginLeft: 10,
  },
  scanAgainButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4A3500',
    marginTop: 20,
  },
});