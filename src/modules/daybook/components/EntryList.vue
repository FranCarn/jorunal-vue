<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Search entry" />
    </div>
    <div class="entry-scroll-area">
      <h2 v-for="item in 100" :key="item">Entry</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scroll-area {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>
