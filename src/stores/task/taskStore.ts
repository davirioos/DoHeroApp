// src/stores/task/taskStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useAchievementsStore } from "../achievementsStore/achievementsStore";
import { useBossStore } from "../bossStore/bossStore";
import { usePlayerStore } from "../playerStore/playerStore";

export type TaskStatus = "pending" | "completed" | "failed";
export interface Task {
  id: string;
  title: string;
  description: string;
  data: string;
  class: string;
  xp: number;
  gold: number;
  status: TaskStatus;
  listId: string;
}
export interface TaskList {
  id: string;
  title: string;
}
type TaskInput = Omit<Task, "id" | "status" | "listId">;
type TaskEditInput = Partial<Omit<Task, "id" | "listId" | "status">>;
interface TaskState {
  tasks: Task[];
  lists: TaskList[];
  isModalVisible: boolean;
  isEditModalVisible: boolean;
  taskToEdit: Task | null;
  activeListId: string | null;
  modalView: "options" | "addTask" | "addList";
  addTask: (newTaskData: TaskInput) => void;
  addList: (title: string) => void;
  editTask: (taskId: string, updatedData: TaskEditInput) => void;
  deleteTask: (taskId: string) => void;
  deleteList: (listId: string) => void;
  reorderTasks: (listId: string, orderedTasks: Task[]) => void;
  openModal: (view?: "options" | "addTask" | "addList") => void;
  closeModal: () => void;
  toggleEditModal: (task?: Task | null) => void;
  completeTask: (taskId: string) => void;
  setActiveListId: (listId: string | null) => void;
  checkOverdueTasks: () => void;
  checkReiDasTarefas: () => void;
  reset: () => void;
}

const initialState = {
  tasks: [],
  lists: [],
  isModalVisible: false,
  isEditModalVisible: false,
  taskToEdit: null,
  activeListId: null,
  modalView: "options" as "options" | "addTask" | "addList",
};

export const useTaskStore = create<TaskState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      addTask: (newTaskData) => {
        set((state) => {
          if (!state.activeListId) {
            Toast.show({
              type: "error",
              text1: "Selecione uma lista primeiro!",
            });
            return;
          }
          const newTask: Task = {
            ...newTaskData,
            id: new Date().toISOString(),
            status: "pending",
            listId: state.activeListId,
          };
          state.tasks.push(newTask);
          Toast.show({ type: "success", text1: "Missão adicionada!" });
        });
      },

      addList: (title) => {
        set((state) => {
          const newList: TaskList = { id: new Date().toISOString(), title };
          state.lists.push(newList);
          state.activeListId = newList.id; // Seleciona a nova lista automaticamente
          Toast.show({ type: "success", text1: "Lista criada!" });
        });
      },

      completeTask: (taskId) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (!task || task.status === "failed") return;

          if (task.status === "pending") {
            task.status = "completed";
            usePlayerStore.getState().addXp(task.xp);
            usePlayerStore.getState().addGold(task.gold);
            useBossStore.getState().dealDamage(task.xp);
          } else {
            task.status = "pending";
            usePlayerStore.getState().removeXp(task.xp);
            usePlayerStore.getState().removeGold(task.gold);
          }
        });
        get().checkReiDasTarefas();
        useAchievementsStore.getState().checkAventureiro();
      },

      deleteList: (listId) => {
        set((state) => {
          state.lists = state.lists.filter((list) => list.id !== listId);
          state.tasks = state.tasks.filter((task) => task.listId !== listId);
          if (state.activeListId === listId) {
            state.activeListId =
              state.lists.length > 0 ? state.lists[0].id : null;
          }
        });
      },

      editTask: (taskId, updatedData) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (task) Object.assign(task, updatedData);
        });
      },

      deleteTask: (taskId) => {
        set((state) => {
          state.tasks = state.tasks.filter((task) => task.id !== taskId);
        });
      },

      reorderTasks: (listId, orderedTasks) => {
        set((state) => {
          const otherTasks = state.tasks.filter(
            (task) => task.listId !== listId
          );
          state.tasks = [...otherTasks, ...orderedTasks];
        });
      },

      setActiveListId: (listId) => set({ activeListId: listId }),

      checkOverdueTasks: () => {
        set((state) => {
          const now = new Date();
          state.tasks.forEach((task) => {
            if (task.status === "pending" && new Date(task.data) < now) {
              task.status = "failed";
            }
          });
        });
      },

      openModal: (view = "options") =>
        set({ isModalVisible: true, modalView: view }),
      closeModal: () => set({ isModalVisible: false }),
      toggleEditModal: (task = null) =>
        set((state) => ({
          isEditModalVisible: !state.isEditModalVisible,
          taskToEdit: task,
        })),

      checkReiDasTarefas: () => {
        // Implementar lógica se necessário
      },

      reset: () => set(initialState),
    })),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
