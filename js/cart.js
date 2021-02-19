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
		//	$(window).scrollTop(0);
		});
	}
}

const cartPage = new Cart();
cartPage.render();

// controle de la saisie des champs de formulaire avec l'API de contraintes HTML 5

const firstName = document.getElementById("inputFirstName");
firstName.addEventListener("keyup", function (event) {
	if(firstName.validity.patternMismatch) {
		firstName.setCustomValidity("Veuillez renseigner un prénom valid...");
		firstName.classList.add('_alert');
	} else {
		firstName.setCustomValidity("");
		firstName.classList.remove('_alert');
	}
 });

 const lastName = document.getElementById("inputLastName");
 lastName.addEventListener("keyup", function (event) {
	if(lastName.validity.patternMismatch) {
		lastName.setCustomValidity("Veuillez renseigner un nom valid...");
		lastName.classList.add('_alert');
	} else {
		lastName.setCustomValidity("");
		lastName.classList.remove('_alert');
	}
 });

 const address = document.getElementById("address");
 address.addEventListener("keyup", function (event) {
	if(address.validity.patternMismatch) {
		address.setCustomValidity("Veuillez renseigner une adresse valide...");
		address.classList.add('_alert');
	} else {
		address.setCustomValidity("");
		address.classList.remove('_alert');
	}
 });

 const city = document.getElementById("city");
 city.addEventListener("keyup", function (event) {
	if(city.validity.patternMismatch) {
		city.setCustomValidity("Veuillez renseigner une ville valide...");
		city.classList.add('_alert');
	} else {
		city.setCustomValidity("");
		city.classList.remove('_alert');
	}
 });

 const codePostal = document.getElementById("codePostal");
 codePostal.addEventListener("keyup", function (event) {
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
 email.addEventListener("keyup", function (event) {
	if(email.validity.patternMismatch) {
		email.setCustomValidity("Veuillez renseigner une adresse mail...");
		email.classList.add('_alert');
	} else {
		email.setCustomValidity("");
		email.classList.remove('_alert');
	}
 });

document.addEventListener('DOMContentLoaded', () => {

	const formFrame = document.getElementById('form-frame');
	const closeElement = document.getElementById('close');

	closeElement.addEventListener('click', () =>{
		formFrame.classList.remove("active");
		cartPage.render();
	});
//l'interception de l'événement d'envoi des données 
	const form = document.getElementById('form-confirmation');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		// interdiction d'envoi standard
		e.preventDefault();

		//fonction de recupération des données du forme
		function getContact(form) {
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

		//les données du contact
		let contact = getContact(form); 
		//les Id des produits
		const productsInCart = localStorageUtil.getProductsInCart();
		let products = productsInCart.map(item => item.id);
//		console.log('массив: ', products);
		let orderSum = 0;
		productsInCart.forEach(item => {
			orderSum += item.price;
		});
	//	console.log('Сумма заказа', orderSum);
		let order = {contact, products};
//		console.log('zakaz', order);
		await sendOrder(order, orderSum);

		
		window.location.href = "confirmation.html";
	}

});