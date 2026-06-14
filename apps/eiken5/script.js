// ===== セーブデータ管理 =====
const SAVE_KEY = "eiken5_adventure_save_v1";

function loadSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through */ }
  }
  return {
    totalXP: 0,
    stageStars: {}, // { stageId: starCount }
    streak: 0,
    lastPlayDate: null,
    examDate: null
  };
}

function saveSave() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

let save = loadSave();

// HTMLとして安全な文字列に変換
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ===== 英検 公式試験日程（本会場・一次試験）=====
// 出典: 日本英語検定協会 2026年度試験日程のご案内
const OFFICIAL_EXAM_DATES = [
  "2026-05-31", // 2026年度 第1回
  "2026-10-04", // 2026年度 第2回
  "2027-01-24"  // 2026年度 第3回
];

const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

function formatDateJa(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAY_JA[d.getDay()]}）`;
}

// ===== 連続記録(ストリーク)更新 =====
function updateStreak() {
  const today = new Date();
  const todayStr = today.toDateString();
  if (save.lastPlayDate === todayStr) return; // 今日はもう記録済み

  if (save.lastPlayDate) {
    const last = new Date(save.lastPlayDate);
    const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      save.streak += 1;
    } else {
      save.streak = 1;
    }
  } else {
    save.streak = 1;
  }
  save.lastPlayDate = todayStr;
  saveSave();
}

// ===== レベル計算 =====
function levelFromXP(xp) {
  return Math.floor(xp / 100) + 1;
}
function xpProgressPercent(xp) {
  return (xp % 100);
}

// ===== 画面切り替え =====
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===== ステータスバー更新 =====
function refreshStatusbar() {
  const lvl = levelFromXP(save.totalXP);
  const xpPercent = xpProgressPercent(save.totalXP);
  document.getElementById("level-badge").textContent = "Lv." + lvl;
  document.getElementById("xp-bar-fill").style.width = xpPercent + "%";
  document.getElementById("xp-bar-wrap").setAttribute("aria-valuenow", String(xpPercent));
  document.getElementById("streak-text").textContent = save.streak + "日連続";
  refreshHeaderCountdown();
}

// ===== ヘッダーの試験日カウントダウン =====
function refreshHeaderCountdown() {
  const el = document.getElementById("header-countdown");
  if (!el) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let targetDate = null;
  if (save.examDate) {
    targetDate = new Date(save.examDate + "T00:00:00");
  } else {
    targetDate = OFFICIAL_EXAM_DATES
      .map(d => new Date(d + "T00:00:00"))
      .filter(d => d >= today)
      .sort((a, b) => a - b)[0] || null;
  }

  if (!targetDate) {
    el.textContent = "";
    return;
  }

  const diffDays = Math.round((targetDate - today) / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    el.textContent = `📅 試験まであと${diffDays}日`;
  } else if (diffDays === 0) {
    el.textContent = "📅 試験は今日！";
  } else {
    el.textContent = "";
  }
}

// ===== タイトル画面 =====
function renderTitle() {
  document.getElementById("statusbar").style.display = "flex";
  refreshStatusbar();

  const previewGrid = document.getElementById("title-preview-grid");
  if (previewGrid && !previewGrid.dataset.filled) {
    previewGrid.innerHTML = STAGES.map(stage =>
      `<div class="preview-cell">${stage.monsterEmoji}</div>`
    ).join("");
    previewGrid.dataset.filled = "true";
  }
  const lvl = levelFromXP(save.totalXP);
  const clearedCount = Object.values(save.stageStars).filter(s => s > 0).length;
  const totalStars = Object.values(save.stageStars).reduce((a, b) => a + b, 0);
  const statsEl = document.getElementById("title-stats");
  if (save.totalXP > 0 || totalStars > 0) {
    statsEl.innerHTML =
      `これまでの記録<br>` +
      `Lv.${lvl} ・ 経験値 ${save.totalXP}EXP<br>` +
      `クリアした島: ${clearedCount} / ${STAGES.length}　⭐ ${totalStars} / ${STAGES.length * 3}<br>` +
      `🔥 ${save.streak}日連続プレイ中！`;
  } else {
    statsEl.innerHTML = "さあ、ぼうけんに出かけよう！";
  }
}

// ===== マップ画面 =====
function renderMap() {
  refreshStatusbar();
  const pathEl = document.getElementById("map-path");
  pathEl.innerHTML = "";

  let nextAssigned = false;
  let clearedCount = 0;
  let totalStars = 0;

  STAGES.forEach((stage, idx) => {
    const stars = save.stageStars[stage.id] || 0;
    const prevCleared = idx === 0 || (save.stageStars[STAGES[idx - 1].id] || 0) >= 1;
    const unlocked = prevCleared;

    if (stars >= 1) clearedCount++;
    totalStars += stars;

    const node = document.createElement(unlocked ? "button" : "div");
    const isFullClear = stars === 3;
    const isNext = unlocked && !isFullClear && !nextAssigned;
    if (isNext) nextAssigned = true;

    node.className = "stage-node " + (unlocked ? "unlocked" : "locked") + (isFullClear ? " full-clear" : "") + (isNext ? " next-up" : "");
    node.setAttribute("role", "listitem");

    const starText = unlocked ? "⭐".repeat(stars) + "☆".repeat(3 - stars) : "";

    node.innerHTML = `
      <div class="stage-emoji" style="background:${stage.bgColor}33;">${unlocked ? stage.monsterEmoji : "🔒"}</div>
      <div class="stage-info">
        <div class="name-row">
          <span class="name">${idx + 1}. ${stage.name}</span>
          ${isNext ? '<span class="next-tag">NEXT</span>' : ""}
        </div>
        <div class="monster">${unlocked ? "モンスター: " + stage.monsterName : "クリアすると出現！"}</div>
      </div>
      <div class="stars">${unlocked ? starText : '<span class="lock-icon">🔒</span>'}</div>
    `;

    if (unlocked) {
      node.setAttribute("aria-label", `${idx + 1}. ${stage.name}　モンスター: ${stage.monsterName}　獲得スター ${stars}/3${isNext ? "　次のステージ" : ""}`);
      node.addEventListener("click", () => startBattle(stage.id));
    } else {
      node.setAttribute("aria-disabled", "true");
      node.setAttribute("aria-label", `${idx + 1}. ${stage.name}　ロック中`);
    }
    pathEl.appendChild(node);
  });

  // 全体の進み具合
  const progressEl = document.getElementById("map-progress");
  const maxStars = STAGES.length * 3;
  const percent = (clearedCount / STAGES.length) * 100;
  progressEl.innerHTML = `
    <div class="map-progress-bar-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="${STAGES.length}" aria-valuenow="${clearedCount}">
      <div class="map-progress-bar-fill" style="width:${percent}%"></div>
    </div>
    <div class="map-progress-text">クリアした島: ${clearedCount} / ${STAGES.length}　⭐ ${totalStars} / ${maxStars}</div>
  `;

  // バッジ表示（3つ星クリアで獲得）
  const badgeRow = document.getElementById("badge-row");
  badgeRow.innerHTML = "";
  STAGES.forEach(stage => {
    const earned = (save.stageStars[stage.id] || 0) === 3;
    const b = document.createElement("div");
    b.className = "badge" + (earned ? " earned" : "");
    b.textContent = stage.monsterEmoji;
    b.title = stage.name;
    b.setAttribute("role", "listitem");
    b.setAttribute("aria-label", `${stage.name}のバッジ${earned ? "（獲得済み）" : "（未獲得）"}`);
    badgeRow.appendChild(b);
  });
}

// ===== バトル(クイズ)画面 =====
let battleState = null;

function startBattle(stageId) {
  const stage = STAGES.find(s => s.id === stageId);
  battleState = {
    stage,
    qIndex: 0,
    correctCount: 0,
    hearts: 3,
    monsterHp: stage.questions.length,
    monsterMaxHp: stage.questions.length
  };
  document.getElementById("monster-emoji").textContent = stage.monsterEmoji;
  document.getElementById("monster-emoji").className = "monster-emoji";
  renderBattleQuestion();
  showScreen("battle-screen");
}

// 英語部分（"..."で囲まれた箇所）にlang="en"を付けて表示する
function formatQuestionText(text) {
  return text.split(/("[^"]+")/g).map(part => {
    const m = part.match(/^"([^"]+)"$/);
    if (m) {
      const eng = escapeHtml(m[1]);
      return `<span class="eng" lang="en">"${eng}"</span>`;
    }
    return escapeHtml(part);
  }).join("");
}

function isEnglishText(text) {
  return /^[A-Za-z0-9 ,.'!?\-]+$/.test(text);
}

// 英語の発音読み上げ
let cachedVoices = [];

function refreshVoiceList() {
  cachedVoices = speechSynthesis.getVoices();
}

if ("speechSynthesis" in window) {
  refreshVoiceList();
  speechSynthesis.addEventListener("voiceschanged", refreshVoiceList);
}

// 聞き取りやすいお手本となる女性の英語音声を優先的に選ぶ
const PREFERRED_VOICE_NAMES = [
  "Samantha",
  "Google US English",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Zira - English (United States)",
  "Karen",
  "Moira"
];

function pickEnglishVoice() {
  if (!cachedVoices.length) refreshVoiceList();

  for (const name of PREFERRED_VOICE_NAMES) {
    const v = cachedVoices.find(v => v.name === name);
    if (v) return v;
  }

  const enFemale = cachedVoices.find(v => /^en/i.test(v.lang) && /female/i.test(v.name));
  if (enFemale) return enFemale;

  return cachedVoices.find(v => /^en/i.test(v.lang)) || null;
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;
  const voice = pickEnglishVoice();
  if (voice) utter.voice = voice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function renderBattleQuestion() {
  const { stage, qIndex, monsterHp, monsterMaxHp, hearts } = battleState;
  const q = stage.questions[qIndex];

  document.getElementById("progress-label").textContent =
    `問題 ${qIndex + 1} / ${stage.questions.length}`;
  document.getElementById("monster-name-label").textContent = `モンスター: ${stage.monsterName}`;
  document.getElementById("hearts-emoji").textContent = "❤️".repeat(hearts) + "🖤".repeat(3 - hearts);
  document.getElementById("hearts-text").textContent = `残りライフ ${hearts}/3`;

  const hpPercent = monsterHp / monsterMaxHp * 100;
  document.getElementById("monster-hp-fill").style.width = hpPercent + "%";
  document.getElementById("monster-hp-wrap").setAttribute("aria-valuenow", String(Math.round(hpPercent)));

  const isTyping = stage.type === "typing";
  const choicesEl = document.getElementById("choices");
  const typingEl = document.getElementById("typing-area");

  if (isTyping) {
    document.getElementById("question-card").textContent = q.q;
    choicesEl.style.display = "none";
    typingEl.style.display = "flex";

    const input = document.getElementById("typing-input");
    input.value = "";
    input.disabled = false;
    input.className = "typing-input";
    document.getElementById("typing-submit").disabled = false;
    document.getElementById("typing-hint-btn").style.display = "inline-block";
    document.getElementById("typing-hint").textContent = "";
    setTimeout(() => input.focus(), 50);
  } else {
    document.getElementById("question-card").innerHTML = formatQuestionText(q.q);
    choicesEl.style.display = "grid";
    typingEl.style.display = "none";

    choicesEl.innerHTML = "";
    q.choices.forEach((choice, i) => {
      const item = document.createElement("div");
      item.className = "choice-item";

      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      if (isEnglishText(choice)) btn.lang = "en";
      btn.addEventListener("click", () => answerQuestion(i, btn));
      item.appendChild(btn);

      if (isEnglishText(choice)) {
        const speakBtn = document.createElement("button");
        speakBtn.type = "button";
        speakBtn.className = "speak-btn choice-speak";
        speakBtn.textContent = "🔊";
        speakBtn.setAttribute("aria-label", `${choice} の発音を聞く`);
        speakBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          speakText(choice);
        });
        item.appendChild(speakBtn);
      }

      choicesEl.appendChild(item);
    });
  }

  const banner = document.getElementById("feedback-banner");
  banner.className = "feedback-banner";
  banner.textContent = "";
  document.getElementById("next-btn-wrap").style.display = "none";
}

// 正解・不正解どちらの場合もこの関数でモンスターHP・ライフ・フィードバック・次へボタンを更新する
function applyAnswerResult(isCorrect, correctText, tip) {
  const banner = document.getElementById("feedback-banner");
  const monsterEl = document.getElementById("monster-emoji");

  if (isCorrect) {
    battleState.correctCount++;
    battleState.monsterHp--;
    const hpPercent = battleState.monsterHp / battleState.monsterMaxHp * 100;
    document.getElementById("monster-hp-fill").style.width = hpPercent + "%";
    document.getElementById("monster-hp-wrap").setAttribute("aria-valuenow", String(Math.round(hpPercent)));
    monsterEl.classList.remove("hit");
    requestAnimationFrame(() => monsterEl.classList.add("hit"));
    banner.className = "feedback-banner show ok";
    banner.innerHTML = formatQuestionText("✨ 正解！ " + tip);

    if (battleState.monsterHp <= 0) {
      monsterEl.classList.add("defeated");
    }
  } else {
    battleState.hearts = Math.max(0, battleState.hearts - 1);
    document.getElementById("hearts-emoji").textContent =
      "❤️".repeat(battleState.hearts) + "🖤".repeat(3 - battleState.hearts);
    document.getElementById("hearts-text").textContent = `残りライフ ${battleState.hearts}/3`;
    banner.className = "feedback-banner show no";
    banner.innerHTML = formatQuestionText("❌ ざんねん！ 正解は「" + correctText + "」 " + tip);
  }

  const nextWrap = document.getElementById("next-btn-wrap");
  nextWrap.style.display = "block";
  const nextBtn = document.getElementById("next-btn");
  nextBtn.textContent = (battleState.qIndex === battleState.stage.questions.length - 1)
    ? "RESULT" : "NEXT";
  nextBtn.onclick = () => {
    battleState.qIndex++;
    if (battleState.qIndex < battleState.stage.questions.length) {
      renderBattleQuestion();
    } else {
      finishBattle();
    }
  };
  nextBtn.focus();
}

function answerQuestion(choiceIndex, btnEl) {
  const { stage, qIndex } = battleState;
  const q = stage.questions[qIndex];
  const allBtns = document.querySelectorAll("#choices .choice-btn");
  allBtns.forEach(b => {
    b.classList.add("disabled");
    b.disabled = true;
  });

  if (choiceIndex === q.answer) {
    btnEl.classList.add("correct");
    applyAnswerResult(true, "", q.tip);
  } else {
    btnEl.classList.add("wrong");
    allBtns[q.answer].classList.add("correct");
    applyAnswerResult(false, q.choices[q.answer], q.tip);
  }
}

// ===== タイピング入力モード =====
function submitTypingAnswer() {
  const { stage, qIndex } = battleState;
  const q = stage.questions[qIndex];
  const input = document.getElementById("typing-input");
  if (input.disabled) return;

  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = q.answer.toLowerCase();
  input.disabled = true;
  document.getElementById("typing-submit").disabled = true;
  document.getElementById("typing-hint-btn").style.display = "none";
  document.getElementById("typing-hint").textContent = "";

  if (userAnswer === correctAnswer && userAnswer !== "") {
    input.classList.add("correct");
    applyAnswerResult(true, "", q.tip);
  } else {
    input.classList.add("wrong");
    applyAnswerResult(false, q.answer, q.tip);
  }
}

document.getElementById("typing-submit").addEventListener("click", submitTypingAnswer);
document.getElementById("typing-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitTypingAnswer();
  }
});
document.getElementById("typing-hint-btn").addEventListener("click", () => {
  const { stage, qIndex } = battleState;
  const word = stage.questions[qIndex].answer;
  document.getElementById("typing-hint").textContent =
    `ヒント: ${word[0]}${"＿".repeat(word.length - 1)}（${word.length}文字）`;
});

function finishBattle() {
  const { stage, correctCount } = battleState;
  const total = stage.questions.length;

  let stars = 0;
  if (correctCount === total) stars = 3;
  else if (correctCount >= total * 0.75) stars = 2;
  else if (correctCount >= total * 0.5) stars = 1;

  const prevStars = save.stageStars[stage.id] || 0;
  const isNewBest = stars > prevStars;
  if (isNewBest) save.stageStars[stage.id] = stars;

  // 経験値: 正解1問につき10、満点ボーナス+30(初回のみ重複加算しないよう毎回加算でOK)
  const earnedXP = correctCount * 10 + (stars === 3 ? 30 : 0);
  const prevLevel = levelFromXP(save.totalXP);
  save.totalXP += earnedXP;
  const newLevel = levelFromXP(save.totalXP);

  updateStreak();
  saveSave();

  // 結果表示
  const titleEl = document.getElementById("result-title");
  const starsEl = document.getElementById("result-stars");
  const detailEl = document.getElementById("result-detail");
  const levelupEl = document.getElementById("levelup-banner");

  if (stars >= 1) {
    titleEl.textContent = `${stage.monsterName}をたおした！`;
  } else {
    titleEl.textContent = `${stage.monsterName}は逃げてしまった…`;
  }
  starsEl.textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  detailEl.innerHTML =
    `正解数: ${correctCount} / ${total}<br>` +
    `獲得経験値: +${earnedXP} EXP` +
    (isNewBest ? `<br><span style="color:#ff9f43;">★ベストスコア更新！</span>` : "") +
    (stars === 0 ? `<br>つぎへ進むには ${Math.ceil(total / 2)}問以上の正解が必要だよ。もう一度チャレンジ！` : "");

  if (newLevel > prevLevel) {
    levelupEl.classList.add("show");
    levelupEl.textContent = `🎉 レベルアップ！ Lv.${prevLevel} → Lv.${newLevel}`;
  } else {
    levelupEl.classList.remove("show");
  }

  document.getElementById("retry-btn").onclick = () => startBattle(stage.id);
  document.getElementById("to-map-btn").onclick = () => {
    renderMap();
    showScreen("map-screen");
  };

  refreshStatusbar();
  showScreen("result-screen");
}

// ===== 文法レッスン画面 =====
let studyReturnScreen = "title-screen";
let currentStudyUnitId = null;

function renderStudyList() {
  const grid = document.getElementById("study-grid");
  grid.innerHTML = STUDY_UNITS.map(unit => `
    <button type="button" class="study-card" data-unit-id="${unit.id}" role="listitem">
      <div class="study-card-emoji" aria-hidden="true">${unit.emoji}</div>
      <div class="study-card-body">
        <p class="study-card-unit">UNIT ${unit.id}</p>
        <p class="study-card-title">${unit.title}</p>
        <p class="study-card-summary">${unit.summary}</p>
      </div>
      <div class="study-card-arrow" aria-hidden="true">›</div>
    </button>
  `).join("");

  grid.querySelectorAll(".study-card").forEach(card => {
    card.addEventListener("click", () => {
      openStudyUnit(Number(card.dataset.unitId));
    });
  });
}

function openStudyList() {
  studyReturnScreen = getActiveScreenId();
  renderStudyList();
  showScreen("study-list-screen");
}

function openStudyUnit(unitId) {
  currentStudyUnitId = unitId;
  renderStudyUnit(unitId);
  showScreen("study-detail-screen");
}

function renderStudyUnit(unitId) {
  const index = STUDY_UNITS.findIndex(u => u.id === unitId);
  const unit = STUDY_UNITS[index];
  if (!unit) return;

  document.getElementById("study-unit-counter").textContent = `${index + 1} / ${STUDY_UNITS.length}`;
  document.getElementById("study-detail-heading").textContent = `${unit.emoji} ${unit.title}`;
  document.getElementById("study-detail-summary").textContent = unit.summary;

  const sectionsEl = document.getElementById("study-sections");
  sectionsEl.innerHTML = unit.sections.map(section => `
    <div class="study-section">
      <h3>${section.heading}</h3>
      <p class="study-body">${section.body}</p>
      ${section.points && section.points.length ? `
        <ul class="study-points">
          ${section.points.map(p => `<li>${p}</li>`).join("")}
        </ul>
      ` : ""}
      <div class="study-examples">
        ${section.examples.map(ex => `
          <div class="study-example">
            <div class="study-example-text">
              <div class="study-example-en">${ex.en}</div>
              <div class="study-example-ja">${ex.ja}</div>
            </div>
            <button type="button" class="speak-btn" data-speak="${ex.en.replace(/"/g, "&quot;")}" aria-label="${ex.en} の発音を聞く">🔊</button>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  sectionsEl.querySelectorAll(".speak-btn").forEach(btn => {
    btn.addEventListener("click", () => speakText(btn.dataset.speak));
  });

  const prevBtn = document.getElementById("study-prev-btn");
  const nextBtn = document.getElementById("study-next-btn");
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === STUDY_UNITS.length - 1;
}

document.getElementById("study-btn").addEventListener("click", openStudyList);
document.getElementById("study-link-from-map").addEventListener("click", openStudyList);

document.getElementById("back-from-study-list").addEventListener("click", () => {
  if (studyReturnScreen === "map-screen") {
    renderMap();
    showScreen("map-screen");
  } else {
    renderTitle();
    showScreen("title-screen");
  }
});

document.getElementById("back-from-study-detail").addEventListener("click", () => {
  renderStudyList();
  showScreen("study-list-screen");
});

document.getElementById("study-prev-btn").addEventListener("click", () => {
  const index = STUDY_UNITS.findIndex(u => u.id === currentStudyUnitId);
  if (index > 0) openStudyUnit(STUDY_UNITS[index - 1].id);
});

document.getElementById("study-next-btn").addEventListener("click", () => {
  const index = STUDY_UNITS.findIndex(u => u.id === currentStudyUnitId);
  if (index < STUDY_UNITS.length - 1) openStudyUnit(STUDY_UNITS[index + 1].id);
});

// ===== 初期化 =====
document.getElementById("start-btn").addEventListener("click", () => {
  updateStreak();
  renderMap();
  showScreen("map-screen");
});

document.getElementById("back-to-map").addEventListener("click", () => {
  renderMap();
  showScreen("map-screen");
});

function getActiveScreenId() {
  const active = document.querySelector(".screen.active");
  return active ? active.id : "title-screen";
}

// ===== 試験情報画面 =====
let infoReturnScreen = "title-screen";

function openInfoScreen() {
  infoReturnScreen = getActiveScreenId();
  renderInfoScreen();
  showScreen("info-screen");
}

function renderInfoScreen() {
  document.getElementById("exam-date-input").value = save.examDate || "";
  updateCountdownDisplay();
  renderOfficialCountdown();
}

function renderOfficialCountdown() {
  const display = document.getElementById("official-countdown-display");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next = OFFICIAL_EXAM_DATES
    .map(d => ({ str: d, date: new Date(d + "T00:00:00") }))
    .filter(d => d.date >= today)
    .sort((a, b) => a.date - b.date)[0];

  if (!next) {
    display.textContent = "最新の試験日程は英検の公式サイトで確認してね。";
    return;
  }

  const diffDays = Math.round((next.date - today) / (1000 * 60 * 60 * 24));
  const dateLabel = formatDateJa(next.str);

  if (diffDays === 0) {
    display.innerHTML = `🎉 今日（${dateLabel}）が一次試験の日だよ！`;
  } else {
    display.innerHTML = `📅 ${dateLabel}　まで あと <strong>${diffDays}日</strong>`;
  }
}

function updateCountdownDisplay() {
  const display = document.getElementById("countdown-display");
  if (!save.examDate) {
    display.textContent = "まだ試験日が設定されていません。上の入力欄から日付を選んでね。";
    return;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const examDay = new Date(save.examDate + "T00:00:00");
  const diffDays = Math.round((examDay - today) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    display.innerHTML = `🔥 試験まで あと <strong>${diffDays}日</strong> だよ！`;
  } else if (diffDays === 0) {
    display.textContent = "🎉 今日が試験の日だよ！自信をもってがんばろう！";
  } else {
    display.textContent = "おつかれさま！試験は終わったよ。べんきょうの成果は出たかな？";
  }
}

document.getElementById("exam-date-input").addEventListener("change", (e) => {
  save.examDate = e.target.value || null;
  saveSave();
  updateCountdownDisplay();
  refreshHeaderCountdown();
});

document.getElementById("brand-home-btn").addEventListener("click", () => {
  renderTitle();
  showScreen("title-screen");
});

document.getElementById("header-countdown").addEventListener("click", openInfoScreen);

document.getElementById("back-from-info").addEventListener("click", () => {
  if (infoReturnScreen === "map-screen") {
    renderMap();
  } else {
    renderTitle();
    infoReturnScreen = "title-screen";
  }
  showScreen(infoReturnScreen === "map-screen" ? "map-screen" : "title-screen");
});

renderTitle();
