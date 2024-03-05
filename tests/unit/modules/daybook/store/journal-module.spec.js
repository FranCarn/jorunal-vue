import { createStore } from "vuex";
import journal from "@/modules/daybook/store";
import { journalState } from "tests/unit/mocks/test-journal-state";

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
  test("Initial state check", () => {
    const store = createVueXStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

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
});
