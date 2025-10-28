import { Task, useTaskStore } from "@/src/stores/task/taskStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import TaskCard from "./TaskCard";

export default function Kanban() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const {
    lists,
    tasks,
    activeListId,
    setActiveListId,
    deleteTask,
    deleteList,
    reorderTasks,
    isEditModalVisible,
    toggleEditModal,
    taskToEdit,
    openModal,
  } = useTaskStore();

  const tasksInSelectedList = tasks.filter(
    (task) => task.listId === activeListId
  );

  const handleDeleteList = (listId: string, listTitle: string) => {
    Alert.alert(
      t("tasks.deleteListConfirmTitle"),
      t("tasks.deleteListConfirmMessage", { listTitle }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          onPress: () => deleteList(listId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      t("tasks.deleteTaskConfirmTitle"),
      t("tasks.deleteTaskConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          onPress: () => deleteTask(taskId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditTask = (task: Task) => {
    toggleEditModal(task);
  };

  const handleReorder = ({ data }: { data: Task[] }) => {
    if (activeListId) {
      reorderTasks(activeListId, data);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        style={{
          backgroundColor: isActive
            ? isDark
              ? "#333"
              : "#eee"
            : "transparent",
        }}
        disabled={isActive}
      >
        <TaskCard
          task={item}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </TouchableOpacity>
    );
  };

  const handleAddList = () => {
    openModal("addList");
  };

  return (
    <NestableScrollContainer>
      <ScrollView
        style={styles.kanbanContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.listSelectorContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {lists.map((list) => (
              <TouchableOpacity
                key={list.id}
                style={[
                  styles.listButton,
                  isDark && darkTheme.tasks.listButton,
                  activeListId === list.id &&
                    (isDark
                      ? darkTheme.tasks.listButtonSelected
                      : styles.listButtonSelected),
                ]}
                onPress={() => setActiveListId(list.id)}
                onLongPress={() => handleDeleteList(list.id, list.title)}
              >
                <Text
                  style={[
                    styles.listButtonText,
                    isDark && darkTheme.tasks.listButtonText,
                    activeListId === list.id &&
                      (isDark
                        ? darkTheme.tasks.listButtonTextSelected
                        : styles.listButtonTextSelected),
                  ]}
                >
                  {list.title}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.addListButton}
              onPress={handleAddList}
            >
              <Text style={styles.addListButtonText}>
                + {t("tasks.newList")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {activeListId ? (
          <NestableDraggableFlatList
            data={tasksInSelectedList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={handleReorder}
            ListEmptyComponent={() => (
              <View style={styles.emptyStateContainer}>
                <Image
                  source={require("@/src/assets/icons/preocurandoTask.png")}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
                <Text style={[styles.emptyStateText, isDark && darkTheme.text]}>
                  {t("tasks.emptyListTitle")}
                </Text>
                <Text
                  style={[
                    styles.emptyStateSubText,
                    isDark && darkTheme.subtext,
                  ]}
                >
                  {t("tasks.emptyListSubtitle")}
                </Text>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require("@/src/assets/icons/preocurandoTask.png")}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />
            <Text style={[styles.emptyStateText, isDark && darkTheme.text]}>
              {t("tasks.noListsTitle")}
            </Text>
            <Text
              style={[styles.emptyStateSubText, isDark && darkTheme.subtext]}
            >
              {t("tasks.noListsSubtitle")}
            </Text>
          </View>
        )}

        <EditTaskModal
          isVisible={isEditModalVisible}
          onClose={() => toggleEditModal(null)}
          taskToEdit={taskToEdit}
        />
      </ScrollView>
    </NestableScrollContainer>
  );
}
const styles = StyleSheet.create({
  kanbanContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContentContainer: {
    paddingBottom: 150,
    flexGrow: 1,
  },
  listSelectorContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 5,
    paddingTop: 20,
  },
  listButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#F5F2F5",
  },
  listButtonSelected: {
    backgroundColor: "#939295",
  },
  listButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  listButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  addListButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#ADD8E6",
    backgroundColor: "#E0F2F7",
  },
  addListButtonText: {
    color: "#4682B4",
    fontWeight: "bold",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  emptyStateSubText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 8,
    textAlign: "center",
  },
});
