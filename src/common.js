import Vue from 'vue'
import '@/main.css'

Vue.config.productionTip = false

function renderPage(page) {
  new Vue({
    render: h => h(page),
  }).$mount('#app')
}

export default renderPage;

/* Global filters */
import store from '@/store'
import CurrencyService from '@/currency/currency-service'

Vue.filter('currency', function (value, currencyCode, hideFractionDigits) {
  if (!currencyCode) currencyCode = store.state.userCurrency
  return CurrencyService.formatPrice(value, currencyCode, hideFractionDigits)
})

/* Global components */
import VModal from 'vue-js-modal'
Vue.use(VModal,{ componentName: "v-modal" })

/* Global utils */

// Extends promise to be cancellable and resolvable
window.promisify = function (promise) {
  let _resolve, _reject

  let wrap = new Promise(async (resolve, reject) => {
    _resolve = resolve
    _reject = reject
    let result = await promise
    resolve(result)
  })

  wrap.resolve = _resolve
  wrap.reject = _reject
    
  return wrap
};

/* Polyfills */
(async () => {
    // import needed polyfills e.g. Safari doesn't fully support Intl.NumberFormat
    await import(/*webpackIgnore: true*/ 'https://polyfill.io/v3/polyfill.js?features=Intl')
  }
)()