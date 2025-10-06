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
          if (!task) return;

          const isOverdue = new Date(task.data) < new Date();

          // Se a tarefa está pendente...
          if (task.status === "pending") {
            task.status = "completed"; // Marca como concluída em ambos os casos.

            // Se estiver atrasada, aplica a penalidade.
            if (isOverdue) {
              const xpPenalty = Math.round(task.xp * 0.5);
              const goldPenalty = Math.round(task.gold * 0.5);
              usePlayerStore.getState().removeXp(xpPenalty);
              usePlayerStore.getState().removeGold(goldPenalty);
              Toast.show({
                type: "error",
                text1: `Tarefa "${task.title}" concluída com atraso!`,
                text2: `Você perdeu ${xpPenalty} XP e ${goldPenalty} Ouro.`,
              });
            } else {
              // Se estiver dentro do prazo, concede as recompensas.
              usePlayerStore.getState().addXp(task.xp);
              usePlayerStore.getState().addGold(task.gold);
              useBossStore.getState().dealDamage(task.xp);
              Toast.show({
                type: "success",
                text1: "Missão Concluída!",
                text2: `Você ganhou ${task.xp} XP e ${task.gold} de Ouro.`,
              });
            }
          } else if (task.status === "completed") {
            // Se já estava concluída, reverte para pendente e remove as recompensas (ou a penalidade)
            task.status = "pending";
            if (isOverdue) {
              // Se estava atrasada, devolve a penalidade
              const xpPenalty = Math.round(task.xp * 0.5);
              const goldPenalty = Math.round(task.gold * 0.5);
              usePlayerStore.getState().addXp(xpPenalty);
              usePlayerStore.getState().addGold(goldPenalty);
            } else {
              // Se não estava atrasada, remove as recompensas ganhas
              usePlayerStore.getState().removeXp(task.xp);
              usePlayerStore.getState().removeGold(task.gold);
            }
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
