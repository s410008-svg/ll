const facts = [
  { title: '外觀，是自然的筆跡。', text: '香蕉有長條形的果實與彎曲的外觀；不同品種和生長條件，外觀可能有所差異。' },
  { title: '熟度，是一段變化的旅程。', text: '香蕉會隨著成熟，外觀、香氣與口感產生變化。觀察它，就是觀察一場日常的自然變化。' },
  { title: '從水果開始，往問題走。', text: '知蕉不替你下結論，只想邀請你多問一題：這件事和生活、科學，或我們的文化有什麼關係？' }
];
document.querySelectorAll('.fact-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.fact-tab').forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  const fact = facts[Number(tab.dataset.fact)];
  document.querySelector('#fact-panel').innerHTML = `<strong>${fact.title}</strong><p>${fact.text}</p>`;
}));

const quiz = [
  { q: '你拿起一根香蕉時，最先注意到什麼？', a: ['它的顏色與形狀', '它怎麼從樹上來到這裡', '它能不能變成一個實驗', '它讓你想起的某段記憶'] },
  { q: '如果要開一場知識對話，你想先聊什麼？', a: ['自然與環境', '社會與文化', '科學與技術', '文學與人生'] },
  { q: '你最喜歡哪種學習方式？', a: ['慢慢觀察，找到細節', '把不同領域連起來', '動手做，看看結果', '和別人交換想法'] }
];
let current = 0; let score = [0, 0, 0, 0];
const questionText = document.querySelector('#question-text'); const answers = document.querySelector('#answers');
function renderQuiz() {
  const item = quiz[current]; document.querySelector('#question-number').textContent = current + 1;
  document.querySelector('.progress-bar').style.width = `${(current + 1) / quiz.length * 100}%`; questionText.textContent = item.q;
  answers.innerHTML = item.a.map((answer, i) => `<button class="answer-btn" data-answer="${i}">${answer}</button>`).join('');
  answers.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { score[Number(button.dataset.answer)]++; current++; current < quiz.length ? renderQuiz() : showResult(); }));
}
function showResult() { const winner = score.indexOf(Math.max(...score)); const names = ['觀察派', '連結派', '實驗派', '對話派']; const messages = ['你擅長看見日常裡的細節。', '你喜歡讓不同知識彼此相遇。', '你會把好奇心變成動手試試看的勇氣。', '你相信知識在分享之後會走得更遠。']; document.querySelector('.quiz-count').textContent = '測驗完成'; questionText.textContent = '你的知識旅人類型是'; answers.innerHTML = ''; document.querySelector('#quiz-result').hidden = false; document.querySelector('#quiz-result').innerHTML = `${names[winner]} <small>${messages[winner]}</small>`; }
renderQuiz();

const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
