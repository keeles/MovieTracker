// DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const filter = document.querySelectorAll("input")[1];
const myMovieList = document.querySelector("ul");
const myMovieHistoryDiv = document.querySelectorAll(".card-body")[1];

let myMovies = localStorage;
drawMovieList(myMovies);
drawMovieTable(myMovies);

// Functions for filter input
let searchData = "";
filter.addEventListener("keydown", (event) => {
  if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 32) {
    searchData += event.key;
    return filterMovies(myMovies, searchData);
  }
  if (event.keyCode === 8) {
    searchData = searchData.substr(0, searchData.length - 1);
    return filterMovies(myMovies, searchData);
  }
  if (searchData === "") {
    return drawMovieTable(myMovies);
  }
});

function filterMovies(object, string) {
  const userFilterText = string.toLowerCase();
  const filteredMovies = Object.keys(object).filter((m) => m.includes(userFilterText));
  const filteredMovieObject = filterMovieData(object, filteredMovies);
  drawMovieTable(filteredMovieObject);
  drawMovieList(filteredMovieObject);
}

function filterMovieData(object, array) {
  let newObj = {};
  for (const key in object) {
    if (array.includes(key)) {
      newObj[key] = object[key];
    }
  }
  return newObj;
}

// Functions for clearing input and clearing all movies if user wants to
function clearInput() {
  inp.value = "";
}

function clearMovies() {
  myMovieList.innerHTML = "";
  myMovieHistoryDiv.innerHTML = "<h5>Movie History</h5>";
  myMovies.clear();
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
  let userTypedText = inp.value.toLowerCase();
  // Increase watch counter if movie has already been added
  if (myMovies.hasOwnProperty(userTypedText)) {
    myMovies[userTypedText] = parseInt(myMovies[userTypedText]) + 1;
    drawMovieTable(myMovies);
    clearInput();
    return;
  }
  // Add new movie to the list
  myMovies[userTypedText] = 1;
  const li = document.createElement("li");
  const textToInsert = document.createTextNode(toTitleCase(userTypedText));
  li.appendChild(textToInsert);
  myMovieList.appendChild(li);
  drawMovieTable(myMovies);
  clearInput();
}

// Functions to drawMovieList and drawMovieTable for HTML

function drawMovieList(object) {
  const movieList = Object.keys(object).map((m) => `<li>${toTitleCase(m)}</li>`);
  myMovieList.innerHTML = movieList.toString().replaceAll(",", " ");
}

function drawMovieTable(object) {
  myMovieHistoryDiv.innerHTML = "<h5>Movie History</h5>";
  const table = document.createElement("table");
  myMovieHistoryDiv.appendChild(table);
  const movieTable = generateMovieTable(object);
  const movieTableString = movieTable.toString().replaceAll(",", "");
  table.innerHTML = movieTableString;
}

function generateMovieTable(object) {
  return (movieTable = Object.keys(object).map((m) => `<tr><th>${toTitleCase(m)}</th><td>${object[m]}</td></tr>`));
}

// Function to convert local storage object keys from lower case to "Title Case" for HTML
function toTitleCase(string) {
  return string
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
}
