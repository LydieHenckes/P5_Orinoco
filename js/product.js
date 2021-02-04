class Product {
	constructor(id, name, imageUrl, description, price, lenses){
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.lenses = lenses;
		this.lenseSeleted = '';
	}

	render() {
		document.getElementById('product-title').textContent = this.name;
	}
}

let productId;
 //productId = new URL(window.location.href).searchParams.get('id');
let url = new URL(window.location.href);

console.log(url.searchParams.get('id'));
productId = url.search.slice(2);

console.log(productId);

getProduct(productId);

