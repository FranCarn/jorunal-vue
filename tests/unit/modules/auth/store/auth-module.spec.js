import createVuexStore from "../../../mocks/mock-store";

describe("test on auth module vuex", () => {
  test("init state ", () => {
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
});
