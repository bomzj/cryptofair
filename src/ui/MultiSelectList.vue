<template>
  <div class="flex flex-wrap flex-grow content-start overflow-auto px-8 py-5">
    <label v-for="item in itemList" 
           :key="item" 
           class="flex items-center w-full sm:w-1/3 mb-6">
      <input type="checkbox" 
              class="form-checkbox" 
              v-model="selected" 
              :value="itemIdProp ? item[itemIdProp] : item"
              @change="$emit('change', selected)">
      <slot :item="item"></slot>
    </label> 
  </div>
</template>

<script>
export default {
  name: 'MultiSelectList',
  props: ['items', 
          'item-id-prop',
          'selected-item-ids'],
  data() {
    return {
      selected: this.selectedItemIds,
      itemList: this.items
    }
  },
  methods: {
    setItems(items) {
      this.itemList = items
    },
    selectItems(itemIds) {
      this.selected = itemIds
    }
  }
}
</script>