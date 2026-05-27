import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setUser, setError } from '../../store/userSlice';
import { signInWithEmail, signUpWithEmail } from '../../firebase/auth';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
  });

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        if (!name) {
          Alert.alert('Error', 'Name is required for signup');
          setLoading(false);
          return;
        }
        user = await signUpWithEmail(email, password, {
          name,
          email,
          role: 'volunteer',
          city: '',
          affiliation: '',
        });
      } else {
        user = await signInWithEmail(email, password);
      }

      if (user) {
        dispatch(setUser({ id: user.uid } as any));
        router.replace('/(public)/');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      Alert.alert('Auth Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert('Error', 'Google sign-in failed');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.icon}>🌱</Text>
          <Text style={styles.title}>GreenDrive</Text>
          <Text style={styles.subtitle}>Plant. Grow. Thrive.</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          {/* Email/Password Button */}
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleEmailAuth}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Text>
          </Pressable>

          {/* Toggle Sign Up */}
          <Pressable onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <Pressable
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignIn}
          >
            <Text style={styles.googleButtonText}>🔵 Continue with Google</Text>
          </Pressable>

          {/* Guest Button */}
          <Pressable
            style={[styles.button, styles.guestButton]}
            onPress={() => router.replace('/(public)/')}
          >
            <Text style={styles.guestButtonText}>👁️ Browse as Guest</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fdf9',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 6,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 0,
  },
  input: {
    height: 48,
    backgroundColor: '#f8fdf9',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 0,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 0,
    marginBottom: 12,
    fontWeight: '900',
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 3,
  },
  guestButton: {
    backgroundColor: '#a8e063',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  guestButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  toggleText: {
    textAlign: 'center',
    color: '#27ae60',
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#000',
  },
  dividerText: {
    marginHorizontal: 12,
    fontWeight: '900',
    color: '#000',
  },
});