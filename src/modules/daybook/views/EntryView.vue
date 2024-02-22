<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="fs-3 mx-1">June</span>
      <span class="fs-4 mx-2 fw-light">2025</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Delete <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Upload <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="What happened today?" />
  </div>
  <img
    class="img-thumbnail"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3N0NFE09IZLopMGh3drYr6gux59S-C8GL02d8SOA7Q&s"
    alt="entry-picture"
  />
  <Fab icon="fa-save" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(this.loadEntry());
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
  },
  methods: {
    loadEntry() {
      return this.getEntryById(this.id);
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/FabIcon")),
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
