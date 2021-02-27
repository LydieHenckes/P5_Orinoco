class Product {
	constructor(id, name, imageUrl, description, price, lenses, lensSelected){
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.lenses = lenses;
		this.lensSelected = lensSelected;
		this.count = 0;
	}

	// fonction qui est appellée sur click de btn Ajouter au panier avec id ="btn-buy"
	addProductToCart(event) {    
		//recupétation de id de l'attribut data-id
		let id = event.target.getAttribute("data-id");

		// récupération de l'objectif courant enregistré dans LocalStorage
		let lensSelected = localStorageUtil.getLensSelected();
		
		// la function addElementToCart est asyncronne, 
		let promise = addElementToCart(id, lensSelected);

		promise.then(()=>{
			//donc en cas de promesse tenu mettre à jour le panier
			let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
			let allProductInCart = localStorageUtil.getCountOfProductsInCart();
			cartCountPage.showCartCount(productsInCart, allProductInCart);		
		});
	}

	// la fonction est appellé sur changement de l'objectif de produit
	changeLenses(event) {
		// récupération de la valeur choisi par l'utilisateur
		var selectedOption = event.target.value;

		// la valeur choisi est saufgardé dans LocalStorage grâce à la méthode putLenslected de la classe LocalStorageUtil
		localStorageUtil.putLensSelected(selectedOption);
	}

	// fonction affiche le produit choisi, ici les éléments html existent déjà sur la page produit.html 
	render() {
		// transformation de prix au format Eur
		const priceEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(this.price/100);

		// initialisation de titre de produit
		document.getElementById('product-title').textContent = this.name;

		// initialisation de l'image
		document.getElementById('product-img').src = this.imageUrl;
		document.getElementById('product-img').alt = `caméra ${this.name}`;
		// init de description
		document.querySelector('.product-details__description').textContent = this.description;
		// init de prix
		document.querySelector('.product-details__price').textContent ='Prix:  ' + priceEur;
		
		// les balises options pour la balise select sont ajoutées de façon dinamique (car la longeur de cette array peut varier)
		let htmlSelect = '';
		this.lenses.forEach(element => {
			htmlSelect += `
				<option value = '${element}' >${element}</option>
			`;
		});
		document.getElementById('lenses').innerHTML = htmlSelect;

		// saufgarde de l'objectif du produit dans LocalStorage à l'ouverture de la page
		localStorageUtil.putLensSelected(this.lenses[0]);
		
		document.getElementById('lenses').onchange = this.changeLenses;

		// ajout de l'attribut universel data-id pour le transmettre dans la fonction addElementToCart
		document.getElementById('btn-buy').setAttribute("data-id", `${this.id}`);

		document.getElementById('btn-buy').onclick = this.addProductToCart;
		// changement du titre de la page 
		document.title = `Orinoco | ${this.name}`
	}
	
	//
	showMessage() {
		let htmlMessage =`
			<div class = "message text-center">
				<p>L'article a été ajouté dans le panier!</p>
				<div class ="btn btn-secondary" onclick = "document.getElementById('message-container').classList.remove('_active')">OK</div>
			</div>
		`;
	
		document.getElementById('message-container').innerHTML = htmlMessage;
		document.getElementById('message-container').classList.add('_active');
	}

}

// init des variables
let productId;
let url = new URL(window.location.href);

// recevoir le paramètre id, qui a été passé dans l'url de la page
productId = (url).searchParams.get('id');

// function décrite dans utils.js qui reçoit l'info sur le produit par id
// crée une instance de classe Product et affiche le produit en appellant sa méthode render()
getProduct(productId);

