import Vue from 'vue'

// ES6 module is singleton by its nature 
// since it evaluates/runs code inside only one time on first import
// Create Vue instance just for managing State object changes
var store = new Vue({
  data() {
    return { 
      state: {
        currency: 'USD',
        tradeType: 'Buy',
        crypto: 'Bitcoin',
        paymentMethods: []
      }
    }
  },
  created() {
    this.loadState();
  },
  // Track all state changes and save to local storage
	watch: {
		state: {
			handler () {
				this.saveState();
			},
			deep: true
    }
  },
  methods: {
    saveState() {
			var json = JSON.stringify(this.state);
			localStorage.setItem("store", json);
		},
		loadState() {
			var json = localStorage.getItem("store");
			if (json) {
				this.state = JSON.parse(json);
      }
    }
  }
});

export default store;