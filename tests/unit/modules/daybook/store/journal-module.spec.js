import { createStore } from "vuex";
import journal from "@/modules/daybook/store";
import { journalState } from "tests/unit/mocks/test-journal-state";
import authApi from "@/api/authApi";

const createVueXStore = (initalState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initalState },
      },
    },
  });

describe("tests in Journal store module", () => {
  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "test@test.com",
      password: "123456",
      returnSecureToken: true,
    });
    localStorage.setItem("idToken", data.idToken);
  });

  test("Initial state check", () => {
    const store = createVueXStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // MUTATIONS
  test("Mutations: setEntries", () => {
    const store = createVueXStore({ isLoading: true, entries: [] });

    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries).toHaveLength(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("Mutations: updateEntry", () => {
    const store = createVueXStore(journalState);

    const updatedEntry = {
      date: 1627077227978,
      text: "Oh mon amour",
      id: "-NraVTzAqgA-CtJSWRtq",
    };

    store.commit("journal/updateEntry", updatedEntry);

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(2);
    expect(entries.find((e) => e.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  test("Mutations: addEntry & deleteEntry", () => {
    const store = createVueXStore(journalState);

    const mockEntry = { id: "ABC-123", text: "Hi from tests" };

    const entries = store.state.journal.entries;

    store.commit("journal/addEntry", mockEntry);

    expect(entries).toHaveLength(3);
    expect(entries.find((e) => e.id === mockEntry.id)).toEqual(mockEntry);

    store.commit("journal/deleteEntry", mockEntry.id);

    expect(store.state.journal.entries).toHaveLength(2);
    expect(
      store.state.journal.entries.find((e) => e.id === mockEntry.id)
    ).toBeFalsy();
  });

  // GETTERS
  test("Getters: GetEntriesByTerm & GetEntriesById", () => {
    const store = createVueXStore(journalState);
    const [entry1, entry2] = journalState.entries;
    expect(store.getters["journal/getEntriesByTerm"]("")).toHaveLength(2);
    expect(store.getters["journal/getEntriesByTerm"]("Jest")).toHaveLength(1);
    expect(store.getters["journal/getEntriesByTerm"]("Jest")).toEqual([entry2]);
    expect(
      store.getters["journal/getEntryById"]("-NrRTT6bjp_h33CgHphU")
    ).toEqual(entry1);
  });

  // ACTIONS

  test("Actions: loadEntries", async () => {
    const store = createVueXStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries).toHaveLength(2);
  });
  test("Actions: updateEntry", async () => {
    const store = createVueXStore(journalState);
    const updatedEntry = {
      id: "-NrRTT6bjp_h33CgHphU",
      date: 1627077227978,
      text: "Somos nuestra memoria, somos ese quimérico museo de formas inconstantes, ese montón de espejos rotos.",
      picture:
        "https://res.cloudinary.com/ddnuznzo6/image/upload/v1709303528/vuejournal/vkl0atdtcwhcg12vwtdh.jpg",
      field: { a: 1 },
      otherField: true,
    };
    await store.dispatch("journal/updateEntry", updatedEntry);
    const entries = store.state.journal.entries;
    expect(entries).toHaveLength(2);
    expect(entries.find((item) => item.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });
  test("Actions: createEntry & deleteEntry", async () => {
    const store = createVueXStore(journalState);
    const newEntry = {
      ...journalState.entries[0],
    };
    delete newEntry.id;

    const id = await store.dispatch("journal/createEntry", newEntry);
    const entries = store.state.journal.entries;
    expect(typeof id).toBe("string");
    expect(entries).toHaveLength(3);
    expect(entries.find((item) => item.id === id)).toBeTruthy();

    await store.dispatch("journal/deleteEntry", id);
    expect(store.state.journal.entries).toHaveLength(2);
    expect(
      store.state.journal.entries.find((item) => item.id === id)
    ).toBeFalsy();
  });
});
