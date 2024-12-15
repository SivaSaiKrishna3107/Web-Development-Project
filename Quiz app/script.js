const questions = [
  {
    question: "Who is highest run getter in international cricket?",
    answers: [
      { text: "Sachin Tendlukhar", correct: true },
      { text: "Virat Kohli", correct: false },
      { text: "Ricky Pointing", correct: false },
      { text: "Kumar Sangakara", correct: false }
    ]
  },
  
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Who is the highest wicket taker in international cricket?",
    answers: [
      { text: "Shane Warne", correct: false },
      { text: "Muttiah Mularitharan", correct: true },
      { text: "Brett lee", correct: false },
      { text: "Jimmy Anderson", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

totalQuestionsElement.textContent = questions.length;

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }

  Array.from(answersElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  nextButton.classList.remove("hidden");
}

function setStatusClass(element, correct) {
  if (correct) {
    element.style.backgroundColor = "#4CAF50";
  } else {
    element.style.backgroundColor = "#f44336";
  }
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.textContent = "Quiz Complete!";
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = score;
  nextButton.classList.add("hidden");
  answersElement.classList.add("hidden");
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  resultContainer.classList.add("hidden");
  answersElement.classList.remove("hidden");
  showQuestion();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
showQuestion();
