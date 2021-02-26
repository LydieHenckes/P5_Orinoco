//Récupère la liste des produits grâce à une requête fetch et appelle fonction render décrit dans index.js avec les données récupérées
function getProducts () {
	fetch('http://localhost:3000/api/cameras')		
	.then(res => res.json())
	.then(body => {
		
		render(body);
	})
	.catch(err => {
		// appelle la fonction de l'exemplaire de la classe Error pour afficher un message d'erreur
		errorPage.renderErrorProducts();
		console.log(err);
	});
}

//récupère un produit correspondant au parametre id, crée l'exemplaire de classe Product et appelle sa fonction render pour l'afficher 
//class Product - product.js
function getProduct (id) {  
	fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"}) //
		.then(res => res.json())	
		.then(res => {
			//afficher l'élément
			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses);
			product.render();
		})
		.catch(err => {
			// appelle la fonction de l'exemplaire de la classe Error pour afficher un message d'erreur pour un Produit
			console.log(err);
			errorPage.renderErrorProduct();
		});
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
			//console.log('res Order:', res);
			// saufgarder orderDetails dans localStorage
			let orderDetails = {
				orderId: res.orderId,
				orderSum: orderSum,
				orderUser: res.contact.firstName
			};
			localStorageUtil.putOrderDetails(orderDetails);
		})
		.catch(err => console.log('err:', err))
}

//fonction ajoute un élément du panier - dans la liste des produits dans localStorage, en faisant d'abord une requête fetch pour récupèrer l'info du produit
async function addElementToCart(id, lensSelected) {
	let addProduct = false;
	await fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"})
		.then(res => res.json())
		.then(res => {
			//création de l'élément de la classe Product avec les données reçu 
			let product = new Product (res._id, res.name, res.imageUrl, res.description, res.price, res.lenses, lensSelected);
			//aujout de product dans localStorage
			addProduct = localStorageUtil.putProductInCart(product);
		})
		.catch(err => console.log(err))
		.finally(() => {
			if (addProduct) {
				alert("l'article a été ajouté dans le panier!");
			};
		})
}


// fonction qui supprime un élément du panier 
function deleteElementFromCart(id, lens) {
	localStorageUtil.deleteProductFromCart(id, lens);
}


/*--------------class LocalStorageUtil-----------*/
// class LocalStorageUtil avec ensemble de fonctions pour travailler avec localStorage; 
// trois données seront saufgardées: la liste des produits dans le panier, l'objectif courant de la caméra choisi, et les détails de la commande
class LocalStorageUtil {
	constructor() {
		this.keyName = 'productsInCart';
		this.keyLensSelected = 'lensSelected';
		this.keyOrder = 'orderDetails';
	}
	
	//--------fonctions pour la variable avec la clé productsInCart--------------- */
  // objet saufragdé - type array des Objets

	// fonction qui retourne le nombre des articles différents dans le panier (quantité d'un article peut être >1)
	getCountOfProductsTypeInCart() {
		return this.getProductsInCart().length;
	}

	// fonction qui retourne le nombre total des articles dans le panier 
	getCountOfProductsInCart(){
		let count = 0;
		let productsInCart = this.getProductsInCart();
		productsInCart.forEach(item => {
			count = count + item.count;
		 });
		return count;
	}

	// fonction getProductsInCart retourne un array des produits dans le panier 
	//chaque élément de cette liste est un objet de classe Product décrite dans product.js
	getProductsInCart() {
		const productsLocalStorage = localStorage.getItem(this.keyName);
		if (productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage);
		} else {return []};
	}

	//fonction ajoute l'élément dans le panier, si l'élément existe déjà - sont count est modifié
	putProductInCart(element) {
		let productsInCart = this.getProductsInCart();
		let pushProduct = false;

		const id = element.id;
		const lens = element.lensSelected;

		let findProduct = false;
		productsInCart.forEach(item => { 
			//l'élément est différent si sont id et son objectif (lens) choisi sont différents
			if ((item.id === id) && (item.lensSelected === lens)) {
				//si on trouve un produit pareil dans la liste
				findProduct = true;
				item.count ++;
				pushProduct = true;
			}
		});
		//si on ne trouve pas le produit pareil dans la liste
		if (!findProduct) {
			element.count = 1;
			productsInCart.push(element);
			pushProduct = true;
		};
		localStorage.setItem(this.keyName, JSON.stringify(productsInCart));
		return pushProduct;
	}

	//fonction qui supprime un produit de la liste des produits dans localStorage
	deleteProductFromCart(id, lensSelected) {
		let productsInCart = this.getProductsInCart();
		//controle si le produit demané existe dans cette liste
		for (let i=0; i < productsInCart.length;  i++) {
			if ((productsInCart[i].id === id) && (productsInCart[i].lensSelected === lensSelected)) {
				productsInCart.splice(i, 1);
			}
		}
		localStorage.setItem(this.keyName, JSON.stringify(productsInCart));
	}

	// fonction qui supprime toute la liste des produis stockés dans productsInCart
	deleteAllProductsFromCart() {
		localStorage.removeItem(this.keyName);
	};


	//--------fonctions pour la variable avec la clé lensSelected--------------- */
	//  objet saufgardé - type String -- get... - pour recevoir, put... pour ajouter ou modifier et delete... pour supprimer
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

	//--------fonctions pour la variable avec la clé orderDetails--------------- */
	// objet saufragdé - type Objet --	get... - pour recevoir, put... pour ajouter ou modifier et delete... pour supprimer
	getOrderDetails() {
		const orderDetails = localStorage.getItem(this.keyOrder);

		if (orderDetails !== null) {
			return JSON.parse(orderDetails);
		} else {return ''};
	}

	putOrderDetails(value) {
		let orderDetails = this.getOrderDetails();

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

// création de l'exemplaire de la classe LocalStorageUtil, avec qui vont travailler divers fichiers js

const localStorageUtil = new LocalStorageUtil();