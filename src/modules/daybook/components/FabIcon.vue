<template>
  <button class="btn btn-primary">
    <i class="fa fa-lg" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 100%;
  bottom: 20px;
  height: 50px;
  position: fixed;
  right: 20px;
  width: 50px;
}
</style>
