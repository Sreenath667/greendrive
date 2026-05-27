import { ExpoConfig, ConfigContext } from '@expo/config';

const config: ExpoConfig = {
  name: 'GreenDrive',
  slug: 'greendrive',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'greendrive',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#f8fdf9',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTabletMode: false,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#f8fdf9',
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    package: 'com.greendrive.app',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: 'com.googleusercontent.apps.YOUR_CLIENT_ID',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow GreenDrive to access your camera.',
        microphonePermission: 'Allow GreenDrive to access your microphone.',
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow GreenDrive to access your location.',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#2ecc71',
      },
    ],
  ],
  extra: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...config,
});