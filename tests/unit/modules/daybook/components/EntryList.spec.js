import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import EntryList from "@/modules/daybook/components/EntryList";
import journal from "@/modules/daybook/store";
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

describe("tests on EntryList component", () => {
  const store = createVueXStore(journalState);

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: { mocks: { $router: mockRouter }, plugins: [store] },
    });
  });

  test("should call getEntriesByTerm without args & show 2 entries", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.findAll("entry-stub")).toHaveLength(2);
  });
  test("should call getEntriesByTerm & filter entries", async () => {
    const input = wrapper.find("input");
    await input.setValue("Jest");
    expect(wrapper.findAll("entry-stub")).toHaveLength(1);
  });
  test("should redirect to new entry when user click button", () => {
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
