import API from "./api";

export const getOpportunities = async () => {
  const { data } = await API.get("/opportunities");
  return data;
};

export const getOpportunity = async (id) => {
  const { data } = await API.get(
    `/opportunities/${id}`
  );

  return data;
};