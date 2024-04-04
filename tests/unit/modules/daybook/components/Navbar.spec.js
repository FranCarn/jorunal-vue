import NavbarDaybook from "@/modules/daybook/components/NavbarDaybook.vue";
import { shallowMount } from "@vue/test-utils";
import createVueXStore from "tests/unit/mocks/mock-store";

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
});
