import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Search, MapPin, Calendar, DollarSign } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

// Mock data for projects
const PROJECTS = [
  {
    id: '1',
    title: 'Modern Hives for Nairobi',
    beekeeper: 'John\'s Apiary',
    location: 'Nairobi, Kenya',
    description: 'Upgrade to 20 modern Langstroth hives to increase honey production and quality.',
    goal: 5000,
    raised: 4000,
    investors: 12,
    startDate: 'May 15, 2025',
    endDate: 'August 15, 2025',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Pollination Expansion',
    beekeeper: 'Kilimanjaro Honey Co.',
    location: 'Arusha, Tanzania',
    description: 'Expand our apiary to provide pollination services to local farmers and increase biodiversity.',
    goal: 3000,
    raised: 1350,
    investors: 5,
    startDate: 'June 1, 2025',
    endDate: 'September 1, 2025',
    image: 'https://images.unsplash.com/photo-1590075865003-e48b57580c41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Sustainable Beekeeping',
    beekeeper: 'Mara Honey Farms',
    location: 'Narok, Kenya',
    description: 'Implement sustainable beekeeping practices and train local communities in bee conservation.',
    goal: 4000,
    raised: 1000,
    investors: 3,
    startDate: 'July 1, 2025',
    endDate: 'October 1, 2025',
    image: 'https://images.unsplash.com/photo-1508057198894-a7b69aca6bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Community Hives',
    beekeeper: 'Nakuru Women\'s Cooperative',
    location: 'Nakuru, Kenya',
    description: 'Establish a community-owned apiary to provide income for women in rural communities.',
    goal: 6000,
    raised: 3600,
    investors: 9,
    startDate: 'June 15, 2025',
    endDate: 'September 15, 2025',
    image: 'https://images.unsplash.com/photo-1553279631-2f1a0a13d3c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  
  const filteredProjects = PROJECTS.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.beekeeper.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleProjectPress = (project: any) => {
    setSelectedProject(project);
    setModalVisible(true);
  };
  
  const handleInvest = () => {
    setModalVisible(false);
    setShowInvestModal(true);
  };
  
  const confirmInvestment = () => {
    //  this would process the investment
    setShowInvestModal(false);
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Projects</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6B6B6B" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search projects..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B6B6B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.projectsContainer}>
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              onPress={() => handleProjectPress(project)}
            />
          ))}
        </View>
      </ScrollView>
      
      <ProjectDetailsModal 
        visible={modalVisible}
        project={selectedProject}
        onClose={() => setModalVisible(false)}
        onInvest={handleInvest}
      />
      
      <InvestmentModal
        visible={showInvestModal}
        project={selectedProject}
        amount={investmentAmount}
        setAmount={setInvestmentAmount}
        onClose={() => setShowInvestModal(false)}
        onConfirm={confirmInvestment}
      />
    </SafeAreaView>
  );
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    beekeeper: string;
    location: string;
    goal: number;
    raised: number;
    investors: number;
    image: string;
  };
  onPress: () => void;
}

const ProjectCard = ({ project, onPress }: ProjectCardProps) => {
  const progress = (project.raised / project.goal) * 100;
  const progressWidth = `${progress}%` as any;
  
  return (
    <TouchableOpacity style={styles.projectCard} onPress={onPress}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectBeekeeper}>{project.beekeeper}</Text>
        
        <View style={styles.projectLocation}>
          <MapPin size={14} color="#6B6B6B" />
          <Text style={styles.projectLocationText}>{project.location}</Text>
        </View>
        
        <View style={styles.fundingContainer}>
          <Text style={styles.fundingText}>
            ${project.raised} raised of ${project.goal}
          </Text>
          <Text style={styles.investorsText}>
            {project.investors} investors
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface ProjectDetailsModalProps {
  visible: boolean;
  project: any;
  onClose: () => void;
  onInvest: () => void;
}

const ProjectDetailsModal = ({ visible, project, onClose, onInvest }: ProjectDetailsModalProps) => {
  if (!project) return null;
  
  const progress = (project.raised / project.goal) * 100;
  const progressWidth = `${progress}%` as any;
  
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
            <Text style={styles.modalTitle}>Project Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <Image source={{ uri: project.image }} style={styles.modalImage} />
            
            <View style={styles.modalDetails}>
              <Text style={styles.modalProjectTitle}>{project.title}</Text>
              <Text style={styles.modalBeekeeper}>{project.beekeeper}</Text>
              
              <View style={styles.modalLocation}>
                <MapPin size={16} color="#6B6B6B" />
                <Text style={styles.modalLocationText}>{project.location}</Text>
              </View>
              
              <Text style={styles.modalDescription}>{project.description}</Text>
              
              <View style={styles.fundingDetails}>
                <View style={styles.fundingDetail}>
                  <DollarSign size={20} color="#F9A826" />
                  <View>
                    <Text style={styles.fundingDetailLabel}>Goal</Text>
                    <Text style={styles.fundingDetailValue}>${project.goal}</Text>
                  </View>
                </View>
                
                <View style={styles.fundingDetail}>
                  <Calendar size={20} color="#F9A826" />
                  <View>
                    <Text style={styles.fundingDetailLabel}>End Date</Text>
                    <Text style={styles.fundingDetailValue}>{project.endDate}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.modalProgressSection}>
                <Text style={styles.modalProgressTitle}>Funding Progress</Text>
                <Text style={styles.modalProgressText}>
                  ${project.raised} raised of ${project.goal} ({progress.toFixed(0)}%)
                </Text>
                <View style={styles.modalProgressContainer}>
                  <View style={[styles.modalProgressBar, { width: progressWidth }]} />
                </View>
                <Text style={styles.modalInvestorsText}>
                  {project.investors} investors have contributed
                </Text>
              </View>
              
              <View style={styles.returnInfo}>
                <Text style={styles.returnInfoTitle}>Expected Returns</Text>
                <Text style={styles.returnInfoText}>
                  Investors receive a share of honey sales and pollination credits proportional to their investment.
                  Average annual return is 15-20% based on historical data.
                </Text>
              </View>
              
              <TouchableOpacity style={styles.investButton} onPress={onInvest}>
                <Text style={styles.investButtonText}>Invest in This Project</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface InvestmentModalProps {
  visible: boolean;
  project: any;
  amount: string;
  setAmount: (amount: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const InvestmentModal = ({ visible, project, amount, setAmount, onClose, onConfirm }: InvestmentModalProps) => {
  if (!project) return null;
  
  const beeTokens = amount ? parseInt(amount) * 10 : 0;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { height: '70%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Invest in Project</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.investmentModalContent}>
            <Text style={styles.investmentProjectTitle}>{project.title}</Text>
            <Text style={styles.investmentBeekeeper}>{project.beekeeper}</Text>
            
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Investment Amount (USD)</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenLabel}>You will receive:</Text>
              <Text style={styles.tokenAmount}>{beeTokens} $BEE Tokens</Text>
              <Text style={styles.tokenDescription}>
                $BEE tokens represent your investment in this project and entitle you to a share of returns.
              </Text>
            </View>
            
            <View style={styles.investmentDetails}>
              <Text style={styles.investmentDetailsTitle}>Investment Details</Text>
              <View style={styles.investmentDetailItem}>
                <Text style={styles.investmentDetailLabel}>Project</Text>
                <Text style={styles.investmentDetailValue}>{project.title}</Text>
              </View>
              <View style={styles.investmentDetailItem}>
                <Text style={styles.investmentDetailLabel}>Beekeeper</Text>
                <Text style={styles.investmentDetailValue}>{project.beekeeper}</Text>
              </View>
              <View style={styles.investmentDetailItem}>
                <Text style={styles.investmentDetailLabel}>Amount</Text>
                <Text style={styles.investmentDetailValue}>${amount || '0'}</Text>
              </View>
              <View style={styles.investmentDetailItem}>
                <Text style={styles.investmentDetailLabel}>$BEE Tokens</Text>
                <Text style={styles.investmentDetailValue}>{beeTokens}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[styles.confirmButton, !amount ? styles.disabledButton : null]}
              onPress={onConfirm}
              disabled={!amount}
            >
              <Text style={styles.confirmButtonText}>Confirm Investment</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
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
  projectsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  projectCard: {
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
  projectImage: {
    width: '100%',
    height: 150,
  },
  projectContent: {
    padding: 15,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  projectBeekeeper: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  projectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectLocationText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 5,
  },
  fundingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fundingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  investorsText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F9A826',
    borderRadius: 3,
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
  modalProjectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  modalBeekeeper: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  modalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalLocationText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B6B6B',
    lineHeight: 24,
    marginBottom: 20,
  },
  fundingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fundingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF0CD',
    borderRadius: 12,
    padding: 15,
    width: '48%',
  },
  fundingDetailLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginLeft: 10,
  },
  fundingDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginLeft: 10,
  },
  modalProgressSection: {
    marginBottom: 20,
  },
  modalProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  modalProgressText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
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
  modalInvestorsText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  returnInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  returnInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  returnInfoText: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  investButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  investmentModalContent: {
    padding: 20,
  },
  investmentProjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  investmentBeekeeper: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 20,
  },
  amountContainer: {
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  amountInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  tokenContainer: {
    backgroundColor: '#FEF0CD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  tokenLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 5,
  },
  tokenAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  tokenDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
  },
  investmentDetails: {
    marginBottom: 20,
  },
  investmentDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 15,
  },
  investmentDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  investmentDetailLabel: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  investmentDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  confirmButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});