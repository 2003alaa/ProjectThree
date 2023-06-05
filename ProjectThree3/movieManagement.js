import { readFile, writeFile } from './fileHandling.js';
import { fetchMovieData } from './api.js';

const JSON_FILE_PATH = 'movies.json';

class Movie {
  constructor(title, director, releaseYear, genre) {
    this.title = title;
    this.director = director;
    this.releaseYear = releaseYear;
    this.genre = genre;
  }
}

async function getMoviesFromCatalog() {
  try {
    const moviesData = await readFile(JSON_FILE_PATH);
    return JSON.parse(moviesData);
  } catch (error) {
    console.error('Failed to read movie catalog:', error);
    return [];
  }
}

async function saveMoviesToCatalog(movies) {
  try {
    await writeFile(JSON_FILE_PATH, JSON.stringify(movies));
    console.log('Movie catalog updated successfully!');
  } catch (error) {
    console.error('Failed to update movie catalog:', error);
  }
}

function addMovieToCatalog(movie) {
  getMoviesFromCatalog()
    .then((movies) => {
      movies.push(movie);
      saveMoviesToCatalog(movies);
    })
    .catch((error) => console.error('Failed to add movie:', error));
}

function updateMovieDetailsInCatalog(index, updatedMovie) {
  getMoviesFromCatalog()
    .then((movies) => {
      if (index >= 0 && index < movies.length) {
        movies[index] = updatedMovie;
        saveMoviesToCatalog(movies);
      } else {
        console.error('Invalid movie index.');
      }
    })
    .catch((error) => console.error('Failed to update movie:', error));
}

function deleteMovieFromCatalog(index) {
  getMoviesFromCatalog()
    .then((movies) => {
      if (index >= 0 && index < movies.length) {
        movies.splice(index, 1);
        saveMoviesToCatalog(movies);
      } else {
        console.error('Invalid movie index.');
      }
    })
    .catch((error) => console.error('Failed to delete movie:', error));
}

export {
  Movie,
  getMoviesFromCatalog,
  addMovieToCatalog,
  updateMovieDetailsInCatalog,
  deleteMovieFromCatalog,
  fetchMovieData,
};
