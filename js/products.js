class Products {

	render(data) {
		 
		let htmlCatalog= '';
		data.forEach(({ _id, name, price, imageUrl, description}) => {
			const pageUrl = 'source/product.html?='+_id;
			
			htmlCatalog += `
				<a href='${pageUrl}' class="products-element">
					<span class="products-element__name">${name}</span>
					<img class="products-element__img" src = "${imageUrl}"/>
					<p class="products-element__description">${description}</p>
					<span class="products-element__price">${price.toLocaleString()} €</span>
				</a>
			`;

		});

		document.getElementById('products').innerHTML = htmlCatalog;
	}
}
