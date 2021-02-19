//Récupère la liste des produits grâce à une requette fetch et appelle fonction render décrit dans index.js avec les données récupérées
function getProducts () {
	fetch('http://localhost:3000/api/cameras')
	.then(res => res.json())
	.then(body => {

		render(body);
	})
	.catch(err => {
		console.log(err)
	});
}

//récupère un produit correspondant au parametre id, crée l'exemplaire de classe Product et appelle sa fonction render pour l'afficher 
//class Product - product.js
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

//envoye l'objet order, qui contient un objet contact et array products, saufgarde l'id de order retourné 
async function sendOrder(order, orderSum) {
	await fetch('http://localhost:3000/api/cameras/order', {
		method: "POST",
		headers: {
		"Content-Type": "application/json"
		},
		body: JSON.stringify(order)
		})
		.then(res => res.json())
		.then(res => {
			 console.log('reponse de server', res);
			// saufgarder orderDetails dans localStorage
			let orderDetails = {
				orderId: res.orderId,
				orderSum: orderSum,
				orderUser: res.contact.firstName
			};
			localStorageUtil.putOrderDetails(orderDetails);
			console.log('Детали заказа', orderDetails);
		})
		.catch(err => console.log(err))
}

async function addElementToCart(id, lensSelected) {
	await fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"})
		.then(res => res.json())
		.then(res => {
			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses, lensSelected);
			localStorageUtil.putProductInCart(product);
		})
		.catch(err => console.log(err))
		.finally(() => {
			alert("l'article a été ajouté dans le panier! ");
		})
}

function deleteElementFromCart(id, lens) {
	localStorageUtil.deleteProductFromCart(id, lens);
}


class LocalStorageUtil {
	constructor() {
		this.keyName = 'productsInCart';
		this.keyLensSelected = 'lensSelected';
		this.keyOrder = 'orderDetails';
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
		const lens = element.lensSelected;

		let findProduct = false;
		productsInCart.forEach(item => { 
			if ((item.id === id) && (item.lensSelected === lens)) {
				findProduct = true;
				item.count ++;
			}
		});
		if (!findProduct) {
			element.count = 1;
			productsInCart.push(element);
			pushProduct = true;
		};
		localStorage.setItem(this.keyName, JSON.stringify(productsInCart));
		return pushProduct;
	}

	deleteProductFromCart(id, lensSelected) {
		let productsInCart = this.getProductsInCart();

		for (let i=0; i < productsInCart.length;  i++) {
			if ((productsInCart[i].id === id) && (productsInCart[i].lensSelected === lensSelected)) {
				productsInCart.splice(i, 1);
			}
		}
		localStorage.setItem(this.keyName, JSON.stringify(productsInCart));
	}
	deleteAllProductsFromCart() {
		localStorage.removeItem(this.keyName);
	};

	getLensSelected() {
		const lensSeleted = localStorage.getItem(this.keyLensSelected);
		if (lensSeleted !== null) {
			return lensSeleted;
		} else {return ''};
	}

	putLensSelected(value) {
		let lensSelected = this.getLensSelected();
		if (lensSelected !== value) {
			localStorage.removeItem(this.keyLensSelected);
			localStorage.setItem(this.keyLensSelected, value);
		};
	}
	deleteLensSelected() {
		localStorage.removeItem(this.keyLensSelected);
	};

	getOrderDetails() {
		const orderDetails = localStorage.getItem(this.keyOrder);
		console.log(orderDetails);
		if (orderDetails !== null) {
			return JSON.parse(orderDetails);
		} else {return ''};
	}

	putOrderDetails(value) {
		let orderDetails = this.getOrderDetails();
		console.log('Pomestit1 ',orderDetails);
		console.log('Pomestit2 ', value);
		if (orderDetails ==='') {
			localStorage.setItem(this.keyOrder, JSON.stringify(value));
		} else {
			localStorage.removeItem(this.keyOrder);
			localStorage.setItem(this.keyOrder, JSON.stringify(value));
		};
	}

	deleteOrderDetails() {
		const orderDetails = localStorage.getItem(this.keyOrder);
		if (orderDetails !== null) {
			localStorage.removeItem(this.keyOrder);
		};
	}
}

const localStorageUtil = new LocalStorageUtil();