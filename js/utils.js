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
			//afficher l'élément
			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses);
			product.render();
		})
		.catch(err => console.log(err))
}

async function addElementToCart(id) {
	await fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"})
		.then(res => res.json())
		.then(res => {

			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses);

			localStorageUtil.putProductInCart(product);
		})
		.catch(err => console.log(err))
}


class LocalStorageUtil {
	constructor() {
		this.keyName = 'productsInCart';

	}
	
	getCountOfProductsTypeInCart() {
		return this.getProductsInCart().length;
	}
	getCountOfProductsInCart(){
		let count = 0;
		let productsInCart = this.getProductsInCart();
		productsInCart.forEach(item => {
			count = count + item.count;
		 });
		return count;
	}

	getProductsInCart() {
		const productsLocalStorage = localStorage.getItem(this.keyName);
		if (productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage);
		} else {return []};
	}

	putProductInCart(element) {
		let productsInCart = this.getProductsInCart();
		
		let pushProduct = false;

		const id = element.id;
		let findProduct = false;

		productsInCart.forEach(item => { 
			if (item.id === id) {
				findProduct = true;
				item.count ++;
			//	alert('déjà dans le panier');
			}
		});
		if (!findProduct) {
			element.count = 1;
			productsInCart.push(element);
			pushProduct = true;
		//	alert('ajout pour la première fois');
		};


		localStorage.setItem(this.keyName, JSON.stringify(productsInCart));
		return pushProduct;
	}
}


const localStorageUtil = new LocalStorageUtil();