import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  projects: [],
  isLoading: false,
  activeProject: null,
  timerRunning: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    startTimer(state, action) {
      state.activeProject = action.payload;
      state.timerRunning = true;
    },
    stopTimer(state) {
      state.activeProject = null;
      state.timerRunning = false;
    },
  },
});

export const { setProjects, setLoading, startTimer, stopTimer } =
  projectsSlice.actions;

export default projectsSlice.reducer;

export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("/projects", {
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });

    dispatch(setProjects(response.data));
  } catch (error) {
    console.error("Ошибка загрузки проектов:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

