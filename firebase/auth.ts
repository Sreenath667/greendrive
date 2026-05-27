import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '../types';

export const signUpWithEmail = async (
  email: string,
  password: string,
  userData: Partial<User>
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      id: user.uid,
      email,
      treesPlanted: 0,
      points: 0,
      eventsAttended: 0,
      badges: [],
      joinedAt: new Date(),
      lastActive: new Date(),
      role: 'volunteer',
      loginMethod: 'email',
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  return userDoc.exists() ? (userDoc.data() as User) : null;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  });
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    await setDoc(doc(db, 'users', userId), updates, { merge: true });
  } catch (error) {
    throw error;
  }
};