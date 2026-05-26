import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [tab, setTab] = useState("Home");

  const renderScreen = () => {
    switch (tab) {
      case "Home":
        return (
          <View style={styles.screen}>
            <Text style={styles.text}>🏠 Home Screen</Text>
          </View>
        );

      case "Profile":
        return (
          <View style={styles.screen}>
            <Text style={styles.text}>👤 Profile Screen</Text>
          </View>
        );

      case "Settings":
        return (
          <View style={styles.screen}>
            <Text style={styles.text}>⚙️ Settings Screen</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Tabs */}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setTab("Home")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "Home" && styles.activeTab,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setTab("Profile")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "Profile" && styles.activeTab,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setTab("Settings")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "Settings" && styles.activeTab,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: "#22e504",
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  bottomTab: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },

  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tabText: {
    color: "#888",
    fontSize: 16,
  },

  activeTab: {
    color: "#22e504",
    fontWeight: "bold",
  },
});