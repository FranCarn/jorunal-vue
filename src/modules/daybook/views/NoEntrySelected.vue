<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing selected</h1>
  </div>
  <Fab
    icon="fa-plus"
    @on:click="$router.push({ name: 'entry', params: { id: 'new' } })"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/FabIcon")),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
