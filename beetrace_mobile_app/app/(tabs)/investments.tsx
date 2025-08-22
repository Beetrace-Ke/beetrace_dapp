import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, DollarSign, ChevronRight, ArrowUpRight } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

// Mock data for investments
const INVESTMENTS = [
  {
    id: '1',
    projectTitle: 'Modern Hives for Nairobi',
    beekeeper: 'John\'s Apiary',
    amount: 500,
    date: 'May 20, 2025',
    returns: 25,
    status: 'active',
    progress: 80,
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    projectTitle: 'Pollination Expansion',
    beekeeper: 'Kilimanjaro Honey Co.',
    amount: 300,
    date: 'June 5, 2025',
    returns: 15,
    status: 'active',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1590075865003-e48b57580c41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    projectTitle: 'Honey Processing Equipment',
    beekeeper: 'Mara Honey Farms',
    amount: 250,
    date: 'April 15, 2025',
    returns: 30,
    status: 'completed',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1508057198894-a7b69aca6bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

export default function InvestmentsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  
  const totalInvested = INVESTMENTS.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = INVESTMENTS.reduce((sum, inv) => sum + inv.returns, 0);
  
  const handleInvestmentPress = (investment: any) => {
    setSelectedInvestment(investment);
    setModalVisible(true);
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Investments</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            title="Total Invested" 
            value={`$${totalInvested}`} 
            icon={<DollarSign size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Total Returns" 
            value={`$${totalReturns}`} 
            icon={<TrendingUp size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Projects" 
            value={INVESTMENTS.length.toString()} 
            icon={<TrendingUp size={20} color="#F9A826" />}
          />
        </View>
        
        <View style={styles.investmentsContainer}>
          {INVESTMENTS.map(investment => (
            <InvestmentCard 
              key={investment.id}
              investment={investment}
              onPress={() => handleInvestmentPress(investment)}
            />
          ))}
        </View>
      </ScrollView>
      
      <InvestmentDetailsModal 
        visible={modalVisible}
        investment={selectedInvestment}
        onClose={() => setModalVisible(false)}
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

interface InvestmentCardProps {
  investment: {
    id: string;
    projectTitle: string;
    beekeeper: string;
    amount: number;
    date: string;
    returns: number;
    status: string;
    progress: number;
    image: string;
  };
  onPress: () => void;
}

const InvestmentCard = ({ investment, onPress }: InvestmentCardProps) => {
  const progressWidth = `${investment.progress}%` as any;
  
  return (
    <TouchableOpacity style={styles.investmentCard} onPress={onPress}>
      <Image source={{ uri: investment.image }} style={styles.investmentImage} />
      <View style={styles.investmentContent}>
        <View style={styles.investmentHeader}>
          <Text style={styles.investmentTitle}>{investment.projectTitle}</Text>
          <ChevronRight size={20} color="#6B6B6B" />
        </View>
        <Text style={styles.investmentBeekeeper}>{investment.beekeeper}</Text>
        
        <View style={styles.investmentStats}>
          <View style={styles.investmentStat}>
            <Text style={styles.investmentStatLabel}>Invested</Text>
            <Text style={styles.investmentStatValue}>${investment.amount}</Text>
          </View>
          <View style={styles.investmentStat}>
            <Text style={styles.investmentStatLabel}>Returns</Text>
            <Text style={styles.investmentStatValue}>${investment.returns}</Text>
          </View>
          <View style={styles.investmentStat}>
            <Text style={styles.investmentStatLabel}>Date</Text>
            <Text style={styles.investmentStatValue}>{investment.date}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: progressWidth }]} />
          <Text style={styles.progressText}>{investment.progress}% Complete</Text>
        </View>
        
        <View style={[
          styles.statusBadge, 
          investment.status === 'active' ? styles.activeBadge : styles.completedBadge
        ]}>
          <Text style={[
            styles.statusText,
            investment.status === 'active' ? styles.activeText : styles.completedText
          ]}>
            {investment.status === 'active' ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface InvestmentDetailsModalProps {
  visible: boolean;
  investment: any;
  onClose: () => void;
}

const InvestmentDetailsModal = ({ visible, investment, onClose }: InvestmentDetailsModalProps) => {
  if (!investment) return null;
  
  const progressWidth = `${investment.progress}%` as any;
  
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
            <Text style={styles.modalTitle}>Investment Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <Image source={{ uri: investment.image }} style={styles.modalImage} />
            
            <View style={styles.modalDetails}>
              <Text style={styles.modalInvestmentTitle}>{investment.projectTitle}</Text>
              <Text style={styles.modalBeekeeper}>{investment.beekeeper}</Text>
              
              <View style={[
                styles.statusBadge, 
                investment.status === 'active' ? styles.activeBadge : styles.completedBadge,
                { alignSelf: 'flex-start', marginBottom: 15 }
              ]}>
                <Text style={[
                  styles.statusText,
                  investment.status === 'active' ? styles.activeText : styles.completedText
                ]}>
                  {investment.status === 'active' ? 'Active' : 'Completed'}
                </Text>
              </View>
              
              <View style={styles.detailsGrid}>
                <DetailItem label="Amount Invested" value={`$${investment.amount}`} />
                <DetailItem label="Current Returns" value={`$${investment.returns}`} />
                <DetailItem label="Investment Date" value={investment.date} />
                <DetailItem label="$BEE Tokens" value={`${investment.amount * 10}`} />
              </View>
              
              <View style={styles.progressSection}>
                <Text style={styles.progressTitle}>Project Progress</Text>
                <View style={styles.modalProgressContainer}>
                  <View style={[styles.modalProgressBar, { width: progressWidth }]} />
                </View>
                <Text style={styles.modalProgressText}>{investment.progress}% Complete</Text>
              </View>
              
              <View style={styles.returnsContainer}>
                <Text style={styles.returnsTitle}>Returns Breakdown</Text>
                <View style={styles.returnsItem}>
                  <Text style={styles.returnsLabel}>Honey Sales</Text>
                  <Text style={styles.returnsValue}>${investment.returns * 0.7}</Text>
                </View>
                <View style={styles.returnsItem}>
                  <Text style={styles.returnsLabel}>Pollination Credits</Text>
                  <Text style={styles.returnsValue}>${investment.returns * 0.3}</Text>
                </View>
                <View style={styles.returnsTotalItem}>
                  <Text style={styles.returnsTotalLabel}>Total Returns</Text>
                  <Text style={styles.returnsTotalValue}>${investment.returns}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.viewProjectButton}>
                <Text style={styles.viewProjectText}>View Full Project</Text>
                <ArrowUpRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
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
  investmentsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  investmentCard: {
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
  investmentImage: {
    width: '100%',
    height: 150,
  },
  investmentContent: {
    padding: 15,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  investmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
    flex: 1,
  },
  investmentBeekeeper: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 15,
  },
  investmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  investmentStat: {
    alignItems: 'center',
  },
  investmentStatLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  investmentStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F9A826',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#E3F2FD',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#2196F3',
  },
  completedText: {
    color: '#4CAF50',
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
  modalInvestmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  modalBeekeeper: {
    fontSize: 16,
    color: '#6B6B6B',
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
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  modalProgressContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 5,
  },
  modalProgressBar: {
    height: 8,
    backgroundColor: '#F9A826',
    borderRadius: 4,
  },
  modalProgressText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  returnsContainer: {
    backgroundColor: '#FEF0CD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  returnsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  returnsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  returnsLabel: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  returnsValue: {
    fontSize: 14,
    color: '#4A3500',
  },
  returnsTotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  returnsTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  returnsTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  viewProjectButton: {
    backgroundColor: '#F9A826',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewProjectText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
});