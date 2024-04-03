import authApi from "@/api/authApi";
import createVuexStore from "../../../mocks/mock-store";

describe("test on auth module vuex", () => {
  test("init state", () => {
    const store = createVuexStore({
      status: "authenticating", // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("authenticating");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  // Mutations
  test("Mutations: loginUser", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: { name: "Test", email: "testing@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    store.commit("auth/loginUser", payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toMatchObject(payload.user);
    expect(idToken).toBe("ABC-123");
    expect(refreshToken).toBe("XYZ-123");
  });

  test("Mutations: logout", () => {
    localStorage.setItem("idToken", "ABC-123");
    localStorage.setItem("refreshToken", "XYZ-123");

    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Test", email: "testing@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    store.commit("auth/logout");

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("not-authenticated");
    expect(user).toBeFalsy();
    expect(idToken).toBeFalsy();
    expect(refreshToken).toBeFalsy();
    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  // Getters
  test("Getters: currentUsername & currentStatus", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Test", email: "testing@test.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    expect(store.getters["auth/currentStatus"]).toBe("authenticated");
    expect(store.getters["auth/currentUsername"]).toBe("Test");
  });

  // Actions
  test("Actions: createUser (User already exists)", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test User",
      email: "test@test.com",
      password: "123456",
    };

    const res = await store.dispatch("auth/createUser", newUser);
    except(res).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBeFalsy();
    expect(idToken).toBeFalsy();
    expect(refreshToken).toBeFalsy();
  });

  test("Actions: createUser & signInUser (Success)", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test User 2",
      email: "test2@test.com",
      password: "123456",
    };

    const res = await store.dispatch("auth/createUser", newUser);
    except(res).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    // SignIn
    await store.dispatch("auth/signInUser");

    const { idToken } = store.state.auth;

    // Delete User
    await authApi.post(":delete", idToken);

    // Create User
    const createRes = await store.dispatch("auth/createUser", newUser);
    expect(createRes).toEqual({ ok: true });

    const {
      status,
      user,
      idToken: storeToken,
      refreshToken,
    } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toMatchObject({
      name: "Test User 2",
      email: "test2@test.com",
    });
    expect(storeToken).toBeTruthy();
    expect(typeof storeToken).toBe("string");
    expect(refreshToken).toBeTruthy();
    expect(typeof refreshToken).toBe("string");
  });

  test("Actions: checkAuthenticationStatus (Success)", async () => {
    const store = createVuexStore({
      status: "authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    // SignIn
    await store.dispatch("auth/signInUser", {
      email: "test@test.com",
      password: "123456",
    });

    const { idToken } = store.state.auth;
    store.commit("auth/logout");
    localStorage.setItem("idToken", idToken);

    const checkResp = await store.dispatch("auth/checkAuthenticationStatus");

    expect(checkResp).toEqual({ ok: true });
    const { status, user, idToken: storeToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toMatchObject({ name: "Test User", email: "test@test.com" });
    expect(storeToken).toBeTruthy();
    expect(typeof storeToken).toBe("string");
  });

  test("Actions: checkAuthenticationStatus (Failed)", async () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    localStorage.removeItem("idToken");

    const checkResp = await store.dispatch("auth/checkAuthenticationStatus");

    expect(checkResp).toEqual({ ok: false, message: "No token" });

    expect(store.state.auth.user).toBeFalsy();
    expect(store.state.auth.idToken).toBeFalsy();
    expect(store.state.auth.status).toBe("not-authenticated");

    localStorage.setItem("idToken", "ABC-123");

    const checkResp2 = await store.dispatch("auth/checkAuthenticationStatus");
    expect(checkResp).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
    expect(store.state.auth.status).toBe("not-authenticated");
  });
});
