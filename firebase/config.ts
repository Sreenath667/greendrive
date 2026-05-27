import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth with persistent storage
class SecureStorageAdapter {
  async getItem(key: string) {
    return await SecureStore.getItemAsync(key);
  }

  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(new SecureStorageAdapter()),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;