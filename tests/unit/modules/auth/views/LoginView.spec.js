import LoginView from "@/modules/auth/views/LoginView.vue";
import { shallowMount } from "@vue/test-utils";
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";
import { config } from "@vue/test-utils";
import createVueXStore from "../../../mocks/mock-store";
import { useToast } from "vue-toastify";

jest.mock("vue-toastify", () => ({
  useToast: {
    warning: jest.fn(),
  },
}));

// create one router per test file
const router = createRouterMock();

beforeEach(() => {
  router.reset(); // reset the router state
  injectRouterMock(router);
});

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock);

const store = createVueXStore({
  user: null,
  status: "not-authenticated",
  idToken: null,
  refreshToken: null,
});

store.dispatch = jest.fn();

describe("Tests on Login View", () => {
  const wrapper = shallowMount(LoginView, {
    global: {
      plugins: [store],
    },
  });

  beforeEach(() => jest.clearAllMocks());

  test("should do match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Login: Failed & show toast", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: "CREDENTIALS_ERROR",
    });

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "",
      password: "",
    });
  });

  test("Login: Success & redirect to main page", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: true,
    });

    const [email, password] = wrapper.findAll("input");
    await email.setValue("test@test.com");
    await password.setValue("123456");

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "test@test.com",
      password: "123456",
    });

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
