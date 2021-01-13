<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : hasSelection}">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Select a country to filter offers by"
           @apply-changes="applyChanges"
           @show="onModalShow">
      <template v-if="countries">
        <SearchBox placeholder="Search country by name or code" 
                   @change="onSearchQueryChange" />
        <TagList ref="tagList" 
                 :items="getSelectedCountryAsTag()" 
                 @update:items="onTagListUpdate" />
        <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="countries"
                          item-id-prop="code"
                          :selected-item-id="selectedCountryCode" 
                          @change="onSelectListUpdate">
          <span class="text-xl ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
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
import LocationService from '@/location-service'

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
      const countryName = LocationService.getCountryName(store.state.countryCode)
      return countryName || 'Country'
    },
    hasSelection: () => store.state.countryCode
  },
  async created() {
    this.countries = await LocationService.getCountries()
  },
  methods: {
    getSelectedCountryAsTag() {
      return this.selectedCountryCode ? 
             [{ id: this.selectedCountryCode, 
                name: LocationService.getCountryName(this.selectedCountryCode) }] 
             : []
    },
    onModalShow() {
      // We have to watch for countryCode since it's loading async on user first visit
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
      this.$refs.tagList.setItems(this.getSelectedCountryAsTag())
    },
    applyChanges() {
      store.state.countryCode = this.selectedCountryCode
    },
  }
}
</script>