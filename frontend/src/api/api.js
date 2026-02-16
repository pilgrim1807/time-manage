import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// запрос с использованием api:
export const getProjects = async () => {
  const response = await api.get("/projects", {
    headers: {
      "x-auth-token": localStorage.getItem("authToken"),
    },
  });
  return response.data;
};
