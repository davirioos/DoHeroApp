import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { bottom: (insets.bottom > 0 ? insets.bottom : 10) + 75 },
        isDark && { backgroundColor: "#6200EE" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.plusSign}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusSign: {
    fontSize: 30,
    color: "#fff",
    lineHeight: 32,
  },
});

export default FloatingActionButton;
