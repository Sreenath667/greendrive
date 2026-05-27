import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getDashboardStats, getUpcomingEvents } from '../../firebase/firestore';
import { ImpactCounter } from '../../components/ImpactCounter';
import { EventCard } from '../../components/EventCard';
import { DashboardStats, Event } from '../../types';

export default function HomeScreen() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTreesPlanted: 0,
    totalVolunteers: 0,
    totalEvents: 0,
    co2Offset: 0,
    activeLocations: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
    };

    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = getUpcomingEvents((upcomingEvents) => {
      setEvents(upcomingEvents.slice(0, 5));
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1518495285307-0c81e5180db5?w=500&h=300&fit=crop',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Every Tree Counts</Text>
            <Text style={styles.heroSubtitle}>
              Join our community to plant, track, and nurture trees
            </Text>
          </View>
        </View>

        {/* Impact Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Global Impact</Text>
          <View style={styles.statsGrid}>
            <ImpactCounter
              icon="🌳"
              label="Trees Planted"
              value={stats.totalTreesPlanted}
            />
            <ImpactCounter icon="👥" label="Volunteers" value={stats.totalVolunteers} />
          </View>
          <View style={styles.statsGrid}>
            <ImpactCounter
              icon="📍"
              label="Active Locations"
              value={stats.activeLocations}
            />
            <ImpactCounter
              icon="💨"
              label="CO₂ Offset (kg)"
              value={stats.co2Offset}
              suffix="kg"
            />
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                onPress={() => router.push(`/events/${item.id}`)}
              />
            )}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
          <Pressable
            style={styles.ctaButton}
            onPress={() => router.push('/(public)/events')}
          >
            <Text style={styles.ctaButtonText}>View All Events →</Text>
          </Pressable>
        </View>

        {/* Recent Photos Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Gallery</Text>
          <View style={styles.photoGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Image
                key={i}
                source={{
                  uri: `https://images.unsplash.com/photo-${
                    1500000000000 + i * 1000000
                  }?w=150&h=150&fit=crop`,
                }}
                style={styles.photoThumb}
              />
            ))}
          </View>
        </View>

        {/* CTA Footer */}
        <View style={styles.footerCTA}>
          <Text style={styles.footerTitle}>Ready to Make a Difference?</Text>
          <Pressable
            style={styles.primaryCTA}
            onPress={() => router.push('/(public)/events')}
          >
            <Text style={styles.primaryCTAText}>Join a Drive Near You</Text>
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
  heroBanner: {
    height: 280,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderBottomColor: '#2ecc71',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#a8e063',
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontWeight: '900',
    color: '#2ecc71',
    fontSize: 14,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  photoThumb: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#000',
  },
  footerCTA: {
    backgroundColor: '#2ecc71',
    padding: 20,
    borderTopWidth: 4,
    borderTopColor: '#000',
    borderBottomWidth: 4,
    borderBottomColor: '#000',
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  primaryCTA: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 0,
    alignItems: 'center',
  },
  primaryCTAText: {
    color: '#a8e063',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});