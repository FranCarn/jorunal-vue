import NavbarDaybook from "@/modules/daybook/components/NavbarDaybook.vue";
import { shallowMount } from "@vue/test-utils";
import createVueXStore from "../../../mocks/mock-store";

import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";
import { config } from "@vue/test-utils";

// create one router per test file
const router = createRouterMock();

beforeEach(() => {
  router.reset(); // reset the router state
  injectRouterMock(router);
});

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock);

describe("tests on Navbar component", () => {
  const store = createVueXStore({
    user: { name: "Test User", email: "test@test.com" },
    status: "authenticated",
    idToken: "ABC",
    refreshToken: "XYZ",
  });

  const wrapper = shallowMount(NavbarDaybook, { global: { plugins: [store] } });

  beforeAll(() => jest.clearAllMocks());

  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should redirect & close session when clicks logout", async () => {
    await wrapper.find("button").trigger("click");

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "login" });

    expect(store.state.auth).toEqual({
      user: null,
      status: "not-authenticated",
      idToken: null,
      refreshToken: null,
    });
  });
});
