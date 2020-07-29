import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import router from './router';

require('typeface-exo-2');
require('typeface-courier-prime');

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
