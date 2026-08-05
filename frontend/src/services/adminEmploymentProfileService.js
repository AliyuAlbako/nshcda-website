import API from "./api";

export const getEmploymentProfiles = async () => {
  const { data } = await API.get("/employment-profiles");
  return data;
};

export const deleteEmploymentProfile = async (id) => {
  const { data } = await API.delete(`/employment-profiles/${id}`);
  return data;
};