import daybookRouter from "@/modules/daybook/router";

describe("tests on daybook module router", () => {
  test("should have this config", async () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    const promiseRoutes = [];

    daybookRouter.children.forEach((child) =>
      promiseRoutes.push(child.component())
    );

    const routes = (await Promise.all(promiseRoutes)).map(
      (route) => route.default.name
    );

    expect(routes).toContain("EntryView");
    expect(routes).toContain("NoEntrySelected");
  });

  test("should return route id", () => {
    const route = {
      params: {
        id: "ABC123",
      },
    };
    const entryRoute = daybookRouter.children.find((r) => r.name === "entry");
    expect(entryRoute.props(route)).toEqual(route.params);
  });

  test("should ", () => {});
});
