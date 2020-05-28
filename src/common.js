import '@/main.css'

import Vue from 'vue'
import VModal from 'vue-js-modal'
Vue.use(VModal,{ componentName: "v-modal" })

Vue.config.productionTip = false

function renderPage(page) {
  new Vue({
    render: h => h(page),
  }).$mount('#app')
}

export default renderPage;