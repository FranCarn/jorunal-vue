import { createStore } from "vuex";

import auth from "@/modules/auth/store";
import journal from "@/modules/daybook/store";

import { journalState } from "./test-journal-state";

const createVueXStore = (authInitState, journalInitState = journalState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...journalInitState },
      },
      auth: {
        ...auth,
        state: { ...authInitState },
      },
    },
  });

export default createVueXStore;
