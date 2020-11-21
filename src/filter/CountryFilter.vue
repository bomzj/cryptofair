<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : hasSelection}">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Select a country to filter offers by"
           @apply-changes="applyChanges"
           @close="onModalClose">
      <template v-if="countries">
        <SearchBox placeholder="Search country by name or code" 
                   @change="onSearchQueryChange" />
        <TagList ref="tagList" 
                 :items="selectedCountryCode ? [selectedCountryCode] : []" 
                 @update:items="onTagListUpdate" />
        <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="countries"
                          item-id-prop="code"
                          :selected-item-id="selectedCountryCode" 
                          @change="onSelectListUpdate">
          <span class="text-lg ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
        </SingleSelectList>
      </template>
      <img v-else src="@/ui/spinner.svg" class="w-24 mx-auto"/>
    </Modal>
  </div>
</template>

<script>
import store from '@/store.js'
import Modal from '@/ui/Modal.vue'
import SearchBox from '@/ui/SearchBox.vue'
import SingleSelectList from '@/ui/SingleSelectList.vue'
import TagList from '@/ui/TagList.vue'
import LocationService from '../location-service'

export default {
  name: 'CountryFilter',
  components: { Modal, SearchBox, SingleSelectList, TagList },
  data() {
    return {
      state: store.state,
      selectedCountryCode: store.state.countryCode,
      countries: null
    }
  },
  computed: {
    title() { 
      const countryName = this.countries?.find(c => c.code == store.state.countryCode)?.name
      return countryName || 'Country'
    },
    hasSelection: () => store.state.countryCode
  },
  async created() {
    // if (!this.selectedCountry) {
    //   this.selectedCountry = await this.detectUserCountry()
    // }
    this.countries = await LocationService.getCountries()
  },
  methods: {
    onModalClose() {
      this.selectedCountryCode = store.state.countryCode
    },
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.countries.filter(i => 
                                        i.name.toLowerCase().includes(searchQuery) ||
                                        i.code.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    onTagListUpdate(selectedItemIds) {
      this.selectedCountryCode = selectedItemIds[0]
      this.$refs.selectList.selectItem(this.selectedCountryCode)
    },
    onSelectListUpdate(selectedItemId) {
      this.selectedCountryCode = selectedItemId
      this.$refs.tagList.setItems([this.selectedCountryCode])
    },
    applyChanges() {
      store.state.countryCode = this.selectedCountryCode
    },
  }
}
</script>