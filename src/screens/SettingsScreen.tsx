// 파일 경로: src/screens/SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../navigation/AppNavigator';

const SettingsScreen: React.FC = () => {
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
  }, [navigation]);


  const handleGoBack = () => {
    console.log('뒤로가기');
    // 'canGoBack()' 메서드는 useNavigation 훅으로 가져온 객체에 포함됩니다.
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('안내', '이전 화면이 없습니다.');
    }
  };

  const handlePreferenceSettings = () => {
    console.log('환경설정 이동');
    navigation.navigate('PreferenceSettings');
  };

  const handleMyInfoEdit = () => {
    console.log('내 정보 수정 이동');
    navigation.navigate('MyInfoEdit');
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말로 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => {
            console.log('로그아웃 처리');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          }
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '회원 탈퇴',
      '정말로 회원 탈퇴 하시겠습니까? 모든 데이터가 삭제됩니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => {
            console.log('회원 탈퇴 처리');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              })
            );
          }
        },
      ],
      { cancelable: true }
    );
  };

  // 일반 설정 항목 컴포넌트
  const SettingsItem: React.FC<{
    iconName: string; // string 타입 유지 (아래 IconComponent에서 처리)
    iconLibrary: 'Ionicons' | 'MaterialCommunityIcons' | 'AntDesign';
    text: string;
    onPress: () => void;
    showChevron?: boolean;
    isLast?: boolean;
  }> = ({ iconName, iconLibrary, text, onPress, showChevron = true, isLast = false }) => {
    const IconComponent =
      iconLibrary === 'Ionicons'
        ? Ionicons
        : iconLibrary === 'MaterialCommunityIcons'
        ? MaterialCommunityIcons
        : AntDesign;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.settingsItem, isLast && styles.noBorder]}>
        <View style={styles.itemLeft}>
          <IconComponent name={iconName as any} size={24} color="#5A6372" style={styles.itemIcon} />
          <Text style={styles.itemText}>{text}</Text>
        </View>
        {showChevron && <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />}
      </TouchableOpacity>
    );
  };

  // 알림 설정 항목 컴포넌트
  const NotificationItem: React.FC<{
    iconName: string; // string 타입 유지
    iconLibrary: 'Ionicons' | 'MaterialCommunityIcons' | 'AntDesign';
    text: string;
    isLast?: boolean;
  }> = ({ iconName, iconLibrary, text, isLast = false }) => {
    const IconComponent =
      iconLibrary === 'Ionicons'
        ? Ionicons
        : iconLibrary === 'MaterialCommunityIcons'
        ? MaterialCommunityIcons
        : AntDesign;

    return (
      <View style={[styles.settingsItem, isLast && styles.noBorder]}>
        <View style={styles.itemLeft}>
          <IconComponent name={iconName as any} size={24} color="#5A6372" style={styles.itemIcon} />
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <Switch
          onValueChange={setReceiveNotifications}
          value={receiveNotifications}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={receiveNotifications ? '#5A6372' : '#f4f3f4'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      {Platform.OS === 'android' && <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />}

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

      <View style={[styles.section, styles.firstSection]}>
        <Text style={styles.sectionTitle}>일반</Text>
        <SettingsItem
          iconName="person-outline"
          iconLibrary="Ionicons"
          text="내 정보 수정"
          onPress={handleMyInfoEdit}
        />
        <SettingsItem
          iconName="cog-outline"
          iconLibrary="Ionicons"
          text="환경설정"
          onPress={handlePreferenceSettings}
          isLast={true}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림</Text>
        <NotificationItem
          iconName="notifications-outline"
          iconLibrary="Ionicons"
          text="알림 받기"
          isLast={true}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정</Text>
        <SettingsItem
          iconName="log-out-outline"
          iconLibrary="Ionicons"
          text="로그아웃"
          onPress={handleLogout}
          showChevron={false}
        />
        <SettingsItem
          iconName="delete-outline"
          iconLibrary="MaterialCommunityIcons"
          text="회원 탈퇴"
          onPress={handleDeleteAccount}
          showChevron={false}
          isLast={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  firstSection: {
    marginTop: 0,
    borderTopWidth: 0,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
    paddingVertical: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;