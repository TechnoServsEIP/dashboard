import Zendesk from "@dansmaculotte/vue-zendesk";
import Vue from "vue";

Vue.use(Zendesk, {
  key: "0109f9a4-b830-4786-8253-b6af20d99095",
  disabled: false,
  hideOnLoad: false,
  settings: {
    webWidget: {
      color: {
        theme: "#1420f0"
      }
    }
  }
});

console.log(Zendesk);
