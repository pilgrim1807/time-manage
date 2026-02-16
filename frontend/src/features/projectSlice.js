import { createSlice } from '@reduxjs/toolkit';

// исходное состояние
const initialState = {
  projects: [],
  isLoading: false,
  activeProject: null,
  timerRunning: false,
};

// slice
const projectsSlice = createSlice({
  name: 'projects',
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
    }
  }
});

export const { setProjects, setLoading, startTimer, stopTimer } = projectsSlice.actions;

export default projectsSlice.reducer;

// доп логика, например, для загрузки проектов
export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "x-auth-token": token ?? "",
      },
    });

    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status}: ${bodyText}`);
    }

    const data = await response.json();
    dispatch(setProjects(data));  // данные отправляються в store
  } catch (error) {
    console.error("Ошибка при загрузке проектов:", error);
  } finally {
    dispatch(setLoading(false));  // конец загрузки
  }
};
