document.addEventListener("DOMContentLoaded", () => {
	const orderDetails = localStorageUtil.getOrderDetails();
	console.log(orderDetails);
	if (orderDetails !== '') {
		const orderSumEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(orderDetails.orderSum/100);

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
