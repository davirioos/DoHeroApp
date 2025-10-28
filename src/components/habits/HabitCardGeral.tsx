import { Habit } from "@/src/stores/habit/habitStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    grid.push(
      <React.Fragment key={`empty-${i}`}>
        <View
          style={[styles.dayCell, isDark && { backgroundColor: "#2C2C2C" }]}
        />
      </React.Fragment>
    );
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = formatDateToYyyyMmDd(date);
    const isCompleted = completedDays.includes(dateString);

    grid.push(
      <React.Fragment key={day}>
        <View
          style={[
            styles.dayCell,
            isDark && { backgroundColor: "#2C2C2C" },
            isCompleted && styles.dayCellCompleted,
          ]}
        />
      </React.Fragment>
    );
  }

  return (
    <View style={styles.monthContainer}>
      <Text style={[styles.monthLabel, isDark && darkTheme.habits.dayLabel]}>
        {monthNames[month]}
      </Text>
      <View style={styles.gridContainer}>{grid}</View>
    </View>
  );
};

export default function HabitCardGeral({ habit }: Props) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const creationDate = new Date(habit.id);
  const today = new Date();
  const monthsToDisplay = [];

  let currentDate = new Date(
    creationDate.getFullYear(),
    creationDate.getMonth(),
    1
  );

  while (currentDate <= today) {
    monthsToDisplay.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  let lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
  while (monthsToDisplay.length < 4) {
    lastMonthDate.setMonth(lastMonthDate.getMonth() + 1);
    monthsToDisplay.push({
      year: lastMonthDate.getFullYear(),
      month: lastMonthDate.getMonth(),
    });
  }

  return (
    <View
      style={[styles.cardContainer, isDark && darkTheme.habits.cardContainer]}
    >
      <View style={styles.header}>
        <Ionicons
          name={habit.icon as any}
          size={moderateScale(24)}
          color={isDark ? "#FFF" : "#555"}
        />
        <Text style={[styles.habitName, isDark && darkTheme.habits.habitName]}>
          {habit.nome}
        </Text>
        <Text style={styles.totalText}>
          {t("habits.totalCompleted", { count: habit.diasCompletos.length })}
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </ScrollView>
    </View>
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
  totalText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#888",
    marginLeft: scale(10),
  },
  monthsWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  monthContainer: {
    alignItems: "flex-start",
    marginBottom: verticalScale(10),
    marginRight: scale(10),
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
});
