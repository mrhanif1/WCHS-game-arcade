(function (global) {
  const topicBlueprints = {
    Hardware: {
      label: 'Hardware',
      focus: 'CPU, RAM, storage, peripheral devices and embedded systems.',
      prompts: [
        'Which component is used for temporary working memory?',
        'What does the CPU do?',
        'Which storage device usually offers the fastest access?',
        'What is the main difference between RAM and ROM?',
        'What is embedded hardware used for?'
      ],
      terms: ['CPU', 'RAM', 'ROM', 'SSD', 'GPU', 'Input', 'Output', 'Cache', 'Motherboard', 'Peripheral']
    },
    Software: {
      label: 'Software',
      focus: 'Operating systems, utility tools, proprietary and open-source software.',
      prompts: [
        'Which software helps maintain a computer?',
        'What is an operating system?',
        'What is the difference between open-source and proprietary software?',
        'Which category does a web browser belong to?',
        'Why do systems need utility software?'
      ],
      terms: ['Operating System', 'Utility Software', 'Application', 'Open Source', 'Proprietary', 'Driver', 'Compiler', 'Interpreter', 'Package', 'Installer']
    },
    Programming: {
      label: 'Programming',
      focus: 'Variables, loops, functions, classes, algorithms and pseudocode.',
      prompts: [
        'What is a variable?',
        'When should you use a loop?',
        'What is the purpose of a function?',
        'How is a class different from an object?',
        'What is pseudocode used for?'
      ],
      terms: ['Variable', 'Constant', 'Array', 'List', 'Loop', 'Function', 'Parameter', 'Return', 'Class', 'Object']
    },
    Networks: {
      label: 'Networks',
      focus: 'LAN, WAN, DNS, DHCP, IP addresses and network devices.',
      prompts: [
        'Which device forwards packets between networks?',
        'What does DNS do?',
        'What is the difference between LAN and WAN?',
        'What is a MAC address used for?',
        'Why do networks use switches?' 
      ],
      terms: ['LAN', 'WAN', 'Router', 'Switch', 'DNS', 'DHCP', 'IP Address', 'MAC Address', 'Cloud', 'Topology']
    },
    Cyber: {
      label: 'Cyber Security',
      focus: 'Threats, authentication, encryption and safe habits.',
      prompts: [
        'Which malware disguises itself as trusted software?',
        'What is phishing?',
        'What does MFA add to account security?',
        'What is encryption used for?',
        'Why are firewalls useful?' 
      ],
      terms: ['Malware', 'Trojan', 'Ransomware', 'Spyware', 'Phishing', 'Firewall', 'Encryption', 'Authentication', 'Password', 'MFA']
    },
    Data: {
      label: 'Data Representation',
      focus: 'Binary, hexadecimal, ASCII, Unicode and compression.',
      prompts: [
        'What base is binary?',
        'What is ASCII used for?',
        'Why is hexadecimal used?',
        'What is a common purpose of compression?',
        'What is the difference between lossy and lossless compression?' 
      ],
      terms: ['Binary', 'Denary', 'Hexadecimal', 'ASCII', 'Unicode', 'Compression', 'Pixel', 'Sample', 'Bit', 'Byte']
    },
    Logic: {
      label: 'Logic',
      focus: 'Boolean logic, truth tables and logic gates.',
      prompts: [
        'What does NOT do?',
        'What does AND return when one input is false?',
        'What is a truth table?',
        'Which gate outputs true only when both inputs are true?',
        'What does XOR mean?' 
      ],
      terms: ['Boolean', 'AND', 'OR', 'NOT', 'XOR', 'Truth Table', 'Gate', 'Input', 'Output', 'Logic']
    },
    Databases: {
      label: 'Databases',
      focus: 'Tables, records, fields, primary keys and SQL.',
      prompts: [
        'What does a primary key do?',
        'What is a field?',
        'What is a record?',
        'How is SQL used?',
        'What is a relational database?' 
      ],
      terms: ['Table', 'Record', 'Field', 'Primary Key', 'SQL', 'Query', 'Foreign Key', 'Database', 'Schema', 'Row']
    }
  };

  const glossarySeed = [
    'Abstraction', 'Algorithm', 'Application', 'Architecture', 'Authentication', 'Binary', 'Boolean', 'Buffer', 'Cache', 'Cloud',
    'Compiler', 'Compression', 'Constant', 'CPU', 'Database', 'Denary', 'DHCP', 'DNS', 'Encryption', 'Firewall', 'Flash Memory',
    'Function', 'GPU', 'Hexadecimal', 'Input', 'Interpreter', 'IP Address', 'LAN', 'Loop', 'MAC Address', 'Malware',
    'Motherboard', 'Network', 'Object', 'Operating System', 'Output', 'Parameter', 'Peripheral', 'Phishing', 'Primary Key',
    'Procedure', 'Protocol', 'Query', 'RAM', 'Record', 'Router', 'ROM', 'Schema', 'Security', 'Software', 'SSD', 'Switch',
    'System Call', 'Table', 'Topology', 'Unicode', 'Utility Software', 'Variable', 'WAN', 'Wireless', 'Workflow', 'XOR'
  ];

  const glossaryEntries = glossarySeed.map((term, index) => ({
    term,
    definition: `${term} is a core concept in computer science that helps learners understand how systems, data and programs work together.`,
    topic: Object.keys(topicBlueprints)[index % Object.keys(topicBlueprints).length],
    example: `Example ${index + 1}: ${term.toLowerCase()} is used in modern computer systems every day.`
  }));

  const challengeScenarios = [
    {
      title: 'Secure the school network',
      description: 'Select the best security controls for a busy school network.',
      rewards: 60,
      topic: 'Cyber'
    },
    {
      title: 'Optimise a home PC',
      description: 'Recommend software and hardware upgrades for a slow laptop.',
      rewards: 55,
      topic: 'Hardware'
    },
    {
      title: 'Design a quiz app',
      description: 'Plan a small app using variables, loops and functions.',
      rewards: 50,
      topic: 'Programming'
    },
    {
      title: 'Build a mini network',
      description: 'Choose routers, switches and IP addressing for a small office.',
      rewards: 58,
      topic: 'Networks'
    },
    {
      title: 'Store exam results',
      description: 'Create a database schema for a revision platform.',
      rewards: 54,
      topic: 'Databases'
    }
  ];

  const achievementCatalog = [
    { id: 'first-step', title: 'First Step', description: 'Answer your first revision question.', reward: 20 },
    { id: 'streak-5', title: 'Momentum Builder', description: 'Build a streak of 5 correct answers.', reward: 35 },
    { id: 'topic-master', title: 'Topic Master', description: 'Reach 80% in a topic.', reward: 45 },
    { id: 'exam-ready', title: 'Exam Ready', description: 'Complete a mock exam.', reward: 60 },
    { id: 'tower-legend', title: 'Tower Legend', description: 'Survive 20 waves.', reward: 70 }
  ];

  function makeQuestion(topicName, difficulty = 'medium') {
    const topicKey = topicName || 'Hardware';
    const blueprint = topicBlueprints[topicKey] || topicBlueprints.Hardware;
    const difficultyScale = difficulty === 'hard' ? 2 : difficulty === 'easy' ? 1 : 1.4;
    const prompt = blueprint.prompts[Math.floor(Math.random() * blueprint.prompts.length)];
    const answerPool = blueprint.terms.slice();
    const options = [];
    const correctAnswer = answerPool[Math.floor(Math.random() * answerPool.length)] || 'CPU';
    options.push(correctAnswer);
    while (options.length < 4) {
      const candidate = answerPool[Math.floor(Math.random() * answerPool.length)] || 'RAM';
      if (!options.includes(candidate)) options.push(candidate);
    }
    options.sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(correctAnswer);
    return {
      id: `content-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      topic: blueprint.label,
      difficulty,
      type: 'multiple-choice',
      prompt: `${prompt}`,
      options,
      answer: correctIndex,
      explanation: `${correctAnswer} is the best fit because it matches the concept in ${blueprint.label}.`,
      reward: Math.round(16 * difficultyScale)
    };
  }

  function makeQuestionBank(topicName, count = 120) {
    const questions = [];
    for (let index = 0; index < count; index += 1) {
      const difficulty = index % 3 === 0 ? 'easy' : index % 5 === 0 ? 'hard' : 'medium';
      questions.push(makeQuestion(topicName || Object.keys(topicBlueprints)[index % Object.keys(topicBlueprints).length], difficulty));
    }
    return questions;
  }

  function buildRevisionDeck(topicName = 'All Topics') {
    const topics = topicName === 'All Topics' ? Object.keys(topicBlueprints) : [topicName];
    const glossary = glossaryEntries.filter((entry) => topics.includes(entry.topic)).slice(0, 12);
    const scenarios = challengeScenarios.filter((entry) => topics.includes(entry.topic)).slice(0, 4);
    return { glossary, scenarios, achievements: achievementCatalog.slice(0, 4) };
  }

  function buildMockExam(topicName = null, size = 10) {
    const selectedTopic = topicName || Object.keys(topicBlueprints)[Math.floor(Math.random() * Object.keys(topicBlueprints).length)];
    const exam = [];
    for (let index = 0; index < size; index += 1) {
      const difficulty = index % 4 === 0 ? 'hard' : index % 2 === 0 ? 'medium' : 'easy';
      exam.push(makeQuestion(selectedTopic, difficulty));
    }
    return exam;
  }

  function createStudyPlan() {
    return {
      title: 'Revision Sprint Plan',
      summary: 'Focus on one topic at a time, review glossary terms, and complete a short mock exam at the end.',
      steps: [
        'Answer 10 mixed questions.',
        'Review the glossary terms for the chosen topic.',
        'Attempt one challenge scenario.',
        'Check weak topics and target them next.'
      ]
    };
  }

  function createTopicInsights() {
    return Object.keys(topicBlueprints).map((topicName) => ({
      topic: topicName,
      focus: topicBlueprints[topicName].focus,
      keyTerms: topicBlueprints[topicName].terms.slice(0, 5)
    }));
  }

  const exported = {
    topicBlueprints,
    glossaryEntries,
    challengeScenarios,
    achievementCatalog,
    makeQuestion,
    makeQuestionBank,
    buildRevisionDeck,
    buildMockExam,
    createStudyPlan,
    createTopicInsights
  };

  global.CSPlatformContent = exported;
})(window);
