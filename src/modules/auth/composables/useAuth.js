import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const res = await store.dispatch("auth/createUser", user);
    return res;
  };
  return {
    createUser,
  };
};

export default useAuth;
