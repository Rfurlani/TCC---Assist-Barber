import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { VueMaskDirective } from "v-mask";
import axios from "axios";
import VueAxios from "vue-axios";
import VueGeolocation from "vue-browser-geolocation";
import VueMapbox from "@studiometa/vue-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { store } from "./store";
import VueMask from "v-mask";

//Constantes
Vue.use(VueMask);
Vue.directive("mask", VueMaskDirective);
Vue.use(VueAxios, axios);
Vue.use(VueGeolocation);
Vue.use(VueMapbox);
Vue.config.productionTip = false;

new Vue({
	store,
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
