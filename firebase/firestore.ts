import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Event, Tree, Photo, Notification, LeaderboardEntry, DashboardStats } from '../types';

// ===== EVENTS =====
export const getUpcomingEvents = (callback: (events: Event[]) => void) => {
  const q = query(
    collection(db, 'events'),
    where('status', '==', 'upcoming'),
    orderBy('date', 'asc'),
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const events: Event[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        ...data,
        id: doc.id,
        date: data.date?.toDate?.() || new Date(),
        createdAt: data.createdAt?.toDate?.() || new Date(),
      } as Event);
    });
    callback(events);
  });
};

export const createEvent = async (eventData: Partial<Event>) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: Timestamp.now(),
      volunteers: [],
      slotsAvailable: eventData.targetTrees,
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventId: string, updates: Partial<Event>) => {
  try {
    await updateDoc(doc(db, 'events', eventId), updates);
  } catch (error) {
    throw error;
  }
};

export const registerForEvent = async (eventId: string, userId: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventSnap = await getDoc(eventRef);
    
    if (eventSnap.exists()) {
      const event = eventSnap.data() as Event;
      if (!event.volunteers.includes(userId)) {
        event.volunteers.push(userId);
        await updateDoc(eventRef, {
          volunteers: event.volunteers,
          slotsAvailable: event.slotsAvailable - 1,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

// ===== TREES =====
export const plantTree = async (treeData: Partial<Tree>) => {
  try {
    const docRef = await addDoc(collection(db, 'trees'), {
      ...treeData,
      createdAt: Timestamp.now(),
      status: 'newly-planted',
      photos: [],
      timeline: [{
        date: Timestamp.now(),
        status: 'newly-planted',
      }],
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getTreesByLocation = (
  centerLat: number,
  centerLng: number,
  radiusKm: number,
  callback: (trees: Tree[]) => void
) => {
  const q = query(collection(db, 'trees'));

  return onSnapshot(q, (snapshot) => {
    const trees: Tree[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Tree;
      const distance = calculateDistance(
        centerLat,
        centerLng,
        data.coordinates.lat,
        data.coordinates.lng
      );

      if (distance <= radiusKm) {
        trees.push({ ...data, id: doc.id });
      }
    });
    callback(trees);
  });
};

export const updateTreeStatus = async (
  treeId: string,
  newStatus: string,
  photoUrl?: string,
  note?: string
) => {
  try {
    const treeRef = doc(db, 'trees', treeId);
    const treeSnap = await getDoc(treeRef);

    if (treeSnap.exists()) {
      const tree = treeSnap.data() as Tree;
      const newTimeline = [
        ...tree.timeline,
        {
          date: Timestamp.now(),
          status: newStatus,
          photoUrl,
          note,
        },
      ];

      await updateDoc(treeRef, {
        status: newStatus,
        timeline: newTimeline,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const adoptTree = async (treeId: string, userId: string) => {
  try {
    await updateDoc(doc(db, 'trees', treeId), { adoptedBy: userId });
  } catch (error) {
    throw error;
  }
};

// ===== PHOTOS =====
export const uploadPhoto = async (photoData: Partial<Photo>) => {
  try {
    const docRef = await addDoc(collection(db, 'photos'), {
      ...photoData,
      createdAt: Timestamp.now(),
      approved: false,
      likes: 0,
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getApprovedPhotos = (callback: (photos: Photo[]) => void) => {
  const q = query(
    collection(db, 'photos'),
    where('approved', '==', true),
    orderBy('createdAt', 'desc'),
    limit(100)
  );

  return onSnapshot(q, (snapshot) => {
    const photos: Photo[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      photos.push({
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate?.() || new Date(),
      } as Photo);
    });
    callback(photos);
  });
};

export const approvePhoto = async (photoId: string, adminId: string) => {
  try {
    await updateDoc(doc(db, 'photos', photoId), {
      approved: true,
      approvedBy: adminId,
    });
  } catch (error) {
    throw error;
  }
};

export const likePhoto = async (photoId: string) => {
  try {
    const photoRef = doc(db, 'photos', photoId);
    const photoSnap = await getDoc(photoRef);
    if (photoSnap.exists()) {
      const photo = photoSnap.data() as Photo;
      await updateDoc(photoRef, { likes: photo.likes + 1 });
    }
  } catch (error) {
    throw error;
  }
};

// ===== DASHBOARD STATS =====
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    const treesSnap = await getDocs(collection(db, 'trees'));
    const eventsSnap = await getDocs(collection(db, 'events'));

    let totalTrees = 0;
    const locations = new Set();

    treesSnap.forEach((doc) => {
      totalTrees++;
      const tree = doc.data() as Tree;
      locations.add(`${tree.coordinates.lat},${tree.coordinates.lng}`);
    });

    return {
      totalTreesPlanted: totalTrees,
      totalVolunteers: usersSnap.size,
      totalEvents: eventsSnap.size,
      co2Offset: totalTrees * 21,
      activeLocations: locations.size,
    };
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async (
  type: 'trees' | 'hours' | 'events' | 'adopted'
): Promise<LeaderboardEntry[]> => {
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    const entries: LeaderboardEntry[] = [];

    usersSnap.forEach((doc) => {
      const user = doc.data();
      entries.push({
        userId: user.id,
        totalTrees: user.treesPlanted || 0,
        totalHours: user.hours || 0,
        totalEvents: user.eventsAttended || 0,
        totalAdopted: user.treesAdopted || 0,
        points: user.points || 0,
        badges: user.badges || [],
        rank: 0,
        lastUpdated: user.lastActive?.toDate?.() || new Date(),
      });
    });

    entries.sort((a, b) => {
      switch (type) {
        case 'trees':
          return b.totalTrees - a.totalTrees;
        case 'hours':
          return b.totalHours - a.totalHours;
        case 'events':
          return b.totalEvents - a.totalEvents;
        case 'adopted':
          return b.totalAdopted - a.totalAdopted;
        default:
          return 0;
      }
    });

    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries.slice(0, 100);
  } catch (error) {
    throw error;
  }
};

// ===== UTILITY =====
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};