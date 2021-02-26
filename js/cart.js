/* ------------------ Classe Cart l----------*/
//   permet d'afficher le contenu du panier sur la page cart.htm
//   ajoute la possibilité de supprimer un produit du panier

class Cart {
	// fonction supprime un produit du panier est appéllée lors d'un click sur le btn avec icône poubelle - <i class="far fa-trash-alt"></i>
	deleteProduct(element) {
		//récupération de id du produit qui est saufgardé dans l'attribut universel data-id
		let id = element.getAttribute("data-id");

		//récupération de l'objectif du produit qui est saufgardé dans l'attribut universel data-lens
		let lensSelected = element.getAttribute("data-lens");
		
		// f décrite dans util.js supprime le produit de panier
		deleteElementFromCart(id, lensSelected);
		
		// actualise le panier sur la page
		this.render();

		// actualise la quantité de produits dans le panier dans le header
		let productsInCart = localStorageUtil.getCountOfProductsTypeInCart();
		let allProductInCart = localStorageUtil.getCountOfProductsInCart();
		cartCountPage.showCartCount(productsInCart, allProductInCart);
	}

	// fonction affiche le contenu de panier sur la page
	render() {
		// récupération de l'array des produits saufgardés dans LocalStorage
		const productsInCart = localStorageUtil.getProductsInCart();

		let htmlProducts = '';
		let sumTotal = 0;

		//dans tout l'array pour chaque élémént:
		productsInCart.forEach(({id, name, count, price, lenses, lensSelected}) => {
			// transformation de prix dans le format Eur
			const priceEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(price/100);
			
			// le somme à payer pour un produit en tenant compte sa quantité
			let sum =0;
			sum = count*price;
			// transformation de somme en format Eur
			const sumEur = new Intl.NumberFormat("fr", {
				style: "currency",
				currency: "EUR",
				minimumFractionDigits: 2
			}).format(sum/100);

			// création du code html avec les données sur le produit de cette itération
			htmlProducts +=`
				<div class = "row mt-2 p-2 cart-element" style = "border-bottom: 2px solid #6C757D!important;">
					<div class="col-4 cart-element__name">
						<div class="fw-bold">${name}</div>
						<span>${lensSelected}</span>
					</div>
					<div class="col-1 col-sm-2 cart-element__count">${count} x </div>
					<div class = "col-3 col-sm-2 cart-element__price text-end">${priceEur}</div>
					<div class="col-4 col-sm-2 cart-element__sum text-end">${sumEur}</div>
					<div class = "col-12 col-sm-2 cart-element__delete text-end"><button class = "btn cart-element__delete-btn" style="background-color: #d4c7d2;"
						data-id ="${id}" data-lens ="${lensSelected}" 
						onclick = "cartPage.deleteProduct(this)"><i class="far fa-trash-alt"></i></button></div>
				</div>			
			`;
			sumTotal += price*count;
		});

		const sumTotalEur = new Intl.NumberFormat("fr", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2
		}).format(sumTotal/100);

		// la variable text contiendra "Votre panier est vide" ou "Total" en prenant compte le contenu du panier
		let text;
		let textSumTotal;

		if (productsInCart.length === 0) {
			text = 'Votre panier est vide!';
			textSumTotal = '';
		} else {
			text = 'Total';
			textSumTotal = sumTotalEur;
		}
		// le code html comprend la liste des produit - htmlProducts et le text sous la liste  
		const html = `
			${htmlProducts}
			<div class="row p-3">
	 			<div class = "col-6 text-end ">${text}</div>
				<div class = "col-6 text-start fw-bold" id="sumTotalEur">${textSumTotal}</div>
			</div>
		`;
	
		document.getElementById('cart-container').innerHTML = html;

		// le btn Commander et payer apparetera si il y a des produits dans le panier
		let htmlButtonPay = `	`;
		if (productsInCart.length !== 0) {
			htmlButtonPay = `
				<div class = "cart-pay">Commander et payer</div>
			`;
		};
		document.getElementById('cart-pay').innerHTML = htmlButtonPay;

		// affiche le formulaire
		document.getElementById("cart-pay").addEventListener("click", () => {
			document.getElementById("form-frame").classList.add("active");
 			// window.scrollTop(0);
		});
	}
}

const cartPage = new Cart();
cartPage.render();

// controle de la saisie des champs de formulaire avec l'API de contraintes HTML 5
// à chaque événement quand la touche est relachée, même fonctionnement pour tous les champs du formulaire

const firstName = document.getElementById("inputFirstName");
firstName.addEventListener("keyup", () => {
	if(firstName.validity.patternMismatch) {
		firstName.setCustomValidity("Veuillez renseigner un prénom valid...");
		// si la saisie ne correspond pas à pattern, ajout de classe _alert
		firstName.classList.add('_alert');
	} else {
		firstName.setCustomValidity("");
		firstName.classList.remove('_alert');
	}
 });

 const lastName = document.getElementById("inputLastName");
 lastName.addEventListener("keyup", () => {
	if(lastName.validity.patternMismatch) {
		lastName.setCustomValidity("Veuillez renseigner un nom valid...");
		lastName.classList.add('_alert');
	} else {
		lastName.setCustomValidity("");
		lastName.classList.remove('_alert');
	}
 });

 const address = document.getElementById("address");
 address.addEventListener("keyup", () => {
	if(address.validity.patternMismatch) {
		address.setCustomValidity("Veuillez renseigner une adresse valide...");
		address.classList.add('_alert');
	} else {
		address.setCustomValidity("");
		address.classList.remove('_alert');
	}
 });

 const city = document.getElementById("city");
 city.addEventListener("keyup", () => {
	if(city.validity.patternMismatch) {
		city.setCustomValidity("Veuillez renseigner une ville valide...");
		city.classList.add('_alert');
	} else {
		city.setCustomValidity("");
		city.classList.remove('_alert');
	}
 });

 const codePostal = document.getElementById("codePostal");
 codePostal.addEventListener("keyup", () => {
	if(codePostal.validity.patternMismatch) {
		codePostal.setCustomValidity("Veuillez renseigner un code postal valid...");
		codePostal.classList.add('_alert');
	} else {
		codePostal.setCustomValidity("");
		codePostal.classList.remove('_alert');
	}
 });

 //email
 const email = document.getElementById("email");
 email.addEventListener("keyup", () => {
	if(email.validity.patternMismatch) {
		email.setCustomValidity("Veuillez renseigner une adresse mail...");
		email.classList.add('_alert');
	} else {
		email.setCustomValidity("");
		email.classList.remove('_alert');
	}
 });


 // ajoute l'écoute de l'événement DOMContentLoaded qui est emis quand le document html est chargé
document.addEventListener('DOMContentLoaded', () => {

	const formFrame = document.getElementById('form-frame');
	// div avec id="close" - le croix pour fermer le formulaire
	const closeElement = document.getElementById('close');

	// lors du click, la classe "active" du formulaire est enlevée, et il disparaît avec visibilité: hidden; et la page est actualisée
	closeElement.addEventListener('click', () =>{
		formFrame.classList.remove("active");
		cartPage.render();
	});

//l'interception de l'événement d'envoi des données 
	const form = document.getElementById('form-confirmation');
	form.addEventListener('submit', formSend);

	// fonction d'envoie du formulaire
	async function formSend(e) {
		// interdiction l'événement standard
		e.preventDefault();

		//fonction de recupération des données du forme
		function getContact(form) {
			// création de l'objet contact qui sera retourné 
			let contact = { 
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				address: form.address.value,
				city: form.city.value,
				email: form.email.value
		   };
		   contact.city += form.codePostal.value;
			return contact;
		}

		//récupéreatuin des données du contact
		let contact = getContact(form); 

		//l'array products contiendra les Id des produits du panier, récupérés de LocalStorage
		const productsInCart = localStorageUtil.getProductsInCart();
		let products = productsInCart.map(item => item.id);

		// la somme de la commande sera saufgardé dans orderDetails dans LocalStorage
		let orderSum = 0;
		productsInCart.forEach(item => {
			orderSum += item.price * item.count;
		});

		// création de l'objet qui sera envoyé au serveur
		let order = {contact, products};

		// supprimer les données de l'ancienne commande 
		localStorageUtil.deleteOrderDetails();
		
		// decrite dans utils.js envoie les données au serveur
		await sendOrder(order, orderSum);

		// ouverture de la page de confirmation
		window.location.href = "confirmation.html";
	}

});