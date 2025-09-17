// src/components/kanban/TaskCard.tsx
import { Task, useTaskStore } from "@/src/stores/task/taskStore";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
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

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

// **A LÓGICA DE VERIFICAÇÃO FINAL E CORRETA**
const isOverdue = (isoDateString: string) => {
  const dueDate = new Date(isoDateString);
  if (isNaN(dueDate.getTime())) {
    return false;
  }
  const now = new Date();

  // Compara o número total de minutos desde a Epoch.
  // Isto ignora segundos e milissegundos, resolvendo o problema de precisão.
  const totalMinutesInDueDate = Math.floor(dueDate.getTime() / 60000);
  const totalMinutesInNow = Math.floor(now.getTime() / 60000);

  // A tarefa só está atrasada se o minuto atual for estritamente maior
  // que o minuto de vencimento.
  return totalMinutesInNow > totalMinutesInDueDate;
};

const mapClassToStars = (taskClass: string) => {
  switch (taskClass) {
    case "C":
      return 1;
    case "B":
      return 2;
    case "A":
      return 3;
    case "A+":
      return 4;
    case "SS":
      return 5;
    default:
      return 0;
  }
};

const StarRating = ({ rating }: { rating: number }) => (
  <View style={styles.starContainer}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name="star"
        size={moderateScale(14)}
        color={index < rating ? "#FFC700" : "#E0E0E0"}
      />
    ))}
  </View>
);

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { completeTask } = useTaskStore();
  const swipeableRef = useRef<Swipeable>(null);

  const handleComplete = () => {
    completeTask(task.id);
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActionsContainer}>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={[styles.rightAction, styles.deleteAction]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesome5 name="trash" size={moderateScale(20)} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onEdit(task)}
          style={[styles.rightAction, styles.editAction]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesome5 name="edit" size={moderateScale(20)} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const overdue = isOverdue(task.data);
  const isCompleted = task.status === "completed";

  // Lê a data do formato ISO e formata para exibição
  const formattedDate = new Date(task.data)
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " às");

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
    >
      <View style={[styles.card, isCompleted && styles.completedCard]}>
        <TouchableOpacity onPress={handleComplete}>
          <View
            style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
          >
            {isCompleted && (
              <Ionicons
                name="checkmark"
                size={moderateScale(22)}
                color="white"
              />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <Text
              style={[
                styles.dateText,
                overdue && !isCompleted && styles.dateTextOverdue,
              ]}
            >
              <Ionicons
                name="time-outline"
                size={moderateScale(12)}
                color={overdue && !isCompleted ? "#E74C3C" : "#aaa"}
              />{" "}
              {formattedDate}
            </Text>
            <StarRating rating={mapClassToStars(task.class)} />
          </View>

          <Text style={styles.title}>{task.title}</Text>
          {task.description.length > 0 && (
            <Text style={styles.description} numberOfLines={2}>
              {task.description}
            </Text>
          )}

          <View style={styles.rewardsContainer}>
            <View style={[styles.rewardTag, styles.xpTag]}>
              <Text style={styles.rewardText}>XP {task.xp}</Text>
            </View>
            <View style={[styles.rewardTag, styles.goldTag]}>
              <Ionicons
                name="logo-bitcoin"
                size={moderateScale(14)}
                color="#B8860B"
              />
              <Text style={styles.rewardText}> {task.gold}</Text>
            </View>
          </View>
        </View>
        {!isCompleted && (
          <View style={styles.swipeIndicatorContainer}>
            <Ionicons
              name="reorder-three-outline"
              size={moderateScale(24)}
              color="#ccc"
            />
          </View>
        )}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
    marginVertical: verticalScale(8),
    marginHorizontal: scale(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  completedCard: {
    backgroundColor: "#F8F8F8",
    opacity: 0.6,
  },
  checkbox: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(8),
    borderWidth: 2,
    borderColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(15),
  },
  checkboxCompleted: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  contentContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(5),
  },
  dateText: {
    fontSize: RFValue(12),
    color: "#aaa",
  },
  dateTextOverdue: {
    color: "#E74C3C",
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: RFValue(14),
    color: "#888",
    marginBottom: verticalScale(5),
  },
  rewardsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  rewardTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(6),
  },
  xpTag: {
    backgroundColor: "#2ECC71",
  },
  goldTag: {
    backgroundColor: "#E6C406",
  },
  rewardText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#fff",
  },
  swipeIndicatorContainer: {
    justifyContent: "center",
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(8),
    marginRight: scale(5),
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(60),
    height: "100%",
    borderRadius: moderateScale(15),
    marginLeft: scale(5),
  },
  deleteAction: {
    backgroundColor: "#FF3B30",
  },
  editAction: {
    backgroundColor: "#FF9500",
  },
});
