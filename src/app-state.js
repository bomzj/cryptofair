import Vue from 'vue'

// ES6 module is singleton by its nature 
// since it evaluates/runs code inside only one time on first import
// Create Vue instance just for managing State object changes
window.state = new Vue({
  data() {
    return { 
      currency: 'USD' 
    }
  },
  created() {
    this.loadState();
  },
  // Track all state changes and save to local storage
	watch: {
		currency: {
			handler () {
				this.saveState();
			},
			deep: true
    }
  },
  methods: {
    saveState() {
			var json = JSON.stringify(this.currency);
			localStorage.setItem("currency", json);
		},
		loadState() {
			var json = localStorage.getItem("currency");
			if (json) {
				this.currency = JSON.parse(json);
      }
    }
  }
});

export default window.state;