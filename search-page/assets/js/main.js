//http://www.omdbapi.com/?apikey=e375a452&t=
/* ----------------------------- Search-function ---------------------------- */
let applySearch = document.getElementById("addon-wrapping");
applySearch.addEventListener("click", (e) => {
  let searchTerm = document.getElementById("search-button").value;
  let searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "<p class='text-center'>Loading...</p>";

  if (!searchTerm) {
    searchResultsDiv.innerHTML =
      "<p class='alert alert-danger'>Please enter name</p>";
    return false;
  }

  handleSearchResults({term: searchTerm, page: 1})
});

const handleSearchResults = (params) => {
  const xHttp = new XMLHttpRequest();
  xHttp.open("GET", "https://www.omdbapi.com/?apikey=e375a452&s=" + params.term + "&page=" + params.page);
  xHttp.send();
  results = xHttp.responseText;
  xHttp.onload = function () {
    console.log(this.responseText);
    searchResults = JSON.parse(this.responseText).Search;
    console.log(searchResults);

    if (!searchResults) {
      searchResultsDiv.innerHTML =
        "<p class='alert alert-secondary'>No results found</p>";
      return false;
    }

    resultsHtml = "";
    for (let i = 0; i < searchResults.length; i++) {
      resultsHtml += "<div class='col-4 mb-5 pic-item'>";
      resultsHtml += "<img src='" + searchResults[i].Poster + "' width='300'>";
      resultsHtml += "<h2>" + searchResults[i].Title + "</h2>";
      resultsHtml += "<p><small>" + searchResults[i].Year + "</small></p>";
      resultsHtml += "</div>";
    }
    resultsHtml += "<div class='pagination'>";
    resultsHtml += "<a class='paginate' data-page='1' href='javascript:;'>1</a>";
    resultsHtml += "<a class='paginate' data-page='2' href='javascript:;'>2</a>";
    resultsHtml += "<a class='paginate' data-page='3' href='javascript:;'>3</a>";
    resultsHtml += "<a class='paginate' data-page='4' href='javascript:;'>4</a>";
    resultsHtml += "</div>";

    document.getElementById("searchResults").innerHTML = resultsHtml;
    console.log(resultsHtml);

    let paginateElements = document.getElementsByClassName("paginate");

  for (j = 0; j < paginateElements.length; j++) {
    this.addEventListener("click", (e) => {
      let searchTerm = document.getElementById("search-button").value;
      handleSearchResults({term: searchTerm, page: this.Attr('data-page')})
    });
  }
  };
}


