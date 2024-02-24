export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const addEntry = (state) => {
  console.log(state);
};
export const updateEntry = (state, entry) => {
  // const updatedEntries = state.entries.map((item) => {
  //   if (item.id === entry.id) {
  //     return {
  //       ...entry,
  //     };
  //   }
  //   return item;
  // });
  // state.entries = updatedEntries;

  const idx = state.entries.map((e) => e.id).indexOf(entry.id);
  state.entries[idx] = entry;
};
