import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  try {
    const { data } = await journalApi.get("/entries.json");
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
export const updateEntry = async ({ commit }) => {
  console.log(commit);
};
export const createEntry = async ({ commit }) => {
  console.log(commit);
};
