class Cart {

	deleteProduct(element) {
		let id = element.getAttribute("data-id");
		let lensSelected = element.getAttribute("data-lens");
		console.log(id, lensSelected);
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
			htmlProducts +=`
				<tr>
					<td class="cart-element__name">${name} / ${lensSelected}</td>
					<td class="cart-element__count">${count} x </td>
					<td class = "cart-element__price">${price.toLocaleString()} €</td>
					<td class="cart-element__sum">${sum.toLocaleString()} €</td>
					<td><button class = cart-element__delete" 
						data-id ="${id}" data-lens ="${lensSelected}" 
						onclick = "cartPage.deleteProduct(this)">Supprimer</button></td>
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