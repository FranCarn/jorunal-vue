<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="fs-3 mx-1">{{ month }}</span>
        <span class="fs-4 mx-2 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
        />
        <button
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
          v-if="entry.id"
        >
          Delete <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Upload <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder="What happened today?"
        v-model="entry.text"
      ></textarea>
    </div>
    <img
      v-if="entry.picture && !localImage"
      class="img-thumbnail"
      :src="entry.picture"
      alt="entry-picture"
    />
    <img
      v-if="localImage"
      class="img-thumbnail"
      :src="localImage"
      alt="entry-picture"
    />
  </template>
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";
import { useToast } from "vue-toastify";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.loadEntry();
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),

    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      const url = await uploadImage(this.file);
      this.entry.picture = url;
      if (this.entry.id) {
        await this.updateEntry(this.entry);
        useToast().success({
          body: "Entry updated successfully",
          defaultTitle: false,
        });
      } else {
        const id = await this.createEntry(this.entry);
        useToast().success({
          body: "Entry created successfully",
          defaultTitle: false,
        });
        this.$router.push({ name: "entry", params: { id } });
      }
      this.file = null;
    },
    async onDeleteEntry() {
      await this.deleteEntry(this.entry.id);
      useToast().info({
        body: "Entry deleted successfully",
        defaultTitle: false,
      });
      this.$router.push({ name: "no-entry" });
    },
    async onSelectedImage({ target: { files } }) {
      const file = files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
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
