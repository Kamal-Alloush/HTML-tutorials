const startBtn = document.querySelector('#start-btn');
const categoryContainer = document.querySelector('#category-container');
const questionText = document.querySelector('.questions-text');

startGame = () => {
  console.log('started');
  startBtn.classList.add('hidden');
  categoryContainer.classList.remove('hidden');
  showQuestion();
};
quizAnswer = null;
showQuestion = () => {
  let url = 'https://opentdb.com/api.php?amount=10&type=boolean';

  fetch(url)
    .then((respond) => respond.json())
    .then((data) => {
      quizAnswer = data.results[0].correct_answer;
      console.log(data);
      console.log(data.results[0].question);
      categoryContainer.innerHTML = `
      <h5 id="question" class="mx-auto text-center text-3xl font-bold dark:text-white mb-4 questions-text">${data.results[0].question}</h5>
      <div class="rounded-md shadow-sm mb-3 text-center">
                <button type="button" class="w-1/3 mt-2  py-2 text-sm text-center
                 font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg
                  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500
                   focus:bg-gray-900 focus:text-white answer">
                       True
                      </button>

                      <button type="button" class="w-1/3 mt-2
                        py-2 text-sm text-center font-medium text-gray-900 bg-transparent border
                         border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2
                          focus:ring-gray-500 focus:bg-gray-900 focus:text-white answer">
                        False
                      </button>
              </div>
      `;
      let answer = document.querySelectorAll('.answer');
      if (answer.length) {
        answer.forEach((element) => {
          answerCheck(element);
        });
      }
    });
};
console.log(quizAnswer);
const answerCheck = (element) => {
  element.addEventListener('click', (e) => {
    let button = e.target;
    if (button.innerText === quizAnswer) {
      alert('Great');
    } else {
      alert('Go home');
    }
  });
};

startBtn.addEventListener('click', startGame);
