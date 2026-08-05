import API from "./api";

export const login = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};