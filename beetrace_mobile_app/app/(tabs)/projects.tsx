import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, TrendingUp, Users, DollarSign, Calendar, ChevronRight } from 'lucide-react-native';
import HoneycombBackground from '@/components/HoneycombBackground';

// Mock data for projects
const PROJECTS = [
  {
    id: '1',
    title: 'Modern Hives for Nairobi',
    description: 'Upgrade to 20 modern Langstroth hives to increase honey production and quality.',
    goal: 5000,
    raised: 4000,
    investors: 12,
    startDate: 'May 15, 2025',
    endDate: 'August 15, 2025',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Pollination Expansion',
    description: 'Expand our apiary to provide pollination services to local farmers and increase biodiversity.',
    goal: 3000,
    raised: 1350,
    investors: 5,
    startDate: 'June 1, 2025',
    endDate: 'September 1, 2025',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1590075865003-e48b57580c41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Honey Processing Equipment',
    description: 'Purchase modern honey extraction and processing equipment to improve efficiency and quality.',
    goal: 2500,
    raised: 2500,
    investors: 8,
    startDate: 'April 10, 2025',
    endDate: 'May 10, 2025',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1508057198894-a7b69aca6bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

export default function ProjectsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const handleProjectPress = (project: any) => {
    setSelectedProject(project);
    setModalVisible(true);
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Projects</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setNewProjectModal(true)}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New Project</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            title="Total Projects" 
            value="3" 
            icon={<TrendingUp size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Total Raised" 
            value="$7,850" 
            icon={<DollarSign size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Investors" 
            value="25" 
            icon={<Users size={20} color="#F9A826" />}
          />
        </View>
        
        <View style={styles.projectsContainer}>
          {PROJECTS.map(project => (
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
      />
      
      <NewProjectModal
        visible={newProjectModal}
        onClose={() => setNewProjectModal(false)}
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

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
    image: string;
  };
  onPress: () => void;
}

const ProjectCard = ({ project, onPress }: ProjectCardProps) => {
  const progress = (project.raised / project.goal) * 100;
  const progressWidth = `${progress}%`;
  
  return (
    <TouchableOpacity style={styles.projectCard} onPress={onPress}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectContent}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <ChevronRight size={20} color="#6B6B6B" />
        </View>
        <Text style={styles.projectDescription} numberOfLines={2}>
          {project.description}
        </Text>
        
        <View style={styles.projectStats}>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatLabel}>Goal</Text>
            <Text style={styles.projectStatValue}>${project.goal}</Text>
          </View>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatLabel}>Raised</Text>
            <Text style={styles.projectStatValue}>${project.raised}</Text>
          </View>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatLabel}>Investors</Text>
            <Text style={styles.projectStatValue}>{project.investors}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: progressWidth }]} />
          <Text style={styles.progressText}>{progress.toFixed(0)}% Funded</Text>
        </View>
        
        <View style={[
          styles.statusBadge, 
          project.status === 'active' ? styles.activeBadge : styles.completedBadge
        ]}>
          <Text style={[
            styles.statusText,
            project.status === 'active' ? styles.activeText : styles.completedText
          ]}>
            {project.status === 'active' ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface ProjectDetailsModalProps {
  visible: boolean;
  project: any;
  onClose: () => void;
}

const ProjectDetailsModal = ({ visible, project, onClose }: ProjectDetailsModalProps) => {
  if (!project) return null;
  
  const progress = (project.raised / project.goal) * 100;
  const progressWidth = `${progress}%`;
  
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
              
              <View style={[
                styles.statusBadge, 
                project.status === 'active' ? styles.activeBadge : styles.completedBadge,
                { alignSelf: 'flex-start', marginBottom: 15 }
              ]}>
                <Text style={[
                  styles.statusText,
                  project.status === 'active' ? styles.activeText : styles.completedText
                ]}>
                  {project.status === 'active' ? 'Active' : 'Completed'}
                </Text>
              </View>
              
              <Text style={styles.modalDescription}>{project.description}</Text>
              
              <View style={styles.fundingContainer}>
                <Text style={styles.fundingTitle}>Funding Progress</Text>
                <View style={styles.fundingDetails}>
                  <Text style={styles.fundingRaised}>${project.raised}</Text>
                  <Text style={styles.fundingGoal}>of ${project.goal} goal</Text>
                </View>
                <View style={styles.modalProgressContainer}>
                  <View style={[styles.modalProgressBar, { width: progressWidth }]} />
                </View>
                <Text style={styles.modalProgressText}>{progress.toFixed(0)}% Funded by {project.investors} investors</Text>
              </View>
              
              <View style={styles.timelineContainer}>
                <Text style={styles.timelineTitle}>Timeline</Text>
                <View style={styles.timelineItem}>
                  <Calendar size={18} color="#6B6B6B" />
                  <Text style={styles.timelineText}>Start Date: {project.startDate}</Text>
                </View>
                <View style={styles.timelineItem}>
                  <Calendar size={18} color="#6B6B6B" />
                  <Text style={styles.timelineText}>End Date: {project.endDate}</Text>
                </View>
              </View>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Update Project</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <Text style={styles.secondaryButtonText}>View Investors</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface NewProjectModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewProjectModal = ({ visible, onClose }: NewProjectModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  
  const handleSubmit = () => {
    // In a real app, this would create a new project
    onClose();
  };
  
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
            <Text style={styles.modalTitle}>Create New Project</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.formContainer}>
            <Text style={styles.formLabel}>Project Title</Text>
            <TextInput
              style={styles.formInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter project title"
            />
            
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your project"
              multiline
              numberOfLines={4}
            />
            
            <Text style={styles.formLabel}>Funding Goal (USD)</Text>
            <TextInput
              style={styles.formInput}
              value={goal}
              onChangeText={setGoal}
              placeholder="Enter amount"
              keyboardType="numeric"
            />
            
            <Text style={styles.formLabel}>Project Image</Text>
            <TouchableOpacity style={styles.imagePickerButton}>
              <Plus size={24} color="#6B6B6B" />
              <Text style={styles.imagePickerText}>Add Project Image</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.actionButtonText}>Create Project</Text>
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
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
    flex: 1,
  },
  projectDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 15,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  projectStat: {
    alignItems: 'center',
  },
  projectStatLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  projectStatValue: {
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
  modalProjectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B6B6B',
    lineHeight: 24,
    marginBottom: 20,
  },
  fundingContainer: {
    backgroundColor: '#FEF0CD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  fundingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  fundingDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  fundingRaised: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
    marginRight: 5,
  },
  fundingGoal: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  modalProgressContainer: {
    height: 8,
    backgroundColor: '#FFFFFF',
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
    color: '#4A3500',
  },
  timelineContainer: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginLeft: 10,
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
  formContainer: {
    padding: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#6B6B6B',
    marginTop: 8,
  },
  submitButton: {
    flex: 1,
    marginBottom: 30,
  },
});