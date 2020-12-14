<template>
  <div>
    <button @click="showModal" class="filter filter-active">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           :title="'Select crypto you want to ' + state.tradeType.toLowerCase()"
           @apply-changes="onApplyChanges">
      
      <SearchBox placeholder="Search crypto by name or symbol" 
                 @change="onSearchQueryChange" />
      
      <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="items"
                          item-id-prop="symbol"
                          :selected-item-id="selectedItemId" 
                          @change="onSelectListUpdate">
          <span class="text-lg lg:text-2xl 2xl:text-3xl ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.symbol }}</sup></span>
        </SingleSelectList>
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
      selectedItemId: undefined,
    }
  },
  computed: {
    title: () => CryptocurrencyService.getCryptocurrencyNameBy(store.state.coin),
    items: () => { console.log('coins'); return CryptocurrencyService.getCryptocurrencies()}
  },
  methods: {
    showModal() {
      this.selectedItemId = store.state.coin;
      this.$refs.modal.show()
    },
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.items.filter(i => 
                                    i.name.toLowerCase().includes(searchQuery) ||
                                    i.symbol.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    onSelectListUpdate(selectedItemId) {
      this.selectedItemId = selectedItemId
    },
    onApplyChanges() {
      store.state.coin = this.selectedItemId;
    },
  }
}
</script>