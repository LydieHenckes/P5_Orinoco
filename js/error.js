/*---------Class Error  ------------------------*/
class Error {
	//affiche le message d'erreur dans la page index.html  --- les styles sont décrits dans _pages.scss
	renderErrorProducts() {
		const html=`
			<div class="error-message">
				<h3>Désolé, il n'y a pas d'accès!</h3>
				<p>Essayez de revenir plus tard.</p>
			</div>
		`;
		document.getElementById('error-container').innerHTML = html;
	};

	//affiche le message d'erreur pour la page Product
	renderErrorProduct() {
		const html=`
			<div class = "error-message"  style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
				<div>
					<h3>Erreur de chargement!</h3>
					<p>Une erreur s'est produite lors du chargement de la page.</p>
					<p>Essayez de revenir plus tard.</p>
				</div>
			</div>
		`;
		document.getElementById('error-container').innerHTML = html;
		document.getElementById('error-container').style.position = "absolute"; 
		document.getElementById('error-container').style.width = "100%";
		document.getElementById('error-container').style.height = "100%";
		document.getElementById('error-container').style.top = "0";
		document.getElementById('error-container').style.left = "0";
	}
};

//création de l'instance de la classe Error
const errorPage = new Error();