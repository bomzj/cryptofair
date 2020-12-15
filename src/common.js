import Vue from 'vue'
import '@/main.css'
import VModal from 'vue-js-modal'

Vue.use(VModal,{ componentName: "v-modal" })

Vue.config.productionTip = false

function renderPage(page) {
  new Vue({
    render: h => h(page),
  }).$mount('#app')
}

import store from '@/store'
import CurrencyService from '@/currency/currency-service'

Vue.filter('currency', function (value, currencyCode, hideFractionDigits) {
  if (!currencyCode) currencyCode = store.state.userCurrency
  return CurrencyService.formatPrice(value, currencyCode, hideFractionDigits)
})

export default renderPage;