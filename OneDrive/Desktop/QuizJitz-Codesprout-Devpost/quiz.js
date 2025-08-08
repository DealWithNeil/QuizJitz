// quiz.js
import { quizData } from './data.js';

const selectedCategory = localStorage.getItem("selectedCategory");

if (!selectedCategory || !quizData[selectedCategory]) {
  alert("Invalid category! Redirecting...");
  window.location.href = "index.html";
}

// Apply theme
const themeMap = {
  mathematics: "math-theme",
  science: "science-theme",
  technology: "tech-theme",
  philosophy: "philo-theme",
  arts: "arts-theme",
  engineering: "eng-theme",
  psychology: "psych-theme",
  geography: "geo-theme"
};

document.body.classList.add(themeMap[selectedCategory] || "");

let questions = [...quizData[selectedCategory]];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;


function loadQuestion() {
  const questionObj = questions[currentIndex];
  document.getElementById("question").textContent = questionObj.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionObj.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => handleAnswer(option, questionObj.answer);
    optionsContainer.appendChild(btn);
    clearInterval(timer); // reset previous timer
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
    clearInterval(timer);
    handleAnswer("", questions[currentIndex].answer); // auto move to next
    }
   }, 1000);

  });
}

 function updateProgressBar() {
  const percent = ((currentIndex + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}


function handleAnswer(selected, correct) {
  clearInterval(timer);

  const options = document.querySelectorAll(".option-btn");
  options.forEach(btn => {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selected === correct) score++;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      localStorage.setItem("finalScore", score);
      window.location.href = "results.html";
    }
  }, 1000); // 1 second delay for feedback
}


updateProgressBar();
window.onload = loadQuestion;
