import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  isLoading: false,
  activeProject: null,  // Это будет отслеживать активный проект
  timerRunning: false,  // Это будет отслеживать состояние таймера
};

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
      state.activeProject = action.payload; // Установка проекта как активного
      state.timerRunning = true; // Запуск таймера
    },
    stopTimer(state) {
      state.activeProject = null; // Сбрасываем активный проект
      state.timerRunning = false; // Останавливаем таймер
    }
  }
});

// Экспортируем действия
export const { setProjects, setLoading, startTimer, stopTimer } = projectsSlice.actions;

// Экспортируем редюсер
export default projectsSlice.reducer;

// Функции для работы с проектами
export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    dispatch(setProjects(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};


