function main() {
	for (const button of document.querySelectorAll('.form-submit-button-close')) {
		button.addEventListener('click', () => {
			button.parentElement.parentElement.parentElement.classList.add('hidden');
		});
	}

	// Evento iniciar sesión.
	document.getElementById('load-account-submit').addEventListener('click', () => {
		const username = document.getElementById('load-account-username');
		const password = document.getElementById('load-account-password');
		fetch(`http://localhost:3000/user/search?username=${username.value}&password=${password.value}`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
				username.value = '';
				password.value = '';
				document.getElementById('load-account-container').classList.add('hidden');
				console.log(data);
				user.id = data['id'];
				user.login = true;
				user.coins = data['coins'];
			})
			.catch(error => {
				console.error('Unable to fetch data:', error);
			});
	});

	fetch('../options.json')
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then(data => {
			initGame(data);
		})
		.catch(error => {
			alert('¡Error al cargar los datos del juego!');
			console.error('Unable to fetch data:', error)
		});

	/* -- Prueba de base de datos (obtener todos los usuarios cargados) -- */
	fetch('http://localhost:3000/user/all')
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.error('Unable to fetch data:', error)
		});
	/* ------------------------------------------------------------------ */

	/* -- Testeo de la API -- */
	fetch('http://localhost:3000/pagani')
	.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			return res.text();
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.error('Unable to fetch data:', error)
		});
	/* ------------------------ */
}

window.addEventListener('load', main);
