class Cart {

	render() {
		const productsInCart = localStorageUtil.getProductsInCart();
		let htmlProducts = '';
		let sumTotal = 0;
		productsInCart.forEach(({id, name, count, price}) => {
			let sum =0;
			sum = count*price;
			htmlProducts +=`
				<tr>
					<td class="cart-element__name">${name}</td>
					<td class="cart-element__count">${count} x </td>
					<td class = "cart-element__price">${price.toLocaleString()} €</td>
					<td class="cart-element__sum">${sum.toLocaleString()} €</td>
					<td><button class ="cart-element__delete" data-id ="${id}">Supprimer</button></td>
				</tr>			
			`;
			sumTotal += price*count;
		});
		
		const html = `
			<div>
				<table>
					${htmlProducts}
					<td class = "cart-element__name">Total</td>
					<td class="cart-element__count"></td>
					<td class="cart-element__sum"></td>
					<td class = "cart-element__allsum">${sumTotal.toLocaleString()} €</td>
				</table>
			<div>
		`;
		document.getElementById('cart-container').innerHTML = html;
	}
}

const cartPage = new Cart();

cartPage.render();