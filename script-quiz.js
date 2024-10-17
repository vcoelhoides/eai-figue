const quizData = [
  {
      question: 'Quem o nome "Presidente Figueiredo" homenageia?',
      answers: ["João Baptista de Figueiredo", "João Baptista de Figueiredo Tenreiro Aranha", "João de Figueiredo Tenreiro Aranha", "João Baptista de Figueiredo Tenreiro"],
      correct: 1
  },
  {
      question: "Quem foi o primeiro Prefeito de Presidente Figueiredo?",
      answers: ["Mario Jorge Gomes da Costa", "Luiz Santana de Souza", "João Baptista de Figueiredo Tenreiro Aranha", "Calleri Figueredo"],
      correct: 0
  },
  {
      question: "Em que dia foi fundado Presidente Figueiredo?",
      answers: ["23 de novembro de 1981", "13 de março de 1981", "29 de Julho de 1981", "10 de dezembro de 1981"],
      correct: 3
  },
  {
      question: "O que diferencia o NOSSO galo-da-serra dos outros?",
      answers: ["Uma coloração mais laranja", "Uma grande Serra laranja na Cabeça", "Uma mancha branca debaixo da asa", "O bico na cor mais amarelada"],
      correct: 2
  },
  {
      question: 'Qual o nome do autor do livro "A Ditadura Militar e o Genocídio do Povo Waimiri-Atroari"?',
      answers: ["Kamña Schwade", "Kiña Schwade", "Paulo Schwade", "Egydio Schwade"],
      correct: 3
  },
  {
      question: "Qual o nome do Padre que fez a massacre dos Waimiri-Atroari em 1986?",
      answers: ["João Calleri Giovanni", "Calleri Giovanni", "Giovanni Calleri", "João Giovanni Calleri"],
      correct: 3
  },
  {
      question: "Quando a U.H.E Balbina foi inaugurada?",
      answers: ["1970", "1989", "1986", "1980"],
      correct: 1
  },
  {
      question: "Qual o motivo da construção da U.H.E Balbina?",
      answers: ["Suprir a necessidade elétrica de Balbina", "Suprir a necessidade elétrica de Presidente Figueiredo", "Suprir a necessidade elétrica de Manaus", "Suprir a necessidade elétrica de Boa Vista"],
      correct: 2
  },
  {
      question: "Qual o maior problema ambiental da U.H.E Balbina?",
      answers: ["A repressa", "A área que foi usada para sua construção", "A poluição que ela produz", "A morte dos animais no processo de construção da U.H.E"],
      correct: 0
  },
  {
      question: "Qual a cachoeira mais longe do centro de Presidente Figueiredo?",
      answers: ["Asframa", "Iracema", "Orquídeas", "Natal"],
      correct: 3
  },
  {
      question: "Qual dessas NÃO é uma cachoeira?",
      answers: ["Urubuí", "Orquídeas", "Natal", "Iracema"],
      correct: 0
  },
  {
      question: "Onde a U.H.E Balbina se localiza?",
      answers: ["Lago de Balbina", "Rio Amazônico", "Rio Tucumã", "Rio Uatumã"],
      correct: 3
  },
  {
      question: "Qual o nome dos povos que foram massacrados durante a expedição do padre Calleri?",
      answers: ["Waimiri", "Waimiri-Atroari", "Atroari", "Kiña"],
      correct: 1
  },
  {
      question: "Qual nome significa não indígena?",
      answers: ["Waimiri", "Kamña", "Kiña", "Atroari"],
      correct: 1
  },
  {
      question: "Qual nome significa indígena?",
      answers: ["Waimiri", "Kamña", "Kiña", "Atroari"],
      correct: 2
  }
];

let shuffledQuestions, currentQuestionIndex, score, startTime;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Elementos do DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const finalTime = document.getElementById("final-time");
const leaderboardElement = document.getElementById("leaderboard");
const playerNameInput = document.getElementById("player-name");

document.getElementById("reset-leaderboard").addEventListener("click", resetLeaderboard);
document.getElementById("start-quiz").addEventListener("click", startQuiz);
document.getElementById("restart-quiz").addEventListener("click", restartQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Função para iniciar o quiz
function startQuiz() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
      alert("Por favor, insira seu nome.");
      return;
  }

  // Preparação para o quiz
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  shuffledQuestions = quizData.sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuestionIndex = 0;
  score = 0;
  startTime = new Date();
  setNextQuestion();
}

// Função para exibir próxima pergunta
function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
      endQuiz();
  }
}

// Função para exibir uma pergunta
function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => selectAnswer(index, question.correct));
      answersElement.appendChild(button);
  });
}

// Função para selecionar a resposta
function selectAnswer(selectedIndex, correctIndex) {
  const buttons = answersElement.getElementsByTagName("button");
  buttons[correctIndex].classList.add("correct");
  if (selectedIndex !== correctIndex) {
      buttons[selectedIndex].classList.add("incorrect");
  } else {
      score++;
  }
  Array.from(buttons).forEach((button) => button.disabled = true);
  nextButton.classList.remove("hidden");
}

// Função para resetar o estado
function resetState() {
  nextButton.classList.add("hidden");
  answersElement.innerHTML = "";
}

// Função para finalizar o quiz
function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  const endTime = Math.round((new Date() - startTime) / 1000); // em segundos
  finalScore.textContent = score;
  finalTime.textContent = endTime;

  // Atualiza o leaderboard
  updateLeaderboard(playerNameInput.value, score, endTime);
  displayLeaderboard();
}

// Função para reiniciar o quiz
function restartQuiz() {
  playerNameInput.value = '';
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

// Função para atualizar o leaderboard
function updateLeaderboard(name, score, time) {
  leaderboard.push({ name, score, time });
  leaderboard.sort((a, b) => b.score - a.score || a.time - b.time); // Ordenar por score e, em caso de empate, por tempo
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Função para exibir o leaderboard
function displayLeaderboard() {
  leaderboardElement.innerHTML = '';
  leaderboard.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score} pontos em ${entry.time} segundos`;
      leaderboardElement.appendChild(li);
  });
}

function resetLeaderboard() {
  localStorage.removeItem('leaderboard');
  leaderboard = [];
  displayLeaderboard();
}

