import { createApp } from "vue";
import antd from "./config/antd.config";
import router from "./router";
import { store, key } from "./store";
import App from "./App.vue";

const app = createApp(App);

app.use(store, key).use(router).use(antd).mount("#app");
