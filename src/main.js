import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/styles.scss";
import store from "./store";
import toastify from "vue-toastify";
import "vue-toastify/index.css";

createApp(App)
  .use(store)
  .use(toastify, { position: "top-right", defaultTitle: false })
  .use(router)
  .mount("#app");
