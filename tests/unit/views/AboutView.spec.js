import AboutView from "@/views/AboutView.vue";
import { shallowMount } from "@vue/test-utils";

describe("aboutView component test", () => {
  const wrapper = shallowMount(AboutView);

  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
