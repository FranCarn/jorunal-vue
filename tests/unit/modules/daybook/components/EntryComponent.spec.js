import { shallowMount } from "@vue/test-utils";
import EntryComponent from "@/modules/daybook/components/EntryComponent";

describe("tests on entry component", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallowMount(EntryComponent, {
    props: {
      entry: {
        date: 1627077227978,
        text: "Hi Jest",
        id: "-NraVTzAqgA-CtJSWRtq",
      },
    },
    global: { mocks: { $router: mockRouter } },
  });

  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should redirect when user click entry-container div", () => {
    const div = wrapper.find(".entry-container");
    div.trigger("click");

    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "-NraVTzAqgA-CtJSWRtq" },
    });
  });

  test("should check computed properties", () => {
    const { day, month, yearDay } = wrapper.vm;
    expect(day).toBe(23);
    expect(month).toBe("July");
    expect(yearDay).toBe("2021, Saturday");
  });
});
