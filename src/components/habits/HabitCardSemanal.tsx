import { Habit, useHabitStore } from "@/src/stores/habit/habitStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

const getWeekDays = () => {
  const week = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    week.push(day);
  }
  return week;
};

const weekDaysShort = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];

export default function HabitCardSemanal({ habit, onEdit, onDelete }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const completeHabit = useHabitStore((state) => state.completeHabit);
  const week = getWeekDays();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.rightActionsContainer}>
        <TouchableOpacity
          onPress={() => onDelete(habit.id)}
          style={[styles.rightAction, styles.deleteAction]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="trash" size={moderateScale(24)} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onEdit(habit)}
          style={[styles.rightAction, styles.editAction]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="pencil" size={moderateScale(24)} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const creationDate = new Date(habit.id);
  creationDate.setHours(0, 0, 0, 0);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={[styles.cardContainer, isDark && darkTheme.habits.cardContainer]}
      >
        <View style={styles.header}>
          <Ionicons
            name={habit.icon as any}
            size={moderateScale(24)}
            color={isDark ? "#FFF" : "#555"}
          />
          <Text
            style={[styles.habitName, isDark && darkTheme.habits.habitName]}
          >
            {habit.nome}
          </Text>
        </View>
        <View style={styles.weekContainer}>
          {week.map((day, index) => {
            const dayFormatted = getFormattedDate(day);
            const isCompleted = habit.diasCompletos.includes(dayFormatted);
            const dayToCompare = new Date(day);
            dayToCompare.setHours(0, 0, 0, 0);
            const isToday = dayToCompare.getTime() === today.getTime();
            const isDisabled =
              dayToCompare > today || dayToCompare < creationDate;

            return (
              <React.Fragment key={dayFormatted}>
                <View style={styles.dayWrapper}>
                  <Text
                    style={[
                      styles.dayLabel,
                      isDark && darkTheme.habits.dayLabel,
                    ]}
                  >
                    {weekDaysShort[index]}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.dayBox,
                      isDark && darkTheme.habits.dayBox,
                      isCompleted && styles.dayBoxCompleted,
                      isToday && styles.dayBoxToday,
                      isDisabled &&
                        (isDark
                          ? darkTheme.habits.dayBoxDisabled
                          : styles.dayBoxDisabled),
                    ]}
                    onPress={() => completeHabit(habit.id, day)}
                    disabled={isDisabled}
                  />
                </View>
              </React.Fragment>
            );
          })}
        </View>
        <View style={styles.rewardsContainer}>
          <Text
            style={[styles.rewardText, isDark && darkTheme.habits.rewardText]}
          >
            XP {habit.xp}
          </Text>
          <Text
            style={[styles.rewardText, isDark && darkTheme.habits.rewardText]}
          >
            GOLD {habit.gold}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  habitName: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginLeft: scale(10),
    color: "#333",
    flex: 1,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayWrapper: {
    alignItems: "center",
  },
  dayLabel: {
    fontSize: RFValue(12),
    color: "#888",
    marginBottom: verticalScale(5),
  },
  dayBox: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(8),
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  dayBoxCompleted: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  dayBoxToday: {
    borderColor: "#3498db",
  },
  rewardsContainer: {
    flexDirection: "row",
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: scale(15),
  },
  rewardText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#27ae60",
  },
  dayBoxDisabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
    opacity: 0.5,
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(70),
    height: "100%",
    borderRadius: moderateScale(15),
    marginLeft: scale(10),
  },
  deleteAction: {
    backgroundColor: "#e74c3c",
  },
  editAction: {
    backgroundColor: "#f39c12",
  },
});
