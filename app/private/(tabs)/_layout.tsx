import CustomTabBar from "@/src/components/CustomTabBar";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../src/assets/icons/checkbox.svg";
import Habit from "../../../src/assets/icons/document-signed.svg";
import Monster from "../../../src/assets/icons/scary-monster.svg";
import Ranking from "../../../src/assets/icons/shield-check.svg";
import Statistica from "../../../src/assets/icons/stats.svg";

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="task"
        options={{
          title: t("tabs.tasks"),
          tabBarIcon: ({ size, focused }) => (
            <Checkbox
              width={size}
              height={size}
              fill={
                focused
                  ? isDark
                    ? "#6200EE"
                    : "#101010"
                  : isDark
                  ? "#fff"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: t("tabs.habits"),
          tabBarIcon: ({ size, focused }) => (
            <Habit
              width={size}
              height={size}
              fill={
                focused
                  ? isDark
                    ? "#6200EE"
                    : "#101010"
                  : isDark
                  ? "#fff"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: t("tabs.ranking"),
          tabBarIcon: ({ size, focused }) => (
            <Ranking
              width={size}
              height={size}
              fill={
                focused
                  ? isDark
                    ? "#6200EE"
                    : "#101010"
                  : isDark
                  ? "#fff"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="boss"
        options={{
          title: t("tabs.boss"),
          tabBarIcon: ({ size, focused }) => (
            <Monster
              width={size}
              height={size}
              fill={
                focused
                  ? isDark
                    ? "#6200EE"
                    : "#101010"
                  : isDark
                  ? "#fff"
                  : "#fff"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ size, focused }) => (
            <Statistica
              width={size}
              height={size}
              fill={
                focused
                  ? isDark
                    ? "#6200EE"
                    : "#101010"
                  : isDark
                  ? "#fff"
                  : "#fff"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
