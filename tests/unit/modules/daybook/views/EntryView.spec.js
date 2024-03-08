import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import journal from "@/modules/daybook/store";
import EntryView from "@/modules/daybook/views/EntryView.vue";
import { journalState } from "../../../mocks/test-journal-state";

const createVueXStore = (initalState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initalState },
      },
    },
  });

const mockRouter = {
  push: jest.fn(),
};

describe("tests on entry view", () => {
  const store = createVueXStore(journalState);
  store.dispatch = jest.fn();

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: { id: "-NrRTT6bjp_h33CgHphU" },
      global: { mocks: { $router: mockRouter }, plugins: [store] },
    });
  });

  test("should redirect to no entry view page bocause id doesnt exists", () => {
    shallowMount(EntryView, {
      props: {
        id: "inexistent-id-in-store",
      },
      global: { mocks: { $router: mockRouter }, plugins: [store] },
    });
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
  test("should show entry & match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
  test("should delete entry & redirect", () => {
    wrapper.find(".btn-danger").trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith(
      "journal/deleteEntry",
      "-NrRTT6bjp_h33CgHphU"
    );
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
