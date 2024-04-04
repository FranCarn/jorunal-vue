import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "auth/currentStatus": "authenticated",
    "auth/currentUsername": "User Test",
  },
};

jest.mock("vuex", () => {
  useStore: () => mockStore;
});

describe("Tests on useAuth composable", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createUser function: success", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "test", email: "test@test.net" };

    mockStore.dispatch.mockReturnValue({ ok: true });

    const res = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(res).toEqual({ ok: true });
  });

  test("createUser function: failed (user exists)", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "User Test", email: "test@test.com" };

    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });

    const res = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);

    expect(res).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("loginUser function: success", async () => {
    const { loginUser } = useAuth();

    const loginForm = { password: "123456", email: "test@test.net" };

    mockStore.dispatch.mockReturnValue({ ok: true });

    const res = await loginUser(loginForm);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(res).toEqual({ ok: true });
  });

  test("loginUser function: failed", async () => {
    const { loginUser } = useAuth();

    const loginForm = { password: "123456", email: "test@test.net" };

    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL/PASSWORD don't exist",
    });

    const res = await loginUser(loginForm);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(res).toEqual({ ok: false, message: "EMAIL/PASSWORD don't exist" });
  });

  test("checkAuthStatus function: failed", async () => {
    const { checkAuthStatus } = useAuth();

    mockStore.dispatch.mockReturnValue({
      ok: true,
    });

    const res = await checkAuthStatus();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/checkAuthenticationStatus"
    );
    expect(res).toEqual({ ok: true });
  });

  test("checkAuthStatus function: failed", async () => {
    const { checkAuthStatus } = useAuth();

    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "TOKEN_ERROR",
    });

    const res = await checkAuthStatus();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/checkAuthenticationStatus"
    );
    expect(res).toEqual({ ok: false, message: "TOKEN_ERROR" });
  });

  test("logout function", () => {
    const { logout } = useAuth();

    logout();

    expect(mockStore.commit).toHaveBeenCalledWith("auth/logout");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
    expect(mockStore.commit).toHaveBeenCalledTimes(2);
  });

  test("Computed: authState & username", () => {
    const { authStatus, username } = useAuth();
    expect(authStatus.value).toBe("authenticated");
    expect(username.value).toBe("User Test");
  });
});
