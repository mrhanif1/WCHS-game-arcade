const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const world = { width: 1400, height: 680 };

const contentModule = window.CSPlatformContent || {};

class QuestionBankService {
  constructor() {
    this.topics = [
      { name: 'Hardware', slug: 'hardware', description: 'CPU, RAM, storage and input/output devices.' },
      { name: 'Software', slug: 'software', description: 'Operating systems, utility software and licensing.' },
      { name: 'Programming', slug: 'programming', description: 'Variables, loops, functions and algorithms.' },
      { name: 'Networks', slug: 'networks', description: 'LAN, WAN, routers, DNS and IP addressing.' },
      { name: 'Cyber Security', slug: 'cyber', description: 'Malware, phishing, encryption and authentication.' },
      { name: 'Data Representation', slug: 'data', description: 'Binary, denary, hexadecimal and compression.' },
      { name: 'Logic', slug: 'logic', description: 'Boolean logic, truth tables and logic gates.' },
      { name: 'Databases', slug: 'databases', description: 'Tables, records, fields and SQL.' }
    ];
    this.contentQuestions = Array.isArray(contentModule.questionBank) ? contentModule.questionBank : [];
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  buildQuestion(topicName, difficulty = 'medium') {
    const requestedTopic = topicName || this.topics[Math.floor(Math.random() * this.topics.length)].name;
    const topic = this.topics.find(entry => entry.name === requestedTopic) || this.topics[0];
    const difficultyLevel = difficulty || 'medium';

    if (this.contentQuestions.length) {
      const byTopic = this.contentQuestions.filter((entry) => entry.topic === requestedTopic || entry.topic === topic.name);
      const pool = byTopic.length ? byTopic : this.contentQuestions;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (pick) {
        return {
          ...pick,
          topic: pick.topic || topic.name,
          difficulty: pick.difficulty || difficultyLevel,
          id: `${pick.id || `content-${Date.now()}`}-${Math.random().toString(36).slice(2)}`
        };
      }
    }

    switch (topic.slug) {
      case 'hardware':
        if (Math.random() > 0.5) {
          const memoryTypes = ['RAM', 'ROM', 'Cache'];
          const label = memoryTypes[this.randomInt(0, memoryTypes.length - 1)];
          return { id: `hw-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: `Which component is primarily used for temporary working memory in a computer?`, options: ['RAM', 'ROM', 'CPU', 'Hard Drive'], answer: 0, explanation: `${label} provides fast temporary storage for the CPU while programs are running.`, reward: 18 };
        }
        return { id: `hw-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What is the main purpose of the CPU?', options: ['Store files permanently', 'Process instructions', 'Display graphics', 'Connect to the internet'], answer: 1, explanation: 'The CPU executes instructions and performs the core processing tasks.', reward: 18 };
      case 'software':
        return { id: `sw-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'Which software type is designed to keep the computer running efficiently?', options: ['Utility software', 'Word processor', 'Web browser', 'Spreadsheet'], answer: 0, explanation: 'Utility software helps maintain, optimise and protect the system.', reward: 16 };
      case 'programming':
        if (Math.random() > 0.5) {
          return { id: `pg-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'Which loop is best when you know how many times you want to repeat something?', options: ['While loop', 'For loop', 'If statement', 'Function'], answer: 1, explanation: 'A for loop is ideal when the number of repetitions is known in advance.', reward: 20 };
        }
        return { id: `pg-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What is the purpose of a function?', options: ['To repeat code without a loop', 'To store data permanently', 'To group reusable code', 'To create a database'], answer: 2, explanation: 'Functions group reusable instructions so code can be written more clearly and reused.', reward: 20 };
      case 'networks':
        if (Math.random() > 0.5) {
          return { id: `nt-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'Which device directs data between networks?', options: ['Router', 'Keyboard', 'Monitor', 'Printer'], answer: 0, explanation: 'Routers forward packets between different networks.', reward: 18 };
        }
        return { id: `nt-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What does DNS do?', options: ['Turns names into IP addresses', 'Stores passwords', 'Creates new websites', 'Measures bandwidth'], answer: 0, explanation: 'DNS translates human-readable domain names into IP addresses.', reward: 18 };
      case 'cyber':
        if (Math.random() > 0.5) {
          return { id: `cy-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'Which threat is disguised as trustworthy software?', options: ['Trojan', 'Router', 'Switch', 'Firewall'], answer: 0, explanation: 'A Trojan appears legitimate but delivers malicious behaviour once installed.', reward: 22 };
        }
        return { id: `cy-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What is the main purpose of multi-factor authentication?', options: ['To make login slower', 'To reduce password reuse', 'To add extra identity checks', 'To disable accounts'], answer: 2, explanation: 'MFA adds extra validation steps so accounts are harder to compromise.', reward: 22 };
      case 'data':
        if (Math.random() > 0.5) {
          const decimal = this.randomInt(8, 32);
          const binary = decimal.toString(2);
          return { id: `dt-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: `What is ${decimal} in binary?`, options: [binary, (decimal + 1).toString(2), (decimal - 1).toString(2), '101010'], answer: 0, explanation: 'Binary uses powers of two, so the value is represented by the correct bit pattern.', reward: 20 };
        }
        return { id: `dt-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What does ASCII represent?', options: ['A character set', 'A network protocol', 'A programming language', 'A storage drive'], answer: 0, explanation: 'ASCII is a standard character encoding used for text.', reward: 20 };
      case 'logic':
        return { id: `lg-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What does the NOT gate do?', options: ['It combines two inputs', 'It inverts a single input', 'It stores memory', 'It adds numbers'], answer: 1, explanation: 'A NOT gate flips the input from true to false or vice versa.', reward: 19 };
      case 'databases':
        return { id: `db-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'What is a primary key used for?', options: ['To make a table faster', 'To uniquely identify records', 'To encrypt data', 'To create backup copies'], answer: 1, explanation: 'Primary keys uniquely identify each record in a table.', reward: 18 };
      default:
        return { id: `general-${Date.now()}-${Math.random()}`, topic: topic.name, difficulty: difficultyLevel, type: 'multiple-choice', prompt: 'Which statement is true about computer science?', options: ['It studies only hardware', 'It covers problem solving and systems', 'It avoids programming', 'It only uses maths'], answer: 1, explanation: 'Computer science combines theory, problem solving, programming and systems design.', reward: 15 };
    }
  }

  generateQuestion(topicName = null, difficulty = null) {
    const topic = topicName || this.topics[Math.floor(Math.random() * this.topics.length)].name;
    return this.buildQuestion(topic, difficulty);
  }

  generateQuestionSet(topicName = null, count = 24) {
    const questions = [];
    const requestedTopic = topicName || this.topics[Math.floor(Math.random() * this.topics.length)].name;
    const pool = this.contentQuestions.filter((entry) => entry.topic === requestedTopic || entry.topic === requestedTopic.toLowerCase());
    for (let i = 0; i < count; i += 1) {
      const source = pool.length ? pool[i % pool.length] : null;
      if (source) {
        questions.push({ ...source, id: `${source.id || `set-${i}`}-${Date.now()}-${Math.random().toString(36).slice(2)}` });
      } else {
        questions.push(this.generateQuestion(requestedTopic));
      }
    }
    return questions;
  }
}

const questionService = new QuestionBankService();

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
  battleStatus: document.getElementById('battleStatus'),
  eventFeed: document.getElementById('eventFeed'),
  mapSelect: document.getElementById('mapSelect'),
  themeToggle: document.getElementById('themeToggle'),
  topicList: document.getElementById('topicList'),
  questionCount: document.getElementById('questionCount'),
  mockExamBtn: document.getElementById('mockExamBtn'),
  studyPlanBtn: document.getElementById('studyPlanBtn'),
  studyPlanBox: document.getElementById('studyPlanBox'),
  quizHeader: document.getElementById('quizHeader'),
  questionPrompt: document.getElementById('questionPrompt'),
  answerOptions: document.getElementById('answerOptions'),
  feedbackBox: document.getElementById('feedbackBox'),
  checkAnswerBtn: document.getElementById('checkAnswerBtn'),
  skipQuestionBtn: document.getElementById('skipQuestionBtn'),
  profileStats: document.getElementById('profileStats'),
  weakTopics: document.getElementById('weakTopics'),
  soundToggle: document.getElementById('soundToggle'),
  animationToggle: document.getElementById('animationToggle'),
  colorblindToggle: document.getElementById('colorblindToggle'),
  missionList: document.getElementById('missionList'),
  dailyRewardBtn: document.getElementById('dailyRewardBtn'),
  saveStatus: document.getElementById('saveStatus')
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
  previewPoint: { x: 0, y: 0 },
  placementBlockedReason: '',
  pendingTowerHint: '',
  combo: 0,
  comboTimer: 0,
  surgeActive: false,
  surgeTimer: 0,
  waveBanner: '',
  waveBannerTimer: 0,
  messages: [],
  levelFlash: 0,
  levelPulse: 0,
  settings: { animationsEnabled: true, soundEnabled: true, colorblindMode: false, theme: 'dark' },
  learning: {
    currentQuestion: null,
    selectedOption: null,
    answeredCount: 0,
    streak: 0,
    bestStreak: 0,
    gems: 0,
    focusTopic: null,
    topicScores: {},
    weakTopics: [],
    challengeActive: false,
    bossQuestionPending: false,
    questionLog: [],
    examQuestions: [],
    examIndex: 0,
    examMode: false,
    studyPlan: null,
    revisionDeck: null
  },
  missions: [
    { id: 'five-correct', title: 'Five correct answers', description: 'Answer five questions correctly.', progress: 0, target: 5, reward: 35, complete: false },
    { id: 'topic-master', title: 'Topic streak', description: 'Reach 80% in any topic.', progress: 0, target: 80, reward: 45, complete: false },
    { id: 'wave-guard', title: 'Wave defender', description: 'Survive 10 waves in the game.', progress: 0, target: 10, reward: 50, complete: false }
  ],
  dailyReward: { claimed: false, lastClaimed: null },
  saveKey: 'fortress-evolution-save-v1'
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
  { id: 'bastion', name: 'Bastion Tower', description: 'A heavy defensive tower with a broad aura.', cost: 190, damage: 16, range: 180, cooldown: 108, color: '#fb923c' },
  { id: 'ranger', name: 'Ranger Tower', description: 'Fast precision fire that punishes stragglers.', cost: 175, damage: 14, range: 200, cooldown: 42, color: '#f472b6' },
  { id: 'warden2', name: 'Sentinel Warden', description: 'Protects the core with a broad shield pulse.', cost: 205, damage: 12, range: 165, cooldown: 110, color: '#fde68a' },
  { id: 'siphon', name: 'Siphon Tower', description: 'Drains energy from enemies and turns it into coins.', cost: 220, damage: 11, range: 155, cooldown: 96, color: '#34d399' },
  { id: 'blitz', name: 'Blitz Tower', description: 'Rapid firing shock towers that overwhelm crowded lanes.', cost: 230, damage: 13, range: 145, cooldown: 38, color: '#fb7185' },
  { id: 'meteor', name: 'Meteor Tower', description: 'Calls down fiery impacts that punish clustered packs.', cost: 260, damage: 17, range: 170, cooldown: 118, color: '#f97316' },
  { id: 'aegis', name: 'Aegis Tower', description: 'Creates a shield pulse that protects nearby towers.', cost: 275, damage: 10, range: 150, cooldown: 132, color: '#f8fafc' },
  { id: 'volt', name: 'Volt Tower', description: 'A high-frequency electric tower that chains between targets.', cost: 295, damage: 15, range: 180, cooldown: 48, color: '#38bdf8' },
  { id: 'rift', name: 'Rift Tower', description: 'Distorts space and weakens enemies before impact.', cost: 320, damage: 16, range: 185, cooldown: 96, color: '#a78bfa' }
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
  { id: 'ember', name: 'Ember', hp: 36, speed: 1.18, reward: 8, color: '#fb923c', abilities: ['fast'] },
  { id: 'reaper', name: 'Reaper', hp: 52, speed: 1.14, reward: 11, color: '#f43f5e', abilities: ['fast', 'invisible'] },
  { id: 'spike', name: 'Spike Runner', hp: 66, speed: 0.9, reward: 13, color: '#fb923c', abilities: ['armour'] },
  { id: 'novae', name: 'Novae', hp: 40, speed: 1.1, reward: 10, color: '#facc15', abilities: ['split'] },
  { id: 'harrier', name: 'Harrier', hp: 74, speed: 0.88, reward: 15, color: '#7dd3fc', abilities: ['flying', 'shield'] },
  { id: 'emberguard', name: 'Ember Guard', hp: 136, speed: 0.72, reward: 22, color: '#f97316', abilities: ['armour', 'shield'] },
  { id: 'phase', name: 'Phase', hp: 58, speed: 1.02, reward: 12, color: '#e2e8f0', abilities: ['invisible'] },
  { id: 'flare', name: 'Flare', hp: 48, speed: 1.16, reward: 11, color: '#fb923c', abilities: ['fast'] },
  { id: 'husk', name: 'Husk', hp: 108, speed: 0.66, reward: 17, color: '#f59e0b', abilities: ['armour'] },
  { id: 'veil', name: 'Veil', hp: 54, speed: 1.0, reward: 11, color: '#e2e8f0', abilities: ['invisible'] },
  { id: 'stormer', name: 'Stormer', hp: 92, speed: 0.84, reward: 15, color: '#38bdf8', abilities: ['shield'] },
  { id: 'cinder', name: 'Cinder', hp: 70, speed: 0.88, reward: 13, color: '#f43f5e', abilities: [' split'] }
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
const MAX_FEED_MESSAGES = 6;
function pushEvent(text, tone = 'info') {
  state.messages.unshift({ text, tone });
  state.messages = state.messages.slice(0, MAX_FEED_MESSAGES);
  updateUi();
}
function renderEventFeed() {
  if (!ui.eventFeed) return;
  ui.eventFeed.innerHTML = '';
  if (!state.messages.length) {
    const empty = document.createElement('div');
    empty.className = 'event-entry empty';
    empty.textContent = 'Your battle feed will light up as waves intensify.';
    ui.eventFeed.appendChild(empty);
    return;
  }
  state.messages.forEach((entry) => {
    const row = document.createElement('div');
    row.className = `event-entry ${entry.tone}`;
    row.innerHTML = `<span class="event-dot"></span><span>${entry.text}</span>`;
    ui.eventFeed.appendChild(row);
  });
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

function createPath(mapName = 'desert') {
  switch (mapName) {
    case 'forest':
      return [
        { x: 0, y: 340 }, { x: 180, y: 340 }, { x: 250, y: 220 }, { x: 420, y: 220 }, { x: 500, y: 420 },
        { x: 690, y: 420 }, { x: 780, y: 280 }, { x: 960, y: 280 }, { x: 1080, y: 520 }, { x: 1280, y: 520 },
        { x: 1360, y: 360 }, { x: 1400, y: 360 }
      ];
    case 'snow':
      return [
        { x: 0, y: 460 }, { x: 160, y: 460 }, { x: 240, y: 320 }, { x: 420, y: 320 }, { x: 500, y: 180 },
        { x: 760, y: 180 }, { x: 860, y: 360 }, { x: 1040, y: 360 }, { x: 1140, y: 220 }, { x: 1300, y: 220 },
        { x: 1380, y: 300 }, { x: 1400, y: 300 }
      ];
    case 'space':
      return [
        { x: 0, y: 250 }, { x: 180, y: 250 }, { x: 260, y: 460 }, { x: 500, y: 460 }, { x: 620, y: 300 },
        { x: 820, y: 300 }, { x: 900, y: 520 }, { x: 1120, y: 520 }, { x: 1240, y: 360 }, { x: 1400, y: 360 }
      ];
    default:
      return [
        { x: 0, y: 400 }, { x: 180, y: 400 }, { x: 260, y: 250 }, { x: 430, y: 250 }, { x: 520, y: 360 },
        { x: 700, y: 360 }, { x: 840, y: 230 }, { x: 980, y: 230 }, { x: 1060, y: 420 }, { x: 1240, y: 420 },
        { x: 1320, y: 300 }, { x: 1400, y: 300 }
      ];
  }
}
let path = createPath(state.map);
function refreshPath() {
  path = createPath(state.map);
  state.pendingTowerHint = `${maps[state.map].name} route loaded. Towers will need to adapt to the new path.`;
  pushEvent(`${maps[state.map].name} route loaded.`, 'info');
}

function getCellFromPoint(x, y) { return { x: Math.floor(x / state.gridSize), y: Math.floor(y / state.gridSize) }; }
function snapToGrid(x, y) {
  return {
    x: Math.round(x / state.gridSize) * state.gridSize,
    y: Math.round(y / state.gridSize) * state.gridSize
  };
}
function isOnPath(x, y) {
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = path[i];
    const b = path[i + 1];
    const dist = Math.abs((b.x - a.x) * (a.y - y) - (a.x - x) * (b.y - a.y)) / Math.hypot(b.x - a.x, b.y - a.y);
    if (dist < 18) return true;
  }
  return false;
}
function canPlaceTower(x, y) {
  const snapped = snapToGrid(x, y);
  const cell = getCellFromPoint(snapped.x, snapped.y);
  if (cell.x < 0 || cell.y < 0 || cell.x > 28 || cell.y > 13) return false;
  if (isOnPath(snapped.x, snapped.y)) return false;
  return !state.towers.some(t => Math.abs(t.x - snapped.x) < 40 && Math.abs(t.y - snapped.y) < 40);
}
function buildWave(wave) {
  const list = [];
  const count = 6 + Math.min(24, wave * 2.3);
  const mapBias = state.map === 'forest' ? 1 : state.map === 'snow' ? 2 : state.map === 'space' ? 3 : 0;
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
    if (wave > 4 && Math.random() < 0.16 + mapBias * 0.02) enemyType = enemyDefs[2 + (wave + i) % 4];
    if (wave > 8 && Math.random() < 0.18) enemyType = enemyDefs[7];
    if (wave > 16 && Math.random() < 0.12) enemyType = enemyDefs[8];
    if (wave > 24 && Math.random() < 0.1) enemyType = enemyDefs[39];
    if (wave > 32 && Math.random() < 0.08) enemyType = enemyDefs[40];
    if (state.map === 'forest' && wave > 6 && Math.random() < 0.14) enemyType = enemyDefs[4];
    if (state.map === 'snow' && wave > 5 && Math.random() < 0.16) enemyType = enemyDefs[11];
    if (state.map === 'space' && wave > 7 && Math.random() < 0.15) enemyType = enemyDefs[10];
    list.push(enemyType);
  }
  return list;
}
function startGame() { state.gameStarted = true; state.paused = false; ui.overlay.classList.add('hidden'); playSound('wave'); pushEvent('Battle started. Hold the core!', 'success'); spawnWave(); }
function resetGame() {
  state.towers = []; state.enemies = []; state.projectiles = []; state.effects = []; state.wave = 1; state.coins = 180; state.health = 100; state.xp = 0; state.level = 1; state.score = 0; state.combo = 0; state.comboTimer = 0; state.surgeActive = false; state.surgeTimer = 0; state.waveBanner = ''; state.waveBannerTimer = 0; state.messages = []; state.stats = { kills: 0, damageDealt: 0, wavesCompleted: 0, towersBuilt: 0 }; state.currentWaveEnemies = []; state.spawnIndex = 0; state.spawning = false; state.selectedTowerType = null; state.selectedTower = null; state.challenge.progress = 0; state.previewPoint = { x: 0, y: 0 }; state.gameStarted = true; ui.overlay.classList.add('hidden'); playSound('wave'); pushEvent('Fortress rebuilt. New run begins.', 'success'); spawnWave();
}
function spawnWave() {
  state.spawning = true;
  state.spawnIndex = 0;
  state.currentWaveEnemies = buildWave(state.wave);
  state.waveIntroTimer = 110;
  state.spawnTimer = 0;
  state.spawnDelay = Math.max(7, 19 - Math.floor(state.wave / 3));
  state.waveBanner = state.wave % 5 === 0 ? `Surge Wave ${state.wave}` : `Wave ${state.wave} inbound`;
  state.waveBannerTimer = 140;
  if (state.wave % 5 === 0) {
    state.surgeActive = true;
    state.surgeTimer = 220;
    state.coins += 24;
    pushEvent('Surge wave: extra coin flow and heavier pressure.', 'success');
  } else {
    pushEvent(`Wave ${state.wave} begins.`, 'info');
  }
}
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
function getEconomyBonus() {
  const answerBonus = state.learning.answeredCount * 0.8;
  const waveBonus = state.wave * 0.6;
  const levelBonus = Math.max(0, state.level - 1) * 1.4;
  return Math.floor(answerBonus + waveBonus + levelBonus);
}
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
  const snapped = snapToGrid(x, y);
  const def = towerDefs.find(t => t.id === type);
  if (!def || state.coins < def.cost) return false;
  if (!canPlaceTower(snapped.x, snapped.y)) {
    state.placementBlockedReason = isOnPath(snapped.x, snapped.y) ? 'That spot is on the escape route.' : 'That grid is occupied or out of bounds.';
    pushEvent(state.placementBlockedReason, 'info');
    return false;
  }
  state.coins -= def.cost;
  const tower = { id: crypto.randomUUID(), type, x: snapped.x, y: snapped.y, level: 1, range: def.range, cooldown: def.cooldown, damage: def.damage, cost: def.cost, timer: 0, color: def.color };
  state.towers.push(tower);
  state.stats.towersBuilt += 1;
  state.levelFlash = 18;
  playSound('build');
  spawnBurst(snapped.x, snapped.y, def.color, 14, 2.8);
  pushEvent(`${def.name} deployed.`, 'success');
  return true;
}
function checkUnlocks() {
  const unlocks = [5, 8, 12, 15, 18, 22];
  const towerIds = ['laser', 'pulse', 'chrono', 'bastion', 'ranger', 'blitz'];
  unlocks.forEach((level, index) => {
    const towerId = towerIds[index];
    if (state.level >= level && !state.unlockedTowers.includes(towerId)) {
      state.unlockedTowers.push(towerId);
      unlockAchievement(`${towerId} unlocked`);
    }
  });
}
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
  if (tower.type === 'ranger') { damageEnemy(target, tower.damage * 1.12, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 8); return; }
  if (tower.type === 'warden2') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 92) damageEnemy(enemy, tower.damage * 0.75, tower); spawnBurst(tower.x, tower.y, '#fde68a', 6, 1.2); return; }
  if (tower.type === 'siphon') { damageEnemy(target, tower.damage * 0.95, tower); if (target.alive) { state.coins += 1 + Math.max(0, Math.floor(state.level / 5)); } return; }
  if (tower.type === 'blitz') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 72) damageEnemy(enemy, tower.damage * 0.8, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 6); return; }
  if (tower.type === 'meteor') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 86) damageEnemy(enemy, tower.damage * 0.95, tower); spawnBurst(target.x, target.y, '#fb923c', 10, 2.2); return; }
  if (tower.type === 'aegis') { for (const other of state.towers) if (other.id !== tower.id && Math.hypot(other.x - tower.x, other.y - tower.y) < 120) { other.range += 4; other.damage += 0.2; } spawnBurst(tower.x, tower.y, '#f8fafc', 8, 1.6); return; }
  if (tower.type === 'volt') { for (const enemy of state.enemies) if (enemy.alive && Math.hypot(enemy.x - target.x, enemy.y - target.y) < 100) damageEnemy(enemy, tower.damage * 0.82, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 5); return; }
  if (tower.type === 'rift') { target.freezeTimer = 45; damageEnemy(target, tower.damage * 1.08, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, '#a78bfa', 8); return; }
  damageEnemy(target, tower.damage, tower); spawnProjectile(tower.x, tower.y, target.x, target.y, tower.color, 7);
}
function damageEnemy(enemy, amount, source) {
  if (!enemy.alive) return; let incoming = amount; if (enemy.abilities.includes('armour')) incoming *= 0.82; if (enemy.abilities.includes('shield')) incoming *= 0.9; if (enemy.invisible && source && source.type !== 'void') incoming *= 0.7; enemy.hp -= incoming; state.stats.damageDealt += incoming; if (enemy.hp <= 0) { enemy.alive = false; const comboMultiplier = 1 + Math.min(0.75, (state.combo - 1) * 0.12); state.combo = Math.min(10, state.combo + 1); state.comboTimer = 110; const coinBonus = state.surgeActive ? 3 : 1; addCoins(enemy.reward + Math.max(0, Math.floor(state.level / 4)) + coinBonus); const scoreGain = Math.round(Math.max(12, enemy.reward * 6 + Math.floor(state.wave * 2)) * comboMultiplier); addScore(scoreGain); state.stats.kills += 1; state.challenge.progress += 1; if (enemy.abilities.includes('split') && enemy.splitCount < 2) { enemy.splitCount += 1; spawnSplitEnemies(enemy); } if (state.stats.kills % 8 === 0) unlockAchievement('Momentum'); spawnBurst(enemy.x, enemy.y, enemy.color, 20, 3); playSound('enemy'); if (enemy.boss) pushEvent(`Boss neutralized. ${scoreGain} score earned.`, 'success'); else pushEvent(`Target down. Combo x${(1 + Math.min(0.75, (state.combo - 1) * 0.12)).toFixed(1)} ready.`, 'info'); } }
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
  if (state.comboTimer > 0) state.comboTimer -= 1; else if (state.combo > 0) state.combo = 0;
  const economyBonus = getEconomyBonus();
  if (state.wave % 5 === 0 && state.waveBannerTimer <= 0) {
    state.coins += economyBonus * 0.25;
  }
  if (state.waveBannerTimer > 0) state.waveBannerTimer -= 1;
  if (state.surgeActive) {
    state.surgeTimer -= 1;
    if (state.surgeTimer <= 0) {
      state.surgeActive = false;
      pushEvent('Surge faded. Recovery is in hand.', 'info');
    }
  }
  if (state.waveIntroTimer > 0) state.waveIntroTimer -= 1;
  if (state.spawning && state.waveIntroTimer <= 0) { state.spawnTimer += 1; if (state.spawnTimer >= state.spawnDelay) { state.spawnTimer = 0; if (state.spawnIndex < state.currentWaveEnemies.length) { createEnemy(state.currentWaveEnemies[state.spawnIndex]); state.spawnIndex += 1; } } }
  if (state.spawning && state.spawnIndex >= state.currentWaveEnemies.length && state.enemies.length === 0) { state.spawning = false; state.wave += 1; state.coins += 40 + state.wave * 4; state.xp += 18 + state.wave * 2; addScore(45 + state.wave * 10); state.stats.wavesCompleted += 1; if (state.challenge.progress >= state.challenge.target) { state.coins += state.challenge.reward; state.challenge.progress = 0; unlockAchievement('Daily Challenge Complete'); pushEvent('Daily challenge cleared. Bonus coins received.', 'success'); }
    if (state.wave > state.maxWave) { addScore(180 + state.wave * 16); state.coins += 120 + state.level * 10; submitScore(); playSound('victory'); showOverlay('Victory', 'The fortress survived the campaign and the arc is secure.', [{ label: 'Restart', action: resetGame }]); state.gameStarted = false; }
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
function updateProgression() {
  if (state.xp >= state.level * 60) {
    state.level += 1;
    state.xp = 0;
    state.levelFlash = 24;
    state.levelPulse = 1;
    state.coins += 40 + state.level * 8;
    addScore(60 + state.level * 8);
    unlockAchievement(`Level ${state.level}`);
    checkUnlocks();
    pushEvent(`LEVEL ${state.level} — new tower paths unlocked and your economy is stronger.`, 'success');
  }
  if (state.levelFlash > 0) state.levelFlash -= 1;
  if (state.levelPulse > 0) state.levelPulse = Math.max(0, state.levelPulse - 0.08);
  if (state.health <= 0) { state.gameStarted = false; submitScore(); playSound('defeat'); showOverlay('Defeat', 'The core has fallen. Rebuild the fortress and try again.', [{ label: 'Restart', action: resetGame }]); }
}
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
  const previewPoint = snapToGrid(state.previewPoint.x, state.previewPoint.y);
  const valid = canPlaceTower(previewPoint.x, previewPoint.y) && state.coins >= def.cost;
  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.arc(previewPoint.x, previewPoint.y, 16, 0, Math.PI * 2);
  ctx.fillStyle = def.color;
  ctx.fill();
  ctx.strokeStyle = valid ? '#39d98a' : '#ff5d73';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}
function drawTowers() {
  const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.04;
  for (const tower of state.towers) {
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 16, 0, Math.PI * 2);
    ctx.fillStyle = tower.color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 20 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(94,231,255,0.16)';
    ctx.stroke();
  }
}
function drawEnemies() { for (const enemy of state.enemies) { if (!enemy.alive) continue; const alpha = enemy.invisible ? 0.45 : 1; ctx.globalAlpha = alpha; ctx.fillStyle = enemy.color; ctx.beginPath(); if (enemy.abilities.includes('boss')) { ctx.moveTo(enemy.x, enemy.y - 12); ctx.lineTo(enemy.x + 10, enemy.y - 4); ctx.lineTo(enemy.x + 6, enemy.y + 10); ctx.lineTo(enemy.x - 6, enemy.y + 10); ctx.lineTo(enemy.x - 10, enemy.y - 4); ctx.closePath(); } else { ctx.arc(enemy.x, enemy.y, 10, 0, Math.PI * 2); } ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.4; ctx.stroke(); if (enemy.abilities.includes('boss')) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; ctx.stroke(); }
    if (enemy.hp < enemy.maxHp) { ctx.fillStyle = '#ef4444'; ctx.fillRect(enemy.x - 12, enemy.y - 16, 24 * (enemy.hp / enemy.maxHp), 4); } } }
function drawProjectiles() { for (const projectile of state.projectiles) { ctx.fillStyle = projectile.color; ctx.beginPath(); ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1; ctx.stroke(); } }
function drawEffects() { for (const effect of state.effects) { ctx.globalAlpha = effect.life / 24; ctx.fillStyle = effect.color; ctx.beginPath(); ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2); ctx.fill(); if (effect.glow) { ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.stroke(); } ctx.globalAlpha = 1; } }
function drawHud() {
  const pulse = 1 + state.levelPulse * 0.12;
  ctx.fillStyle = 'rgba(3,7,18,0.7)';
  ctx.fillRect(16, 16, 280, 150);
  ctx.fillStyle = 'white';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(`Wave ${state.wave}`, 28, 38);
  ctx.fillText(`Coins ${state.coins}`, 28, 60);
  ctx.fillText(`Health ${state.health}`, 28, 82);
  ctx.fillText(`XP ${state.xp}/${state.level * 60}`, 28, 104);
  if (state.levelFlash > 0) {
    ctx.save();
    ctx.scale(pulse, pulse);
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText(`Ascension Level ${state.level}`, 28, 132);
    ctx.restore();
  }
  if (state.waveBannerTimer > 0) { ctx.fillStyle = '#fde68a'; ctx.font = 'bold 16px Inter, sans-serif'; ctx.fillText(state.waveBanner, 28, 146); }
}
function updateUi() {
  ui.wave.textContent = state.wave; ui.coins.textContent = state.coins; ui.health.textContent = state.health; ui.xp.textContent = `${state.xp}/${state.level * 60}`; ui.level.textContent = state.level; ui.score.textContent = state.score; ui.best.textContent = state.bestScore; ui.modeBadge.textContent = state.mode.toUpperCase(); ui.challengeText.textContent = `${state.challenge.title} · ${state.challenge.progress}/${state.challenge.target}`; ui.battleStatus.textContent = state.pendingTowerHint ? state.pendingTowerHint : (state.surgeActive ? 'Surge active — pressure is rising.' : state.combo > 1 ? `Combo x${state.combo} active` : 'Momentum is building.');
  if (state.selectedTower) {
    ui.selected.textContent = `${getTowerName(state.selectedTower.type)} • Lv${state.selectedTower.level}`;
  } else if (state.selectedTowerType) {
    const def = towerDefs.find(item => item.id === state.selectedTowerType);
    ui.selected.textContent = `Selected: ${def ? def.name : state.selectedTowerType} — click the board to place it`;
  } else {
    ui.selected.textContent = 'Select a tower';
  }
  renderShop(); renderUpgrades(); renderLeaderboard(); renderEventFeed(); renderLearningUi(); }
function renderShop() { ui.shop.innerHTML = ''; towerDefs.filter(tower => state.unlockedTowers.includes(tower.id)).forEach(tower => { const card = document.createElement('div'); card.className = 'shop-card'; if (state.selectedTowerType === tower.id) card.classList.add('active'); card.innerHTML = `<div class="name">${tower.name}</div><div class="meta">${tower.description}</div><div class="meta">Cost ${tower.cost} • Dmg ${tower.damage}</div>`; const btn = document.createElement('button'); btn.textContent = state.selectedTowerType === tower.id ? 'Selected' : 'Drop'; btn.onclick = () => { state.selectedTowerType = tower.id; state.selectedTower = null; state.pendingTowerHint = `${tower.name} ready`; updateUi(); }; card.appendChild(btn); ui.shop.appendChild(card); }); }
function saveProgress() {
  try {
    const payload = {
      coins: state.coins,
      xp: state.xp,
      level: state.level,
      score: state.score,
      wave: state.wave,
      stats: state.stats,
      achievements: state.achievements,
      unlockedTowers: state.unlockedTowers,
      learning: state.learning,
      missions: state.missions,
      dailyReward: state.dailyReward,
      settings: state.settings
    };
    localStorage.setItem(state.saveKey, JSON.stringify(payload));
    if (ui.saveStatus) ui.saveStatus.textContent = 'Autosaved just now';
  } catch (error) {
    if (ui.saveStatus) ui.saveStatus.textContent = 'Save unavailable';
  }
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(state.saveKey);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.coins != null) state.coins = data.coins;
    if (data.xp != null) state.xp = data.xp;
    if (data.level != null) state.level = data.level;
    if (data.score != null) state.score = data.score;
    if (data.wave != null) state.wave = data.wave;
    if (data.stats) state.stats = { ...state.stats, ...data.stats };
    if (data.achievements) state.achievements = data.achievements;
    if (data.unlockedTowers) state.unlockedTowers = data.unlockedTowers;
    if (data.learning) state.learning = { ...state.learning, ...data.learning };
    if (data.missions) state.missions = data.missions;
    if (data.dailyReward) state.dailyReward = data.dailyReward;
    if (data.settings) state.settings = { ...state.settings, ...data.settings };
  } catch (error) {
    if (ui.saveStatus) ui.saveStatus.textContent = 'Previous save could not be loaded';
  }
}
function renderLearningUi() {
  if (!ui.topicList || !ui.questionCount || !ui.quizHeader || !ui.questionPrompt || !ui.answerOptions || !ui.feedbackBox || !ui.profileStats || !ui.weakTopics || !ui.missionList || !ui.studyPlanBox) return;
  ui.questionCount.textContent = `${state.learning.answeredCount} questions answered`;
  ui.topicList.innerHTML = '';
  questionService.topics.forEach((topic) => {
    const chip = document.createElement('button');
    chip.className = `topic-chip${state.learning.focusTopic === topic.name ? ' active' : ''}`;
    chip.innerHTML = `<span class="topic-name">${topic.name}</span><span class="topic-score">${state.learning.topicScores[topic.name] || 0}%</span>`;
    chip.onclick = () => {
      state.learning.focusTopic = topic.name;
      state.learning.currentQuestion = questionService.generateQuestion(topic.name);
      state.learning.selectedOption = null;
      ui.feedbackBox.textContent = '';
      ui.feedbackBox.className = 'feedback-box';
      renderLearningUi();
    };
    ui.topicList.appendChild(chip);
  });
  if (!state.learning.currentQuestion) {
    state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
  }
  ui.quizHeader.innerHTML = `<strong>${state.learning.currentQuestion.topic}</strong><span class="tag">${state.learning.currentQuestion.difficulty.toUpperCase()} • ${state.learning.currentQuestion.type}</span>`;
  ui.questionPrompt.textContent = state.learning.currentQuestion.prompt;
  ui.answerOptions.innerHTML = '';
  state.learning.currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = `answer-option${state.learning.selectedOption === index ? ' selected' : ''}`;
    button.textContent = option;
    button.onclick = () => {
      state.learning.selectedOption = index;
      renderLearningUi();
    };
    ui.answerOptions.appendChild(button);
  });
  ui.feedbackBox.textContent = state.learning.challengeActive ? 'Challenge question ready — answer correctly to boost your reward.' : 'Choose an answer and press check to earn coins and XP.';
  ui.feedbackBox.className = 'feedback-box';
  ui.profileStats.innerHTML = `
    <div class="profile-stat"><span>Streak</span><strong>${state.learning.streak}</strong></div>
    <div class="profile-stat"><span>Best streak</span><strong>${state.learning.bestStreak}</strong></div>
    <div class="profile-stat"><span>Gems</span><strong>${state.learning.gems}</strong></div>
    <div class="profile-stat"><span>Focus</span><strong>${state.learning.focusTopic || 'Hardware'}</strong></div>
  `;
  const weakTopics = Object.entries(state.learning.topicScores).filter(([topic, score]) => score < 70).sort((a, b) => a[1] - b[1]).slice(0, 4);
  ui.weakTopics.innerHTML = weakTopics.length ? weakTopics.map(([topic, score]) => `<div class="weak-topic">${topic} • ${score}%</div>`).join('') : '<div class="weak-topic">You are doing well. Keep practicing.</div>';
  ui.missionList.innerHTML = state.missions.map((mission) => `<div class="weak-topic">${mission.title} — ${mission.progress}/${mission.target} • ${mission.complete ? 'Done' : 'In progress'}</div>`).join('');
  if (!state.learning.studyPlan) {
    state.learning.studyPlan = contentModule.createStudyPlan ? contentModule.createStudyPlan() : null;
  }
  const plan = state.learning.studyPlan || { title: 'Revision Sprint Plan', summary: '', steps: [] };
  ui.studyPlanBox.innerHTML = `<div class="study-card"><strong>${plan.title}</strong><div>${plan.summary}</div><div class="study-list">${plan.steps.map((step) => `<span class="study-pill">${step}</span>`).join('')}</div></div>`;
  if (!state.learning.revisionDeck && contentModule.buildRevisionDeck) {
    state.learning.revisionDeck = contentModule.buildRevisionDeck('All Topics');
  }
  if (state.learning.revisionDeck) {
    const card = document.createElement('div');
    card.className = 'study-card';
    card.innerHTML = `<strong>Revision deck</strong><div>${(state.learning.revisionDeck.glossary || []).slice(0, 4).map((entry) => entry.term).join(', ')}</div>`;
    ui.studyPlanBox.appendChild(card);
  }
}
function answerQuestion() {
  if (!state.learning.currentQuestion) return;
  const isExamMode = state.learning.examMode && state.learning.examQuestions.length;
  const correctIndex = state.learning.currentQuestion.answer;
  const isCorrect = state.learning.selectedOption === correctIndex;
  const reward = state.learning.currentQuestion.reward + Math.max(0, state.learning.streak * 2);
  if (isCorrect) {
    state.learning.streak += 1;
    state.learning.bestStreak = Math.max(state.learning.bestStreak, state.learning.streak);
    state.learning.answeredCount += 1;
    state.learning.gems += 1;
    const economyBoost = Math.round(reward * (1 + Math.min(0.6, state.learning.streak * 0.05)));
    state.coins += economyBoost + getEconomyBonus();
    state.xp += economyBoost;
    state.learning.topicScores[state.learning.currentQuestion.topic] = Math.min(100, (state.learning.topicScores[state.learning.currentQuestion.topic] || 0) + 8);
    state.missions[0].progress += 1;
    state.missions[0].complete = state.missions[0].progress >= state.missions[0].target;
    state.missions[1].progress = Math.max(state.missions[1].progress, state.learning.topicScores[state.learning.currentQuestion.topic]);
    state.missions[1].complete = state.missions[1].progress >= state.missions[1].target;
    state.missions[2].progress = Math.max(state.missions[2].progress, state.wave);
    state.missions[2].complete = state.missions[2].progress >= state.missions[2].target;
    state.missions.forEach((mission) => { if (mission.complete) { state.coins += mission.reward; } });
    pushEvent(`Correct answer earned ${reward} coins and XP.`, 'success');
    if (state.learning.challengeActive) {
      state.coins += 20;
      state.learning.challengeActive = false;
      pushEvent('Challenge bonus applied. Your tower economy just improved.', 'success');
    }
    ui.feedbackBox.textContent = `Correct! ${state.learning.currentQuestion.explanation}`;
    ui.feedbackBox.className = 'feedback-box good';
    if (isExamMode) {
      state.learning.examIndex += 1;
      if (state.learning.examIndex < state.learning.examQuestions.length) {
        state.learning.currentQuestion = state.learning.examQuestions[state.learning.examIndex];
      } else {
        state.learning.examMode = false;
        state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
      }
    } else {
      state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
    }
    state.learning.selectedOption = null;
  } else {
    state.learning.streak = 0;
    state.learning.answeredCount += 1;
    state.learning.topicScores[state.learning.currentQuestion.topic] = Math.max(0, (state.learning.topicScores[state.learning.currentQuestion.topic] || 100) - 6);
    pushEvent('Review that topic — the answer was not quite right.', 'info');
    ui.feedbackBox.textContent = `Not quite. ${state.learning.currentQuestion.explanation}`;
    ui.feedbackBox.className = 'feedback-box bad';
    if (isExamMode) {
      state.learning.examIndex += 1;
      if (state.learning.examIndex < state.learning.examQuestions.length) {
        state.learning.currentQuestion = state.learning.examQuestions[state.learning.examIndex];
      } else {
        state.learning.examMode = false;
        state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
      }
    } else {
      state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
    }
    state.learning.selectedOption = null;
  }
  renderLearningUi();
}
function skipQuestion() {
  if (!state.learning.currentQuestion) return;
  state.learning.answeredCount += 1;
  state.learning.streak = 0;
  if (state.learning.examMode && state.learning.examQuestions.length) {
    state.learning.examIndex += 1;
    if (state.learning.examIndex < state.learning.examQuestions.length) {
      state.learning.currentQuestion = state.learning.examQuestions[state.learning.examIndex];
    } else {
      state.learning.examMode = false;
      state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
    }
  } else {
    state.learning.currentQuestion = questionService.generateQuestion(state.learning.focusTopic || questionService.topics[0].name);
  }
  state.learning.selectedOption = null;
  ui.feedbackBox.textContent = 'Skipped. A fresh question is ready.';
  ui.feedbackBox.className = 'feedback-box';
  renderLearningUi();
}
function startMockExam() {
  const examQuestions = contentModule.buildMockExam ? contentModule.buildMockExam(state.learning.focusTopic || 'Hardware', 10) : questionService.generateQuestionSet(state.learning.focusTopic || 'Hardware', 10);
  state.learning.examQuestions = examQuestions;
  state.learning.examIndex = 0;
  state.learning.examMode = true;
  state.learning.currentQuestion = examQuestions[0];
  state.learning.selectedOption = null;
  ui.feedbackBox.textContent = 'Mock exam started. Answer each question to finish the run.';
  ui.feedbackBox.className = 'feedback-box';
  renderLearningUi();
}
function toggleTheme() {
  state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('light', state.settings.theme === 'light');
  ui.themeToggle.textContent = state.settings.theme === 'dark' ? '🌙 Theme' : '☀️ Theme';
}
function claimDailyReward() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.dailyReward.claimed && state.dailyReward.lastClaimed === today) {
    pushEvent('Daily reward already collected today.', 'info');
    return;
  }
  state.dailyReward.claimed = true;
  state.dailyReward.lastClaimed = today;
  state.coins += 80;
  state.learning.gems += 2;
  pushEvent('Daily reward claimed: 80 coins and 2 gems.', 'success');
  renderLearningUi();
}
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
function handleCellClick(event) {
  if (event.type === 'pointerdown' && event.pointerType === 'mouse' && event.button !== 0) return;
  event.preventDefault();
  const point = screenToWorld(event.clientX, event.clientY);
  const snapped = snapToGrid(point.x, point.y);
  state.previewPoint = snapped;
  if (state.selectedTowerType) {
    if (placeTower(snapped.x, snapped.y, state.selectedTowerType)) {
      state.selectedTowerType = null;
      state.pendingTowerHint = '';
      updateUi();
    } else {
      updateUi();
    }
  } else {
    const found = state.towers.find(t => Math.hypot(t.x - snapped.x, t.y - snapped.y) < 24);
    if (found) {
      state.selectedTower = found;
      state.pendingTowerHint = '';
      updateUi();
    }
  }
}
canvas.addEventListener('pointerdown', handleCellClick);
canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener('pointermove', event => {
  const point = screenToWorld(event.clientX, event.clientY);
  const snapped = snapToGrid(point.x, point.y);
  state.previewPoint = snapped;
  state.hoverCell = getCellFromPoint(snapped.x, snapped.y);
});
canvas.style.cursor = 'crosshair';
ui.mapSelect.addEventListener('change', (event) => {
  state.map = event.target.value;
  refreshPath();
  updateUi();
});
ui.themeToggle.addEventListener('click', toggleTheme);
ui.checkAnswerBtn.addEventListener('click', answerQuestion);
ui.skipQuestionBtn.addEventListener('click', skipQuestion);
ui.soundToggle.addEventListener('change', (event) => { state.settings.soundEnabled = event.target.checked; audio.enabled = event.target.checked; });
ui.animationToggle.addEventListener('change', (event) => { state.settings.animationsEnabled = event.target.checked; });
ui.colorblindToggle.addEventListener('change', (event) => { state.settings.colorblindMode = event.target.checked; });
ui.dailyRewardBtn.addEventListener('click', claimDailyReward);
ui.mockExamBtn.addEventListener('click', startMockExam);
ui.studyPlanBtn.addEventListener('click', () => {
  state.learning.studyPlan = contentModule.createStudyPlan ? contentModule.createStudyPlan() : null;
  renderLearningUi();
});
document.getElementById('startBtn').addEventListener('click', startGame); document.getElementById('restartBtn').addEventListener('click', resetGame); document.getElementById('pauseBtn').addEventListener('click', () => { state.paused = !state.paused; ui.pauseBtn.textContent = state.paused ? 'Resume' : 'Pause'; }); document.getElementById('helpBtn').addEventListener('click', () => { showOverlay('How to Play', 'Place towers on the grid, use support and economy towers to sustain your economy, and counter unusual enemies with the specialised towers. Answer revision questions to earn coins and XP.', [{ label: 'Continue', action: hideOverlay }]); });
function loop(now) { const dt = now - state.lastTime; state.lastTime = now; update(dt); updateUi(); requestAnimationFrame(loop); }
requestAnimationFrame(loop);
loadLeaderboard();
loadProgress();
showOverlay('Fortress Evolution', '<div class="card-list"><div class="item"><strong>Campaign</strong>Survive 50 waves, face bosses every 10 waves, and unlock deeper tower paths.</div><div class="item"><strong>Systems</strong>Grid placement, pathing, coins, XP, achievements, score tracking, and a polished UI are all included.</div><div class="item"><strong>Goal</strong>Defend the core and evolve your fortress.</div></div>', [{ label: 'Start Game', action: startGame }, { label: 'Close', action: hideOverlay }]);
updateUi();
