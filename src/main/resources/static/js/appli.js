let app = Vue.createApp({
	template: '<vege-app titre="Légumes" taux="2"></vege-app>'
})
app.component('vege-app', {
	props: { titre: String, taux: { default: 1.55 } },
	template: '<h1 :title="leTITRE">{{titre}}</h1>' +
		'<p>Il y a {{veges.length}} élements</p>' +
		'<ul>' +
		'<li v-for="vege in veges" :title="vege.color" :style="{ background: vege.color}" >' +
		'{{vege.name}} cost <span :title="enCAD(vege.price)">{{vege.price}}<span> €</li>'
		+ '</ul>'
		+ '<button @click="ajoutTest()">Ajouter un légume</button>',

	mounted: function(){
		this.loadData();
	},

	data: () => ({
		veges: [{ name: 'Tomato', color: 'red', price: 2.50 }, {
			name: 'Cucumber', color: 'green', price: 0.50
		},],
	}),

	methods: {
		enCAD: function(enEuros) {
			return enEuros * this.taux;
		},
		ajoutTest: function() {
			this.veges.push({
				name: 'Salad',
				color: 'green',
				price: Math.random(),
			});
		},
		loadData: async function() {
			let res = await fetch('/api/vegetables'); // hard coded :(, not HATEOAS 
			let body = await res.json();
			this.veges = body._embedded.vegetables;
		},
	},
	computed: {
		leTITRE: function() {
			return this.titre.toUpperCase()
		},
	}

})


app.mount('#container')