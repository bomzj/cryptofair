<template>
  <div class="flex flex-wrap flex-grow content-start overflow-auto px-8 py-5">
    <label v-for="item in filteredDataSource" :key="item[itemIdProp]" class="flex items-center w-full sm:w-1/3 mb-6">
      <input type="radio" 
             class="form-radio" 
             v-model="itemId" 
             :value="item[itemIdProp]"
             @change="$emit('change', $event.target.value)">
      <span class="text-lg ml-2">
        {{ item[itemNameProp] }}
        <sup class="text-gray-500"> {{ item[itemIdProp] }}</sup>
      </span>
    </label> 
  </div>
</template>

<script>
export default {
  name: 'RadioButtonDataList',
  props: ['data-source', 'item-id-prop', 'item-name-prop', 'selected-item-id'],
  data() {
    return {
      itemId: this.selectedItemId,
      filteredDataSource: this.dataSource
    }
  },
  methods: {
    filterList(searchQuery) {
      this.filteredDataSource = this.dataSource
        .filter(i => i[this.itemIdProp].toLowerCase().includes(searchQuery) ||
                     i[this.itemNameProp].toLowerCase().includes(searchQuery))
    },
  }
}
</script>