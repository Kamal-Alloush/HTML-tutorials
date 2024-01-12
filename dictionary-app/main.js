const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.input-box');
const sound = document.querySelector('#sound');
const searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', () => {
  inputValue = document.querySelector('#search-input').value;

  fetch(`${url}${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = ` 
               <div class="word-input" id="">
                 <h3>${inputValue}</h3>
                 <button onclick="playSound()" id="voice-btn">
                 <i class="fa fa-volume-up fa-2x" aria-hidden="true"></i>
                 </button>
               </div>
                
                <div class="details">
                  <p> ${data[0].meanings[0].partOfSpeech} </p>
                  <p>${data[0].phonetic}</p>
                </div>
                <div class="result-box">
                  <p class="word-search-result">
                  ${data[0].meanings[0].definitions[0].definition}
                 </p>
                <p class="example-result">
                ${data[0].meanings[0].definitions[0].example || ''}
                  </p>
                </div>   
                       `;
      sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
      console.log(sound);
    })
    .catch(() => {
      result.innerHTML = `<h3 class ="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
