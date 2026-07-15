const ocrTopics=[
  "Systems architecture",
  "Memory and storage",
  "Computer networks, connections and protocols",
  "Network security",
  "Systems software",
  "Ethical, legal, cultural and environmental impacts",
  "Algorithms",
  "Programming fundamentals",
  "Producing robust programs",
  "Boolean logic",
  "Programming languages and IDEs",
  "Data representation"
];
const topicQuestionBank={
  "Systems architecture":[
    {question:"What is the main job of the CPU?",options:["To process instructions","To store files permanently","To print documents","To connect to Wi-Fi"],answer:0},
    {question:"Which component holds data temporarily while the computer is running?",options:["RAM","ROM","Hard drive","USB stick"],answer:0},
    {question:"What does the motherboard mainly do?",options:["Connect hardware components together","Display graphics","Create backups","Protect the computer from viruses"],answer:0},
    {question:"What does the ALU perform?",options:["Arithmetic and logical operations","Screen output","Network routing","Power supply"],answer:0},
    {question:"What is the purpose of the control unit?",options:["Decode and execute instructions","Store data","Display information","Connect to internet"],answer:0},
    {question:"What does cache memory do?",options:["Store frequently accessed data for faster access","Create permanent backups","Display graphics","Record audio"],answer:0}
  ],
  "Memory and storage":[
    {question:"Which type of memory is volatile?",options:["RAM","ROM","CD-ROM","Flash memory"],answer:0},
    {question:"Which storage device is usually non-volatile?",options:["Hard drive","CPU cache","Register","RAM"],answer:0},
    {question:"What is the main purpose of ROM?",options:["Store boot-up instructions","Run applications","Display video","Increase RAM size"],answer:0},
    {question:"What does storage capacity measure?",options:["How much data can be kept","How fast data is processed","How much power is used","How many peripherals can connect"],answer:0},
    {question:"What is the difference between RAM and ROM?",options:["RAM is temporary, ROM is permanent","RAM is faster than ROM","RAM stores programs, ROM stores data","RAM is for graphics, ROM is for sound"],answer:0},
    {question:"What is SSD storage?",options:["Solid State Drive with no moving parts","Standard Storage Device","Sequential Storage Device","Secure Storage Division"],answer:0}
  ],
  "Computer networks, connections and protocols":[
    {question:"What does LAN stand for?",options:["Local Area Network","Large Area Network","Long Access Node","Local Access Network"],answer:0},
    {question:"What is the role of a router?",options:["Direct data between networks","Store files permanently","Increase CPU speed","Manage graphics"],answer:0},
    {question:"What does HTTP do?",options:["Transfers web pages over the internet","Encrypts files","Stores backups","Runs the operating system"],answer:0},
    {question:"What is an IP address used for?",options:["Identify devices on a network","Measure battery life","Store program code","Control printers"],answer:0},
    {question:"What does WAN stand for?",options:["Wide Area Network","Wireless Access Node","Web Area Network","Windows Access Network"],answer:0},
    {question:"What is bandwidth?",options:["The maximum data transmission rate","The width of a cable","The speed of RAM","The size of storage"],answer:0}
  ],
  "Network security":[
    {question:"What is phishing?",options:["A scam that tricks users into giving information","A type of router","A storage device","A programming language"],answer:0},
    {question:"What does a firewall do?",options:["Blocks unauthorised network access","Copies files to cloud storage","Increases CPU speed","Improves display quality"],answer:0},
    {question:"What is malware?",options:["Malicious software","A safe browser extension","A hardware cable","A backup tool"],answer:0},
    {question:"Why is encryption used?",options:["To protect data from unauthorised access","To reduce memory usage","To increase the screen resolution","To speed up the CPU"],answer:0},
    {question:"What is a strong password?",options:["Long, mixed characters with numbers and symbols","Short and easy to remember","Your username repeated","Your birthdate"],answer:0},
    {question:"What are cookies?",options:["Small data files stored on your browser","Sweet computer treats","Programming functions","Network protocols"],answer:0}
  ],
  "Systems software":[
    {question:"What is an operating system?",options:["Software that manages hardware and programs","A type of memory chip","The computer case","A network cable"],answer:0},
    {question:"What is utility software used for?",options:["Maintain and optimise the system","Run games","Increase internet speed","Print documents"],answer:0},
    {question:"What does a device driver do?",options:["Lets the OS communicate with hardware","Stores files permanently","Creates encryption keys","Designs webpages"],answer:0},
    {question:"What does multitasking allow?",options:["Several programs to run at once","Only one program to run","The CPU to stop","The monitor to turn off"],answer:0},
    {question:"What is a bootloader?",options:["Software that starts the OS when the computer boots","A program that loads files","A storage device","A virus protection tool"],answer:0},
    {question:"What is a kernel?",options:["The core of the operating system","The outer casing of a computer","A storage medium","A type of application"],answer:0}
  ],
  "Ethical, legal, cultural and environmental impacts":[
    {question:"Which is an environmental impact of technology?",options:["Electronic waste","Higher CPU temperature","More RAM","More USB ports"],answer:0},
    {question:"Which is a legal issue linked to computing?",options:["Copyright","Screen size","Battery type","Keyboard layout"],answer:0},
    {question:"Which is a cultural impact of technology?",options:["Changing how people communicate","Increasing processor speed","Reducing storage size","Removing internet access"],answer:0},
    {question:"What is a benefit of automation?",options:["It can save time and reduce errors","It always removes all human jobs","It removes the need for electricity","It makes all software faster"],answer:0},
    {question:"What does GDPR protect?",options:["Personal data and privacy","Graphics processing","Global development","General programming rules"],answer:0},
    {question:"What is digital divide?",options:["The gap between those with and without internet access","A programming error","A type of network","A storage method"],answer:0}
  ],
  "Algorithms":[
    {question:"What is a sequence in an algorithm?",options:["A list of steps in order","A random choice","A hardware component","A type of virus"],answer:0},
    {question:"What does a loop do?",options:["Repeats instructions","Stores data","Deletes files","Prints pictures"],answer:0},
    {question:"What is decomposition?",options:["Breaking a problem into smaller parts","Combining all data into one file","Making code longer","Removing variables"],answer:0},
    {question:"What is a binary search?",options:["A method for finding an item in a sorted list","A way to create a network","A form of malware","A type of memory"],answer:0},
    {question:"What is sorting?",options:["Arranging data in a specific order","Storing data in memory","Copying files","Deleting information"],answer:0},
    {question:"What is a flowchart used for?",options:["To visually represent an algorithm","To store files","To encrypt data","To manage networks"],answer:0}
  ],
  "Programming fundamentals":[
    {question:"What is a variable used for?",options:["Store data in a program","Make a printer work","Connect a network","Change the CPU"],answer:0},
    {question:"What does input mean in programming?",options:["Data entered by the user","The output of a program","A hardware port","An operating system update"],answer:0},
    {question:"What is a constant?",options:["A value that does not change","A loop structure","A type of virus","A network cable"],answer:0},
    {question:"What is a function?",options:["A named block of code that performs a task","A hardware component","An internet protocol","A backup drive"],answer:0},
    {question:"What is an array?",options:["A collection of elements in a list","A type of storage device","A network connection","A programming error"],answer:0},
    {question:"What is iteration?",options:["Repeating a set of instructions","Creating a new variable","Storing data","Deleting files"],answer:0}
  ],
  "Producing robust programs":[
    {question:"What is validation used for?",options:["Check that input data is sensible","Increase CPU speed","Reduce storage","Stop the internet"],answer:0},
    {question:"What is the purpose of testing?",options:["Find and fix errors","Increase screen resolution","Create more memory","Change the keyboard layout"],answer:0},
    {question:"What is a syntax error?",options:["A mistake in the rules of the programming language","A virus infection","A network failure","A storage issue"],answer:0},
    {question:"What does maintainability mean?",options:["Code can be updated and understood easily","Code always runs instantly","Code cannot be changed","Code does not need testing"],answer:0},
    {question:"What is debugging?",options:["Finding and fixing errors in code","Deleting unnecessary files","Increasing program speed","Reducing file size"],answer:0},
    {question:"What is documentation?",options:["Written explanation of how code works","A storage file","A network protocol","An error message"],answer:0}
  ],
  "Boolean logic":[
    {question:"TRUE AND TRUE = ?",options:["TRUE","FALSE","ERROR","0"],answer:0},
    {question:"TRUE AND FALSE = ?",options:["TRUE","FALSE","ERROR","1"],answer:1},
    {question:"FALSE OR TRUE = ?",options:["TRUE","FALSE","ERROR","0"],answer:0},
    {question:"NOT TRUE = ?",options:["TRUE","FALSE","0","1"],answer:1},
    {question:"FALSE AND FALSE = ?",options:["TRUE","FALSE","ERROR","1"],answer:1},
    {question:"NOT FALSE = ?",options:["TRUE","FALSE","0","1"],answer:0}
  ],
  "Programming languages and IDEs":[
    {question:"What is an IDE?",options:["An integrated development environment","A type of printer","A storage device","A network protocol"],answer:0},
    {question:"What does a compiler do?",options:["Translate code into machine code","Create a browser window","Increase memory","Connect to Wi-Fi"],answer:0},
    {question:"What is the purpose of a linker?",options:["Join program modules together","Run hardware tests","Increase CPU power","Set network passwords"],answer:0},
    {question:"What is interpreted code?",options:["Code that is translated line by line","Code stored only on ROM","Code that is never run","Code that cannot be edited"],answer:0},
    {question:"What is Python?",options:["A high-level programming language","A type of hardware","A storage device","A network protocol"],answer:0},
    {question:"What does a debugger do?",options:["Help identify and fix errors in code","Store files","Create graphics","Manage networks"],answer:0}
  ],
  "Data representation":[
    {question:"How many bits are in one byte?",options:["8","4","16","32"],answer:0},
    {question:"What does binary use as its digits?",options:["0 and 1","A and B","X and Y","1 and 2"],answer:0},
    {question:"What is ASCII used for?",options:["Represent text characters","Store images","Control routers","Measure speed"],answer:0},
    {question:"What is hexadecimal often used for?",options:["Represent binary values more compactly","Increase CPU speed","Store music files","Make printers work"],answer:0},
    {question:"What is Unicode?",options:["A standard for representing characters worldwide","A type of storage","A network protocol","A programming language"],answer:0},
    {question:"How many values can 1 bit represent?",options:["2","4","8","16"],answer:0}
  ]
};

const startScreen=document.getElementById("startScreen");
const gameScreen=document.getElementById("gameScreen");
const summaryScreen=document.getElementById("summaryScreen");
const startBtn=document.getElementById("startBtn");
const questionBox=document.getElementById("question");
const answersBox=document.getElementById("answers");
const feedbackBox=document.getElementById("feedback");
const nextBtn=document.getElementById("nextBtn");
const restartBtn=document.getElementById("restartBtn");
const summaryRestartBtn=document.getElementById("summaryRestartBtn");
const phaseBadge=document.getElementById("phaseBadge");
const streakBadge=document.getElementById("streakBadge");
const survivalLives=document.getElementById("survivalLives");
const positionBadge=document.getElementById("positionBadge");
const timerDisplay=document.getElementById("timerDisplay");
const countdown=document.getElementById("countdown");
const countdownLabel=document.getElementById("countdownLabel");
const countdownLights=document.querySelectorAll(".light");
const topicMenu=document.getElementById("topicMenu");
const topicSummary=document.getElementById("topicSummary");
const openTopicMenuBtn=document.getElementById("openTopicMenuBtn");
const closeTopicMenuBtn=document.getElementById("closeTopicMenuBtn");
const applyTopicsBtn=document.getElementById("applyTopicsBtn");
const selectAllTopicsBtn=document.getElementById("selectAllTopicsBtn");
const clearTopicsBtn=document.getElementById("clearTopicsBtn");
const themeToggleBtn=document.getElementById("themeToggleBtn");
const soundToggleBtn=document.getElementById("soundToggleBtn");
const volumeSlider=document.getElementById("volumeSlider");
const volumeControl=document.getElementById("volumeControl");
const volumeLabel=document.getElementById("volumeLabel");
const difficultySelect=document.getElementById("difficultySelect");
const gameModeSelect=document.getElementById("gameModeSelect");

let qualifyingQuestions=[];
let raceQuestions=[];
let pitQuestions=[];
let qualifyingIndex=0;
let raceIndex=0;
let pitIndex=0;
let qualifyingCorrect=0;
let position=22;
let firstQuestionTime=0;
let startTime=0;
let audioCtx=null;
let pitStopDone=false;
let pitCorrect=0;
let pitTimes=[];
let activePhase="home";
let locked=false;
let selectedTopics=[...ocrTopics];

let difficulty="normal";
let gameMode="classic";
let soundEnabled=true;
let soundVolume=0.18;
let streak=0;
let survivalLivesRemaining=3;
let timerInterval=null;
let timeRemaining=0;
let questionStartTime=0;
let allAnswerTimes=[];
let topicStats={};
let totalCorrect=0;
let totalAsked=0;
let currentTheme="dark";

function shuffle(list){const copy=[...list];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy}
function syncTopicCheckboxes(){document.querySelectorAll(".topic-checkbox").forEach(checkbox=>{checkbox.checked=selectedTopics.includes(checkbox.value);});}
function updateTopicSummary(){const summary=selectedTopics.length===ocrTopics.length?"All OCR GCSE Computer Science topics":selectedTopics.join(", ");topicSummary.textContent=`Selected topics: ${summary}`;}
function openTopicMenu(){syncTopicCheckboxes();topicMenu.hidden=false;}
function closeTopicMenu(){topicMenu.hidden=true;}
function applyTopicSelection(){const checked=Array.from(document.querySelectorAll(".topic-checkbox:checked")).map(checkbox=>checkbox.value);selectedTopics=checked.length?checked:[...ocrTopics];updateTopicSummary();closeTopicMenu();}
function selectAllTopics(){document.querySelectorAll(".topic-checkbox").forEach(checkbox=>checkbox.checked=true);selectedTopics=[...ocrTopics];updateTopicSummary();}
function clearTopics(){document.querySelectorAll(".topic-checkbox").forEach(checkbox=>checkbox.checked=false);selectedTopics=[];updateTopicSummary();}
function buildQuestionPool(){const selectedPool=selectedTopics.flatMap(topic=>topicQuestionBank[topic].map(q=>({...q,topic})))||[];if(selectedPool.length===0){return shuffle(ocrTopics.flatMap(topic=>topicQuestionBank[topic].map(q=>({...q,topic}))));}return shuffle(selectedPool);}
function initQuestions(){const pool=buildQuestionPool();qualifyingQuestions=pool.slice(0,5);raceQuestions=pool.slice(5,15);pitQuestions=pool.slice(15,19);}

function toggleTheme(){currentTheme=currentTheme==="dark"?"light":"dark";document.documentElement.classList.toggle("light-theme");themeToggleBtn.textContent=currentTheme==="light"?"🌞":"🌙";localStorage.setItem("theme",currentTheme);}

function toggleSound(){soundEnabled=!soundEnabled;soundToggleBtn.textContent=soundEnabled?"🔊":"🔇";if(!soundEnabled){volumeControl.hidden=true;}else{volumeControl.hidden=false;}localStorage.setItem("soundEnabled",soundEnabled);}

function updateVolume(){soundVolume=parseInt(volumeSlider.value)/100;volumeLabel.textContent=volumeSlider.value+"%";localStorage.setItem("soundVolume",soundVolume);}

function ensureAudio(){if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();}if(audioCtx.state==="suspended"){audioCtx.resume();}return audioCtx}
function playTone(freq,duration,type,volume=0.18){if(!soundEnabled)return;const ctx=ensureAudio();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type=type;osc.frequency.value=freq;const adjustedVolume=volume*soundVolume;gain.gain.setValueAtTime(adjustedVolume,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+duration);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration)}
function playSequence(pattern){pattern.forEach((tone,index)=>setTimeout(()=>playTone(tone.freq,tone.duration,tone.type,tone.volume||0.18),index*140));}

function getPositionAdjustment(){switch(difficulty){case"easy":return 0.5;case"hard":return 2;default:return 1;}}

function updateStreak(isCorrect){if(isCorrect){streak+=1;streakBadge.hidden=false;streakBadge.textContent=`Streak: ${streak}`;}else{if(streak>0){playTone(400,0.1,"sine",0.1);}streak=0;streakBadge.hidden=true;}}

function startTimerCountdown(timeLimit){timeRemaining=timeLimit;timerDisplay.textContent=`Time: ${timeRemaining}s`;timerInterval=setInterval(()=>{timeRemaining--;timerDisplay.textContent=`Time: ${timeRemaining}s`;if(timeRemaining<=5){timerDisplay.className="feedback bad";}if(timeRemaining<=0){clearInterval(timerInterval);autoSubmitQuestion();}},1000);}

function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}}

function autoSubmitQuestion(){if(activePhase==="qualifying"||activePhase==="race"||activePhase==="pit"){let currentIndex=0;let currentItem=null;if(activePhase==="qualifying"){currentIndex=qualifyingIndex;currentItem=qualifyingQuestions[qualifyingIndex];}else if(activePhase==="race"){currentIndex=raceIndex;currentItem=raceQuestions[raceIndex];}else{currentIndex=pitIndex;currentItem=pitQuestions[pitIndex];}handleAnswer(-1,activePhase,currentIndex,currentItem);}}

function updatePosition(){positionBadge.textContent=`Current Position: ${position} / 22`;}
function setFeedback(message,kind){feedbackBox.textContent=message;feedbackBox.className=`feedback ${kind||""}`.trim();}
function disableButtons(){document.querySelectorAll(".choice").forEach(btn=>btn.disabled=true);}
function renderQuestion(mode,index){let item;if(mode==="qualifying"){item=qualifyingQuestions[index];}else if(mode==="race"){item=raceQuestions[index];}else{item=pitQuestions[index];}questionBox.textContent=item.question;answersBox.innerHTML="";timerDisplay.textContent=mode==="pit"?"Pit Stop Time: --":"";questionStartTime=Date.now();startTime=Date.now();locked=false;stopTimer();if(mode!=="pit"){if(gameMode==="timeattack"){startTimerCountdown(30);}else if(gameMode==="classic"||gameMode==="endless"){startTimerCountdown(45);}}item.options.forEach((option,optionIndex)=>{const btn=document.createElement("button");btn.className="choice";btn.textContent=option;btn.onclick=()=>handleAnswer(optionIndex,mode,index,item);answersBox.appendChild(btn);});}

function handleAnswer(optionIndex,mode,index,item){if(locked){return;}locked=true;stopTimer();const elapsed=Number(((Date.now()-questionStartTime)/1000).toFixed(2));allAnswerTimes.push(elapsed);totalAsked+=1;if(mode==="qualifying"&&index===0){firstQuestionTime=elapsed;}disableButtons();let isCorrect=optionIndex===item.answer;if(item.topic){trackTopicStat(item.topic,isCorrect);}if(optionIndex===-1){setFeedback("⏱️ Time's up!","bad");isCorrect=false;}else if(isCorrect){setFeedback("✅ Correct!","good");playTone(900,0.16,"triangle");totalCorrect+=1;if(mode==="qualifying"){qualifyingCorrect+=1;}else if(mode==="race"){const adjustment=getPositionAdjustment();position=Math.max(1,position-adjustment);updatePosition();questionBox.parentElement.classList.add("overtake");setTimeout(()=>{questionBox.parentElement.classList.remove("overtake");},600);}else{pitCorrect+=1;}}else{setFeedback("❌ Incorrect.","bad");playTone(280,0.24,"sawtooth");if(mode==="race"){const adjustment=getPositionAdjustment();position=Math.min(22,position+adjustment);updatePosition();}else if(gameMode==="survival"&&mode==="qualifying"){survivalLivesRemaining-=1;survivalLives.textContent=`Lives: ${survivalLivesRemaining}`;if(survivalLivesRemaining<=0){setFeedback("Game Over! No more lives.","bad");endSurvivalGame();return;}}}updateStreak(isCorrect);if(mode==="qualifying"){nextBtn.textContent="Next Question";nextBtn.style.display="block";if(index===qualifyingQuestions.length-1){nextBtn.textContent="Start Race";}}else if(mode==="race"){if(index===4&&!pitStopDone){pitStopDone=true;setTimeout(()=>{startPitStop();},900);}else if(index===raceQuestions.length-1){setTimeout(()=>{finishRace();},900);}else{nextBtn.textContent="Next Question";nextBtn.style.display="block";}}else{pitTimes.push(elapsed);pitIndex+=1;setTimeout(()=>{if(pitIndex<pitQuestions.length){renderQuestion("pit",pitIndex);}else{finishPitStop();}},850);}}

function trackTopicStat(topic,isCorrect){if(!topicStats[topic]){topicStats[topic]={correct:0,total:0};}topicStats[topic].total+=1;if(isCorrect){topicStats[topic].correct+=1;}}

function beginRace(){activePhase="race";phaseBadge.textContent="Race";feedbackBox.className="feedback";feedbackBox.textContent="";nextBtn.style.display="none";raceIndex=0;renderQuestion("race",0);}

function showQualifying(){activePhase="qualifying";phaseBadge.textContent="Qualifying";feedbackBox.className="feedback";feedbackBox.textContent="";nextBtn.style.display="none";qualifyingIndex=0;renderQuestion("qualifying",0);}

function startPitStop(){activePhase="pit";phaseBadge.textContent="Pit Stop";feedbackBox.className="feedback warn";feedbackBox.textContent="Timed pit stop! Be fast and accurate.";nextBtn.style.display="none";pitCorrect=0;pitTimes=[];pitIndex=0;playSequence([{freq:220,duration:0.06,type:"square"},{freq:260,duration:0.06,type:"square"},{freq:320,duration:0.08,type:"square"},{freq:280,duration:0.08,type:"square"}]);renderQuestion("pit",0);}

function finishPitStop(){let total=pitTimes.reduce((sum,time)=>sum+time,0);let average=pitTimes.length?total/pitTimes.length:999;activePhase="race";phaseBadge.textContent="Race";if(pitCorrect>=3&&average<4){position=Math.max(1,position-3);setFeedback("🔥 Excellent pit stop! You gained 3 spots.","good");playTone(1100,0.18,"triangle");}else if(pitCorrect>=2&&average<6){position=Math.max(1,position-1);setFeedback("👍 Good pit stop! You gained 1 spot.","good");playTone(1000,0.16,"triangle");}else{position=Math.min(22,position+2);setFeedback("⏱️ Slow pit stop. You lost ground.","bad");playTone(240,0.24,"sawtooth");}updatePosition();setTimeout(()=>{raceIndex=5;renderQuestion("race",5);},900);}

function endSurvivalGame(){stopTimer();activePhase="finish";nextBtn.style.display="none";setTimeout(()=>{showSummary();},900);}

function finishRace(){activePhase="finish";phaseBadge.textContent="Race Finished";nextBtn.style.display="none";questionBox.textContent="🏁 Chequered flag!";answersBox.innerHTML="";timerDisplay.textContent="";let message="";if(position===1){message="🥇 Champion!";playSequence([{freq:700,duration:0.12,type:"triangle"},{freq:900,duration:0.12,type:"triangle"},{freq:1200,duration:0.24,type:"triangle"}]);playTone(1380,0.28,"triangle",0.22);}else if(position===2){message="🥈 Podium!";playSequence([{freq:760,duration:0.12,type:"triangle"},{freq:860,duration:0.14,type:"triangle"}]);}else if(position===3){message="🥉 Podium!";playSequence([{freq:760,duration:0.12,type:"triangle"},{freq:860,duration:0.14,type:"triangle"}]);}else if(position>=4&&position<=10){message="👍 Great race!";playTone(620,0.2,"triangle",0.16);}else if(position<=20){message="Not bad!";playTone(520,0.18,"triangle",0.14);}else{message="Keep practicing!";playSequence([{freq:320,duration:0.18,type:"sawtooth"},{freq:260,duration:0.22,type:"sawtooth"}]);}setFeedback(`${message} Final Position: ${position} / 22`,`good`);setTimeout(()=>{showSummary();},600);}

function showSummary(){gameScreen.style.display="none";summaryScreen.hidden=false;const accuracy=totalAsked>0?((totalCorrect/totalAsked)*100).toFixed(1):0;const avgTime=allAnswerTimes.length>0?(allAnswerTimes.reduce((a,b)=>a+b,0)/allAnswerTimes.length).toFixed(2):0;document.getElementById("summaryPosition").textContent=`${position} / 22`;document.getElementById("summaryTotal").textContent=totalAsked;document.getElementById("summaryCorrect").textContent=totalCorrect;document.getElementById("summaryAccuracy").textContent=`${accuracy}%`;document.getElementById("summaryAvgTime").textContent=`${avgTime}s`;const breakdown=document.getElementById("topicBreakdown");breakdown.innerHTML="<strong>Topic Breakdown:</strong>";Object.keys(topicStats).forEach(topic=>{const stats=topicStats[topic];const topicAccuracy=((stats.correct/stats.total)*100).toFixed(0);const div=document.createElement("div");div.className="topic-item";div.innerHTML=`<span class="topic-name">${topic}</span><span class="topic-result">${stats.correct}/${stats.total} (${topicAccuracy}%)</span>`;breakdown.appendChild(div);});}

function resetGame(){qualifyingIndex=0;raceIndex=0;pitIndex=0;qualifyingCorrect=0;position=22;firstQuestionTime=0;pitStopDone=false;pitCorrect=0;pitTimes=[];locked=false;activePhase="home";streak=0;survivalLivesRemaining=3;totalCorrect=0;totalAsked=0;allAnswerTimes=[];topicStats={};phaseBadge.textContent="Qualifying";positionBadge.textContent="Current Position: -- / 22";streakBadge.hidden=true;survivalLives.hidden=true;feedbackBox.className="feedback";feedbackBox.textContent="";timerDisplay.textContent="";nextBtn.style.display="none";restartBtn.style.display="none";startScreen.style.display="block";gameScreen.style.display="none";summaryScreen.hidden=true;countdown.style.display="none";updateTopicSummary();initQuestions();}

function startCountdown(){startScreen.style.display="none";gameScreen.style.display="block";countdown.style.display="flex";countdownLabel.textContent="Lights out in 5...";countdownLights.forEach(light=>light.className="light");let steps=[5,4,3,2,1];steps.forEach((step,index)=>{setTimeout(()=>{countdownLights.forEach(light=>light.className="light");for(let i=0;i<=index;i++){countdownLights[i].className="light active";}countdownLabel.textContent=`Lights out in ${step}...`;playTone(520+index*80,0.08,"square",0.12);},index*760);});setTimeout(()=>{countdownLights.forEach(light=>light.className="light go");countdownLabel.textContent="GO!";playTone(900,0.16,"triangle",0.18);playTone(1100,0.14,"triangle",0.14);setTimeout(()=>{countdown.style.display="none";showQualifying();},500);},steps.length*760);}

function loadSettings(){const savedTheme=localStorage.getItem("theme");if(savedTheme){currentTheme=savedTheme;if(currentTheme==="light"){document.documentElement.classList.add("light-theme");themeToggleBtn.textContent="🌞";}else{themeToggleBtn.textContent="🌙";}}const savedSound=localStorage.getItem("soundEnabled");if(savedSound!==null){soundEnabled=savedSound==="true";soundToggleBtn.textContent=soundEnabled?"🔊":"🔇";volumeControl.hidden=!soundEnabled;}const savedVolume=localStorage.getItem("soundVolume");if(savedVolume){soundVolume=parseFloat(savedVolume);volumeSlider.value=Math.round(soundVolume*100);volumeLabel.textContent=Math.round(soundVolume*100)+"%";}}

startBtn.addEventListener("click",()=>{difficulty=difficultySelect.value;gameMode=gameModeSelect.value;if(gameMode==="survival"){survivalLives.hidden=false;survivalLivesRemaining=3;}ensureAudio();initQuestions();startCountdown();});
openTopicMenuBtn.addEventListener("click",()=>{openTopicMenu();});
closeTopicMenuBtn.addEventListener("click",()=>{closeTopicMenu();});
applyTopicsBtn.addEventListener("click",()=>{applyTopicSelection();});
selectAllTopicsBtn.addEventListener("click",()=>{selectAllTopics();});
clearTopicsBtn.addEventListener("click",()=>{clearTopics();});
topicMenu.addEventListener("click",(event)=>{if(event.target===topicMenu){closeTopicMenu();}});
themeToggleBtn.addEventListener("click",toggleTheme);
soundToggleBtn.addEventListener("click",toggleSound);
volumeSlider.addEventListener("input",updateVolume);
nextBtn.addEventListener("click",()=>{if(activePhase==="qualifying"){qualifyingIndex+=1;if(qualifyingIndex<qualifyingQuestions.length){renderQuestion("qualifying",qualifyingIndex);}else{let grid=22-(qualifyingCorrect*4);if(firstQuestionTime<3){grid=Math.max(1,grid-1);}position=Math.max(1,grid);updatePosition();setFeedback("Grid set. Race is go!","warn");setTimeout(()=>{beginRace();},600);}}else if(activePhase==="race"){raceIndex+=1;if(raceIndex<raceQuestions.length){renderQuestion("race",raceIndex);}else{finishRace();}}});
restartBtn.addEventListener("click",()=>{resetGame();});
summaryRestartBtn.addEventListener("click",()=>{resetGame();});
updateTopicSummary();
updatePosition();
loadSettings();

