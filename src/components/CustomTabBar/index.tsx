import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarContainer,
        { bottom: insets.bottom > 0 ? insets.bottom : 10 },
        isDark && { backgroundColor: "#1E1E1E" },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const color = isFocused
          ? isDark
            ? "#fff"
            : "#101010"
          : isDark
          ? "#888"
          : "#FFF";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            {options.tabBarIcon?.({ color, focused: isFocused, size: 26 })}

            <Text
              style={{
                color,
                fontSize: 12,
                marginTop: 3,
                fontWeight: isFocused ? "700" : "400",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 15,
    right: 15,
    backgroundColor: "#2ECC71",
    borderRadius: 10,
    height: 70,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTabBar;
