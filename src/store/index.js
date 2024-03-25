import { createStore } from "vuex";
import journal from "@/modules/daybook/store";
import auth from "@/modules/auth/store";

const store = createStore({
  modules: {
    journal,
    auth,
  },
});

export default store;
