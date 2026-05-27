import { View, Text, StyleSheet } from 'react-native';
import { TreeStatus } from '../types';

const statusConfig = {
  'newly-planted': { bg: '#ff4444', label: '🔴 Newly Planted' },
  'sapling': { bg: '#ffaa00', label: '🟡 Sapling' },
  'growing': { bg: '#88dd00', label: '🟢 Growing' },
  'healthy': { bg: '#00dd44', label: '🌟 Healthy' },
};

export const StatusBadge = ({ status }: { status: TreeStatus }) => {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={styles.text}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#000',
  },
  text: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});