import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard = ({ event, onPress }: EventCardProps) => {
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.location}>📍 {event.address}</Text>
        <View style={styles.footer}>
          <Text style={styles.trees}>🌳 {event.slotsAvailable} slots</Text>
          <Text style={styles.volunteers}>👥 {event.volunteers.length}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 0,
    overflow: 'hidden',
  },
  dateBox: {
    backgroundColor: '#2ecc71',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 3,
    borderRightColor: '#000',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    marginBottom: 6,
  },
  location: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trees: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27ae60',
  },
  volunteers: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2980b9',
  },
});