import { createApp } from "vue";
import App from "./App.vue";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import "purecss";
import veProgress from "vue-ellipse-progress";

createApp(App).use(veProgress).use(Oruga).mount("#app");
