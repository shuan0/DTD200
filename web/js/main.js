function main() {
	document.getElementById('load-account-submit').addEventListener('click', () => {
		const username = document.getElementById('load-account-username');
		const password = document.getElementById('load-account-password');
		fetch(`http://localhost:3000/user/load?username=${username.value}&password=${password.value}`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.text();
			})
			.then(data => {
				username.value = '';
				password.value = '';
				document.getElementById('load-account-container').classList.add('hidden');
				console.log(data);
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

	// Testeo de la API del backend.
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
}

window.addEventListener('load', main);
