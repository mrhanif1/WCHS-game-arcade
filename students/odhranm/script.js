// Gladiator Logic Arena
// This game uses plain HTML, CSS and JavaScript only.

// The questions array stores all eight GCSE-style Boolean logic challenges.
const questions = [
  {
    question: "What is the Boolean value for 'true'?",
    options: ["0", "1", "False", "Maybe"],
    answer: 1,
    explanation: "In Boolean logic, true is represented by 1.",
    equipment: "Bronze Helmet",
    topic: "Boolean Values"
  },
  {
    question: "Which expression means both conditions must be true?",
    options: ["A OR B", "NOT A", "A AND B", "A XOR B"],
    answer: 2,
    explanation: "AND requires both inputs to be true.",
    equipment: "Wooden Shield",
    topic: "AND"
  },
  {
    question: "Which expression means at least one condition is true?",
    options: ["A AND B", "A OR B", "NOT A", "A = B"],
    answer: 1,
    explanation: "OR returns true if one or both inputs are true.",
    equipment: "Iron Sword",
    topic: "OR"
  },
  {
    question: "What does NOT True evaluate to?",
    options: ["True", "False", "1", "Unknown"],
    answer: 1,
    explanation: "NOT reverses the Boolean value, so NOT True becomes False.",
    equipment: "Leather Armour",
    topic: "NOT"
  },
  {
    question: "If A = True and B = False, what is A AND B?",
    options: ["True", "False", "1", "Both"],
    answer: 1,
    explanation: "AND is only true when both inputs are true.",
    equipment: "Iron Boots",
    topic: "Truth Tables"
  },
  {
    question: "Which logic gate gives an output of 1 when either input is 1?",
    options: ["AND gate", "OR gate", "NOT gate", "XOR gate"],
    answer: 1,
    explanation: "An OR gate outputs 1 if one or both inputs are 1.",
    equipment: "Red Cape",
    topic: "Logic Gates"
  },
  {
    question: "What is the result of the expression NOT (True OR False)?",
    options: ["True", "False", "1", "Error"],
    answer: 0,
    explanation: "True OR False is True, and NOT True is False.",
    equipment: "Golden Spear",
    topic: "Boolean Expressions"
  },
  {
    question: "A security system opens only if the alarm is off and the door is unlocked. Which logic expression matches this?",
    options: ["Alarm OR Door", "Alarm AND Door", "NOT Alarm AND Door", "Alarm AND NOT Door"],
    answer: 2,
    explanation: "The system opens when the alarm is off and the door is unlocked, so NOT Alarm AND Door.",
    equipment: "Champion Armour",
    topic: "Simple Logic Problem"
  }
];

// The state object stores the current game progress and score details.
const state = {
  currentQuestionIndex: -1,
  lives: 3,
  glory: 0,
  battlePower: 0,
  correctAnswers: 0,
  equipment: [],
  isAnswerLocked: false,
  musicOn: true,
  highScore: 0,
  musicTimer: null
};

// DOM references are collected here so the script can update the page easily.
const elements = {
  menuScreen: document.getElementById("menu-screen"),
  storyScreen: document.getElementById("story-screen"),
  questionScreen: document.getElementById("question-screen"),
  feedbackScreen: document.getElementById("feedback-screen"),
  battleScreen: document.getElementById("battle-screen"),
  endScreen: document.getElementById("end-screen"),
  lives: document.getElementById("lives"),
  gloryScore: document.getElementById("glory-score"),
  battlePower: document.getElementById("battle-power"),
  equipmentList: document.getElementById("equipment-list"),
  progressBar: document.getElementById("progress-bar"),
  progressText: document.getElementById("progress-text"),
  questionNumber: document.getElementById("question-number"),
  questionTitle: document.getElementById("question-title"),
  questionTopic: document.getElementById("question-topic"),
  questionText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  feedbackTitle: document.getElementById("feedback-title"),
  feedbackMessage: document.getElementById("feedback-message"),
  feedbackDetail: document.getElementById("feedback-detail"),
  continueBtn: document.getElementById("continue-btn"),
  battleStatus: document.getElementById("battle-status"),
  playerFighter: document.getElementById("player-fighter"),
  championFighter: document.getElementById("champion-fighter"),
  battleEffect: document.getElementById("battle-effect"),
  battleMeterValue: document.getElementById("battle-meter-value"),
  resultTitle: document.getElementById("result-title"),
  resultText: document.getElementById("result-text"),
  finalScore: document.getElementById("final-score"),
  finalCorrect: document.getElementById("final-correct"),
  finalRank: document.getElementById("final-rank"),
  finalEquipment: document.getElementById("final-equipment"),
  finalHighScore: document.getElementById("final-high-score"),
  menuHighScore: document.getElementById("menu-high-score"),
  settingsBtn: document.getElementById("settings-btn"),
  playBtn: document.getElementById("play-btn"),
  helpBtn: document.getElementById("help-btn"),
  scoreBtn: document.getElementById("score-btn"),
  startTrialsBtn: document.getElementById("start-trials-btn"),
  battleBtn: document.getElementById("battle-btn"),
  playAgainBtn: document.getElementById("play-again-btn"),
  menuReturnBtn: document.getElementById("menu-return-btn"),
  helpPanel: document.getElementById("help-panel"),
  feedbackPanel: document.getElementById("feedback-panel")
};

let audioContext = null;

// The game is started when the page loads.
function init() {
  loadHighScore();
  createParticles();
  updateHud();
  updateMenuScore();
  attachEvents();
  showScreen("menu-screen");
  if (state.musicOn) {
    startAmbientMusic();
  }
}

// Event listeners are attached once so the buttons work throughout the game.
function attachEvents() {
  elements.playBtn.addEventListener("click", () => {
    playSound("click");
    showStory();
  });

  elements.helpBtn.addEventListener("click", () => {
    playSound("click");
    elements.helpPanel.classList.toggle("hidden");
  });

  elements.scoreBtn.addEventListener("click", () => {
    playSound("click");
    elements.menuHighScore.textContent = state.highScore;
    elements.helpPanel.classList.add("hidden");
  });

  elements.settingsBtn.addEventListener("click", () => {
    playSound("click");
    toggleMusic();
  });

  elements.startTrialsBtn.addEventListener("click", () => {
    playSound("click");
    startQuestion(0);
  });

  elements.continueBtn.addEventListener("click", () => {
    playSound("click");
    continueFromFeedback();
  });

  elements.battleBtn.addEventListener("click", () => {
    playSound("sword");
    runBattleAnimation();
  });

  elements.playAgainBtn.addEventListener("click", () => {
    playSound("click");
    startGame();
  });

  elements.menuReturnBtn.addEventListener("click", () => {
    playSound("click");
    showScreen("menu-screen");
  });
}

// A fresh game resets the player stats and begins the story.
function startGame() {
  state.currentQuestionIndex = -1;
  state.lives = 3;
  state.glory = 0;
  state.battlePower = 0;
  state.correctAnswers = 0;
  state.equipment = [];
  state.isAnswerLocked = false;
  updateHud();
  showStory();
}

function showStory() {
  showScreen("story-screen");
  playSound("cheer");
}

// Each question is rendered using the data in the questions array.
function startQuestion(index) {
  state.currentQuestionIndex = index;
  state.isAnswerLocked = false;
  const question = questions[index];
  elements.questionTitle.textContent = `Question ${index + 1}`;
  elements.questionTopic.textContent = question.topic;
  elements.questionText.textContent = question.question;
  elements.options.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
    button.addEventListener("click", () => answerQuestion(optionIndex));
    elements.options.appendChild(button);
  });

  updateHud();
  showScreen("question-screen");
}

// The answer handler checks the selected option and updates the score or life total.
function answerQuestion(optionIndex) {
  if (state.isAnswerLocked) {
    return;
  }

  state.isAnswerLocked = true;
  const question = questions[state.currentQuestionIndex];
  const correct = optionIndex === question.answer;

  if (correct) {
    state.glory = Math.min(80, state.glory + 10);
    state.battlePower = Math.min(8, state.battlePower + 1);
    state.correctAnswers += 1;
    if (!state.equipment.includes(question.equipment)) {
      state.equipment.push(question.equipment);
    }
    updateHud();
    showFeedback(true, question.equipment, question.explanation);
    playSound("cheer");
  } else {
    state.lives -= 1;
    updateHud();
    showFeedback(false, question.equipment, question.explanation);
    playSound("boo");
  }
}

// Feedback uses a special overlay so the player gets immediate results.
function showFeedback(isCorrect, equipmentName, explanation) {
  elements.feedbackPanel.classList.remove("feedback-correct", "feedback-wrong");
  document.body.classList.remove("feedback-correct", "feedback-wrong");

  if (isCorrect) {
    elements.feedbackTitle.textContent = "Correct!";
    elements.feedbackMessage.textContent = "+10 Glory • +1 Battle Power";
    elements.feedbackDetail.textContent = `You earned ${equipmentName}. ${explanation}`;
    elements.feedbackPanel.classList.add("feedback-correct");
    document.body.classList.add("feedback-correct");
  } else {
    elements.feedbackTitle.textContent = "Incorrect";
    elements.feedbackMessage.textContent = `You lost a heart. ${state.lives > 0 ? "Try again with the next challenge." : "Your journey is over."}`;
    elements.feedbackDetail.textContent = `Correct answer: ${questions[state.currentQuestionIndex].options[questions[state.currentQuestionIndex].answer]}. ${explanation}`;
    elements.feedbackPanel.classList.add("feedback-wrong");
    document.body.classList.add("feedback-wrong");
  }

  showOverlay("feedback-screen");
}

function continueFromFeedback() {
  hideOverlay("feedback-screen");
  document.body.classList.remove("feedback-correct", "feedback-wrong");

  if (state.lives <= 0) {
    finishGame();
    return;
  }

  if (state.currentQuestionIndex < questions.length - 1) {
    startQuestion(state.currentQuestionIndex + 1);
  } else {
    showBattle();
  }
}

function showBattle() {
  showScreen("battle-screen");
  elements.battleStatus.textContent = "The arena gates open...";
  elements.battleMeterValue.textContent = state.battlePower;
  elements.playerFighter.classList.remove("attacking", "defending");
  elements.championFighter.classList.remove("attacking", "defending");
  elements.battleEffect.classList.remove("show");
  playSound("sword");
}

function runBattleAnimation() {
  elements.battleStatus.textContent = "The champion charges!";
  elements.battleMeterValue.textContent = state.battlePower;
  elements.playerFighter.classList.remove("attacking", "defending");
  elements.championFighter.classList.remove("attacking", "defending");
  elements.battleEffect.classList.remove("show");
  elements.playerFighter.classList.add("attacking");
  elements.championFighter.classList.add("attacking");
  elements.battleEffect.classList.add("show");
  playSound("sword");

  setTimeout(() => {
    elements.playerFighter.classList.remove("attacking");
    elements.championFighter.classList.remove("attacking");
    elements.playerFighter.classList.add("defending");
    elements.championFighter.classList.add("defending");
    elements.battleStatus.textContent = "You strike with your training!";
    playSound("cheer");
  }, 1000);

  setTimeout(() => {
    const rank = getRank();
    showFinalResult(rank);
  }, 2200);
}

function getRank() {
  if (state.battlePower >= 7) {
    return "Legend Victory";
  }
  if (state.battlePower >= 5) {
    return "Veteran Victory";
  }
  if (state.battlePower >= 3) {
    return "Recruit";
  }
  return "Defeat";
}

function showFinalResult(rank) {
  const finalScore = state.glory;
  const isVictory = rank !== "Defeat";

  if (isVictory) {
    playSound("victory");
    elements.resultTitle.textContent = "Victory";
    elements.resultText.textContent = `Your training paid off. ${rank} achieved!`;
  } else {
    playSound("defeat");
    elements.resultTitle.textContent = "Defeat";
    elements.resultText.textContent = `The champion stands above you. ${rank} earned.`;
  }

  updateHighScore(finalScore);
  elements.finalScore.textContent = finalScore;
  elements.finalCorrect.textContent = state.correctAnswers;
  elements.finalRank.textContent = rank;
  elements.finalEquipment.innerHTML = "";

  state.equipment.forEach((item) => {
    const badge = document.createElement("div");
    badge.className = "equipment-badge";
    badge.textContent = item;
    elements.finalEquipment.appendChild(badge);
  });

  elements.finalHighScore.textContent = state.highScore;
  showScreen("end-screen");
}

function finishGame() {
  const finalScore = state.glory;
  updateHighScore(finalScore);
  elements.finalScore.textContent = finalScore;
  elements.finalCorrect.textContent = state.correctAnswers;
  elements.finalRank.textContent = "Defeat";
  elements.resultTitle.textContent = "Game Over";
  elements.resultText.textContent = "The arena claimed another warrior. Train again and rise stronger.";
  elements.finalEquipment.innerHTML = "";

  state.equipment.forEach((item) => {
    const badge = document.createElement("div");
    badge.className = "equipment-badge";
    badge.textContent = item;
    elements.finalEquipment.appendChild(badge);
  });

  elements.finalHighScore.textContent = state.highScore;
  showScreen("end-screen");
}

// The HUD updates after every change so the player always sees the latest stats.
function updateHud() {
  elements.lives.innerHTML = "";
  for (let i = 0; i < 3; i += 1) {
    elements.lives.innerHTML += i < state.lives ? "❤️" : "🤍";
  }

  elements.gloryScore.textContent = state.glory;
  elements.battlePower.textContent = state.battlePower;
  elements.questionNumber.textContent = `${state.currentQuestionIndex >= 0 ? state.currentQuestionIndex + 1 : 0}/${questions.length}`;
  elements.progressText.textContent = `${state.correctAnswers}/${questions.length}`;
  elements.progressBar.style.width = `${(state.correctAnswers / questions.length) * 100}%`;
  elements.equipmentList.innerHTML = "";

  if (state.equipment.length === 0) {
    const badge = document.createElement("div");
    badge.className = "equipment-badge";
    badge.textContent = "No gear yet";
    elements.equipmentList.appendChild(badge);
  } else {
    state.equipment.forEach((item) => {
      const badge = document.createElement("div");
      badge.className = "equipment-badge";
      badge.textContent = item;
      elements.equipmentList.appendChild(badge);
    });
  }
}

function updateMenuScore() {
  elements.menuHighScore.textContent = state.highScore;
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  hideOverlay("feedback-screen");
}

function showOverlay(screenId) {
  const screen = document.getElementById(screenId);
  screen.classList.add("active");
}

function hideOverlay(screenId) {
  const screen = document.getElementById(screenId);
  screen.classList.remove("active");
}

// High score data is stored in localStorage so it survives browser refreshes.
function loadHighScore() {
  const saved = localStorage.getItem("gladiatorLogicArenaHighScore");
  state.highScore = saved ? Number(saved) : 0;
}

function updateHighScore(score) {
  if (score > state.highScore) {
    state.highScore = score;
    localStorage.setItem("gladiatorLogicArenaHighScore", String(state.highScore));
  }
  updateMenuScore();
}

function toggleMusic() {
  state.musicOn = !state.musicOn;
  elements.settingsBtn.textContent = `Music: ${state.musicOn ? "On" : "Off"}`;
  if (state.musicOn) {
    startAmbientMusic();
  } else {
    stopAmbientMusic();
  }
}

function startAmbientMusic() {
  stopAmbientMusic();
  if (!state.musicOn) {
    return;
  }

  const notes = [220, 261.63, 293.66, 329.63, 392];
  state.musicTimer = window.setInterval(() => {
    const note = notes[Math.floor(Math.random() * notes.length)];
    playTone(note, 0.45, "triangle", 0.015);
  }, 700);
}

function stopAmbientMusic() {
  if (state.musicTimer) {
    clearInterval(state.musicTimer);
    state.musicTimer = null;
  }
}

// Sound effects are created with the Web Audio API so no external libraries are needed.
function playSound(type) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  if (type === "click") {
    playTone(660, 0.1, "square", 0.03);
  } else if (type === "cheer") {
    playTone(523.25, 0.18, "sine", 0.04);
    setTimeout(() => playTone(659.25, 0.18, "sine", 0.04), 80);
  } else if (type === "boo") {
    playTone(220, 0.2, "sawtooth", 0.035);
    setTimeout(() => playTone(180, 0.2, "sawtooth", 0.03), 80);
  } else if (type === "sword") {
    playTone(440, 0.12, "square", 0.04);
    setTimeout(() => playTone(300, 0.12, "square", 0.04), 70);
  } else if (type === "victory") {
    playTone(523.25, 0.18, "triangle", 0.04);
    setTimeout(() => playTone(659.25, 0.18, "triangle", 0.04), 120);
    setTimeout(() => playTone(783.99, 0.26, "triangle", 0.04), 240);
  } else if (type === "defeat") {
    playTone(180, 0.3, "sawtooth", 0.04);
    setTimeout(() => playTone(140, 0.3, "sawtooth", 0.03), 140);
  }
}

function playTone(frequency, duration, type, volume) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

// Floating particles add the animated arena atmosphere.
function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 28; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${4 + Math.random() * 5}s`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(particle);
  }
}

window.addEventListener("load", init);
