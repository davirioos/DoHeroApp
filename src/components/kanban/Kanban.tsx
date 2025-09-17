// src/components/kanban/Kanban.tsx
import { Task, useTaskStore } from "@/src/stores/task/taskStore";
import React from "react";
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
  const {
    lists,
    tasks,
    activeListId, // Usar o estado global diretamente
    setActiveListId,
    deleteTask,
    deleteList,
    reorderTasks,
    isEditModalVisible,
    toggleEditModal,
    taskToEdit,
    openModal,
  } = useTaskStore();

  // Filtra as tarefas com base no activeListId do store
  const tasksInSelectedList = tasks.filter(
    (task) => task.listId === activeListId
  );

  const handleDeleteList = (listId: string, listTitle: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja deletar a lista "${listTitle}"? Todas as suas tarefas serão perdidas permanentemente.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => deleteList(listId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja deletar esta missão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
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
        style={{ backgroundColor: isActive ? "#eee" : "transparent" }}
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
                  // A classe de selecionado agora é baseada no activeListId
                  activeListId === list.id && styles.listButtonSelected,
                ]}
                // O clique agora atualiza o estado global
                onPress={() => setActiveListId(list.id)}
                onLongPress={() => handleDeleteList(list.id, list.title)}
              >
                <Text
                  style={[
                    styles.listButtonText,
                    activeListId === list.id && styles.listButtonTextSelected,
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
              <Text style={styles.addListButtonText}>+ Nova Lista</Text>
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
                <Text style={styles.emptyStateText}>Nenhuma missão aqui!</Text>
                <Text style={styles.emptyStateSubText}>
                  Clique no botão '+' abaixo para adicionar uma nova missão a
                  esta lista.
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
            <Text style={styles.emptyStateText}>Nenhuma lista de missões!</Text>
            <Text style={styles.emptyStateSubText}>
              Crie sua primeira lista clicando em '+ Nova Lista' acima para
              organizar suas missões.
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
