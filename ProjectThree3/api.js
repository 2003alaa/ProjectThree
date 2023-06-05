import fetch from 'node-fetch';
import { Movie, addMovieToCatalog } from './movieManagement.js';

const API_KEY = 'YOUR_API_KEY';
const API_URL = `https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies?${API_KEY}`;

async function fetchMovieData() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const movies = await response.json();
      for (const movieData of movies) {
        const { title, director, releaseYear, genre } = movieData;
        const movie = new Movie(title, director, releaseYear, genre);
        addMovieToCatalog(movie);
      }
    } else {
      console.error('Failed to fetch movie data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
  }
}

export { fetchMovieData };
