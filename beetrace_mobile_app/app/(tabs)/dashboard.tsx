import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Hexagon, QrCode, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import HoneycombBackground from '@/components/HoneycombBackground';

export default function DashboardScreen() {
  const { userType } = useUser();

  // Render dashboard based on user type
  if (userType === 'beekeeper') {
    return <BeekeeperDashboard />;
  } else if (userType === 'investor') {
    return <InvestorDashboard />;
  } else {
    return <ConsumerDashboard />;
  }
}

function BeekeeperDashboard() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>John&apos;s Apiary</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard 
            title="Active Hives" 
            value="12" 
            icon={<Hexagon size={20} color="#F9A826" />}
            onPress={() => router.push('/hives')}
          />
          <StatCard 
            title="Honey Batches" 
            value="32" 
            icon={<QrCode size={20} color="#F9A826" />}
            onPress={() => router.push('/honey')}
          />
          <StatCard 
            title="Projects" 
            value="3" 
            icon={<TrendingUp size={20} color="#F9A826" />}
            onPress={() => router.push('/projects')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        <View style={styles.activityContainer}>
          <ActivityItem 
            title="Honey Batch #32 Minted"
            description="20kg of Acacia Honey NFT created"
            time="2 hours ago"
            icon={<QrCode size={24} color="#FFFFFF" />}
            iconBgColor="#F9A826"
          />
          <ActivityItem 
            title="New Investment Received"
            description="$500 invested in your 'Modern Hives' project"
            time="Yesterday"
            icon={<TrendingUp size={24} color="#FFFFFF" />}
            iconBgColor="#4CAF50"
          />
          <ActivityItem 
            title="Hive #8 Data Updated"
            description="Weight increased by 2.3kg"
            time="2 days ago"
            icon={<Hexagon size={24} color="#FFFFFF" />}
            iconBgColor="#2196F3"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <QuickActionButton 
            title="Add Honey Batch"
            icon={<QrCode size={24} color="#FFFFFF" />}
            onPress={() => router.push('/honey')}
          />
          <QuickActionButton 
            title="Create Project"
            icon={<Plus size={24} color="#FFFFFF" />}
            onPress={() => router.push('/projects')}
          />
          <QuickActionButton 
            title="Update Hive Data"
            icon={<Hexagon size={24} color="#FFFFFF" />}
            onPress={() => router.push('/hives')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InvestorDashboard() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>Sarah Johnson</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard 
            title="Investments" 
            value="5" 
            icon={<TrendingUp size={20} color="#F9A826" />}
            onPress={() => router.push('/investments')}
          />
          <StatCard 
            title="$BEE Balance" 
            value="1,250" 
            icon={<Hexagon size={20} color="#F9A826" />}
          />
          <StatCard 
            title="Returns" 
            value="$320" 
            icon={<TrendingUp size={20} color="#F9A826" />}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Investments</Text>
          <TouchableOpacity onPress={() => router.push('/investments')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsScrollView}>
          <ProjectCard 
            title="Modern Hives for Nairobi"
            beekeeper="John's Apiary"
            funded="80%"
            image="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
            onPress={() => router.push('/investments')}
          />
          <ProjectCard 
            title="Pollination Expansion"
            beekeeper="Kilimanjaro Honey Co."
            funded="45%"
            image="https://images.unsplash.com/photo-1590075865003-e48b57580c41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
            onPress={() => router.push('/investments')}
          />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discover Projects</Text>
          <TouchableOpacity onPress={() => router.push('/discover')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsScrollView}>
          <ProjectCard 
            title="Sustainable Beekeeping"
            beekeeper="Mara Honey Farms"
            funded="25%"
            image="https://images.unsplash.com/photo-1508057198894-a7b69aca6bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
            onPress={() => router.push('/discover')}
          />
          <ProjectCard 
            title="Community Hives"
            beekeeper="Nakuru Women's Cooperative"
            funded="60%"
            image="https://images.unsplash.com/photo-1553279631-2f1a0a13d3c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
            onPress={() => router.push('/discover')}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function ConsumerDashboard() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <HoneycombBackground opacity={0.05} color="#F9A826" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.nameText}>BeeTrace</Text>
        </View>

        <TouchableOpacity 
          style={styles.scannerButton}
          onPress={() => router.push('/scan')}
        >
          <View style={styles.scannerIconContainer}>
            <QrCode size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.scannerText}>Scan Honey QR Code</Text>
          <Text style={styles.scannerSubtext}>Verify authenticity and origin</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Beekeepers</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.beekeepersScrollView}>
          <BeekeeperCard 
            name="John's Apiary"
            location="Nairobi, Kenya"
            image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3"
          />
          <BeekeeperCard 
            name="Kilimanjaro Honey Co."
            location="Arusha, Tanzania"
            image="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
          />
          <BeekeeperCard 
            name="Mara Honey Farms"
            location="Narok, Kenya"
            image="https://images.unsplash.com/photo-1473973266408-ed4e9c10a5cd?q=80&w=2872&auto=format&fit=crop&ixlib=rb-4.0.3"
          />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About BeeTrace</Text>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>
            BeeTrace uses blockchain technology to ensure honey authenticity, support beekeepers, 
            and promote sustainable beekeeping practices in Kenya.
          </Text>
          
          <View style={styles.featureRow}>
            <FeatureItem 
              title="Honey Traceability"
              description="Verify honey authenticity with blockchain-backed NFTs"
              icon={<QrCode size={24} color="#FFFFFF" />}
              iconBgColor="#F9A826"
            />
            <FeatureItem 
              title="Beekeeper Support"
              description="Fund beekeeping projects and earn returns"
              icon={<TrendingUp size={24} color="#FFFFFF" />}
              iconBgColor="#4CAF50"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

const StatCard = ({ title, value, icon, onPress }: StatCardProps) => (
  <TouchableOpacity 
    style={styles.statCard} 
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      {icon}
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </TouchableOpacity>
);

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const ActivityItem = ({ title, description, time, icon, iconBgColor }: ActivityItemProps) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIconContainer, { backgroundColor: iconBgColor }]}>
      {icon}
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDescription}>{description}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

interface QuickActionButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const QuickActionButton = ({ title, icon, onPress }: QuickActionButtonProps) => (
  <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
    <View style={styles.quickActionIconContainer}>
      {icon}
    </View>
    <Text style={styles.quickActionTitle}>{title}</Text>
  </TouchableOpacity>
);

interface ProjectCardProps {
  title: string;
  beekeeper: string;
  funded: string;
  image: string;
  onPress: () => void;
}

const ProjectCard = ({ title, beekeeper, funded, image, onPress }: ProjectCardProps) => {
  // Convert percentage string to proper width value
  const fundedPercentage = parseFloat(funded.replace('%', ''));
  const barWidth = `${fundedPercentage}%` as any;
  
  return (
    <TouchableOpacity style={styles.projectCard} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.projectImage} />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{title}</Text>
        <Text style={styles.projectBeekeeper}>{beekeeper}</Text>
        <View style={styles.projectFundedContainer}>
          <View style={[styles.projectFundedBar, { width: barWidth }]} />
          <Text style={styles.projectFundedText}>{funded} Funded</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface BeekeeperCardProps {
  name: string;
  location: string;
  image: string;
}

const BeekeeperCard = ({ name, location, image }: BeekeeperCardProps) => (
  <View style={styles.beekeeperCard}>
    <Image source={{ uri: image }} style={styles.beekeeperImage} />
    <View style={styles.beekeeperContent}>
      <Text style={styles.beekeeperName}>{name}</Text>
      <Text style={styles.beekeeperLocation}>{location}</Text>
    </View>
  </View>
);

interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const FeatureItem = ({ title, description, icon, iconBgColor }: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <View style={[styles.featureIconContainer, { backgroundColor: iconBgColor }]}>
      {icon}
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
  },
  seeAllText: {
    fontSize: 14,
    color: '#F9A826',
  },
  activityContainer: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '31%',
  },
  quickActionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#4A3500',
    textAlign: 'center',
  },
  projectsScrollView: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  projectCard: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 120,
  },
  projectContent: {
    padding: 15,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 4,
  },
  projectBeekeeper: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  projectFundedContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginTop: 5,
    position: 'relative',
  },
  projectFundedBar: {
    height: 6,
    backgroundColor: '#F9A826',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  projectFundedText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 5,
  },
  scannerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scannerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  scannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
  },
  scannerSubtext: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  beekeepersScrollView: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  beekeeperCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  beekeeperImage: {
    width: '100%',
    height: 100,
  },
  beekeeperContent: {
    padding: 10,
  },
  beekeeperName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 2,
  },
  beekeeperLocation: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  aboutContainer: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 30,
  },
  aboutText: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 22,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3500',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B6B6B',
    textAlign: 'center',
  },
});