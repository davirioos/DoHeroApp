// src/screen/home/habits/index.tsx
import AddHabitModal from "@/src/components/AddHabitModal/AddHabitModal";
import EditHabitModal from "@/src/components/EditHabitModal/EditHabitModal";
import FloatingActionButton from "@/src/components/FloatingActionButton/FloatingActionButton";
import HabitCardGeral from "@/src/components/habits/HabitCardGeral";
import HabitCardSemanal from "@/src/components/habits/HabitCardSemanal";
import { Habit, useHabitStore } from "@/src/stores/habit/habitStore";
import React, { useState } from "react";
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

// Funções auxiliares de data
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
  return newDate;
};
const daysBetween = (date1: Date, date2: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay) + 1;
};

export default function HabitsGamificado() {
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
      "Confirmar Exclusão",
      "Tem certeza que deseja deletar este hábito? Todo o seu progresso será perdido.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => deleteHabit(habitId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hábitos</Text>
      </View>
      {habits.length > 0 && (
        <>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                view === "semanal" && styles.toggleButtonActive,
              ]}
              onPress={() => setView("semanal")}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === "semanal" && styles.toggleTextActive,
                ]}
              >
                Semanalmente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                view === "geral" && styles.toggleButtonActive,
              ]}
              onPress={() => setView("geral")}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === "geral" && styles.toggleTextActive,
                ]}
              >
                Geral
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            {view === "semanal" ? (
              <>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {habitosConcluidosSemana}
                  </Text>
                  <Text style={styles.statLabel}>Concluídos na Semana</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{taxaDeSucessoSemanal}%</Text>
                  <Text style={styles.statLabel}>Taxa de Sucesso (Semana)</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{habitosConcluidosGeral}</Text>
                  <Text style={styles.statLabel}>Concluídos (Geral)</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{taxaDeSucessoGeral}%</Text>
                  <Text style={styles.statLabel}>Taxa de Sucesso (Geral)</Text>
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
                  key={habit.id} // ✅ key só aqui
                  habit={habit}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                />
              ))}
            {view === "geral" &&
              habits.map((habit) => (
                <HabitCardGeral
                  key={habit.id} // ✅ key só aqui
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
            <Text style={styles.emptyStateText}>Construa um novo Hábito!</Text>
            <Text style={styles.emptyStateSubText}>
              Clique no botão '+' para começar a monitorar seus hábitos.
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
