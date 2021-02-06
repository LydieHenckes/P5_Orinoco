class Product {
	constructor(id, name, imageUrl, description, price, lenses){
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.lenses = lenses;
		this.lenseSeleted = '';
		this.count = 0;
	}

	addProductToCart(event) {    
		let id = event.target.getAttribute("data-id");
	
		let promise = addElementToCart(id);
		console.log(promise);
		promise.then(()=>{
			let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
			let allProductInCart = localStorageUtil.getCountOfProductsInCart();
			cartPage.render(productsInCart, allProductInCart);		

		});
	
	}

	render() {
		document.getElementById('product-title').textContent = this.name;
		document.getElementById('product-img').src = this.imageUrl;
		document.getElementById('product-img').alt = `caméra ${this.name}`;
		document.querySelector('.product-details__description').textContent = this.description;
		document.querySelector('.product-details__price').textContent ='Prix: ' + this.price.toLocaleString()+' €';
	
		let htmlSelect = '';
		this.lenses.forEach(element => {
			htmlSelect += `
				<option value = '${element}' >${element}</option>
			`;
		});
		document.getElementById('lenses').innerHTML = htmlSelect;
		
		document.getElementById('btn-buy').setAttribute("data-id", `${this.id}`);
		document.getElementById('btn-buy').onclick = this.addProductToCart;
	}
}

let productId;
// let productId1 = new URL(window.location.href).searchParams.get('id');
let url = new URL(window.location.href);

console.log(url.searchParams.get('id')); // Pourquoi????

productId = url.search.slice(2);

console.log(productId);

getProduct(productId);

