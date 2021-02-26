/*--------- Classe CartCount-------------- */
// classe contient seule fonction showCartCount qui affiche le nombre total des produits dans le panier
// avec la capacité non utilisé d'aficher le nombre de produits différants (les lignes) dans le panier

class CartCount {
	showCartCount(count, allCount) {
		document.getElementById('cart-counter').textContent = 'Panier ('+allCount+')';
	}
}

//création de l'exemplaire de classe
const cartCountPage = new CartCount();

// le nombre des produits différants dans le panier 
let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();

//le nombre total des produits dans le panier
let allProductsInCart = localStorageUtil.getCountOfProductsInCart();

cartCountPage.showCartCount(productsInCart, allProductsInCart);