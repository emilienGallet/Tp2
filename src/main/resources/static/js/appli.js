let app = Vue.createApp({
	template: '<vege-app titre="Légumes" taux="2"></vege-app>'
})
app.component('vegetable', {
	props: ["veg", "indexVege"],
	emits: ["supprIndex"],
	template:
		'<li :title="veg.color" :style="{ background: veg.color}" >' +
		'{{indexVege}} {{veg.name}} cost <span :title="enCAD(veg.price)">{{veg.price}}</span> €</li>' +
		'<vegetable-del @suppr="() => deleteVegetable()"></vegetable-del>',
	methods: {
		enCAD: function(enEuros) {
			return enEuros * this.taux;
		},
		deleteVegetable: async function() {
			console.log("deleteVegetable" + this.indexVege)
			this.$emit("supprIndex", this.indexVege);
		},
	},

})

app.component('vegetable-del', {
	template: `<form>
		<input type="submit" value="Supprimer" @click.prevent="supprVege"/>
		</form>`,
	emits: ["suppr"],
	methods: {
		supprVege: function() {
			this.$emit("suppr");
		},
	},
})

app.component('vegetable-new', {
	template: `<form>
		<input type="text" placeholder="name" v-model="nom"/><br/>
		<input type="text" placeholder="color" v-model="couleur"/><br/>
		<input type="text" placeholder="price" v-model="prix"/><br/>
		<input type="submit" value="Add" @click.prevent="addVege"/>
		</form>`,
	data: () => ({ nom: "", couleur: "pink", prix: 5 }),
	emits: ["ajout"],
	methods: {
		addVege: function() {
			this.$emit("ajout", this.nom, this.couleur, this.prix)
		},
	},
})

app.component('vege-app', {
	props: { titre: String, taux: { default: 1.55 } },
	template: '<h1 :title="leTITRE">{{titre}}</h1>' +
		'<p>Il y a {{veges.length}} élements</p>' +
		'<ul>' +
		'<vegetable v-for="(vege,index) in veges" :veg="vege" :indexVege="index" @supprIndex="(index) => deleteVegetableIndex(index)"></vegetable>'
		+ '</ul>'
		+ '<button @click="ajoutTest()">Ajouter un légume</button>' +
		'<vegetable-new @ajout="(n,c,p) => addVegetable(n, c, p)" />',

	mounted: function() {
		this.loadData();
	},

	data: () => ({
		veges: [{ name: 'Tomato', color: 'red', price: 2.50 }, {
			name: 'Cucumber', color: 'green', price: 0.50
		},],
	}),

	methods: {
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
		addVegetable: async function(name, color, price) {
			let newVege = { name, color, price }
			let res = await fetch('/api/vegetables', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newVege)
			})
			let body = await res.json()
			this.veges.push(body)
		},
		deleteVegetableIndex: async function(v) {
			console.log("deleteVegetableIndex " + v)
			console.clear()
			console.log(this.veges[v]._links.self.href)
			let href = this.veges[v]._links.self.href;
			this.veges.splice(v, 1)
			let res = await fetch(href, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
			let body = await res.json()
			this.veges.push(body)
		},
	},
	computed: {
		leTITRE: function() {
			return this.titre.toUpperCase()
		},
	}

})


app.mount('#container')