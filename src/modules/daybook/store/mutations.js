export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const addEntry = (state) => {
  console.log(state);
};
export const updateEntry = (state) => {
  console.log(state);
};
