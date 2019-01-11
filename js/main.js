var app = new Vue({
	el: "#app",
	data: {
		show: 'home'
	},
	methods: {
		capitalShow: function () {
			return this.show.toUpperCase();
		},
		seen: function (arg) {
			//			console.log('Vasil!!!!!')
			this.show = arg;
			window.scrollTo(0, 0);
		}
	},
	computed: {

	}

})
