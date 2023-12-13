let applySearch = document.getElementById("addon-wrapping"); //id = search span /
applySearch.addEventListener("click", (e) => {
  processSearch(e);
});

let searchForms = document.getElementById("search-form");
searchForms.addEventListener("submit", (e) => {
  e.preventDefault();
  processSearch(e);
});

const processSearch = (e) => {
  let searchTerm = document.getElementById("search-button").value; //id = input /
  let searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "<p class = 'text-center'>Loading...</p>";

  if (!searchTerm) {
    searchResultsDiv.innerHTML =
      "<p class ='alert alert-danger'>Please add value</p>";
    return false;
  }

  handleSearchResults({ term: searchTerm, page: 1 });
}

const handleSearchResults = (params) => {
  const xHttp = new XMLHttpRequest();
  xHttp.open(
    "GET",
    "https://www.omdbapi.com/?apikey=e375a452&s=" +
      params.term +
      "&page=" +
      params.page
  );
  xHttp.send();
  results = xHttp.responseText;
  xHttp.onload = function () {
   
    jsonResult = JSON.parse(this.responseText);
    searchResults = jsonResult.Search;
 
    const pic = document.querySelector('.box-slied');
    function showImage() {
      let a = Math.floor(Math.random(xHttp.responseText.Poster) * xHttp.responseText.Poster.length);
      let img = xHttp.responseText.Poster[a];
      pic.style.backgroundImage = img;
  }

  setInterval(showImage, 1000);

    if (!searchResults) {
      searchResultsDiv.innerHTML =
        "<p class='alert alert-secondary'>No results found</p>";
      return false;
    }

    let countResults = jsonResult.totalResults;

    resultsHtml = "";
    resultsHtml += "<h2>Results found ("+ countResults +")</h2>"
    resultsHtml += "<section class='splide' aria-label='Movies Carousel'>";
    resultsHtml += "<div class='splide__track'>";
    resultsHtml += "<ul class='splide__list'>";
    for (let i = 0; i < searchResults.length; i++) {
      resultsHtml += "<li class='splide__slide pic-item'>";
      resultsHtml +=
        "<img src='" + searchResults[i].Poster + "' style='width:100%;'>";
      resultsHtml += "<h2>" + searchResults[i].Title + "</h2>";
      resultsHtml += "<p><small>" + searchResults[i].Year + "</small></p>";
      resultsHtml += "</li>";
    }
    resultsHtml += "</ul>";
    resultsHtml += "</div>";
    resultsHtml += "</section>";
    resultsHtml += "<div class='pagination container flex-wrap'>";
    // get the real pages count by dividing the count results on 10
    let countPages = Math.ceil(countResults / 10);
    for (let k = 1; k <= countPages; k++) {
      resultsHtml +=
      "<a class='paginate btn btn-outline mr-2 mb-2' data-page='"+k+"' href='javascript:;'>"+k+"</a>";
    }
    resultsHtml += "</div>";

    document.getElementById("searchResults").innerHTML = resultsHtml;

    var splide = new Splide(".splide", {
      perPage: 3,
      gap: "2rem",
      breakpoints: {
        640: {
          perPage: 2,
          gap: ".7rem",
          height: "6rem",
        },
        480: {
          perPage: 1,
          gap: ".7rem",
          height: "6rem",
        },
      },
    });

    splide.mount();

    let paginateElements = document.querySelectorAll('.paginate');
    paginateElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        handleSearchResults({ term: params.term, page: item.dataset.page });
      });
    })

  };
};


