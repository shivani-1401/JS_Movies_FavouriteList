let moviesList = [];
let favouriteMovies = [];
function getMovies() {
	return fetch('http://localhost:3000/movies').then(
		response => {
			if (response.status == 200) {
				return response.json();
			}
		}).then(moviesListResponse => {
			moviesList = moviesListResponse;
			displayMoviesList(moviesList);
			return moviesListResponse;
		}).catch(error => {
			return error;
		});
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(response => {
		if (response.status == 200) {
			return response.json();
		}
	}).then(favouriteMoviesResponse => {
		favouriteMovies = favouriteMoviesResponse;
		displayFavouriteMovies(favouriteMovies);
		return favouriteMoviesResponse;
	}).catch(error => {
		return error;
	})
}

function addFavourite(id) {
	let movieName = moviesList.find(movie => {
		if (movie.id == id) {
			return movie;
		}
	});
	let favExists = favouriteMovies.find(favMovie => {
		if (favMovie.id == movieName.id) {
			return favMovie;
		}
	});
	if (favExists) {
		return Promise.reject(new Error('Movie is already added to favourites'));
	} else {
		return fetch(`http://localhost:3000/favourites`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(movieName)
		}
		).then(response => {
			if (response.status == 200) {
				return response.json();
			}
		}).then(addedMovie => {
			favouriteMovies.push(addedMovie);
			displayFavouriteMovies(favouriteMovies);
			return favouriteMovies;
		});
	}
}

function displayMoviesList(moviesList) {
	//DOM Manipulation to ass movied in the list
	let listMovie = document.getElementById('moviesList');
	let htmlString = '';

	moviesList.forEach(movie => {
		htmlString += `
        SerialNumber<li>${movie.id}</li>
			  Title<li>${movie.title}</li>
        <img src='${movie.posterPath}'>
        <li><button class='btn-primary' onclick='addFavourite(${movie.id})'>AddToFavourites</button><li>
		`
	});

	listMovie.innerHTML = htmlString;
}

function displayFavouriteMovies(favouriteMovies) {
	//DOM manipulation to add favourite movies in the list
	let listFavourites = document.getElementById('favouritesList');
	let htmlString = '';

	favouriteMovies.forEach(movie => {
		htmlString += `
        SerialNumber<li>${movie.id}</li>
			  <li>${movie.title}</li>
			  <img src='${movie.posterPath}'>
		`
	});

	listFavourites.innerHTML = htmlString;
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};