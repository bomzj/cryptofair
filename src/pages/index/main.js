import Vue from 'vue'
import App from './App.vue'
import '../../assets/main.css';

import VModal from 'vue-js-modal'
Vue.use(VModal,{ componentName: "v-modal" })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
