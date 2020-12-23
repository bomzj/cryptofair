<template>
  <div v-show="getItems().length" class="flex flex-wrap px-8 py-5 text-xl">
    <div v-for="item in getItems()" :key="getItemId(item)" 
      class="flex 
            items-center
            border 
            bg-gray-300 
            text-gray-500 
            pl-2 pr-1 py-2 
            mr-3 mb-2">
      <span class="block mr-1">{{ getItemName(item) }}</span>
      <button class="rounded-full hover:bg-gray-400 p-1" @click="removeItem(item)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
      </button>
    </div>
    <button v-show="getItems().length > 1" class="button mb-2" @click="clearAll()">
      Clear all
    </button>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      _items: this.items,
    }
  },
  watch: {
    '$data._items'() {
      let ids = this.getItems().map(this.getItemId)
      this.$emit('update:items', ids)
    }
  },
  methods: {
    getItems() {
      return this.$data._items
    },
    setItems(items) {
      this.$data._items = items
    },
    removeItem(item) {
      let items = this.getItems()
      let itemIndexToRemove = items.indexOf(item)
      items.splice(itemIndexToRemove, 1)
    },
    clearAll() {
      this.setItems([])
    },
    getItemId(item) {
      // we assume that item can be either Object as {id, name} or string
      return item instanceof Object ? item.id : item
    },
    getItemName(item) {
      // we assume that item can be either Object as {id, name} or string
      return item instanceof Object ? item.name : item
    }
  }
}
</script>