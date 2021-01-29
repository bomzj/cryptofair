<template>
  <v-modal ref="modal" :name="id" 
          :width="modalMaxWidth()"
          :height="isScrollable ? 'auto': modalMaxHeight()" 
          :scrollable="isScrollable ? true : false" 
          :reset="true"
          @before-close="onBeforeClose()">
    <div class="flex flex-col lg:container mx-auto bg-gray-200"> 
      <header class="flex px-8 py-5">
        <h2 class="flex-grow text-xl lg:text-2xl 2xl:text-4xl text-center text-gray-700 font-semibold ml-8 lg:ml-10 2xl:ml-12">{{ title }}</h2>
        <button class="rounded-full hover:bg-gray-300 flex-shrink-0" @click="close">
          <img src="@/ui/close-icon.svg" class="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12" />
        </button>
      </header>
      <slot></slot>
      <footer class="self-end px-8 py-5 sticky bottom-0">
        <button class="button mr-4" @click="close">Cancel</button>
        <button class="button button-primary" @click="applyChanges">Apply</button>
      </footer>
    </div>
  </v-modal> 
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Modal',
  props: ['id', 'title', 'isScrollable'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    show() {
      // hide page scroll bar on showing modal
      document.body.style.overflow = 'hidden'
      this.$emit('show')
      this.$modal.show(this.id)
    },
    close() {
      this.$emit('close')
      this.$modal.hide(this.id);
    },
    onBeforeClose() {
      // enable page scroll bar on showing modal
      document.body.style.overflow = 'auto'
    },
    applyChanges() {
      this.$emit('apply-changes')
      this.close()
    },
    modalMaxHeight: () => window.innerHeight,
    modalMaxWidth: () => document.body.clientWidth,
  }
}
</script>