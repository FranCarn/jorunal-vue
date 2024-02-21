<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Search entry"
        v-model="term"
      />
    </div>
    <div class="entry-scroll-area">
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Entry: defineAsyncComponent(() => import("./EntryComponent")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
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
