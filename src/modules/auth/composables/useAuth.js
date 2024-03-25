import { useStore } from "vuex";
import { computed } from "vue";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    return await store.dispatch("auth/createUser", user);
  };

  const loginUser = async (user) => {
    return await store.dispatch("auth/signInUser", user);
  };

  const checkAuthStatus = async () => {
    return await store.dispatch("auth/checkAuthenticationStatus");
  };

  const logout = () => {
    store.commit("auth/logout");
    store.commit("journal/clearEntries");
  };

  return {
    authStatus: computed(() => store.getters["auth/currentStatus"]),
    username: computed(() => store.getters["auth/currentUsername"]),

    checkAuthStatus,
    createUser,
    loginUser,
    logout,
  };
};

export default useAuth;
