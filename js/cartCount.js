/*--------- Classe CartCount-------------- */
// 
class CartCount {
	showCartCount(count, allCount) {
		document.getElementById('cart-counter').textContent = 'Panier ('+allCount+')';
	}
}
const cartCountPage = new CartCount();
let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
let allProductInCart = localStorageUtil.getCountOfProductsInCart();
cartCountPage.showCartCount(productsInCart, allProductInCart);