import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  try {
    const { data } = await journalApi.get("/entries.json");
    if (!data) return commit("setEntries", []);
    const entries = [];
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }
    commit("setEntries", entries);
  } catch (error) {
    throw new Error("Canno't connect with backend");
  }
};

export const updateEntry = async ({ commit }, entry) => {
  const dataToSend = { ...entry };
  delete dataToSend.id;

  try {
    await journalApi.put(`/entries/${entry.id}.json`, dataToSend);
    commit("updateEntry", entry);
  } catch (error) {
    throw new Error("Canno't connect with backend");
  }
};

export const createEntry = async ({ commit }, entry) => {
  try {
    const { data } = await journalApi.post("/entries.json", { ...entry });
    commit("addEntry", { ...entry, id: data.name });
    return data.name;
  } catch (error) {
    throw new Error("Canno't connect with backend");
  }
};
export const deleteEntry = async ({ commit }, id) => {
  try {
    await journalApi.delete(`/entries/${id}.json`);
    commit("deleteEntry", id);
  } catch (error) {
    throw new Error("Canno't connect with backend");
  }
};
