// app/private/(tabs)/_layout.tsx

import CustomTabBar from "@/src/components/CustomTabBar";
import { Tabs } from "expo-router";
import Checkbox from "../../../src/assets/icons/checkbox.svg";
import Habit from "../../../src/assets/icons/document-signed.svg";
import Monster from "../../../src/assets/icons/scary-monster.svg";
import Ranking from "../../../src/assets/icons/shield-check.svg";
import Statistica from "../../../src/assets/icons/stats.svg";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 1. TAREFAS (index.tsx) - Colocada em primeiro lugar */}
      <Tabs.Screen
        name="task"
        options={{
          title: "Tarefas",
          tabBarIcon: ({ size, focused }) => (
            <Checkbox
              width={size}
              height={size}
              // Correção: Use a prop 'fill' para colorir o SVG
              fill={focused ? "#101010" : "#FFF"}
            />
          ),
        }}
      />

      {/* 2. HÁBITOS */}
      <Tabs.Screen
        name="habits"
        options={{
          title: "Hábitos",
          tabBarIcon: ({ size, focused }) => (
            <Habit
              width={size}
              height={size}
              fill={focused ? "#101010" : "#FFF"}
            />
          ),
        }}
      />

      {/* 3. RANKING */}
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ size, focused }) => (
            <Ranking
              width={size}
              height={size}
              fill={focused ? "#101010" : "#FFF"}
            />
          ),
        }}
      />

      {/* 4. MONSTRO */}
      <Tabs.Screen
        name="boss"
        options={{
          title: "Monstro",
          tabBarIcon: ({ size, focused }) => (
            <Monster
              width={size}
              height={size}
              fill={focused ? "#101010" : "#FFF"}
            />
          ),
        }}
      />

      {/* 5. PERFIL */}
      <Tabs.Screen
        name="statistic"
        options={{
          title: "Perfil",
          tabBarIcon: ({ size, focused }) => (
            <Statistica
              width={size}
              height={size}
              fill={focused ? "#101010" : "#FFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
