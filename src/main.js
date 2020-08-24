import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.use(VueNoty)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
