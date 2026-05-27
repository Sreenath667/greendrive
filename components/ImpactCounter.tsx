import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ImpactCounterProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
}

export const ImpactCounter = ({
  icon,
  label,
  value,
  suffix = '',
}: ImpactCounterProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    return () => animatedValue.removeAllListeners();
  }, [value, animatedValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>
        {displayValue.toLocaleString()}{suffix}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 0,
  },
  icon: {
    fontSize: 28,
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2ecc71',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
  },
});