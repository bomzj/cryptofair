<template>
  <div class="flex items-center px-8 py-5">
    <input class="form-input block w-full outline-none text-xl" 
          v-model.number="$data._input" 
          :placeholder="placeholder"
          @input="preventInvalidInput">
    <button class="-ml-8 clear-icon" @click="$data._input = ''" />
  </div>
</template>

<script>
export default {
  name: 'NumericInput',
  props: ['placeholder', 'input'],
  data() {
    return {
      _input: this.input,
    }
  },
  watch: {
    '$data._input'() {
      this.$emit('update:input', this.$data._input)
    }
  },
  methods: {
    preventInvalidInput(event) {
      var value = event.target.value;
      // Check if value is number
			var isValid = +value == +value;
			
			if (!isValid) {
        // reset to previous value
        // preventDefault() doesn't work since input event is not cancellable
        // so we have to use another approach
				var resetEvent = document.createEvent('Event');
				resetEvent.initEvent('input', true, true);
				event.target.value = event.target._value || '';
				event.target.dispatchEvent(resetEvent);
			}
    }
  }
}
</script>