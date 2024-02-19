import { createStore } from "vuex";
import journal from "@/modules/daybook/store";

const store = createStore({
  modules: {
    journal,
  },
});

export default store;
