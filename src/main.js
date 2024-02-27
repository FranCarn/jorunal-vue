import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/styles.scss";
import store from "./store";
import toastify, { settings } from "vue-toastify";
import "vue-toastify/index.css";

createApp(App)
  .use(store)
  .use(toastify, { ...settings, position: "top-right", defaultTitle: false })
  .use(router)
  .mount("#app");
