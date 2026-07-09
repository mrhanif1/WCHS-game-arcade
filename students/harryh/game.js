const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const world = { width: 1400, height: 680 };

const ui = {
  wave: document.getElementById('waveValue'),
  coins: document.getElementById('coinsValue'),
  health: document.getElementById('healthValue'),
  xp: document.getElementById('xpValue'),
  level: document.getElementById('levelValue'),
  score: document.getElementById('scoreValue'),
  best: document.getElementById('bestValue'),
  selected: document.getElementById('selectedTower'),
  shop: document.getElementById('shopList'),
  upgradeBox: document.getElementById('upgradeBox'),
  leaderboardList: document.getElementById('leaderboardList'),
  overlay: document.getElementById('overlay'),
  overlayTitle: document.getElementById('overlayTitle'),
  overlayBody: document.getElementById('overlayBody'),
  overlayActions: document.getElementById('overlayActions'),
  pauseBtn: document.getElementById('pauseBtn'),
  modeBadge: document.getElementById('modeBadge'),
  challengeText: document.getElementById('challengeText'),
  mapSelect: document.getElementById('mapSelect')
};

const state = {
  gameStarted: false,
  paused: false,
  mode: 'campaign',
  wave: 1,
  maxWave: 50,
  coins: 180,
  health: 100,
  xp: 0,
  level: 1,
  score: 0,
  bestScore: 0,
  leaderboard: [],
  selectedTowerType: null,
  selectedTower: null,
  towers: [],
  enemies: [],
  projectiles: [],
  effects: [],
  gridSize: 48,
  map: 'desert',
  spawning: false,
  spawnIndex: 0,
  currentWaveEnemies: [],
  waveIntroTimer: 90,
  spawnTimer: 0,
  spawnDelay: 12,
  stats: { kills: 0, damageDealt: 0, wavesCompleted: 0, towersBuilt: 0 },
  achievements: [],
  unlockedTowers: ['plasma', 'frost', 'missile', 'support', 'economy'],
  challenge: { title: 'Survive 10 waves', target: 10, progress: 0, reward: 60 },
  lastTime: performance.now(),
  hoverCell: null,
  previewPoint: { x: 0, y: 0 }
};

const towerDefs = [
  { id: 'plasma', name: 'Plasma Tower', description: 'High-energy attacks burn through armour.', cost: 60, damage: 18, range: 140, cooldown: 55, color: '#5ee7ff' },
  { id: 'frost', name: 'Frost Tower', description: 'Slows enemies and freezes them at later levels.', cost: 55, damage: 10, range: 130, cooldown: 70, color: '#60a5fa' },
  { id: 'missile', name: 'Missile Tower', description: 'Long-range explosive strikes for clustered threats.', cost: 90, damage: 24, range: 180, cooldown: 95, color: '#f59e0b' },
  { id: 'support', name: 'Support Tower', description: 'Buffs nearby towers and increases output.', cost: 70, damage: 0, range: 120, cooldown: 90, color: '#a78bfa' },
  { id: 'economy', name: 'Economy Tower', description: 'Generates extra coins over time.', cost: 80, damage: 0, range: 90, cooldown: 120, color: '#34d399' },
  { id: 'laser', name: 'Laser Tower', description: 'Fast beam attacks that hit several foes.', cost: 95, damage: 12, range: 155, cooldown: 40, color: '#f43f5e' },
  { id: 'pulse', name: 'Pulse Tower', description: 'Sends shockwaves through dense groups.', cost: 110, damage: 14, range: 130, cooldown: 88, color: '#22c55e' },
  { id: 'void', name: 'Void Tower', description: 'Exposes invisible enemies and shreds shields.', cost: 130, damage: 16, range: 150, cooldown: 70, color: '#0f172a' },
  { id: 'storm', name: 'Storm Tower', description: 'Disrupts aerial enemies and slows movement.', cost: 125, damage: 15, range: 170, cooldown: 75, color: '#38bdf8' },
  { id: 'nova', name: 'Nova Tower', description: 'Explosive bursts around its target.', cost: 140, damage: 20, range: 140, cooldown: 100, color: '#fb7185' },
  { id: 'warden', name: 'Warden Tower', description: 'Protects the core and punishes incoming pressure.', cost: 160, damage: 8, range: 120, cooldown: 120, color: '#fde68a' },
  { id: 'arc', name: 'Arc Tower', description: 'Chains lightning between nearby enemies.', cost: 150, damage: 13, range: 160, cooldown: 65, color: '#a855f7' },
  { id: 'shredder', name: 'Shredder Tower', description: 'Slices through armour and breaks barriers.', cost: 165, damage: 17, range: 150, cooldown: 74, color: '#f97316' },
  { id: 'chrono', name: 'Chrono Tower', description: 'Temporally slows enemies for a deadly window.', cost: 180, damage: 11, range: 170, cooldown: 82, color: '#22d3ee' },
  { id: 'bastion', name: 'Bastion Tower', description: 'A heavy defensive tower with a broad aura.', cost: 190, damage: 16, range: 180, cooldown: 108, color: '#fb923c' }
];

const enemyDefs = [
  { id: 'scout', name: 'Scout Drone', hp: 28, speed: 1.3, reward: 8, color: '#8b5cf6', abilities: ['fast'] },
  { id: 'tank', name: 'Tank Walker', hp: 88, speed: 0.6, reward: 15, color: '#f59e0b', abilities: ['armour'] },
  { id: 'swarm', name: 'Swarm Cell', hp: 18, speed: 1.6, reward: 6, color: '#34d399', abilities: ['group'] },
  { id: 'shield', name: 'Shield Drone', hp: 72, speed: 0.82, reward: 13, color: '#60a5fa', abilities: ['shield'] },
  { id: 'drone', name: 'Aerial Drone', hp: 38, speed: 1.35, reward: 9, color: '#38bdf8', abilities: ['flying'] },
  { id: 'phantom', name: 'Phantom Runner', hp: 46, speed: 1.0, reward: 10, color: '#e2e8f0', abilities: ['invisible'] },
  { id: 'regenerator', name: 'Regenerator', hp: 80, speed: 0.76, reward: 14, color: '#4ade80', abilities: ['regen'] },
  { id: 'splitter', name: 'Splitter', hp: 57, speed: 0.92, reward: 12, color: '#fb923c', abilities: ['split'] },
  { id: 'elite', name: 'Elite Guard', hp: 128, speed: 0.72, reward: 18, color: '#f43f5e', abilities: ['armour', 'shield'] },
  { id: 'beast', name: 'Ravager', hp: 210, speed: 0.62, reward: 24, color: '#ef4444', abilities: ['boss'] },
  { id: 'slicer', name: 'Slicer', hp: 32, speed: 1.25, reward: 8, color: '#fb7185', abilities: ['fast'] },
  { id: 'brute', name: 'Brute', hp: 96, speed: 0.58, reward: 16, color: '#facc15', abilities: ['armour'] },
  { id: 'hatchling', name: 'Hatchling', hp: 24, speed: 1.45, reward: 6, color: '#a3e635', abilities: ['group'] },
  { id: 'warden', name: 'Warden', hp: 76, speed: 0.84, reward: 14, color: '#38bdf8', abilities: ['shield'] },
  { id: 'specter', name: 'Specter', hp: 42, speed: 1.08, reward: 10, color: '#f8fafc', abilities: ['invisible'] },
  { id: 'mender', name: 'Mender', hp: 84, speed: 0.78, reward: 15, color: '#22c55e', abilities: ['regen'] },
  { id: 'burst', name: 'Burst', hp: 60, speed: 0.95, reward: 11, color: '#f97316', abilities: ['split'] },
  { id: 'knight', name: 'Knight', hp: 136, speed: 0.7, reward: 19, color: '#ef4444', abilities: ['armour', 'shield'] },
  { id: 'brawler', name: 'Brawler', hp: 34, speed: 1.22, reward: 8, color: '#c084fc', abilities: ['fast'] },
  { id: 'crusher', name: 'Crusher', hp: 104, speed: 0.54, reward: 17, color: '#fb923c', abilities: ['armour'] },
  { id: 'stinger', name: 'Stinger', hp: 26, speed: 1.5, reward: 7, color: '#2dd4bf', abilities: ['group'] },
  { id: 'barrier', name: 'Barrier', hp: 82, speed: 0.8, reward: 14, color: '#60a5fa', abilities: ['shield'] },
  { id: 'glider', name: 'Glider', hp: 40, speed: 1.28, reward: 9, color: '#7dd3fc', abilities: ['flying'] },
  { id: 'gloom', name: 'Gloom', hp: 48, speed: 1.02, reward: 10, color: '#f8fafc', abilities: ['invisible'] },
  { id: 'repair', name: 'Repair', hp: 90, speed: 0.74, reward: 14, color: '#4ade80', abilities: ['regen'] },
  { id: 'fracture', name: 'Fracture', hp: 62, speed: 0.98, reward: 12, color: '#fdba74', abilities: ['split'] },
  { id: 'vanguard', name: 'Vanguard', hp: 144, speed: 0.68, reward: 20, color: '#f43f5e', abilities: ['armour', 'shield'] },
  { id: 'jitter', name: 'Jitter', hp: 30, speed: 1.32, reward: 8, color: '#f472b6', abilities: ['fast'] },
  { id: 'heavy', name: 'Heavy', hp: 112, speed: 0.56, reward: 18, color: '#f59e0b', abilities: ['armour'] },
  { id: 'sprinter', name: 'Sprinter', hp: 22, speed: 1.55, reward: 6, color: '#86efac', abilities: ['group'] },
  { id: 'pulseguard', name: 'Pulseguard', hp: 78, speed: 0.86, reward: 14, color: '#38bdf8', abilities: ['shield'] },
  { id: 'shade', name: 'Shade', hp: 44, speed: 1.04, reward: 10, color: '#e5e7eb', abilities: ['invisible'] },
  { id: 'mender2', name: 'Mender-2', hp: 94, speed: 0.76, reward: 15, color: '#4ade80', abilities: ['regen'] },
  { id: 'breaker', name: 'Breaker', hp: 64, speed: 0.96, reward: 12, color: '#fb923c', abilities: ['split'] },
  { id: 'prism', name: 'Prism', hp: 152, speed: 0.72, reward: 21, color: '#f43f5e', abilities: ['armour', 'shield'] },
  { id: 'crystal', name: 'Crystal Warden', hp: 234, speed: 0.6, reward: 28, color: '#c084fc', abilities: ['boss'] },
  { id: 'ember', name: 'Ember', hp: 36, speed: 1.18, reward: 8, color: '#fb923c', abilities: ['fast'] }
];

const maps = {
  desert: { name: 'Desert', color: '#d97706', accent: '#facc15', weather: 'sun' },
  forest: { name: 'Forest', color: '#22c55e', accent: '#86efac', weather: 'mist' },
  snow: { name: 'Snow', color: '#bfdbfe', accent: '#f8fafc', weather: 'snow' },
  space: { name: 'Space', color: '#8b5cf6', accent: '#38bdf8', weather: 'stars' }
};

const audio = { ctx: null, enabled: true };
const LEADERBOARD_KEY = 'fortress-evolution-leaderboard';
function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    state.leaderboard = Array.isArray(parsed) ? parsed : [];
    state.bestScore = state.leaderboard[0]?.score || 0;
  } catch (error) {
    state.leaderboard = [];
    state.bestScore = 0;
  }
}
function saveLeaderboard() {
  try {
    state.leaderboard = state.leaderboard.sort((a, b) => b.score - a.score).slice(0, 8);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(state.leaderboard));
    state.bestScore = state.leaderboard[0]?.score || 0;
  } catch (error) {
    // Ignore storage failures in private browsing or unsupported environments.
  }
}
function addScore(amount) {
  state.score += amount;
  if (state.score > state.bestScore) state.bestScore = state.score;
}
function submitScore() {
  if (!state.score) return;
  state.leaderboard.push({ name: 'Player', score: state.score, wave: state.wave, date: new Date().toLocaleDateString() });
  saveLeaderboard();
}
function initAudio() {
  if (audio.ctx || typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  audio.ctx = new AudioCtx();
}
function playTone(freq, duration, type = 'sine', volume = 0.04, delay = 0) {
  if (!audio.enabled) return;
  initAudio();
  if (!audio.ctx) return;
  const now = audio.ctx.currentTime + delay;
  const oscillator = audio.ctx.createOscillator();
  const gain = audio.ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, now);
  oscillator.frequency.exponentialRampToValueAtTime(freq * 1.08, now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(audio.ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}
function playSound(kind) {
  switch (kind) {
    case 'build': playTone(660, 0.08, 'triangle', 0.03); break;
    case 'tower': playTone(520, 0.12, 'square', 0.025); break;
    case 'enemy': playTone(280, 0.1, 'sawtooth', 0.02); break;
    case 'explosion': playTone(180, 0.18, 'sawtooth', 0.03); break;
    case 'boss': playTone(420, 0.25, 'square', 0.035); break;
    case 'wave': playTone(800, 0.16, 'triangle', 0.025); break;
    case 'victory': playTone(523, 0.13, 'triangle', 0.03); playTone(659, 0.2, 'triangle', 0.03, 0.12); break;
    case 'defeat': playTone(220, 0.2, 'sawtooth', 0.03); playTone(180, 0.3, 'sawtooth', 0.03, 0.15); break;
    default: break;
  }
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createPath() {
  return [
    { x: 0, y: 400 }, { x: 180, y: 400 }, { x: 260, y: 250 }, { x: 430, y: 250 }, { x: 520, y: 360 },
    { x: 700, y: 360 }, { x: 840, y: 230 }, { x: 980, y: 230 }, { x: 1060, y: 420 }, { x: 1240, y: 420 },
    { x: 1320, y: 300 }, { x: 1400, y: 300 }
  ];
}
const path = createPath();

function getCellFromPoint(x, y) { return { x: Math.floor(x / state.gridSize), y: Math.floor(y / state.gridSize) }; }
function canPlaceTower(x, y) {
  const cell = getCellFromPoint(x, y);
  if (cell.x < 0 || cell.y < 0 || cell.x > 28 || cell.y > 13) return false;
  return !state.towers.some(t => Math.abs(t.x - x) < 34 && Math.abs(t.y - y) < 34);
}
function buildWave(wave) {
  const list = [];
  const count = 6 + Math.min(24, wave * 2.3);
  if (wave % 10 === 0) {
    list.push({
      ...enemyDefs[9],
      boss: true,
      phase: 1,
      hp: 260 + wave * 16,
      maxHp: 260 + wave * 16,
      phaseName: 'Core'
    });
    for (let i = 0; i < 4; i += 1) list.push(enemyDefs[2 + (i % 4)]);
  }
  for (let i = 0; i < count; i += 1) {
    let enemyType = enemyDefs[Math.min(enemyDefs.length - 1, Math.floor(Math.random() * enemyDefs.length))];
    if (wave > 8 && Math.random() < 0.18) enemyType = enemyDefs[7];
    if (wave > 16 && Math.random() < 0.12) enemyType = enemyDefs[8];
    if (wave > 24 && Math.random() < 0.1) enemyType = enemyDefs[39];
    if (wave > 32 && Math.random() < 0.08) enemyType = enemyDefs[40];
    list.push(enemyType);
  }
  return list;
}
function startGame() { state.gameStarted = true; state.paused = false; ui.overlay.classList.add('hidden'); playSound('wave'); spawnWave(); }
function resetGame() {
  state.towers = []; state.enemies = []; state.projectiles = []; state.effects = []; state.wave = 1; state.coins = 180; state.health = 100; state.xp = 0; state.level = 1; state.score = 0; state.stats = { kills: 0, damageDealt: 0, wavesCompleted: 0, towersBuilt: 0 }; state.currentWaveEnemies = []; state.spawnIndex = 0; state.spawning = false; state.selectedTowerType = null; state.selectedTower = null; state.challenge.progress = 0; state.previewPoint = { x: 0, y: 0 }; state.gameStarted = true; ui.overlay.classList.add('hidden'); playSound('wave'); spawnWave();
}
function spawnWave() { state.spawning = true; state.spawnIndex = 0; state.currentWaveEnemies = buildWave(state.wave); state.waveIntroTimer = 90; state.spawnTimer = 0; state.spawnDelay = Math.max(8, 18 - Math.floor(state.wave / 4)); }
function createEnemy(type) {
  const waypoint = path[0];
  const enemy = {
    id: crypto.randomUUID(), type, x: waypoint.x, y: waypoint.y, hp: type.hp, maxHp: type.maxHp || type.hp, speed: type.speed * (state.wave > 5 ? 1 + Math.min(0.25, state.wave / 120) : 1), reward: type.reward, pathIndex: 0, alive: true, color: type.color, abilities: [...type.abilities], invisible: type.abilities.includes('invisible'), freezeTimer: 0, regenTimer: 0, splitCount: 0, boss: Boolean(type.boss), phase: type.phase || 1, phaseName: type.phaseName || 'Core', phaseTimer: 0
  };
  state.enemies.push(enemy);
  if (enemy.boss) playSound('boss');
}
function addCoins(amount) { state.coins += amount; }
function getTowerName(type) { const tower = towerDefs.find(item => item.id === type); return tower ? tower.name : type; }
function spawnSplitEnemies(parent) {
  const splitTypes = [enemyDefs[0], enemyDefs[2]];
  splitTypes.forEach((splitType, index) => {
    const enemy = {
      id: crypto.randomUUID(),
      type: splitType,
      x: parent.x + (index === 0 ? -8 : 8),
      y: parent.y,
      hp: Math.max(12, parent.hp * 0.45),
      maxHp: Math.max(12, parent.hp * 0.45),
      speed: splitType.speed * 1.05,
      reward: Math.max(3, Math.floor(splitType.reward * 0.7)),
      pathIndex: parent.pathIndex,
      alive: true,
      color: splitType.color,
      abilities: [...splitType.abilities],
      invisible: splitType.abilities.includes('invisible'),
      freezeTimer: 0,
      regenTimer: 0,
      splitCount: 0
    };
    state.enemies.push(enemy);
  });
}
function enterBossPhase(enemy, phase, label) {
  if (enemy.phase >= phase) return;
  enemy.phase = phase;
  enemy.phaseName = label;
  enemy.speed *= 1.06;
  enemy.color = phase === 2 ? '#fde68a' : '#fb7185';
  spawnBurst(enemy.x, enemy.y, '#ffffff', 18, 3.2);
  playSound('boss');
}
function unlockAchievement(name) { if (!state.achievements.includes(name)) { state.achievements.push(name); showOverlay('Achievement Unlocked', `${name} is recorded in your fortress history.`, [{ label: 'Continue', action: hideOverlay }]); } }
function showOverlay(title, body, actions = []) { ui.overlayTitle.textContent = title; ui.overlayBody.innerHTML = body; ui.overlayActions.innerHTML = ''; actions.forEach(action => { const btn = document.createElement('button'); btn.className = 'action-btn'; btn.textContent = action.label; btn.onclick = action.action; ui.overlayActions.appendChild(btn); }); ui.overlay.classList.remove('hidden'); }
function hideOverlay() { ui.overlay.classList.add('hidden'); }
function placeTower(x, y, type) {
  if (!canPlaceTower(x, y)) return false; const def = towerDefs.find(t => t.id === type); if (!def || state.coins < def.cost) return false; state.coins -= def.cost; const tower = { id: crypto.randomUUID(), type, x, y, level: 1, range: def.range, cooldown: def.cooldown, damage: def.damage, cost: def.cost, timer: 0, color: def.color }; state.towers.push(tower); state.stats.towersBuilt += 1; playSound('build'); spawnBurst(x, y, def.color, 10, 2.2); return true;
}
function checkUnlocks() { const unlocks = [5, 8, 12, 15]; unlocks.forEach((level, index) => { const towerId = ['laser', 'pulse', 'chrono', 'bastion'][index]; if (state.level >= level && !state.unlockedTowers.includes(towerId)) { state.unlockedTowers.push(towerId); unlockAchievement(`${towerId} unlocked`); } }); }
function getNearestEnemy(tower) { let nearest = null; let nearestDist = Infinity; for (const enemy of state.enemies) { if (!enemy.alive) continue; if (enemy.invisible && tower.type !== 'void' && tower.type !== 'storm') continue; const dx = enemy.x - tower.x; const dy = enemy.y - tower.y; const dist = Math.hypot(dx, dy); if (dist < tower.range && dist < nearestDist) { nearest = enemy; nearestDist = dist; } } return nearest; }
function fireTower(tower) {
  const target = getNearestEnemy(tower); if (!target) return; playSound('tower'); if (tower.type === 'support') { for (const other of state.towers) { if (other.id !== tower.id && Math.hypot(other.x - tower.x, other.y - tower.y) < 140) { other.damage += 0.35; } } spawnBurst(tower.x, tower.y, '#ffffff', 8, 1.6); return; }
  if (tower.type === 'economy') { state.coins += 2 + Math.max(0, state.level - 1); return; }
  if (tower.type === 'frost') { target.freezeTimer = 60; }
  if (tower.type === 'missile') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 70) damageEnemy(enemy, tower.damage * 1.15, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 9); return; }
  if (tower.type === 'laser') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 90) damageEnemy(enemy, tower.damage * 0.85, tower); return; }
  if (tower.type === 'pulse') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 90) damageEnemy(enemy, tower.damage * 0.9, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 6); return; }
  if (tower.type === 'void') { target.invisible = false; damageEnemy(target, tower.damage * 1.2, tower); return; }
  if (tower.type === 'storm') { target.freezeTimer = 30; damageEnemy(target, tower.damage * 0.95, tower); return; }
  if (tower.type === 'chrono') { target.freezeTimer = 40; damageEnemy(target, tower.damage * 0.9, tower); return; }
  if (tower.type === 'shredder') { damageEnemy(target, tower.damage * 1.05, tower); return; }
  if (tower.type === 'bastion') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 80) damageEnemy(enemy, tower.damage * 0.7, tower); }
  damageEnemy(target, tower.damage, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 7);
}
function damageEnemy(enemy, amount, source) {
  if (!enemy.alive) return; let incoming = amount; if (enemy.abilities.includes('armour')) incoming *= 0.82; if (enemy.abilities.includes('shield')) incoming *= 0.9; if (enemy.invisible && source && source.type !== 'void') incoming *= 0.7; enemy.hp -= incoming; state.stats.damageDealt += incoming; if (enemy.hp <= 0) { enemy.alive = false; addCoins(enemy.reward + Math.max(0, Math.floor(state.level / 4))); addScore(Math.max(12, enemy.reward * 6 + Math.floor(state.wave * 2))); state.stats.kills += 1; state.challenge.progress += 1; if (enemy.abilities.includes('split') && enemy.splitCount < 2) { enemy.splitCount += 1; spawnSplitEnemies(enemy); } if (state.stats.kills % 8 === 0) unlockAchievement('Momentum'); spawnBurst(enemy.x, enemy.y, enemy.color, 20, 3); playSound('enemy'); } }
function spawnProjectile(x1, y1, x2, y2, color, size) { state.projectiles.push({ x: x1, y: y1, tx: x2, ty: y2, color, size, life: 18 }); }
function spawnEffect(x, y, color, size) { state.effects.push({ x, y, color, size, life: 18 }); }
function spawnBurst(x, y, color, amount = 12, speed = 2.4) {
  for (let i = 0; i < amount; i += 1) {
    const angle = (Math.PI * 2 * i) / amount;
    state.effects.push({ x, y, vx: Math.cos(angle) * (Math.random() * speed + 0.8), vy: Math.sin(angle) * (Math.random() * speed + 0.8), life: 18 + Math.random() * 8, size: 2 + Math.random() * 3, color, glow: Math.random() > 0.6 });
  }
}
function update(dt) {
  if (!state.gameStarted || state.paused) return;
  if (state.waveIntroTimer > 0) state.waveIntroTimer -= 1;
  if (state.spawning && state.waveIntroTimer <= 0) { state.spawnTimer += 1; if (state.spawnTimer >= state.spawnDelay) { state.spawnTimer = 0; if (state.spawnIndex < state.currentWaveEnemies.length) { createEnemy(state.currentWaveEnemies[state.spawnIndex]); state.spawnIndex += 1; } } }
  if (state.spawning && state.spawnIndex >= state.currentWaveEnemies.length && state.enemies.length === 0) { state.spawning = false; state.wave += 1; state.coins += 40 + state.wave * 4; state.xp += 18 + state.wave * 2; addScore(45 + state.wave * 10); state.stats.wavesCompleted += 1; if (state.challenge.progress >= state.challenge.target) { state.coins += state.challenge.reward; state.challenge.progress = 0; unlockAchievement('Daily Challenge Complete'); }
    if (state.wave > state.maxWave) { addScore(180 + state.wave * 16); submitScore(); playSound('victory'); showOverlay('Victory', 'The fortress survived the campaign and the arc is secure.', [{ label: 'Restart', action: resetGame }]); state.gameStarted = false; }
    else { playSound('wave'); showOverlay('Wave Complete', `Wave ${state.wave - 1} cleared. Bosses emerge every 10 waves.`, [{ label: 'Continue', action: hideOverlay }]); }
  }
  for (const tower of state.towers) { tower.timer += 1; if (tower.timer >= tower.cooldown) { tower.timer = 0; fireTower(tower); } }
  for (const enemy of state.enemies) { if (!enemy.alive) continue; if (enemy.freezeTimer > 0) { enemy.freezeTimer -= 1; if (enemy.freezeTimer === 0) enemy.speed *= 0.85; }
    if (enemy.boss) {
      enemy.phaseTimer += 1;
      if (enemy.phase === 1 && enemy.hp <= enemy.maxHp * 0.65) enterBossPhase(enemy, 2, 'Storm');
      if (enemy.phase === 2 && enemy.hp <= enemy.maxHp * 0.35) enterBossPhase(enemy, 3, 'Nova');
      if (enemy.phase >= 2 && enemy.phaseTimer % 140 === 0) {
        spawnBurst(enemy.x, enemy.y, '#fde68a', 8, 2.2);
        createEnemy(enemyDefs[2]);
      }
    }
    if (enemy.abilities.includes('regen') && enemy.hp < enemy.maxHp) { enemy.regenTimer += 1; if (enemy.regenTimer > 90) { enemy.hp = Math.min(enemy.maxHp, enemy.hp + 3); enemy.regenTimer = 0; } }
    const targetPoint = path[enemy.pathIndex + 1] || path[path.length - 1]; const dx = targetPoint.x - enemy.x; const dy = targetPoint.y - enemy.y; const dist = Math.hypot(dx, dy);
    if (dist < 2) { enemy.pathIndex += 1; if (enemy.pathIndex >= path.length - 1) { state.health -= 1; enemy.alive = false; state.enemies = state.enemies.filter(e => e.id !== enemy.id); break; } }
    else { const move = enemy.speed * dt * 0.06; enemy.x += (dx / dist) * move; enemy.y += (dy / dist) * move; }
  }
  for (const projectile of state.projectiles) { projectile.life -= 1; projectile.x += (projectile.tx - projectile.x) * 0.2; projectile.y += (projectile.ty - projectile.y) * 0.2; if (projectile.life <= 0) projectile.dead = true; }
  state.projectiles = state.projectiles.filter(p => !p.dead);
  state.effects = state.effects.filter(e => e.life > 0).map(e => ({ ...e, life: e.life - 1, x: e.x + e.vx, y: e.y + e.vy, vx: e.vx * 0.95, vy: e.vy * 0.95 }));
  updateProgression();
  render();
}
function updateProgression() { if (state.xp >= state.level * 60) { state.level += 1; state.xp = 0; addScore(60 + state.level * 8); unlockAchievement(`Level ${state.level}`); checkUnlocks(); } if (state.health <= 0) { state.gameStarted = false; submitScore(); playSound('defeat'); showOverlay('Defeat', 'The core has fallen. Rebuild the fortress and try again.', [{ label: 'Restart', action: resetGame }]); } }
function getCanvasMetrics() { const rect = canvas.getBoundingClientRect(); const scale = Math.min(rect.width / world.width, rect.height / world.height); const offsetX = (rect.width - world.width * scale) / 2; const offsetY = (rect.height - world.height * scale) / 2; return { rect, scale, offsetX, offsetY }; }
function screenToWorld(clientX, clientY) { const { rect, scale, offsetX, offsetY } = getCanvasMetrics(); const x = (clientX - rect.left - offsetX) / scale; const y = (clientY - rect.top - offsetY) / scale; return { x, y }; }
function render() { const { rect, scale, offsetX, offsetY } = getCanvasMetrics(); ctx.clearRect(0, 0, rect.width, rect.height); ctx.save(); ctx.translate(offsetX, offsetY); ctx.scale(scale, scale); drawBackground(); drawPath(); drawGrid(); drawPlacementPreview(); drawTowers(); drawEnemies(); drawProjectiles(); drawEffects(); drawHud(); ctx.restore(); }
function drawBackground() {
  const mapData = maps[state.map];
  const waveTheme = state.wave % 10 === 0 ? 'boss' : (state.wave > 20 ? 'storm' : 'normal');
  const time = performance.now() * 0.001;
  ctx.fillStyle = '#050816';
  ctx.fillRect(0, 0, world.width, world.height);
  const g = ctx.createLinearGradient(0, 0, world.width, world.height);
  g.addColorStop(0, mapData.color + '44');
  g.addColorStop(1, waveTheme === 'boss' ? '#111827' : '#020617');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, world.width, world.height);
  if (mapData.weather === 'sun') {
    const flareX = world.width * 0.82 + Math.sin(time * 0.8) * 12;
    const flareY = world.height * 0.2 + Math.cos(time * 0.7) * 8;
    ctx.fillStyle = 'rgba(251,191,36,0.25)';
    ctx.beginPath(); ctx.arc(flareX, flareY, 74 + Math.sin(time * 1.2) * 7, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 12; i += 1) {
      const x = (i * 130 + time * 34) % (world.width + 120) - 60;
      const y = 70 + (i % 3) * 45 + Math.sin(time + i) * 20;
      ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.beginPath(); ctx.arc(x, y, 22 + (i % 2) * 5, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (mapData.weather === 'snow') {
    for (let i = 0; i < 70; i += 1) {
      const x = (i * 37 + time * 80 + (i % 5) * 11) % (world.width + 20) - 10; const y = (i * 53 + time * 20 + (i % 3) * 17) % (world.height + 20) - 10;
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (mapData.weather === 'mist') {
    for (let i = 0; i < 4; i += 1) {
      const offset = i * 110 + time * 22;
      ctx.fillStyle = `rgba(134,239,172,${0.06 + i * 0.02})`;
      ctx.beginPath(); ctx.moveTo(-20, 180 + i * 80); ctx.quadraticCurveTo(world.width * 0.25 + Math.sin(time + i) * 40, 120 + i * 25, world.width * 0.5 + offset * 0.01, 180 + i * 70); ctx.quadraticCurveTo(world.width * 0.75, 220 + i * 35, world.width + 40, 160 + i * 60); ctx.lineTo(world.width + 40, world.height + 20); ctx.lineTo(-20, world.height + 20); ctx.closePath(); ctx.fill();
    }
  }
  if (mapData.weather === 'stars') {
    for (let i = 0; i < 90; i += 1) {
      const x = ((i * 29 + time * 18) % world.width + world.width) % world.width; const y = ((i * 41 + time * 9) % world.height + world.height) % world.height; const alpha = 0.45 + (Math.sin(time * 2 + i) + 1) * 0.25; ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.beginPath(); ctx.arc(x, y, 1.2 + (i % 3) * 0.2, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (waveTheme === 'boss') {
    ctx.strokeStyle = 'rgba(253,230,138,0.22)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(world.width * 0.82, world.height * 0.22, 90 + Math.sin(time * 1.5) * 5, 0, Math.PI * 2); ctx.stroke();
  }
}
function drawPath() { ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); path.forEach((point, i) => { if (i === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y); }); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#fbbf24'; ctx.stroke(); }
function drawGrid() { ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; const size = state.gridSize; for (let x = 0; x <= world.width; x += size) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, world.height); ctx.stroke(); } for (let y = 0; y <= world.height; y += size) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(world.width, y); ctx.stroke(); } }
function drawPlacementPreview() {
  if (!state.selectedTowerType) return;
  const def = towerDefs.find(item => item.id === state.selectedTowerType);
  if (!def) return;
  const valid = canPlaceTower(state.previewPoint.x, state.previewPoint.y) && state.coins >= def.cost;
  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.arc(state.previewPoint.x, state.previewPoint.y, 16, 0, Math.PI * 2);
  ctx.fillStyle = def.color;
  ctx.fill();
  ctx.strokeStyle = valid ? '#39d98a' : '#ff5d73';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}
function drawTowers() { for (const tower of state.towers) { ctx.beginPath(); ctx.arc(tower.x, tower.y, 16, 0, Math.PI * 2); ctx.fillStyle = tower.color; ctx.fill(); ctx.beginPath(); ctx.arc(tower.x, tower.y, 20, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.stroke(); ctx.beginPath(); ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(94,231,255,0.16)'; ctx.stroke(); } }
function drawEnemies() { for (const enemy of state.enemies) { if (!enemy.alive) continue; const alpha = enemy.invisible ? 0.45 : 1; ctx.globalAlpha = alpha; ctx.fillStyle = enemy.color; ctx.beginPath(); if (enemy.abilities.includes('boss')) { ctx.moveTo(enemy.x, enemy.y - 12); ctx.lineTo(enemy.x + 10, enemy.y - 4); ctx.lineTo(enemy.x + 6, enemy.y + 10); ctx.lineTo(enemy.x - 6, enemy.y + 10); ctx.lineTo(enemy.x - 10, enemy.y - 4); ctx.closePath(); } else { ctx.arc(enemy.x, enemy.y, 10, 0, Math.PI * 2); } ctx.fill(); ctx.globalAlpha = 1; if (enemy.abilities.includes('boss')) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; ctx.stroke(); }
    if (enemy.hp < enemy.maxHp) { ctx.fillStyle = '#ef4444'; ctx.fillRect(enemy.x - 12, enemy.y - 16, 24 * (enemy.hp / enemy.maxHp), 4); } } }
function drawProjectiles() { for (const projectile of state.projectiles) { ctx.fillStyle = projectile.color; ctx.beginPath(); ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2); ctx.fill(); } }
function drawEffects() { for (const effect of state.effects) { ctx.globalAlpha = effect.life / 24; ctx.fillStyle = effect.color; ctx.beginPath(); ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2); ctx.fill(); if (effect.glow) { ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.stroke(); } ctx.globalAlpha = 1; } }
function drawHud() { ctx.fillStyle = 'rgba(3,7,18,0.7)'; ctx.fillRect(16, 16, 260, 110); ctx.fillStyle = 'white'; ctx.font = '14px Inter, sans-serif'; ctx.fillText(`Wave ${state.wave}`, 28, 38); ctx.fillText(`Coins ${state.coins}`, 28, 60); ctx.fillText(`Health ${state.health}`, 28, 82); ctx.fillText(`XP ${state.xp}/${state.level * 60}`, 28, 104); }
function updateUi() {
  ui.wave.textContent = state.wave; ui.coins.textContent = state.coins; ui.health.textContent = state.health; ui.xp.textContent = `${state.xp}/${state.level * 60}`; ui.level.textContent = state.level; ui.score.textContent = state.score; ui.best.textContent = state.bestScore; ui.modeBadge.textContent = state.mode.toUpperCase(); ui.challengeText.textContent = `${state.challenge.title} · ${state.challenge.progress}/${state.challenge.target}`; if (state.selectedTower) ui.selected.textContent = `${getTowerName(state.selectedTower.type)} • Lv${state.selectedTower.level}`; else ui.selected.textContent = 'Select a tower'; renderShop(); renderUpgrades(); renderLeaderboard(); }
function renderShop() { ui.shop.innerHTML = ''; towerDefs.filter(tower => state.unlockedTowers.includes(tower.id)).forEach(tower => { const card = document.createElement('div'); card.className = 'shop-card'; if (state.selectedTowerType === tower.id) card.classList.add('active'); card.innerHTML = `<div class="name">${tower.name}</div><div class="meta">${tower.description}</div><div class="meta">Cost ${tower.cost} • Dmg ${tower.damage}</div>`; const btn = document.createElement('button'); btn.textContent = 'Select'; btn.onclick = () => { state.selectedTowerType = tower.id; updateUi(); }; card.appendChild(btn); ui.shop.appendChild(card); }); }
function renderUpgrades() { ui.upgradeBox.innerHTML = ''; if (!state.selectedTower) { ui.upgradeBox.innerHTML = '<div class="upgrade-item">Select a tower to see upgrade options.</div>'; return; } const tower = state.selectedTower; const item = document.createElement('div'); item.className = 'upgrade-item'; item.innerHTML = `<strong>${getTowerName(tower.type)}</strong><div>Level ${tower.level}</div><div>Damage ${tower.damage.toFixed(1)}</div><div>Range ${tower.range}</div>`; const damageBtn = document.createElement('button'); damageBtn.textContent = 'Damage path'; damageBtn.onclick = () => { const cost = 40 + tower.level * 20; if (state.coins >= cost) { state.coins -= cost; tower.level += 1; tower.damage *= 1.2; tower.range += 6; tower.cooldown = Math.max(18, tower.cooldown - 3); updateUi(); } }; const speedBtn = document.createElement('button'); speedBtn.textContent = 'Speed path'; speedBtn.onclick = () => { const cost = 35 + tower.level * 18; if (state.coins >= cost) { state.coins -= cost; tower.level += 1; tower.cooldown = Math.max(18, tower.cooldown - 7); tower.range += 4; updateUi(); } }; item.append(damageBtn, speedBtn); ui.upgradeBox.appendChild(item); }
function renderLeaderboard() {
  ui.leaderboardList.innerHTML = '';
  if (!state.leaderboard.length) {
    ui.leaderboardList.innerHTML = '<div class="leaderboard-entry">No runs recorded yet.</div>';
    return;
  }
  state.leaderboard.slice(0, 5).forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'leaderboard-entry';
    row.innerHTML = `<div><strong>#${index + 1} ${entry.name}</strong><div>${entry.wave} waves</div></div><div>${entry.score}</div>`;
    ui.leaderboardList.appendChild(row);
  });
}
function handleCellClick(event) { const point = screenToWorld(event.clientX, event.clientY); state.previewPoint = point; if (state.selectedTowerType) { if (placeTower(point.x, point.y, state.selectedTowerType)) { state.selectedTowerType = null; updateUi(); } } else { const found = state.towers.find(t => Math.hypot(t.x - point.x, t.y - point.y) < 24); if (found) { state.selectedTower = found; updateUi(); } } }
canvas.addEventListener('click', handleCellClick); canvas.addEventListener('mousemove', event => { const point = screenToWorld(event.clientX, event.clientY); state.previewPoint = point; state.hoverCell = getCellFromPoint(point.x, point.y); });
ui.mapSelect.addEventListener('change', (event) => { state.map = event.target.value; });
document.getElementById('startBtn').addEventListener('click', startGame); document.getElementById('restartBtn').addEventListener('click', resetGame); document.getElementById('pauseBtn').addEventListener('click', () => { state.paused = !state.paused; ui.pauseBtn.textContent = state.paused ? 'Resume' : 'Pause'; }); document.getElementById('helpBtn').addEventListener('click', () => { showOverlay('How to Play', 'Place towers on the grid, use support and economy towers to sustain your economy, and counter unusual enemies with the specialised towers.', [{ label: 'Continue', action: hideOverlay }]); });
function loop(now) { const dt = now - state.lastTime; state.lastTime = now; update(dt); updateUi(); requestAnimationFrame(loop); }
requestAnimationFrame(loop);
loadLeaderboard();
showOverlay('Fortress Evolution', '<div class="card-list"><div class="item"><strong>Campaign</strong>Survive 50 waves, face bosses every 10 waves, and unlock deeper tower paths.</div><div class="item"><strong>Systems</strong>Grid placement, pathing, coins, XP, achievements, score tracking, and a polished UI are all included.</div><div class="item"><strong>Goal</strong>Defend the core and evolve your fortress.</div></div>', [{ label: 'Start Game', action: startGame }, { label: 'Close', action: hideOverlay }]);
updateUi();
