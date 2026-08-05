import API from "./api";

export const createEmploymentProfile = async (formData) => {
  const { data } = await API.post(
    "/employment-profiles",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};