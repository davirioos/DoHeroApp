// app/private/(tabs)/_layout.tsx

import CustomTabBar from "@/src/components/CustomTabBar";
import { Tabs } from "expo-router";
import { Image } from "react-native";

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
        name="task" // Certifique-se que o arquivo se chama index.tsx
        options={{
          title: "Tarefas",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../../../src/assets/icons/TarefasIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#101010" : "#FFF",
              }}
            />
          ),
        }}
      />

      {/* 2. HÁBITOS */}
      <Tabs.Screen
        name="habits"
        options={{
          title: "Hábitos",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../../../src/assets/icons/HabitosIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#101010" : "#FFF",
              }}
            />
          ),
        }}
      />

      {/* 3. RANKING */}
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../../../src/assets/icons/RankingIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#101010" : "#FFF",
              }}
            />
          ),
        }}
      />

      {/* 4. MONSTRO */}
      <Tabs.Screen
        name="boss"
        options={{
          title: "Monstro",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../../../src/assets/icons/MonstroIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#101010" : "#FFF",
              }}
            />
          ),
        }}
      />

      {/* 5. PERFIL */}
      <Tabs.Screen
        name="statistic"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={require("../../../src/assets/icons/EstatisticaIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#101010" : "#FFF",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
