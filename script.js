const selectMoviesForDom = function (films) {
  const mapTotal = films.map((film) => film);
  return mapTotal;
};
//  Geeft een array met filmtitels, kan ook een selectie zijn.
const posterInput = selectMoviesForDom(movies);

// alle different selections in een switch (kan dus ook met een return, in combinatie met een break?):
const filterMovies = function (criteria) {
  let selectedMovies = [];
  switch (criteria) {
    case "new":
      selectedMovies = movies.filter((i) => parseInt(i.Year) >= 2014);
      break;
    case "avengers":
      selectedMovies = movies.filter((i) => i.Title.includes("Avengers"));
      break;
    case "xmen":
      selectedMovies = movies.filter((i) => i.Title.includes("X-Men"));
      break;
    case "batman":
      selectedMovies = movies.filter((i) => i.Title.includes("Batman"));
      break;
    case "princess":
      selectedMovies = movies.filter((i) => i.Title.includes("Princess"));
      break;
    default:
      selectedMovies = movies;
  }
  return selectedMovies;
};

// hieronder de function die een selectie uitkomst accepteert (de case van een radiobutton), en deze combineert met de uitkomst aan DOM toevoegen.
const handleOnChangeEvent = function (event) {
  // console.log("Event Target:", event.target.id);
  const filtered = filterMovies(event.target.id);
  // console.log(filtered);
  addMoviesToDom(filtered);
};

// de eventlistener adding button functie die de listeners aan de buttons selectie hangt. Hoeft dus niets te returnen... Is mij nog niet helemaal duidelijk waarom niet? De waarde geeft ook undefined..
const addEventListeners = function () {
  const allButtons = document.querySelectorAll("input[name='film-filter']");
  const returnValueButtons = allButtons.forEach((button) =>
    button.addEventListener("change", handleOnChangeEvent)
  );

  // console.log("alle buttons die er zijn", allButtons);
  // console.log("waarde", returnValueButtons);
  // return returnValueButtons;
};
addEventListeners();

const makeListItems = function (selectedMovies) {
  const listResult = selectedMovies.map(function (films) {
    // maakt li, voegt a (met href) en img toe en src bij img
    newListItem = document.createElement("li");
    newImdbLink = document.createElement("a");
    newLinkItem = document.createElement("img");
    newImdbLink.setAttribute(
      "href",
      "https://www.imdb.com/title/" + films.imdbID
    );
    newLinkItem.setAttribute("src", films.Poster);
    // console.log("newLinkItem:", newLinkItem);
    newListItem.appendChild(newImdbLink);
    newImdbLink.appendChild(newLinkItem);
    // console.log("newImdbLink:", newImdbLink);
    return newImdbLink;
  });
  // console.log("output = empty! List Item", listResult);
  return listResult;
};
// Ik snap ook nog niet helemaal hoe de timing zit van de vertaling naar de DOM toe. Mijn addMoviesToDom van hieronder en ook makeListItems hierboven geven een lege lijst in de console.logs..

const addMoviesToDom = function (selectionMovies) {
  // console.log("selectie movies:", selectionMovies);

  const parentFilmList = document.getElementById("selectedFilmsList");
  parentFilmList.innerHTML = "";
  const selectedListItems = makeListItems(selectionMovies);

  selectedListItems.forEach((listItem) => parentFilmList.appendChild(listItem));
  // console.log("iteration add movies to dom, ook empty!", selectedListItems);
};

// voer dit uit om de films te laden als je voor het eerst de pagina laadt. Dit hoeft maar 1 keer.. ->

const filtered = filterMovies();
// console.log(filtered);
addMoviesToDom(filtered);
