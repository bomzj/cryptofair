<template>
  <v-modal :name="id" :adaptive="true" width="700" :height="modalMaxHeight">
    <div class="flex flex-col h-full bg-gray-200"> 
      <header class="px-8 py-5">
        <h2 class="text-xl text-center text-gray-700 font-semibold">{{ title }}</h2>
        <button class="float-right -mt-8 rounded-full hover:bg-gray-300" @click="close">
          <img src="@/ui/close-icon.svg" width="30" height="30" />
        </button>
      </header>
      <slot></slot>
      <footer class="flex justify-end px-8 py-5">
        <button class="button mr-4" @click="close">Cancel</button>
        <button class="button button-primary" @click="applyChanges">Apply</button>
      </footer>
    </div>
  </v-modal> 
</template>

<script>
import store from '@/store.js'

export default {
  name: 'Modal',
  props: ['id', 'title'],
  data() {
    return {
      
    }
  },
  computed: {
    modalMaxHeight: () => window.innerHeight
  },
  methods: {
   show() {
     this.$emit('show')
      this.$modal.show(this.id)
    },
    close() {
      this.$emit('close')
      this.$modal.hide(this.id);
    },
    applyChanges() {
      this.$emit('apply-changes')
      this.close();
    }
  }
}
</script>