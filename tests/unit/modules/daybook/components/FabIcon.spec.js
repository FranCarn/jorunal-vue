import FabIcon from "@/modules/daybook/components/FabIcon.vue";
import { shallowMount } from "@vue/test-utils";

describe("test on FabIcon component", () => {
  const iconName = "fa-circle";
  let wrapper = shallowMount(FabIcon, {
    props: {
      icon: iconName,
    },
  });
  test("should show icon who passed in argument", () => {
    const icon = wrapper.find("i");
    expect(icon.classes(iconName)).toBeTruthy();
  });
  test("should emit event on:click when is pressed", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
