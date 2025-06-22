// 파일 경로: src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  // Image, // 이미지 사용하지 않으려면 이 줄을 주석 처리하거나 제거
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const handleMyGoal = () => { /* ... */ };
  const handleMyStats = () => { /* ... */ };
  const handleRecommendedCourses = () => { /* ... */ };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.appName}>Runnify</Text>
          <TouchableOpacity onPress={navigateToSettings} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.mainSection}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={60} color="#666" />
            </View>
            <Text style={styles.userName}>안녕하세요, 사용자님!</Text>
          </View>
          {/*
            // main_banner.png 파일이 없다면 이 부분을 주석 처리하거나 제거해주세요.
            // 만약 이미지를 사용하려면, Your_Project_Root/assets/main_banner.png 경로에 파일이 있어야 합니다.
          <Image
            source={require('../../assets/main_banner.png')}
            style={styles.mainBanner}
            resizeMode="cover"
          />
          */}
          {/* 이미지가 없는 경우를 대비한 대체 View */}
          <View style={styles.mainBannerPlaceholder}>
            <Text style={styles.mainBannerPlaceholderText}>메인 배너 영역</Text>
          </View>
        </View>

        <View style={styles.buttonGrid}>
          <TouchableOpacity style={styles.gridButton} onPress={handleMyGoal}>
            <MaterialCommunityIcons name="target" size={40} color="#007AFF" />
            <Text style={styles.gridButtonText}>나의 목표</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={handleMyStats}>
            <MaterialCommunityIcons name="chart-line" size={40} color="#28A745" />
            <Text style={styles.gridButtonText}>나의 통계</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={handleRecommendedCourses}>
            <MaterialCommunityIcons name="map-marker-path" size={40} color="#FFC107" />
            <Text style={styles.gridButtonText}>추천 코스</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          <View style={styles.infoCard}>
            <Text style={styles.cardText}>아직 활동 내역이 없습니다.</Text>
            <Text style={styles.cardSubText}>첫 걸음을 시작해보세요!</Text>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.infoCard}>
            <Text style={styles.cardText}>새로운 알림이 없습니다.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee', elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  appName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  settingsButton: { padding: 5 },
  mainSection: {
    alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff', marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1,
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '90%' },
  profileImagePlaceholder: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e0e0',
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  mainBannerPlaceholder: { // 이미지가 없을 때 보여줄 대체 영역
    width: '90%', height: 150, borderRadius: 10, backgroundColor: '#e0e0e0',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc',
  },
  mainBannerPlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  buttonGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10,
    marginBottom: 10, backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1,
  },
  gridButton: {
    width: '30%', alignItems: 'center', paddingVertical: 15, marginVertical: 5, borderRadius: 8,
    backgroundColor: '#f9f9f9', borderColor: '#eee', borderWidth: 1,
  },
  gridButtonText: { marginTop: 8, fontSize: 14, fontWeight: '600', color: '#333' },
  cardSection: { paddingHorizontal: 20, marginTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 8, padding: 15, minHeight: 80, justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1,
  },
  cardText: { fontSize: 15, color: '#333', marginBottom: 5 },
  cardSubText: { fontSize: 13, color: '#666' },
});

export default HomeScreen;