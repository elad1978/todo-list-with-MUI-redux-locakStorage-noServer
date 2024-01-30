// reducers/index.js
import { createSlice } from "@reduxjs/toolkit";

const TASK_STORAGE_KEY = "tasks";

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasksFromLocalStorage(),
    sortBool: true,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    sortByUrgency: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) => sortOrder * (a.urgency - b.urgency)
      );
      state.sortBool = !state.sortBool;
      saveTasksToLocalStorage(state.tasks);
    },
    sortByDate: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) => sortOrder * (new Date(a.date) - new Date(b.date))
      );
      state.sortBool = !state.sortBool;
      saveTasksToLocalStorage(state.tasks);
    },
    sortByCheckboxStatus: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) =>
          sortOrder * ((a.isCheckedTask ? -1 : 1) - (b.isCheckedTask ? -1 : 1))
      );
      state.sortBool = !state.sortBool;
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleSort,
  setSortType,
  sortByUrgency,
  sortByDate,
  sortByCheckboxStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
