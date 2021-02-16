class Cart {

	deleteProduct(element) {
		let id = element.getAttribute("data-id");
		let lensSelected = element.getAttribute("data-lens");

		deleteElementFromCart(id, lensSelected);
		this.render();
		let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
		let allProductInCart = localStorageUtil.getCountOfProductsInCart();
		cartCountPage.showCartCount(productsInCart, allProductInCart);
	}


	render() {
		const productsInCart = localStorageUtil.getProductsInCart();
		let htmlProducts = '';
		let sumTotal = 0;
		productsInCart.forEach(({id, name, count, price, lenses, lensSelected}) => {
			let sum =0;
			sum = count*price;
			const priceEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(price/100);
			const sumEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(sum/100);
		
			htmlProducts +=`
				<tr>
					<td class="cart-element__name">${name} / ${lensSelected}</td>
					<td class="cart-element__count">${count} x </td>
					<td class = "cart-element__price">${priceEur}</td>
					<td class="cart-element__sum">${sumEur}</td>
					<td><button class = "btn cart-element__delete" style="background-color: #d4c7d2;"
						data-id ="${id}" data-lens ="${lensSelected}" 
						onclick = "cartPage.deleteProduct(this)">Supprimer</button></td>
				</tr>			
			`;
			sumTotal += price*count;
		});

		const sumTotalEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(sumTotal/100);

		const html = `
			<div>
				<table>
					${htmlProducts}
					<td class = "cart-element__name">Total</td>
					<td class="cart-element__count"></td>
					<td class="cart-element__sum"></td>
					<td class = "cart-element__allsum">${sumTotalEur}</td>
				</table>
			<div>
		`;
		document.getElementById('cart-container').innerHTML = html;

		let htmlButtonPay = `	`;
		if (productsInCart.length !== 0) {
			htmlButtonPay = `
				<div class = "cart-pay">Commander et payer</div>
			`;
		};
		document.getElementById('cart-pay').innerHTML = htmlButtonPay;
		document.getElementById("cart-pay").addEventListener("click", () => {
			document.getElementById("form-frame").classList.add("active");
		});
	}
}

const cartPage = new Cart();
cartPage.render();


document.addEventListener('DOMContentLoaded', () => {

	const formFrame = document.getElementById('form-frame');
	const closeElement = document.getElementById('close');

	closeElement.addEventListener('click', () =>{
		formFrame.classList.remove("active");
		cartPage.render();
	});

	const form = document.getElementById('form-confirmation');
	

});