// src/components/habits/HabitCardGeral.tsx
import { Habit } from "@/src/stores/habit/habitStore";
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

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const formatDateToYyyyMmDd = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MonthGrid = ({
  year,
  month,
  completedDays,
}: {
  year: number;
  month: number;
  completedDays: string[];
}) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    grid.push(<View key={`empty-${i}`} style={styles.dayCell} />);
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = formatDateToYyyyMmDd(date);
    const isCompleted = completedDays.includes(dateString);

    grid.push(
      <View
        key={day}
        style={[styles.dayCell, isCompleted && styles.dayCellCompleted]}
      />
    );
  }

  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthLabel}>{monthNames[month]}</Text>
      <View style={styles.gridContainer}>{grid}</View>
    </View>
  );
};

export default function HabitCardGeral({ habit, onEdit, onDelete }: Props) {
  const today = new Date();
  const monthsToDisplay = [];

  for (let i = 0; i < 4; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    monthsToDisplay.push({ year: date.getFullYear(), month: date.getMonth() });
  }
  monthsToDisplay.reverse();

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

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <Ionicons
            name={habit.icon as any}
            size={moderateScale(24)}
            color="#555"
          />
          <Text style={styles.habitName}>{habit.nome}</Text>
          <Text style={styles.totalText}>
            {habit.diasCompletos.length} Total
          </Text>
        </View>
        <View style={styles.monthsWrapper}>
          {monthsToDisplay.map(({ year, month }) => (
            <MonthGrid
              key={`${year}-${month}`}
              year={year}
              month={month}
              completedDays={habit.diasCompletos}
            />
          ))}
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
    flex: 1, // <<< --- CORREÇÃO AQUI
  },
  totalText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#888",
    marginLeft: scale(10), // Adiciona um espaço
  },
  monthsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  monthContainer: {
    alignItems: "flex-start",
    marginBottom: verticalScale(10),
    width: "23%",
  },
  monthLabel: {
    fontSize: RFValue(12),
    color: "#888",
    marginBottom: verticalScale(5),
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 7 * moderateScale(10),
  },
  dayCell: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(2),
    backgroundColor: "#ebedf0",
    margin: moderateScale(1),
  },
  dayCellCompleted: {
    backgroundColor: "#2ECC71",
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
