<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Search entry" />
    </div>
    <div class="entry-scroll-area">
      <h2 v-for="item in 100" :key="item"><Entry /></h2>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Entry: defineAsyncComponent(() => import("./EntryComponent")),
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scroll-area {
  height: calc(100vh - 102px);
  overflow-y: scroll;
  overflow-x: none;
  &::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    background: #198754;
    border-radius: 15px;
  }
}
</style>
