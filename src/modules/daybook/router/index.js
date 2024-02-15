export default {
  name: "daybook",
  component: () =>
    import(/* webpackChunkName: "daybook" */ "../layouts/DayBookLayout.vue"),
  children: [],
};
