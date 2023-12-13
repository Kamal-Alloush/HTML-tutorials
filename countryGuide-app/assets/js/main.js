let searchBtn = document.querySelector("#search-btn");
let countryInput = document.querySelector("#search-input");
// let result = document.querySelector(".result");

searchBtn.addEventListener("click", () => {
        let countryName = countryInput.value;
     
        let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
        console.log(finalUrl);
        fetch(finalUrl)
                .then((response) => response.json())
                .then((data) => {
                        result.innerHTML = ` 
                        
                          <img id="flag" src="${data[0].flags.svg}" alt="country-flag">
                <h2 id="country-name">
                        ${data[0].name.common}
                </h2>
                <span class="country-detail">
                        <p>Capital :</p>
                        <p> ${data[0].capital[0]} </p>
                </span>
                
                <span class="country-detail">
                        <p>Continent : </p>
                        <p> ${data[0].continents} </p>
                </span>
                
                <span class="country-detail">
                        <p>Population : </p>
                        <p>  ${data[0].population} </p>
                </span>
                
                <span class="country-detail">
                        <p>Currency : </p>
                        <p> ${data[0].currencies[Object.keys(data[0].currencies)].name}
                         - ${Object.keys(data[0].currencies)[0]} </p>
                </span>

                <span class="country-detail">
                        <p>Common languages : </p>
                        <p> ${Object.values(data[0].languages)
                                        .toString()
                                        .split(",")
                                        .join(", ")} </p>
                </span>`;
                })
                .catch(() => {
                        if (countryName.length == 0) {
                                result.innerHTML = `
                                <h3> The input field can't be empty </h3>`;
                        } else {
                                result.innerHTML = `
                                <h3> The country name is not valid  </h3>`;
                        }
                });
});