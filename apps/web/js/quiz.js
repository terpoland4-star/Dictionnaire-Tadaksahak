import { state } from './state.js';
import { i18n } from './i18n-data.js';
import { afficherDashboard } from './ressources.js';
import { escapeHtml } from './utils.js';

export async function chargerQuiz() {
  try {
    const response = await fetch('data/quiz.json');
    if (!response.ok) throw new Error();
    state.quizData = await response.json();
  } catch(e) {
    console.warn("Quiz non disponible, utilisation fallback", e);
    state.quizData = { fr: [{ question: "Exemple ?", options: ["A","B","C"], reponse: 0 }] };
  }
  const container = document.getElementById("quizContainer");
  if (container) container.innerHTML = `<button id="startQuizBtn" class="btn">${i18n[state.currentLanguage].quiz_start}</button>`;
  document.getElementById("startQuizBtn")?.addEventListener("click", () => demarrerQuiz());
}

export function demarrerQuiz() {
  const lang = state.currentLanguage;
  if (!state.quizData || !state.quizData[lang]) return;
  state.currentQuiz = {
    questions: state.quizData[lang],
    currentIndex: 0,
    score: 0,
    lang: lang
  };
  afficherQuestionQuiz();
}

export function afficherQuestionQuiz() {
  const container = document.getElementById("quizContainer");
  if (!container) return;
  const q = state.currentQuiz.questions[state.currentQuiz.currentIndex];
  if (!q) return terminerQuiz();
  let html = `<div class="quiz-question"><p><strong>${escapeHtml(q.question)}</strong></p><div class="quiz-options">`;
  q.options.forEach((opt, idx) => {
    html += `<button class="quiz-option" data-opt="${idx}">${escapeHtml(opt)}</button>`;
  });
  html += `</div><div class="quiz-progress">Question ${state.currentQuiz.currentIndex+1}/${state.currentQuiz.questions.length}</div></div>`;
  container.innerHTML = html;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = parseInt(e.currentTarget.dataset.opt);
      if (selected === q.reponse) state.currentQuiz.score++;
      state.currentQuiz.currentIndex++;
      afficherQuestionQuiz();
    });
  });
}

export function terminerQuiz() {
  const container = document.getElementById("quizContainer");
  const percent = (state.currentQuiz.score / state.currentQuiz.questions.length) * 100;
  let message = `${i18n[state.currentLanguage].quiz_score} : ${state.currentQuiz.score}/${state.currentQuiz.questions.length} (${Math.round(percent)}%)`;
  let progress = JSON.parse(localStorage.getItem("quizProgress")) || {};
  progress[state.currentQuiz.lang] = { score: state.currentQuiz.score, total: state.currentQuiz.questions.length, date: new Date().toISOString() };
  localStorage.setItem("quizProgress", JSON.stringify(progress));
  container.innerHTML = `<p>${message}</p><button id="restartQuizBtn" class="btn">${i18n[state.currentLanguage].quiz_restart}</button>`;
  document.getElementById("restartQuizBtn")?.addEventListener("click", () => demarrerQuiz());
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
}

// ------------------------------
// TIMELINE
// ------------------------------
