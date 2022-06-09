import { createApp } from "vue";
import App from "./App.vue";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import "purecss";

createApp(App).use(Oruga).mount("#app");
