//function qui affiche les produits sur la page index.html, en créant un objet Products (class decrit dans produits.js) avec sa méthode render() 

function render(data) {
	const  productsPage = new Products();
	productsPage.render(data);
}

// function (décrite dans utils.js) récupère la liste des produits et 
// appelle render() pour afficher les produits

getProducts();

