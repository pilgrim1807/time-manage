import { setLoading, setProjects, setError } from '../features/projectSlice'; // импорт необходимых экшенов

export const fetchProjects = (page) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`/api/projects?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token ?? "",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    dispatch(setProjects({ projects: data.projects, totalPages: data.totalPages }));
  } catch (error) {
    dispatch(setError(error.message)); // обработка ошибки
    console.error(error);
  } finally {
    dispatch(setLoading(false)); // конец загрузки
  }
};
