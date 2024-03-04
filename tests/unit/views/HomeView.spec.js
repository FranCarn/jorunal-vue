import HomeView from "@/views/HomeView.vue";
import { shallowMount } from "@vue/test-utils";

describe("test on home view component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HomeView);
  });
  afterEach(() => {
    wrapper = null;
  });
  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("should redirect to no-entry page", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
