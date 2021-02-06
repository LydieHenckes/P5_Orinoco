class Cart {

	render(count, allCount) {
		document.getElementById('cart-counter').textContent = 'Articles : ' +count+ ', Quantité : '+allCount;
	}
}

const cartPage = new Cart();
let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
let allProductInCart = localStorageUtil.getCountOfProductsInCart();
cartPage.render(productsInCart, allProductInCart);