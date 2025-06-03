const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;
const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;

export default {
  expo: {
    name: 'Runify',
    slug: 'Runify',
    version: '1.0.0',
    owner: 'runify',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'runify',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      edgeToEdgeEnabled: true,
      package: 'com.runify.Runify'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
      redirectUri:'http://localhost:8081',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        }
      ],
      'expo-web-browser'
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: 'e91a019d-c96d-482e-816c-767d286ee9c9'
      },
     kakaoNativeAppKey: kakaoNativeAppKey,
      googleClientId: googleClientId,
    }
  }
};
