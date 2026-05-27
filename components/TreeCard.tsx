import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Tree } from '../types';
import { StatusBadge } from './StatusBadge';

interface TreeCardProps {
  tree: Tree;
  onPress: () => void;
}

export const TreeCard = ({ tree, onPress }: TreeCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: tree.photos[0] || 'https://via.placeholder.com/300x300?text=Tree' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.species}>{tree.commonName}</Text>
          <StatusBadge status={tree.status} />
        </View>
        <Text style={styles.botanical}>{tree.species}</Text>
        <Text style={styles.funFact} numberOfLines={2}>
          {tree.funFact}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
  },
  header: {
    marginBottom: 8,
  },
  species: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    marginBottom: 6,
  },
  botanical: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  funFact: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
});