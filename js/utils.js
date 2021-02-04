function getProducts () {
	fetch('http://localhost:3000/api/cameras')
	.then(res => res.json())
	.then(body => {

		render(body);
	})
	.catch(error => {
		console.log(error)
	});
}

function getProduct (id) {
	fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"})
		.then(res => res.json())	
		.then(res => {
			console.log(res)
			//afficher l'élément
			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses);
			product.render();
		})
		.catch(err => console.log(err))
}