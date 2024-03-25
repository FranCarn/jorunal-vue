export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const addEntry = (state, entry) => {
  state.entries.unshift(entry);
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

export const deleteEntry = (state, id) => {
  const entriesFiltered = state.entries.filter((item) => item.id !== id);
  state.entries = entriesFiltered;
};

export const clearEntries = (state) => {
  state.entries = [];
};
