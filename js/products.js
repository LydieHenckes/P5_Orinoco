class Products {

	render(data) {
		 
		let htmlCatalog= '';
		data.forEach(({ _id, name, price, imageUrl, description}) => {
			const pageUrl = 'source/product.html?='+_id;
			const priceEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(price/100);

			htmlCatalog += `
				<a href='${pageUrl}' class="products-element">
					<span class="products-element__name">${name}</span>
					<img class="products-element__img" src = "${imageUrl}"/>
					<p class="products-element__description">${description}</p>
					<span class="products-element__price">${priceEur}</span>
				</a>
			`;

		});

		document.getElementById('products').innerHTML = htmlCatalog;
	}
}
