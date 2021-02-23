// quand la page s'est chargée
document.addEventListener("DOMContentLoaded", () => {
	// récupération des details de la commande, saufgardés dans LocalStorage
	const orderDetails = localStorageUtil.getOrderDetails();
	
	// ce contrôle (orderDetails !== '') est nécessaire car si l'url du post est erroné, il n'y a ni d'erreur lors fetch, ni données retournées, 
	// donc la situation quand la variable orderDetail n'existe pas dans LocalStorage, 
	// mais nous somme envoyé sur cette page de confirmation est possible 
	
	if (orderDetails !== '') { 
		// Conversion de la somme en format Eur
		const orderSumEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(orderDetails.orderSum/100);

		//création de html-code qui sera placé dans div avec id="order-details"
		document.getElementById('order-details').innerHTML = `
			<div class="row">
				<div class="col" >
					<h1>Nous vous remercions pour votre commande, ${orderDetails.orderUser}!</h1>
				</div>
			</div>
			<div class="row">
				<div class="col order-details__text" >
					<p>Numéro de commande: ${orderDetails.orderId}</p>
				</div>
			</div>
			<div class="row">
				<div class="col order-details__text">
					<p>Montant total: ${orderSumEur}</p>
				</div>
			</div>
		`;
		// suppresion des articles dans le panier et l'objectif de produit courant
		localStorageUtil.deleteAllProductsFromCart();
		localStorageUtil.deleteLensSelected();

	} else {
		document.getElementById('order-details').innerHTML = `
			<div class = "row">
				<div class="col"><h1>La commande n'était pas envoyée.</h1></div>
			</div>

		`;
	}
});
