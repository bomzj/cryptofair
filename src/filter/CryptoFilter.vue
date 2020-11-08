<template>
  <div>
    <button @click="$refs.modal.show()" class="filter filter-active">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           :title="'Select crypto you want to ' + state.tradeType.toLowerCase()"
           @apply-changes="onApplyChanges">
      
      <SearchBox placeholder="Search crypto by name or symbol" 
                 @change="$refs.dataList.filterList($event)" />
      
      <SingleSelectList ref="dataList"
                           :data-source="getCryptos()"
                           item-id-prop="symbol"
                           item-name-prop="name"
                           :selected-item-id="state.coin" 
                           @change="selectedCryptoId = $event"/>
    </Modal>
  </div>
</template>

<script>
import store from '@/store.js'
import Modal from '@/ui/Modal'
import SearchBox from '@/ui/SearchBox'
import SingleSelectList from '@/ui/SingleSelectList'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'

export default {
  name: 'CryptoFilter',
  components: { Modal, SearchBox, SingleSelectList },
  data() {
    return {
      state: store.state,
      selectedCryptoId: store.state.coin,
    }
  },
  computed: {
    title: () => CryptocurrencyService.getCryptocurrencyNameBy(store.state.coin)
  },
  methods: {
    getCryptos() { 
      return CryptocurrencyService.getCryptocurrencies() 
    },
    onApplyChanges() {
      store.state.coin = this.selectedCryptoId;
    },
  }
}
</script>