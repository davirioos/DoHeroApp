import AddHabitModal from "@/src/components/AddHabitModal/AddHabitModal";
import EditHabitModal from "@/src/components/EditHabitModal/EditHabitModal";
import FloatingActionButton from "@/src/components/FloatingActionButton/FloatingActionButton";
import HabitCardGeral from "@/src/components/habits/HabitCardGeral";
import HabitCardSemanal from "@/src/components/habits/HabitCardSemanal";
import { Habit, useHabitStore } from "@/src/stores/habit/habitStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

const formatDateToYyyyMmDd = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getStartOfWeek = (date: Date) => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(diff);
  return newDate;
};
const daysBetween = (date1: Date, date2: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay) + 1;
};

export default function HabitsGamificado() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const {
    habits,
    toggleModal,
    deleteHabit,
    toggleEditModal,
    isEditModalVisible,
    habitToEdit,
  } = useHabitStore();
  const [view, setView] = useState<"semanal" | "geral">("semanal");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfWeek = getStartOfWeek(today);
  const todayFormatted = formatDateToYyyyMmDd(today);
  const startOfWeekFormatted = formatDateToYyyyMmDd(startOfWeek);

  const habitosConcluidosSemana = habits.reduce(
    (count, habit) =>
      count +
      habit.diasCompletos.filter(
        (dateStr) =>
          dateStr >= startOfWeekFormatted && dateStr <= todayFormatted
      ).length,
    0
  );

  const totalPossivelNaSemana = habits.reduce((total, habit) => {
    const creationDate = new Date(habit.id);
    creationDate.setHours(0, 0, 0, 0);
    const effectiveStartDate =
      creationDate > startOfWeek ? creationDate : startOfWeek;
    if (effectiveStartDate > today) {
      return total;
    }
    const diasAtivosNaSemana = daysBetween(effectiveStartDate, today);
    return total + diasAtivosNaSemana;
  }, 0);

  const taxaDeSucessoSemanal =
    totalPossivelNaSemana > 0
      ? Math.round((habitosConcluidosSemana / totalPossivelNaSemana) * 100)
      : 0;

  const habitosConcluidosGeral = habits.reduce(
    (count, habit) => count + habit.diasCompletos.length,
    0
  );

  const taxaDeSucessoGeral = (() => {
    const totalPossivelGeral = habits.reduce((total, habit) => {
      const creationDate = new Date(habit.id);
      creationDate.setHours(0, 0, 0, 0);
      if (creationDate > today) {
        return total;
      }
      const diasAtivos = daysBetween(creationDate, today);
      return total + diasAtivos;
    }, 0);
    return totalPossivelGeral > 0
      ? Math.round((habitosConcluidosGeral / totalPossivelGeral) * 100)
      : 0;
  })();

  const handleEditHabit = (habit: Habit) => {
    toggleEditModal(habit);
  };

  const handleDeleteHabit = (habitId: string) => {
    Alert.alert(
      t("habits.deleteConfirmTitle"),
      t("habits.deleteConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          onPress: () => deleteHabit(habitId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, isDark && darkTheme.habits.container]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isDark && darkTheme.habits.title]}>
          {t("habits.title")}
        </Text>
      </View>
      {habits.length > 0 && (
        <>
          <View
            style={[
              styles.toggleContainer,
              isDark && darkTheme.habits.toggleContainer,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.toggleButton,
                view === "semanal" &&
                  (isDark
                    ? darkTheme.habits.toggleButtonActive
                    : styles.toggleButtonActive),
              ]}
              onPress={() => setView("semanal")}
            >
              <Text
                style={[
                  styles.toggleText,
                  isDark && darkTheme.habits.toggleText,
                  view === "semanal" &&
                    (isDark
                      ? darkTheme.habits.toggleTextActive
                      : styles.toggleTextActive),
                ]}
              >
                {t("habits.weekly")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                view === "geral" &&
                  (isDark
                    ? darkTheme.habits.toggleButtonActive
                    : styles.toggleButtonActive),
              ]}
              onPress={() => setView("geral")}
            >
              <Text
                style={[
                  styles.toggleText,
                  isDark && darkTheme.habits.toggleText,
                  view === "geral" &&
                    (isDark
                      ? darkTheme.habits.toggleTextActive
                      : styles.toggleTextActive),
                ]}
              >
                {t("habits.general")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            {view === "semanal" ? (
              <>
                <View
                  style={[styles.statBox, isDark && darkTheme.habits.statBox]}
                >
                  <Text
                    style={[
                      styles.statValue,
                      isDark && darkTheme.habits.statValue,
                    ]}
                  >
                    {habitosConcluidosSemana}
                  </Text>
                  <Text
                    style={[
                      styles.statLabel,
                      isDark && darkTheme.habits.statLabel,
                    ]}
                  >
                    {t("habits.completedWeek")}
                  </Text>
                </View>
                <View
                  style={[styles.statBox, isDark && darkTheme.habits.statBox]}
                >
                  <Text
                    style={[
                      styles.statValue,
                      isDark && darkTheme.habits.statValue,
                    ]}
                  >
                    {taxaDeSucessoSemanal}%
                  </Text>
                  <Text
                    style={[
                      styles.statLabel,
                      isDark && darkTheme.habits.statLabel,
                    ]}
                  >
                    {t("habits.successRateWeek")}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={[styles.statBox, isDark && darkTheme.habits.statBox]}
                >
                  <Text
                    style={[
                      styles.statValue,
                      isDark && darkTheme.habits.statValue,
                    ]}
                  >
                    {habitosConcluidosGeral}
                  </Text>
                  <Text
                    style={[
                      styles.statLabel,
                      isDark && darkTheme.habits.statLabel,
                    ]}
                  >
                    {t("habits.completedGeneral")}
                  </Text>
                </View>
                <View
                  style={[styles.statBox, isDark && darkTheme.habits.statBox]}
                >
                  <Text
                    style={[
                      styles.statValue,
                      isDark && darkTheme.habits.statValue,
                    ]}
                  >
                    {taxaDeSucessoGeral}%
                  </Text>
                  <Text
                    style={[
                      styles.statLabel,
                      isDark && darkTheme.habits.statLabel,
                    ]}
                  >
                    {t("habits.successRateGeneral")}
                  </Text>
                </View>
              </>
            )}
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={styles.habitList}>
        {habits.length > 0 ? (
          <>
            {view === "semanal" &&
              habits.map((habit) => (
                <HabitCardSemanal
                  key={habit.id}
                  habit={habit}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                />
              ))}
            {view === "geral" &&
              habits.map((habit) => (
                <HabitCardGeral
                  key={habit.id}
                  habit={habit}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                />
              ))}
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require("@/src/assets/icons/preocurandoTask.png")}
              style={{ width: scale(250), height: verticalScale(250) }}
              resizeMode="contain"
            />
            <Text style={[styles.emptyStateText, isDark && darkTheme.text]}>
              {t("habits.emptyStateTitle")}
            </Text>
            <Text
              style={[styles.emptyStateSubText, isDark && darkTheme.subtext]}
            >
              {t("habits.emptyStateSubtitle")}
            </Text>
          </View>
        )}
      </ScrollView>

      <AddHabitModal />
      <EditHabitModal
        isVisible={isEditModalVisible}
        onClose={() => toggleEditModal(null)}
        habitToEdit={habitToEdit}
      />
      <FloatingActionButton onPress={toggleModal} />
      <Toast />
    </SafeAreaView>
  );
}
