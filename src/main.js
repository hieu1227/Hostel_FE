import 'core-js';

// import Vue from 'vue';
// import App from './App.vue';

// import router from '@/router';
import i18n from '@/lang';
import store from '@/store';
import '@/permission';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/font-awesome/css/all.min.css';
import '@/scss/_index.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import Vue from 'vue';
import App from './App.vue';

import router from '@/router';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app');
