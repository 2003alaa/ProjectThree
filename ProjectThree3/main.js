// import { getMoviesFromCatalog, addMovieToCatalog, updateMovieDetailsInCatalog, deleteMovieFromCatalog } from './movieManagement.js';

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
import { getMoviesFromCatalog, addMovieToCatalog, updateMovieDetailsInCatalog, deleteMovieFromCatalog, Movie } from './movieManagement.js';
import { createInterface } from 'readline';
// import {file} from './fileHandling.js';
import {fetchMovieData}from "./api.js";
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMovieCatalog(movies) {
  if (movies.length === 0) {
    console.log('The movie catalog is empty.');
  } else {
    console.log('Movie Catalog:');
    for (const [index, movie] of movies.entries()) {
      console.log(`${index + 1}. ${movie.title} (${movie.releaseYear}) - ${movie.director}`);
      console.log(`   Genre: ${movie.genre}`);
    }
  }
}

function displayMenu() {
  console.log('===== Movie Catalog Menu =====');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Fetch Movie Data');
  console.log('6. Exit');
}

function handleMenuSelection(selection) {
  switch (selection) {
    case '1':
      getMoviesFromCatalog().then(displayMovieCatalog);
      break;
    case '2':
      promptAddMovie();
      break;
    case '3':
      promptUpdateMovie();
      break;
    case '4':
      promptDeleteMovie();
      break;
    case '6':
      exitApp();
      break;
      //
    case '5':
      fetchMovieData();
      break;
      
    default:
      console.log('Invalid selection. Please try again.');
  }
}

function promptAddMovie() {
  readline.question('Enter movie title: ', (title) => {
    readline.question('Enter movie director: ', (director) => {
      readline.question('Enter movie release year: ', (releaseYear) => {
        readline.question('Enter movie genre: ', (genre) => {
          const movie = new Movie(title, director, releaseYear, genre);
          addMovieToCatalog(movie);
          console.log('Movie added successfully!');
          displayMenu();
          promptMenuSelection();
        });
      });
    });
  });
}

function promptUpdateMovie() {
  getMoviesFromCatalog()
    .then((movies) => {
      displayMovieCatalog(movies);
      readline.question('Enter the index of the movie to update: ', (index) => {
        if (index >= 1 && index <= movies.length) {
          readline.question('Enter updated movie title: ', (title) => {
            readline.question('Enter updated movie director: ', (director) => {
              readline.question('Enter updated movie release year: ', (releaseYear) => {
                readline.question('Enter updated movie genre: ', (genre) => {
                  const updatedMovie = new Movie(title, director, releaseYear, genre);
                  updateMovieDetailsInCatalog(index - 1, updatedMovie);
                  console.log('Movie details updated successfully!');
                  displayMenu();
                  promptMenuSelection();
                });
              });
            });
          });
        } else {
          console.log('Invalid movie index. Please try again.');
          displayMenu();
          promptMenuSelection();
        }
      });
    })
    .catch((error) => console.error('Failed to update movie:', error));
}

function promptDeleteMovie() {
  getMoviesFromCatalog()
    .then((movies) => {
      displayMovieCatalog(movies);
      readline.question('Enter the index of the movie to delete: ', (index) => {
        if (index >= 1 && index <= movies.length) {
          deleteMovieFromCatalog(index - 1);
          console.log('Movie deleted successfully!');
        } else {
          console.log('Invalid movie index. Please try again.');
        }
        displayMenu();
        promptMenuSelection();
      });
    })
    .catch((error) => console.error('Failed to delete movie:', error));
}

function promptMenuSelection() {
  readline.question('Select an option (1-5): ', (selection) => {
    handleMenuSelection(selection);
  });
}

function exitApp() {
  console.log('Exiting Movie Catalog CLI Application...');
  readline.close();
}

function startApp() {
  displayMenu();
  promptMenuSelection();
}

export { startApp };
