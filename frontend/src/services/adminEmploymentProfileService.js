import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getEmploymentProfiles = async () => {
  const response = await API.get("/employment-profiles");
  return response.data;
};

export const deleteEmploymentProfile = async (id) => {
  const response = await API.delete(`/employment-profiles/${id}`);
  return response.data;
};