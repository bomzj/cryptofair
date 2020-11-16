<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : hasSelection}">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Select a country to filter offers by"
           @apply-changes="applyChanges">
      <template v-if="countries">
        <SearchBox placeholder="Search country by name or code" 
                   @change="onSearchQueryChange" />
        
        <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="countries"
                          item-id-prop="code"
                          :selected-item-id="state.countryCode" 
                          @change="selectedCountryCode = $event">
          <span class="text-lg ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
        </SingleSelectList>
      </template>
      <img v-else src="@/ui/spinner.svg" class="w-24 mx-auto"/>
    </Modal>
  </div>
</template>

<script>
import store from '@/store.js'
import Modal from '@/ui/Modal'
import SearchBox from '@/ui/SearchBox'
import SingleSelectList from '@/ui/SingleSelectList'
import LocationService from '../location-service'

export default {
  name: 'CountryFilter',
  components: { Modal, SearchBox, SingleSelectList },
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
    hasSelection: () => store.state.countryCode,
  },
  async created() {
    // if (!this.selectedCountry) {
    //   this.selectedCountry = await this.detectUserCountry()
    // }
    this.countries = await LocationService.getCountries()
  },
  methods: {
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.countries.filter(i => 
                                        i.name.toLowerCase().includes(searchQuery) ||
                                        i.code.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    applyChanges() {
      store.state.countryCode = this.selectedCountryCode
    },
  }
}
</script>