<template>
  <div>
    <button @click="$refs.modal.show()" class="filter">
      More...
    </button>
    <Modal ref="modal" :id="$options.name" title="Other filters">
      
      More filters coming here
    </Modal> 
  </div>
</template>

<script>
import store from '@/store'
import Modal from '@/ui/Modal'

export default {
  name: 'MoreFilter',
  components: { Modal },
  data() {
    return {}
  },
  filters: {
    
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>
