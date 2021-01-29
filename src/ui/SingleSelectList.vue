<template>
  <div class="flex flex-col sm:flex-row sm:flex-wrap flex-grow content-start px-8 py-5">
    <label v-for="item in itemList" 
           :key="itemIdProp ? item[itemIdProp] : item" 
           class="flex items-center mb-6 sm:w-1/2 lg:w-1/3 2xl:w-1/4">
      <input type="radio" 
              class="form-radio" 
              v-model="selected" 
              :value="itemIdProp ? item[itemIdProp] : item"
              @change="$emit('change', selected)">
      <slot :item="item"></slot>
    </label> 
  </div>
</template>

<script>
export default {
  name: 'SingleSelectList',
  props: ['items', 
          'item-id-prop',
          'selected-item-id'],
  data() {
    return {
      selected: this.selectedItemId,
      itemList: this.items
    }
  },
  methods: {
    setItems(items) {
      this.itemList = items
    },
    selectItem(itemId) {
      this.selected = itemId
    }
  }
}
</script>