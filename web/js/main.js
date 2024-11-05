document.querySelector('[data-load-account-submit]').addEventListener('click', () => {
});

function main() {
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
	fetch('http://localhost:3000/pagani/')
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
