function handleSearchEvent(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  let searchedCity = document.querySelector("#forecast-city-name");
  searchedCity.innerHTML = searchFormInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchEvent);
