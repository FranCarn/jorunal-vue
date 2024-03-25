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

  return {
    authStatus: computed(() => store.getters["auth/currentStatus"]),
    checkAuthStatus,
    createUser,
    loginUser,
  };
};

export default useAuth;
