import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import i18n from "../../locales/i18n"; // Importação direta
import { useAchievementsStore } from "../achievementsStore/achievementsStore";
import { useBossStore } from "../bossStore/bossStore";
import { usePlayerStore } from "../playerStore/playerStore";

// ... (interfaces Task, TaskList, etc. continuam iguais)
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
              text1: i18n.t("tasks.noListError"),
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
          Toast.show({
            type: "success",
            text1: i18n.t("tasks.taskAddedSuccess"),
          });
        });
      },

      addList: (title) => {
        set((state) => {
          const newList: TaskList = { id: new Date().toISOString(), title };
          state.lists.push(newList);
          state.activeListId = newList.id;
          Toast.show({
            type: "success",
            text1: i18n.t("tasks.listCreatedSuccess"),
          });
        });
      },

      completeTask: (taskId) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (!task) return;

          const isOverdue = new Date(task.data) < new Date();

          if (task.status === "pending") {
            task.status = "completed";

            if (isOverdue) {
              const xpPenalty = Math.round(task.xp * 0.5);
              const goldPenalty = Math.round(task.gold * 0.5);
              usePlayerStore.getState().removeXp(xpPenalty);
              usePlayerStore.getState().removeGold(goldPenalty);
              Toast.show({
                type: "error",
                text1: i18n.t("tasks.overdueTask"),
                text2: i18n.t("tasks.overduePenalty", {
                  xp: xpPenalty,
                  gold: goldPenalty,
                }),
              });
            } else {
              usePlayerStore.getState().addXp(task.xp);
              usePlayerStore.getState().addGold(task.gold);
              useBossStore.getState().dealDamage(task.xp);
              Toast.show({
                type: "success",
                text1: i18n.t("tasks.title"),
                text2: `Você ganhou ${task.xp} XP e ${task.gold} de Ouro.`,
              });
            }
          } else if (task.status === "completed") {
            task.status = "pending";
            if (isOverdue) {
              const xpPenalty = Math.round(task.xp * 0.5);
              const goldPenalty = Math.round(task.gold * 0.5);
              usePlayerStore.getState().addXp(xpPenalty);
              usePlayerStore.getState().addGold(goldPenalty);
            } else {
              usePlayerStore.getState().removeXp(task.xp);
              usePlayerStore.getState().removeGold(task.gold);
            }
          }
        });
        get().checkReiDasTarefas();
        useAchievementsStore.getState().checkAventureiro();
      },
      // ... (restante do store permanece igual)
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
              // Apenas muda o status visualmente para 'failed', sem aplicar penalidade aqui.
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
