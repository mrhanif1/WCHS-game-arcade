const state = {
  money: 0,
  droppers: [120],
  dropperCount: 1,
  dropValue: 1,
  conveyorSpeed: 1,
  dropperPrice: 100,
  valuePrice: 50,
  speedPrice: 75,
  beltCoins: [],
  manualOwned: false,
  manualBoxValue: 2,
  manualClickerLevel: 0,
  manualClickerPrice: 150,
  manualUpgradePrice: 100,
  minionValue: 1,
  minionUpgradeCost: 60,
  minionCount: 1,
  minionUnits: [],
  bossMinionCount: 0,
  bossUnits: [],
  blackMarketDropperCount: 0,
  blackMarketDroppers: [],
  blackMarketDropperPrice: 5000,
  vendorActive: false,
  vendorElement: null,
  bossMinionValue: 8,
  bossMinionCost: 220,
  bossUpgradeCost: 300,
  devUnlocked: false,
  rebirthCount: 0,
  rebirthCost: 25000,
  rebirthMultiplier: 1,
  boostActive: false,
  boostEndsAt: 0,
  boostMultiplier: 5,
  boostSpeedMultiplier: 100,
  cogVisible: true,
  currentQuestion: null,
};

const els = {
  money: document.getElementById('money'),
  dropperCount: document.getElementById('dropperCount'),
  dropValue: document.getElementById('dropValue'),
  speed: document.getElementById('speed'),
  income: document.getElementById('incomePerSec'),
  buyPrice: document.getElementById('buyPrice'),
  valuePrice: document.getElementById('valuePrice'),
  speedPrice: document.getElementById('speedPrice'),
  clickerBuyPrice: document.getElementById('clickerBuyPrice'),
  clickerUpgradePrice: document.getElementById('clickerUpgradePrice'),
  buyBtn: document.getElementById('buyBtn'),
  valueBtn: document.getElementById('valueBtn'),
  speedBtn: document.getElementById('speedBtn'),
  clickerBuyBtn: document.getElementById('clickerBuyBtn'),
  clickerUpgradeBtn: document.getElementById('clickerUpgradeBtn'),
  clickerLevel: document.getElementById('clickerLevel'),
  rebirthBtn: document.getElementById('rebirthBtn'),
  rebirthPrice: document.getElementById('rebirthPrice'),
  devBtn: document.getElementById('devBtn'),
  minionButton: document.getElementById('minionButton'),
  minionUpgradeBtn: document.getElementById('minionUpgradeBtn'),
  bossUpgradeBtn: document.getElementById('bossUpgradeBtn'),
  bossValueBtn: document.getElementById('bossValueBtn'),
  minionZone: document.getElementById('minionZone'),
  minionUpgradePrice: document.getElementById('minionUpgradePrice'),
  bossUpgradePrice: document.getElementById('bossUpgradePrice'),
  bossValuePrice: document.getElementById('bossValuePrice'),
  passwordOverlay: document.getElementById('passwordOverlay'),
  passwordInput: document.getElementById('passwordInput'),
  passwordSubmit: document.getElementById('passwordSubmit'),
  passwordCancel: document.getElementById('passwordCancel'),
  developerOverlay: document.getElementById('developerOverlay'),
  addMoneyBtn: document.getElementById('addMoneyBtn'),
  removeMoneyBtn: document.getElementById('removeMoneyBtn'),
  addBlackMarketBtn: document.getElementById('addBlackMarketBtn'),
  closeDevBtn: document.getElementById('closeDevBtn'),
  devMoneyStat: document.getElementById('devMoneyStat'),
  devDroppersStat: document.getElementById('devDroppersStat'),
  cogWheel: document.getElementById('cogWheel'),
  quizOverlay: document.getElementById('quizOverlay'),
  quizQuestion: document.getElementById('quizQuestion'),
  quizOptions: document.getElementById('quizOptions'),
  quizSkip: document.getElementById('quizSkip'),
  devSpeedStat: document.getElementById('devSpeedStat'),
  devMinionStat: document.getElementById('devMinionStat'),
  devBossStat: document.getElementById('devBossStat'),
  gameArea: document.getElementById('gameArea'),
  conveyor: document.getElementById('conveyor'),
  statusText: document.getElementById('statusText'),
  collectAmount: document.getElementById('collectAmount'),
};

function getRebirthMultiplier() {
  return 1 + state.rebirthCount * 0.25;
}

function getMoneyMultiplier() {
  return getRebirthMultiplier() * (state.boostActive ? state.boostMultiplier : 1);
}

function getConveyorSpeedMultiplier() {
  return state.boostActive ? state.boostSpeedMultiplier : 1;
}

function updateConveyorLength() {
  if (!els.conveyor) return;
  const width = Math.min(940, 300 + (state.dropperCount + state.blackMarketDropperCount) * 110);
  els.conveyor.style.width = `${width}px`;
}

function updateRebirthTheme() {
  const reborn = state.rebirthCount > 0;
  if (els.gameArea) {
    els.gameArea.classList.toggle('reborn', reborn);
  }
  if (els.conveyor) {
    els.conveyor.classList.toggle('reborn', reborn);
    els.conveyor.classList.toggle('golden', state.boostActive);
  }
}

function updateVaultVisuals() {
  const box = document.getElementById('collectBox');
  if (!box) return;
  const money = Math.floor(state.money);
  const level = Math.min(6, Math.max(1, Math.floor(money / 5000) + 1));
  const glow = Math.min(0.7, 0.18 + money / 250000);
  box.style.transform = money > 20000 ? 'translateY(-2px) scale(1.01)' : 'none';
  box.style.boxShadow = `0 16px 34px rgba(255,179,0,${0.16 + glow * 0.3})`;
  box.style.background = `linear-gradient(145deg, ${level >= 4 ? '#ffe9a8' : '#f4d06f'} 0%, ${level >= 4 ? '#f0b900' : '#c68e00'} 100%)`;
  box.style.borderColor = money > 20000 ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.16)';
  const inner = box.querySelector('.vault-inner');
  if (inner) {
    inner.style.height = `${34 + Math.min(14, level * 1.4)}px`;
    inner.style.background = money > 15000 ? 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(243,214,135,0.95))' : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,228,175,0.9))';
  }
}

function updateUI() {
  els.money.textContent = Math.floor(state.money).toLocaleString();
  els.dropperCount.textContent = state.dropperCount;
  els.dropValue.textContent = state.dropValue;
  els.speed.textContent = state.conveyorSpeed.toFixed(1) + 'x';
  els.income.textContent = (state.dropperCount * state.dropValue).toLocaleString();
  els.buyPrice.textContent = `$${state.dropperPrice}`;
  els.valuePrice.textContent = `$${state.valuePrice}`;
  els.speedPrice.textContent = `$${state.speedPrice}`;
  els.clickerBuyPrice.textContent = `$${state.manualClickerPrice}`;
  els.clickerUpgradePrice.textContent = `$${state.manualUpgradePrice}`;
  els.collectAmount.textContent = Math.floor(state.money).toLocaleString();
  els.clickerLevel.textContent = state.manualOwned ? state.manualClickerLevel : 0;
  els.rebirthBtn.disabled = state.money < state.rebirthCost;
  els.rebirthPrice.textContent = `$${state.rebirthCost.toLocaleString()}`;
  els.buyBtn.disabled = state.money < state.dropperPrice;
  els.valueBtn.disabled = state.money < state.valuePrice;
  els.speedBtn.disabled = state.money < state.speedPrice;
  els.clickerBuyBtn.disabled = state.manualOwned || state.money < state.manualClickerPrice;
  els.clickerUpgradeBtn.disabled = !state.manualOwned || state.money < state.manualUpgradePrice;
  els.minionUpgradeBtn.disabled = state.money < state.minionUpgradeCost;
  els.bossUpgradeBtn.disabled = state.money < state.bossMinionCost;
  els.bossValueBtn.disabled = state.money < state.bossUpgradeCost;
  updateConveyorLength();
  updateRebirthTheme();
  updateVaultVisuals();
}

function createDropper(x, isBlackMarket = false) {
  const dropper = document.createElement('div');
  dropper.className = 'dropper' + (isBlackMarket ? ' black-market-dropper' : '');
  dropper.style.left = `${x}px`;
  dropper.innerHTML = `<div class="label">${isBlackMarket ? 'BLACK' : 'DROP'}</div>`;
  els.gameArea.appendChild(dropper);
  return dropper;
}

function renderDroppers() {
  document.querySelectorAll('.dropper').forEach(el => el.remove());
  state.droppers.forEach((x) => createDropper(x, false));
  state.blackMarketDroppers.forEach((x) => createDropper(x, true));
  updateConveyorLength();
}

function updateBoostState() {
  if (state.boostActive && Date.now() >= state.boostEndsAt) {
    state.boostActive = false;
    document.getElementById('conveyor').classList.remove('golden');
    showFloating('BOOST ENDED', 320, 180, true);
  }
}

function activateBoost() {
  state.boostActive = true;
  state.boostEndsAt = Date.now() + 120000;
  document.getElementById('conveyor').classList.add('golden');
  showFloating('BOOST ON!', 320, 180, true);
}

function spawnCoin(x, value = state.dropValue, isBlackMarket = false) {
  const coin = document.createElement('div');
  coin.className = 'coin';
  if (isBlackMarket) {
    coin.style.width = '20px';
    coin.style.height = '20px';
    coin.style.background = 'radial-gradient(circle at 30% 30%, #f6e1ff 0%, #c184ff 45%, #7b2cff 100%)';
  }
  coin.style.left = `${x + 20}px`;
  coin.style.top = '120px';
  els.gameArea.appendChild(coin);

  let y = 120;
  const timer = setInterval(() => {
    y += 6;
    coin.style.top = `${y}px`;
    if (y >= 255) {
      clearInterval(timer);
      coin.remove();
      state.beltCoins.push({ x: x + 20, value: value * getMoneyMultiplier(), startTime: Date.now(), element: null });
    }
  }, 18);
}

function showFloating(text, x, y, large = false) {
  const el = document.createElement('div');
  el.className = 'floating-text' + (large ? ' large' : '');
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  els.gameArea.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function createManualDropper() {
  const existing = document.querySelector('.manual-dropper');
  if (existing) existing.remove();
  if (!state.manualOwned) return;

  const dropper = document.createElement('div');
  dropper.className = 'manual-dropper';
  dropper.innerHTML = '<div class="manual-dropper-label">CLICKER</div><div class="manual-click-handle">+$2</div>';
  dropper.style.left = '40px';
  dropper.style.top = '90px';
  dropper.addEventListener('click', () => {
    dropper.classList.add('pressed');
    setTimeout(() => dropper.classList.remove('pressed'), 140);
    spawnManualBox();
  });
  els.gameArea.appendChild(dropper);
  const handle = dropper.querySelector('.manual-click-handle');
  if (handle) handle.textContent = `+$${state.manualBoxValue}`;
  const label = dropper.querySelector('.manual-dropper-label');
  if (label) label.textContent = `CLICKER L${state.manualClickerLevel}`;
}

function spawnManualBox() {
  if (!state.manualOwned) return;
  const box = document.createElement('div');
  box.className = 'manual-box';
  box.style.left = '86px';
  box.style.top = '120px';
  els.gameArea.appendChild(box);

  let y = 120;
  let x = 86;
  const fallTimer = setInterval(() => {
    y += 8;
    box.style.top = `${y}px`;
    if (y >= 250) {
      clearInterval(fallTimer);
      const slideTimer = setInterval(() => {
        x += 10 * state.conveyorSpeed;
        box.style.left = `${x}px`;
        box.style.top = '250px';
        if (x > 1030) {
          clearInterval(slideTimer);
          box.remove();
          state.money += state.manualBoxValue * getMoneyMultiplier();
          showFloating(`+$${state.manualBoxValue}`, 960, 270);
          updateUI();
        }
      }, 25);
    }
  }, 25);

  showFloating('CLICK', 70, 70, true);
}

function buyClicker() {
  if (state.manualOwned || state.money < state.manualClickerPrice) return;
  state.money -= state.manualClickerPrice;
  state.manualOwned = true;
  state.manualClickerLevel = 1;
  state.manualBoxValue = 2;
  state.manualClickerPrice = Math.floor(state.manualClickerPrice * 1.18);
  createManualDropper();
  showFloating('CLICKER!', 120, 70, true);
  updateUI();
}

function upgradeClicker() {
  if (!state.manualOwned || state.money < state.manualUpgradePrice) return;
  state.money -= state.manualUpgradePrice;
  state.manualClickerLevel += 1;
  state.manualBoxValue += 1;
  state.manualUpgradePrice = Math.floor(state.manualUpgradePrice * 1.35);
  createManualDropper();
  showFloating('+VALUE', 120, 70, true);
  updateUI();
}

function spawnMinionUnit() {
  const unit = document.createElement('div');
  unit.className = 'minion-unit';
  unit.innerHTML = '<span class="unit-body"></span><span class="unit-leg"></span><span class="unit-leg"></span>';
  unit.style.left = '80px';
  unit.style.top = '360px';
  els.gameArea.appendChild(unit);
  const speed = (1.8 + state.minionCount * 0.08) * (1 + state.rebirthCount * 0.2);
  return { element: unit, x: 80, y: 360, direction: 1, speed, value: state.minionValue };
}

function spawnBossUnit() {
  const unit = document.createElement('div');
  unit.className = 'boss-unit';
  unit.innerHTML = '<span class="unit-body"></span><span class="unit-leg"></span><span class="unit-leg"></span>';
  unit.style.left = '80px';
  unit.style.top = '340px';
  els.gameArea.appendChild(unit);
  return { element: unit, x: 80, y: 340, direction: 1, speed: 2.2 + state.bossMinionCount * 0.06, value: state.bossMinionValue };
}

function updateWalkingUnits() {
  const vaultX = 980;
  const floorY = 360;
  state.minionUnits.forEach((unit) => {
    unit.x += unit.speed * unit.direction;
    unit.element.style.left = `${unit.x}px`;
    if (unit.x > vaultX) {
      state.money += unit.value * getMoneyMultiplier();
      showFloating(`+$${unit.value}`, unit.x - 40, floorY - 40, true);
      updateUI();
      unit.x = 30;
      unit.element.style.left = '30px';
    }
    if (unit.x < 20) {
      unit.direction = 1;
    }
    if (unit.x > 980) {
      unit.direction = -1;
    }
  });

  state.bossUnits.forEach((unit) => {
    unit.x += unit.speed * unit.direction;
    unit.element.style.left = `${unit.x}px`;
    if (unit.x > vaultX) {
      state.money += unit.value * getMoneyMultiplier();
      showFloating(`+$${unit.value}`, unit.x - 40, floorY - 50, true);
      updateUI();
      unit.x = 30;
      unit.element.style.left = '30px';
    }
    if (unit.x < 20) {
      unit.direction = 1;
    }
    if (unit.x > 980) {
      unit.direction = -1;
    }
  });
}

function upgradeMinion() {
  if (state.money < state.minionUpgradeCost) return;
  state.money -= state.minionUpgradeCost;
  state.minionCount += 1;
  state.minionValue += 1;
  state.minionUnits.forEach((unit) => {
    unit.value = state.minionValue;
  });
  state.minionUnits.push(spawnMinionUnit());
  state.minionUpgradeCost = Math.floor(state.minionUpgradeCost * 1.2);
  showFloating('+MINION', 220, 430, true);
  updateUI();
  updateMinigameUI();
}

function hireBossMinion() {
  if (state.money < state.bossMinionCost) return;
  state.money -= state.bossMinionCost;
  state.bossMinionCount += 1;
  state.bossUnits.push(spawnBossUnit());
  state.bossMinionCost = Math.floor(state.bossMinionCost * 1.25);
  updateMinigameUI();
  showFloating('BOSS!', 320, 430, true);
  updateUI();
}

function upgradeBossMinions() {
  if (state.money < state.bossUpgradeCost) return;
  state.money -= state.bossUpgradeCost;
  state.bossMinionValue += 2;
  state.bossUnits.forEach((unit) => {
    unit.value = state.bossMinionValue;
  });
  state.bossUpgradeCost = Math.floor(state.bossUpgradeCost * 1.3);
  updateMinigameUI();
  showFloating('+BOSS', 420, 430, true);
  updateUI();
}

function askBinaryQuestion() {
  const questions = [
    { q: 'What is 101 in decimal?', options: ['5', '6', '7', '8'], answer: 0 },
    { q: 'What is 1001 in decimal?', options: ['7', '8', '9', '10'], answer: 1 },
    { q: 'What is 111 in decimal?', options: ['5', '6', '7', '8'], answer: 2 },
    { q: 'What is 10 in binary as decimal?', options: ['1', '2', '3', '4'], answer: 1 }
  ];
  const question = questions[Math.floor(Math.random() * questions.length)];
  els.quizQuestion.textContent = question.q;
  els.quizOptions.innerHTML = '';
  question.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => {
      if (index === question.answer) {
        activateBoost();
        closeQuiz();
        showFloating('BOOST READY', 320, 180, true);
      } else {
        showFloating('TRY AGAIN', 320, 180, true);
      }
    });
    els.quizOptions.appendChild(btn);
  });
  els.quizOverlay.classList.remove('hidden');
}

function closeQuiz() {
  els.quizOverlay.classList.add('hidden');
}

function spawnCogWheel() {
  if (!els.cogWheel || !state.cogVisible) return;
  const x = 120 + Math.random() * 520;
  const y = 110 + Math.random() * 90;
  els.cogWheel.style.left = `${x}px`;
  els.cogWheel.style.top = `${y}px`;
  els.cogWheel.classList.remove('hidden');
  els.cogWheel.onclick = () => {
    els.cogWheel.classList.add('hidden');
    askBinaryQuestion();
  };
}

function startCogWheel() {
  spawnCogWheel();
  setInterval(() => {
    if (!state.boostActive) {
      spawnCogWheel();
    }
  }, 14000);
  els.cogWheel.addEventListener('click', () => {
    els.cogWheel.classList.add('hidden');
    askBinaryQuestion();
  });
  els.quizSkip.addEventListener('click', closeQuiz);
}

function rebirth() {
  if (state.money < state.rebirthCost) return;
  state.money = 0;
  state.dropperCount = 1;
  state.droppers = [120];
  state.dropValue = 1;
  state.conveyorSpeed = 1;
  state.dropperPrice = 100;
  state.valuePrice = 50;
  state.speedPrice = 75;
  state.manualOwned = false;
  state.manualBoxValue = 2;
  state.manualClickerLevel = 0;
  state.manualClickerPrice = 150;
  state.manualUpgradePrice = 100;
  state.minionValue = 1;
  state.minionUpgradeCost = 60;
  state.minionCount = 1;
  state.minionUnits.forEach((unit) => unit.element.remove());
  state.minionUnits = [];
  state.bossMinionCount = 0;
  state.bossUnits.forEach((unit) => unit.element.remove());
  state.bossUnits = [];
  state.bossMinionValue = 8;
  state.bossMinionCost = 220;
  state.bossUpgradeCost = 300;
  state.vendorActive = false;
  state.vendorElement = null;
  if (document.querySelector('.businessman-unit')) {
    document.querySelector('.businessman-unit').remove();
  }
  state.rebirthCount += 1;
  state.rebirthCost = Math.floor(state.rebirthCost * 100);
  state.beltCoins = [];
  renderDroppers();
  createManualDropper();
  state.minionUnits.push(spawnMinionUnit());
  updateUI();
  updateMinigameUI();
  showFloating('REBIRTH!', 260, 110, true);
}

function buyDropper() {
  if (state.money < state.dropperPrice) return;
  state.money -= state.dropperPrice;
  state.dropperCount += 1;
  state.droppers.push(120 + state.dropperCount * 70);
  state.dropperPrice = Math.floor(state.dropperPrice * 1.17);
  renderDroppers();
  showFloating('+1 DROP', 220, 110, true);
  updateUI();
}

function upgradeDropValue() {
  if (state.money < state.valuePrice) return;
  state.money -= state.valuePrice;
  state.dropValue += 1;
  state.valuePrice = Math.floor(state.valuePrice * 1.25);
  showFloating('+VALUE', 320, 110, true);
  updateUI();
}

function upgradeSpeed() {
  if (state.money < state.speedPrice) return;
  state.money -= state.speedPrice;
  state.conveyorSpeed += 0.2;
  state.speedPrice = Math.floor(state.speedPrice * 1.3);
  showFloating('FASTER', 420, 110, true);
  updateUI();
}

function startDropping() {
  setInterval(() => {
    state.droppers.forEach((x) => spawnCoin(x, state.dropValue));
  }, 1000 / Math.max(1, state.dropperCount));

  setInterval(() => {
    state.blackMarketDroppers.forEach((x) => spawnCoin(x, state.dropValue * 300, true));
  }, 1000 / Math.max(1, state.blackMarketDropperCount * 300));
}

function startConveyor() {
  setInterval(() => {
    for (let i = state.beltCoins.length - 1; i >= 0; i--) {
      const coin = state.beltCoins[i];
      const elapsed = Date.now() - coin.startTime;
      const distance = (elapsed / 1000) * (180 * state.conveyorSpeed * getConveyorSpeedMultiplier());
      const beltStartX = 120;
      const beltWidth = parseFloat(els.conveyor?.style.width || '300');
      const beltEndX = beltStartX + beltWidth - 40;
      const newX = beltStartX + distance;

      if (!coin.element) {
        coin.element = document.createElement('div');
        coin.element.className = 'money-token';
        coin.element.style.left = `${newX}px`;
        coin.element.style.top = '318px';
        els.gameArea.appendChild(coin.element);
      } else {
        coin.element.style.left = `${newX}px`;
      }

      if (newX >= beltEndX) {
        if (coin.element) coin.element.remove();
        state.money += coin.value;
        state.beltCoins.splice(i, 1);
        showFloating(`+$${coin.value}`, 960, 290);
        updateUI();
      }
    }
  }, 25);
}

function updateMinigameUI() {
  els.minionUpgradePrice.textContent = `$${state.minionUpgradeCost}`;
  els.bossUpgradePrice.textContent = `$${state.bossMinionCost}`;
  els.bossValuePrice.textContent = `$${state.bossUpgradeCost}`;
  if (els.minionButton) {
    const label = els.minionButton.querySelector('.minion-label');
    if (label) label.textContent = `MINIONS x${state.minionCount}`;
  }
}

function renderBossMinions() {
  updateMinigameUI();
}

function openPasswordOverlay() {
  els.passwordOverlay.classList.remove('hidden');
  els.passwordInput.value = '';
  els.passwordInput.focus();
}

function closePasswordOverlay() {
  els.passwordOverlay.classList.add('hidden');
}

function openDeveloperMenu() {
  if (!state.devUnlocked) {
    openPasswordOverlay();
    return;
  }
  els.developerOverlay.classList.remove('hidden');
  updateDeveloperStats();
}

function updateDeveloperStats() {
  els.devMoneyStat.textContent = `$${Math.floor(state.money)}`;
  els.devDroppersStat.textContent = state.dropperCount;
  els.devSpeedStat.textContent = state.conveyorSpeed.toFixed(1) + 'x';
  els.devMinionStat.textContent = state.minionValue;
  els.devBossStat.textContent = state.bossMinionCount;
}

function unlockDeveloperMenu() {
  if (els.passwordInput.value === '1234') {
    state.devUnlocked = true;
    closePasswordOverlay();
    openDeveloperMenu();
  } else {
    showFloating('WRONG', 280, 120, true);
  }
}

function addDeveloperMoney() {
  state.money += 100;
  updateUI();
  updateMinigameUI();
  updateDeveloperStats();
}

function removeDeveloperMoney() {
  state.money = Math.max(0, state.money - 100);
  updateUI();
  updateMinigameUI();
  updateDeveloperStats();
}

function addBlackMarketDropper() {
  state.money += 0;
  state.blackMarketDropperCount += 1;
  state.blackMarketDroppers.push(120 + state.blackMarketDropperCount * 90);
  state.blackMarketDropperPrice = Math.max(5000, Math.floor(state.blackMarketDropperPrice * 0.95));
  renderDroppers();
  showFloating('BLACK MARKET', 260, 110, true);
  updateUI();
  updateDeveloperStats();
}

function startTicker() {
  setInterval(() => {
    updateBoostState();
    const boostText = state.boostActive ? ` • BOOST ${Math.max(0, Math.ceil((state.boostEndsAt - Date.now()) / 1000))}s` : '';
    els.statusText.textContent = `Running • ${state.dropperCount + state.blackMarketDropperCount} droppers • ${state.conveyorSpeed.toFixed(1)}x speed • $${((state.dropperCount * state.dropValue) + (state.blackMarketDropperCount * state.dropValue * 300)).toFixed(0)}/sec${boostText}`;
  }, 1000);
}

function spawnBusinessman() {
  if (state.vendorActive) return;
  const vendor = document.createElement('div');
  vendor.className = 'businessman-unit';
  vendor.innerHTML = '<span class="businessman-hat"></span><span class="unit-body"></span>';
  vendor.style.left = '260px';
  vendor.style.top = '150px';
  vendor.addEventListener('click', () => {
    if (state.money < state.blackMarketDropperPrice) {
      showFloating('TOO EXPENSIVE', 260, 110, true);
      return;
    }
    state.money -= state.blackMarketDropperPrice;
    state.blackMarketDropperCount += 1;
    state.blackMarketDroppers.push(120 + state.blackMarketDropperCount * 90);
    state.blackMarketDropperPrice = Math.floor(state.blackMarketDropperPrice * 1.5);
    renderDroppers();
    showFloating('BLACK MARKET', 260, 110, true);
    updateUI();
    vendor.remove();
    state.vendorActive = false;
  });
  els.gameArea.appendChild(vendor);
  state.vendorActive = true;
  state.vendorElement = vendor;
  setTimeout(() => {
    if (state.vendorActive && state.vendorElement === vendor) {
      vendor.remove();
      state.vendorActive = false;
      state.vendorElement = null;
    }
  }, 8000);
}

function initGame() {
  renderDroppers();
  createManualDropper();
  updateUI();
  updateMinigameUI();
  renderBossMinions();
  state.minionUnits.push(spawnMinionUnit());
  els.minionButton.disabled = true;
  els.devBtn.addEventListener('click', openDeveloperMenu);
  els.passwordSubmit.addEventListener('click', unlockDeveloperMenu);
  els.passwordCancel.addEventListener('click', closePasswordOverlay);
  els.addMoneyBtn.addEventListener('click', addDeveloperMoney);
  els.removeMoneyBtn.addEventListener('click', removeDeveloperMoney);
  els.addBlackMarketBtn.addEventListener('click', addBlackMarketDropper);
  els.closeDevBtn.addEventListener('click', () => els.developerOverlay.classList.add('hidden'));
  startDropping();
  startConveyor();
  startTicker();
  startCogWheel();
  setInterval(updateWalkingUnits, 40);
  setInterval(() => {
    if (!state.vendorActive) {
      spawnBusinessman();
    }
  }, 120000);
}

window.addEventListener('load', initGame);
window.buyDropper = buyDropper;
window.upgradeDropValue = upgradeDropValue;
window.upgradeSpeed = upgradeSpeed;
window.buyClicker = buyClicker;
window.upgradeClicker = upgradeClicker;
window.upgradeMinion = upgradeMinion;
window.hireBossMinion = hireBossMinion;
window.upgradeBossMinions = upgradeBossMinions;
window.rebirth = rebirth;
