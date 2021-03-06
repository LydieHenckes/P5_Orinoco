/*-------------Class Products------------------- */
// affiche les produits dans l'élément html avec id = "products"
class Products {
	// fonction render qui reçoit un array des objets en paramètres  
	render(data) {
		 
		let htmlCatalog= '';
		
		// avec forEach, pour chaque élément de l'array le code html est crée avec des données correspondantes au propriétés _id, name, price, imageUrl, description des objet reçu
		data.forEach(({ _id, name, price, imageUrl, description}) => {
			const pageUrl = 'source/product.html?id='+_id;
			//transformation de prix au format eur
			const priceEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(price/100);
							
			htmlCatalog += `
				<a href='${pageUrl}' class="col-12 col-sm-12 col-md-6 col-lg-4 p-2 products-element">  
					<div class="products-frame p-3">
						<h3 class="products-element__name text-center mb-2 fw-bold">${name}</h3>
						<div class="products-element__img mb-2">
							<img  src = "${imageUrl}"/>
						</div>
						<p class="products-element__description mb-2">${description}</p>
						<div class="products-element__price text-end fw-bold">${priceEur}</div>
					</div>
				</a>
			`;
		});
		// capture de l'élément existant dans index.html ou le code html crée sera ajouté
		document.getElementById('products').innerHTML = htmlCatalog;
	}
}
