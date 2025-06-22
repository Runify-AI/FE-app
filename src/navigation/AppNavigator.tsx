// 파일 경로: src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 기존 스크린 컴포넌트
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PreferenceSettingsScreen from '../screens/PreferenceSettingsScreen';
import MyInfoEditScreen from '../screens/MyInfoEditScreen';
import AuthScreen from '../screens/AuthScreen';

// 내비게이터의 라우트 및 파라미터 타입 정의
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Settings: undefined;
  PreferenceSettings: undefined;
  MyInfoEdit: undefined;
  Auth: undefined; //
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PreferenceSettings" component={PreferenceSettingsScreen} />
        <Stack.Screen name="MyInfoEdit" component={MyInfoEditScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
