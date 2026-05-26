
**GreenDrive** is an open-source, community-focused Android application built with React Native and Expo. It enables organizations and volunteers to:

- 🌍 **Create & Manage** tree plantation events
- 📊 **Track & Monitor** tree growth with real-time updates
- 👥 **Engage Volunteers** with gamification (points, badges, leaderboards)
- 📸 **Document Impact** with photo galleries and before/after comparisons
- 🗺️ **Visualize** tree locations on interactive Google Maps
- 🏆 **Celebrate Success** with certificates and leaderboards

Perfect for environmental organizations, NGOs, student groups, and corporate social responsibility initiatives.

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Google Sign-In integration
- ✅ Email/Password authentication
- ✅ Guest browsing (no login required)
- ✅ Role-based access control (Public, Volunteer, Organizer, Admin)
- ✅ Secure token management

### 🏠 Public Landing Page
- ✅ Live counters with animation (Trees, Volunteers, CO₂ Offset)
- ✅ Upcoming events carousel
- ✅ Community photo gallery preview
- ✅ Global impact dashboard
- ✅ Neo-brutalist UI design

### 📅 Event Management
- ✅ Create, read, update events (organizers)
- ✅ List view & calendar view toggle
- ✅ Real-time slot availability
- ✅ Event filtering (Upcoming/Past/My Events)
- ✅ Share events via expo-sharing
- ✅ Attendance marking
- ✅ Get directions to event location

### 🗺️ Interactive Tree Map
- ✅ Google Maps integration
- ✅ Color-coded pins (status-based)
- ✅ Clustering for zoomed-out view
- ✅ Filter by species/status/event/date
- ✅ Bottom sheet popup with tree details
- ✅ My Location functionality
- ✅ Tap to view full tree profile

### 🌳 Tree Tracking System
- ✅ Unique tree profiles with QR codes
- ✅ GPS coordinates & growth timeline
- ✅ Status history with photos
- ✅ Adoption system for volunteers
- ✅ Update tree status & add notes
- ✅ Problem reporting
- ✅ Fun facts & species information

### 📸 Photo Gallery & Upload
- ✅ Masonry grid layout
- ✅ Filter by event/tree/my uploads
- ✅ Before/after slider
- ✅ Photo approval workflow (organizers/admins)
- ✅ Like & share functionality
- ✅ Camera & gallery picker
- ✅ Caption & tagging

### 📊 Analytics & Reporting
- ✅ Global impact statistics
- ✅ Monthly tree planting charts
- ✅ Species distribution pie charts
- ✅ Volunteer hours tracking
- ✅ Tree health breakdown
- ✅ Export PDF/CSV reports
- ✅ Location-based analytics

### 🏆 Gamification
- ✅ Points system
- ✅ Badge achievement
- ✅ Leaderboards (4 categories)
- ✅ Certificate generation & download
- ✅ Share certificates
- ✅ Milestone celebrations

### 🔔 Notifications
- ✅ Firebase Cloud Messaging (FCM)
- ✅ Event reminders
- ✅ Tree check-up notifications
- ✅ Location-based alerts
- ✅ Photo approval notifications
- ✅ Badge achievement alerts

### 👤 User Dashboard
- ✅ Personal statistics
- ✅ My trees list with progress
- ✅ My events history
- ✅ Profile management
- ✅ Tree adoption management
- ✅ Certificate viewing

### 🛠️ Admin Panel
- ✅ User management
- ✅ Role assignment
- ✅ Content moderation
- ✅ Photo approval queue
- ✅ Report generation
- ✅ System analytics
- ✅ Volunteer hours validation

---

## 🔧 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.73.4 | Cross-platform mobile UI |
| **Expo** | 51.0+ | Development & deployment |
| **TypeScript** | 5.3+ | Type-safe development |
| **React Navigation** | v6 | Navigation & routing |
| **Redux Toolkit** | 1.9+ | State management |

### Backend & Services
| Service | Version | Purpose |
|---------|---------|---------|
| **Firebase Auth** | 10+ | User authentication |
| **Firestore** | 10+ | Real-time database |
| **Firebase Storage** | 10+ | Image/file storage |
| **Firebase Cloud Messaging** | 10+ | Push notifications |

### Maps & Location
| Library | Purpose |
|---------|---------|
| **react-native-maps** | Interactive map display |
| **expo-location** | GPS coordinates & geolocation |
| **Google Maps SDK** | Map rendering & services |

### UI & Visualization
| Library | Purpose |
|---------|---------|
| **react-native-reanimated** | Smooth animations |
| **react-native-gesture-handler** | Touch gestures |
| **victory-native** | Charts & graphs |
| **expo-image-picker** | Camera & gallery access |

### Utilities
| Library | Purpose |
|---------|---------|
| **react-native-qrcode-svg** | QR code generation |
| **react-native-html-to-pdf** | Certificate generation |
| **expo-sharing** | Share functionality |
| **expo-notifications** | Local notifications |
| **@react-native-google-signin** | Google authentication |

---

## 👥 User Roles

### 1. 🌐 Public Visitor
- Browse events without login
- View tree map
- See photo gallery
- Check global impact stats
- **Cannot**: Register for events, plant trees, upload photos

### 2. 🤝 Volunteer
- Register for events
- Plant & log trees
- Upload & tag photos
- Adopt trees
- Earn points & badges
- Download certificates
- View leaderboards
- **Cannot**: Create events, approve content

### 3. 👨‍💼 Student Organizer
- Create & manage events
- Mark attendance
- Approve photos
- View event reports
- Manage volunteers
- **Cannot**: Access admin panel, manage users

### 4. 👨‍💻 Admin
- Full system access
- Manage all users & roles
- Moderate content
- Generate reports
- Export data (PDF/CSV)
- Configure system
- View all analytics

---

## 📁 Project Structure
# greendrive
