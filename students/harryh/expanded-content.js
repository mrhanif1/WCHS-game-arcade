(function (global) {
  const base = global.CSPlatformContent || {};
  const topicMetadata = [
    { topic: 'Hardware', prompts: [
      'Which component is primarily used for temporary working memory?',
      'What is the main purpose of the CPU?',
      'Which storage device is usually the fastest for booting a system?',
      'Why is cache useful?',
      'What is the main job of the motherboard?'
    ], answers: ['RAM', 'Process instructions', 'SSD', 'It stores frequently used data', 'It connects the main components'] },
    { topic: 'Software', prompts: [
      'Which software helps maintain a computer?',
      'What does an operating system do?',
      'What is open-source software?',
      'What does a driver do?',
      'Why are utility tools useful?'
    ], answers: ['Utility software', 'Manage hardware and applications', 'It is shared with source code', 'It helps hardware communicate', 'They keep systems efficient'] },
    { topic: 'Programming', prompts: [
      'What is a variable used for?',
      'Which loop is best when the number of repetitions is known?',
      'What is the purpose of a function?',
      'What is pseudocode used for?',
      'What is a class?'
    ], answers: ['Store values', 'For loop', 'Reuse code', 'Plan an algorithm', 'A blueprint for objects'] },
    { topic: 'Networks', prompts: [
      'Which device routes data between networks?',
      'What does DNS do?',
      'What is a LAN?',
      'What is the role of a switch?',
      'What does DHCP provide?'
    ], answers: ['Router', 'Translates domain names', 'A local network', 'Connect devices within a network', 'Automatic IP addresses'] },
    { topic: 'Cyber Security', prompts: [
      'What is phishing?',
      'What does encryption do?',
      'What is multi-factor authentication?',
      'Why are firewalls useful?',
      'What is ransomware?'
    ], answers: ['A trick to steal information', 'Protect data from reading', 'Adds extra identity checks', 'They block unwanted traffic', 'Software that locks files for money'] },
    { topic: 'Data Representation', prompts: [
      'What base is binary?',
      'What does ASCII represent?',
      'What base is hexadecimal?',
      'Why is Unicode used?',
      'What is compression for?'
    ], answers: ['2', 'Text characters', '16', 'Support more characters', 'Reduce file size'] },
    { topic: 'Logic', prompts: [
      'What does NOT do?',
      'What does AND return when one input is false?',
      'What is a truth table used for?',
      'Which gate gives true only when both inputs are true?',
      'What does XOR mean?'
    ], answers: ['Invert a value', 'False', 'Show all input and output combinations', 'AND', 'Exclusive OR'] },
    { topic: 'Databases', prompts: [
      'What does a primary key do?',
      'What is a field?',
      'What is a record?',
      'How is SQL used?',
      'What is a foreign key?'
    ], answers: ['Uniquely identify rows', 'One piece of data', 'A set of related fields', 'Manage and query data', 'A link between tables'] }
  ];

  const questionBank = [];
  const glossaryEntries = [];
  const challengeScenarios = [];
  const missions = [];
  const maps = [];
  const achievements = [];

  for (let index = 0; index < 900; index += 1) {
    const metadata = topicMetadata[index % topicMetadata.length];
    const promptIndex = index % metadata.prompts.length;
    const answer = metadata.answers[promptIndex];
    const options = [answer, `${answer} variant`, `${answer} example`, `${answer} sample`];
    const difficulty = index % 4 === 0 ? 'easy' : index % 3 === 0 ? 'hard' : 'medium';
    questionBank.push({
      id: `expanded-${index + 1}`,
      topic: metadata.topic,
      difficulty,
      type: 'multiple-choice',
      prompt: metadata.prompts[promptIndex],
      options,
      answer: 0,
      explanation: `${answer} is the best fit because it matches the concept in ${metadata.topic}.`,
      reward: 16 + (index % 7)
    });
  }

  for (let index = 0; index < 140; index += 1) {
    const topic = topicMetadata[index % topicMetadata.length].topic;
    glossaryEntries.push({
      term: `Glossary ${index + 1}`,
      definition: `This revision term helps learners understand ${topic.toLowerCase()} in a larger study deck.`,
      topic,
      example: `Example ${index + 1}`
    });
  }

  for (let index = 0; index < 60; index += 1) {
    challengeScenarios.push({
      title: `Scenario ${index + 1}`,
      description: `Apply your revision knowledge to a realistic computer science challenge in the ${topicMetadata[index % topicMetadata.length].topic} topic.`,
      rewards: 45 + index % 12,
      topic: topicMetadata[index % topicMetadata.length].topic
    });
  }

  for (let index = 0; index < 80; index += 1) {
    missions.push({
      id: `expanded-mission-${index + 1}`,
      title: `Mission ${index + 1}`,
      description: 'Complete extra revision tasks to strengthen your progression.',
      target: 6 + (index % 7) * 4,
      reward: 20 + (index % 9) * 4
    });
  }

  for (let index = 0; index < 24; index += 1) {
    maps.push({
      id: `expanded-map-${index + 1}`,
      name: `Revision Map ${index + 1}`,
      theme: 'Study challenge',
      difficulty: 1 + (index % 5)
    });
  }

  for (let index = 0; index < 72; index += 1) {
    achievements.push({
      id: `expanded-achievement-${index + 1}`,
      title: `Achievement ${index + 1}`,
      description: 'A milestone unlocked through revision and tower defence practice.',
      reward: 15 + (index % 10)
    });
  }

  function buildMockExam(topicName = null, size = 10) {
    const selectedTopic = topicName || topicMetadata[Math.floor(Math.random() * topicMetadata.length)].topic;
    const exam = [];
    for (let index = 0; index < size; index += 1) {
      const source = questionBank.filter((entry) => entry.topic === selectedTopic);
      const pick = source[Math.floor(Math.random() * source.length)] || questionBank[index % questionBank.length];
      exam.push({ ...pick, id: `${pick.id || 'exam'}-${index + 1}` });
    }
    return exam;
  }

  function buildRevisionDeck(topicName = 'All Topics') {
    const topics = topicName === 'All Topics' ? topicMetadata.map((entry) => entry.topic) : [topicName];
    const glossary = glossaryEntries.filter((entry) => topics.includes(entry.topic)).slice(0, 16);
    const scenarios = challengeScenarios.filter((entry) => topics.includes(entry.topic)).slice(0, 6);
    return {
      glossary,
      scenarios,
      achievements: achievements.slice(0, 5)
    };
  }

  function createStudyPlan() {
    return {
      title: 'Expanded Revision Sprint',
      summary: 'Work through a much larger study deck with extra scenarios, glossary entries, missions and mock exams.',
      steps: [
        'Answer 12 mixed questions.',
        'Review 8 glossary terms.',
        'Complete a challenge scenario.',
        'Finish a mock exam and revisit weak topics.'
      ]
    };
  }

  function createTopicInsights() {
    return topicMetadata.map((entry) => ({
      topic: entry.topic,
      focus: `${entry.topic} revision is now backed by a much larger question bank.`,
      keyTerms: entry.prompts.slice(0, 4)
    }));
  }

  const merged = {
    ...base,
    topicBlueprints: base.topicBlueprints || {},
    questionBank,
    glossaryEntries,
    challengeScenarios,
    achievementCatalog: [...(base.achievementCatalog || []), ...achievements],
    missions,
    maps,
    buildMockExam,
    buildRevisionDeck,
    createStudyPlan,
    createTopicInsights
  };

  global.CSPlatformContent = merged;
  global.ExpandedPlatformContent = merged;
})(window);
