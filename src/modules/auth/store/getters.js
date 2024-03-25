export const currentStatus = (state) => {
  return state.status;
};
export const currentUsername = (state) => {
  return state.user?.name || "Daybook";
};
