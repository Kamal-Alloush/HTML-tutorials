// let loadFile = function (event) {
//   let image = document.getElementById('output');
//   image.src = URL.createObjectURL(event.target.files[0]);
// };

let startBtn = document.querySelector('#start-btn');
let identifyContainer = document.querySelector('.identification');
let nameBox = document.querySelector('#name');
let categoryContainer = document.querySelector('.category');
let categoryBtns = document.querySelector('.category-btns');
let answerBtns = document.querySelector('.answer-container');

let warring = document.querySelector('#warring');
let questionContainer = document.querySelector('.question-container');

startGame = () => {
  let name = nameBox.value;
  if (!name) {
    warring.innerHTML = "<p class='warring'>Please enter name</p>";
    return false;
  }

  startBtn.classList.add('hidden');

  for (let i = 0; i < name.length; i++) {
    identifyContainer.innerHTML = `<p class='name'> ${name} </p>`;
  }

  categoryContainer.classList.remove('hidden');
  categorySelected();
};

const categorySelected = () => {
  const url =
    'https://trivia-quiz-questions-api.p.rapidapi.com/api_category.php';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd9935709d4mshbda5a3edfae39b2p161af4jsnf2e04b2c1271',
      'X-RapidAPI-Host': 'trivia-quiz-questions-api.p.rapidapi.com',
    },
  };

  fetch(url, options)
    .then((respond) => respond.json())
    .then((data) => {
      let categoryArray = data.trivia_categories;
      categoryArray.forEach((element) => {
        categoryBtns.innerHTML += ` <button class="category-button" data-category="${element.id}" role="button">${element.name}</button>`;
      });

      let categorySelect = document.querySelectorAll('.category-button');
      if (categorySelect.length) {
        categorySelect.forEach((element) => {
          categoryChosen(element);
        });
      }
    });
};

let quizAnswer = null;

const questions = (categoryName) => {
  categoryContainer.classList.add('hidden');
  const url = `https://trivia-quiz-questions-api.p.rapidapi.com/api.php?amount=10&type=boolean&difficulty=easy&category=${categoryName}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd9935709d4mshbda5a3edfae39b2p161af4jsnf2e04b2c1271',
      'X-RapidAPI-Host': 'trivia-quiz-questions-api.p.rapidapi.com',
    },
  };
  fetch(url, options)
    .then((respond) => respond.json())
    .then((data) => {
      quizAnswer = data.results[0].correct_answer;
      questionContainer.innerHTML = `<h4 class="question-text">
      ${data.results[0].question}
      </h4>
      <div class="answer-container">
      <button class="answer true-btn" data-sign="True">&#10003;</button>
      <button class="answer false-btn" data-sign="False">&#9932;</button>
      
      </div>
      <div class="next-container hidden">
      <button class="next-question">Next question</button>
      </div>
      `;

      quizQuestion = questionContainer;

      let answerButtons = document.querySelectorAll('.answer');
      if (answerButtons.length) {
        answerButtons.forEach((elem) => {
          answerCheck(elem);
        });
      }
    });
};

const categoryChosen = (element) => {
  element.addEventListener('click', (e) => {
    let button = e.target;
    let categoryName = button.dataset.category;
    questions(categoryName);
  });
};

const answerCheck = (elem) => {
  elem.addEventListener('click', (e) => {
    let button = e.target;
    let buttonSign = button.dataset.sign;
    let nextBtn = document.querySelector('.next-container');
    if (buttonSign === quizAnswer) {
      document.body.classList.add('true-answer');
    } else {
      document.body.classList.add('false-answer');
    }
    nextBtn.classList.remove('hidden');
    nextBtn.addEventListener('click', () => {
      document.body.classList.remove('true-answer');
      document.body.classList.remove('false-answer');
      startGame();

    });
  });
};

startBtn.addEventListener('click', startGame);
