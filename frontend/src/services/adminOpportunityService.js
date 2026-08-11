import API from "./api";

// Get all opportunities
export const getOpportunities = async () => {
  const { data } = await API.get("/opportunities");
  return data;
};

// Get a single opportunity
export const getOpportunity = async (id) => {
  const { data } = await API.get(`/opportunities/${id}`);
  return data;
};

// Create an opportunity
export const createOpportunity = async (opportunityData) => {
  const { data } = await API.post(
    "/opportunities",
    opportunityData
  );
  return data;
};

// Update an opportunity
export const updateOpportunity = async (id, opportunityData) => {
  const { data } = await API.put(
    `/opportunities/${id}`,
    opportunityData
  );
  return data;
};

// Delete an opportunity
export const deleteOpportunity = async (id) => {
  const { data } = await API.delete(
    `/opportunities/${id}`
  );
  return data;
};