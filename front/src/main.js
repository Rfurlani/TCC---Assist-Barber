import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { VueMaskDirective } from "v-mask";
import axios from "axios";
import VueAxios from "vue-axios";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from 'vue-browser-geolocation';


//Constantes
import { mapsKey } from './constants'

Vue.use(VueAxios, axios);
Vue.directive("mask", VueMaskDirective);
Vue.use(VueGeolocation);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
	load: {
		key: mapsKey,
		libraries: "places",
	},
});

new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
