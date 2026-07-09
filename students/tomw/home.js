const homeScreen = document.getElementById('homeScreen');
const gameScreen = document.getElementById('gameScreen');
const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});
