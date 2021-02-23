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

	addProductToCart(event) {    
		let id = event.target.getAttribute("data-id");
		let lensSelected = localStorageUtil.getLensSelected();
		
		let promise = addElementToCart(id, lensSelected);
		promise.then(()=>{
			let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
			let allProductInCart = localStorageUtil.getCountOfProductsInCart();
			cartCountPage.showCartCount(productsInCart, allProductInCart);		
		});
	}

	changeLenses(event) {
		var selectedOption = event.target.value;
		localStorageUtil.putLensSelected(selectedOption);
	}

	render() {
		const priceEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(this.price/100);
		document.getElementById('product-title').textContent = this.name;
		document.getElementById('product-img').src = this.imageUrl;
		document.getElementById('product-img').alt = `caméra ${this.name}`;
		document.querySelector('.product-details__description').textContent = this.description;
		document.querySelector('.product-details__price').textContent ='Prix: ' + priceEur;
	
		let htmlSelect = '';
		this.lenses.forEach(element => {
			htmlSelect += `
				<option value = '${element}' >${element}</option>
			`;
		});
		document.getElementById('lenses').innerHTML = htmlSelect;
		localStorageUtil.putLensSelected(this.lenses[0]);
		document.getElementById('lenses').onchange = this.changeLenses;

		document.getElementById('btn-buy').setAttribute("data-id", `${this.id}`);
		document.getElementById('btn-buy').onclick = this.addProductToCart;
		document.title = `Orinoco | ${this.name}`
	}
}

let productId;

let url = new URL(window.location.href);
productId = (url).searchParams.get('id');

//console.log((url)); // Pourquoi????
//console.log(productId1);


//url.search.slice(2);

console.log(productId);//

getProduct(productId);

