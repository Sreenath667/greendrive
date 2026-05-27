// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  role: 'public' | 'volunteer' | 'organizer' | 'admin';
  city: string;
  affiliation: string;
  treesPlanted: number;
  points: number;
  eventsAttended: number;
  badges: string[];
  joinedAt: Date;
  lastActive: Date;
  fcmToken?: string;
  loginMethod: 'google' | 'email';
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  instructions: string;
  whatToBring: string[];
  date: Date;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  targetTrees: number;
  slotsAvailable: number;
  organizer: string; // userId ref
  volunteers: string[]; // userIds
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Tree Types
export type TreeStatus = 'newly-planted' | 'sapling' | 'growing' | 'healthy';

export interface Tree {
  id: string;
  species: string;
  commonName: string;
  funFact: string;
  plantedBy: string; // userId ref
  eventId?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: TreeStatus;
  adoptedBy?: string; // userId ref
  photos: string[]; // photoIds
  timeline: TimelineEntry[];
  qrCode: string;
  reportedIssue?: string;
  createdAt: Date;
}

export interface TimelineEntry {
  date: Date;
  status: TreeStatus;
  photoUrl?: string;
  note?: string;
}

// Photo Types
export interface Photo {
  id: string;
  uploadedBy: string; // userId ref
  treeId?: string;
  eventId?: string;
  url: string;
  caption: string;
  approved: boolean;
  approvedBy?: string; // adminId ref
  likes: number;
  type: 'progress' | 'before' | 'after';
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type:
    | 'event-reminder'
    | 'tree-checkup'
    | 'event-near-you'
    | 'photo-approved'
    | 'badge-earned';
  read: boolean;
  relatedId?: string;
  timestamp: Date;
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  totalTrees: number;
  totalHours: number;
  totalEvents: number;
  totalAdopted: number;
  points: number;
  badges: string[];
  rank: number;
  lastUpdated: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalTreesPlanted: number;
  totalVolunteers: number;
  totalEvents: number;
  co2Offset: number;
  activeLocations: number;
}