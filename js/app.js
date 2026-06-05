(() => {
  'use strict';

  const DB_NAME = 'jp-anki-srs-offline-v1';
  const DB_VERSION = 1;
  const ID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const CODE_PREFIX = 'JKS1.';
  const PERMUTATION_PLAIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const PERMUTATION_CIPHER = 'QWERTYUIOPASDFGHJKLZXCVBNMpoiuytrewqlkjhgfdsamnbvcxz9876543210+/=';
  const WORDS = (window.JP_WORDS || []).filter(w => w && w.active !== false && /^[0-9A-Z]{4}$/.test(w.id));
  const RETIRED_IDS = new Set(window.RETIRED_WORD_IDS || []);
  const wordMap = new Map(WORDS.map(w => [w.id, w]));
  const activeIds = new Set(WORDS.map(w => w.id));

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const el = {
    setupDialog: $('#setupDialog'),
    newSetupPanel: $('#newSetupPanel'),
    importSetupPanel: $('#importSetupPanel'),
    targetRoundsInput: $('#targetRoundsInput'),
    dailyMinutesInput: $('#dailyMinutesInput'),
    cardSecondsInput: $('#cardSecondsInput'),
    orderModeInput: $('#orderModeInput'),
    setupDerivedText: $('#setupDerivedText'),
    startNewBtn: $('#startNewBtn'),
    setupImportCode: $('#setupImportCode'),
    setupImportBtn: $('#setupImportBtn'),
    todayPlanText: $('#todayPlanText'),
    studyPage: $('#studyPage'),
    dataPage: $('#dataPage'),
    tabs: $('.capsule-tabs'),
    jpCard: $('#jpCard'),
    roundCompletePanel: $('#roundCompletePanel'),
    completeTitle: $('#completeTitle'),
    completeText: $('#completeText'),
    completeCode: $('#completeCode'),
    completeCopyBtn: $('#completeCopyBtn'),
    nextRoundBtn: $('#nextRoundBtn'),
    frontWord: $('#frontWord'),
    frontPos: $('#frontPos'),
    frontStatusBadge: $('#frontStatusBadge'),
    backReading: $('#backReading'),
    backWord: $('#backWord'),
    toneBox: $('#toneBox'),
    backPos: $('#backPos'),
    meaningText: $('#meaningText'),
    backStatusBadge: $('#backStatusBadge'),
    showAnswerBtn: $('#showAnswerBtn'),
    ratingButtons: $('#ratingButtons'),
    answerPanel: $('#answerPanel'),
    roundProgressText: $('#roundProgressText'),
    masteryText: $('#masteryText'),
    progressFill: $('#progressFill'),
    favoriteTopBtn: $('#favoriteTopBtn'),
    undoBtn: $('#undoBtn'),
    exportBtn: $('#exportBtn'),
    copyCodeBtn: $('#copyCodeBtn'),
    importBtn: $('#importBtn'),
    resetBtn: $('#resetBtn'),
    inheritCode: $('#inheritCode'),
    statTotal: $('#statTotal'),
    statNew: $('#statNew'),
    statLearning: $('#statLearning'),
    statDone: $('#statDone'),
    statFav: $('#statFav'),
    statDue: $('#statDue'),
    capacityDebug: $('#capacityDebug'),
    wordList: $('#wordList'),
    wordSearch: $('#wordSearch'),
    listOrderSelect: $('#listOrderSelect'),
    toast: $('#toast')
  };

  const state = {
    db: null,
    config: null,
    records: new Map(),
    order: [],
    queue: [],
    queueDay: 0,
    queueInitialSize: 0,
    capacity: null,
    currentId: null,
    side: 'front',
    history: []
  };

  function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function todayISO() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function dateDiffDays(fromISO, toISO = todayISO()) {
    const from = new Date(`${fromISO}T00:00:00`);
    const to = new Date(`${toISO}T00:00:00`);
    const diff = Math.floor((to - from) / 86400000);
    return Number.isFinite(diff) ? diff : 0;
  }

  function currentRound() {
    return Math.max(1, Math.floor(Number(state.config?.currentRound || 1)));
  }

  /*
    兼容旧代码变量名：这里的“day”实际已经改成“轮次”。
    这样用户一天内完成多轮时，算法会按第 1/2/3... 轮推进，
    而不是按自然日期推进。
  */
  function currentDay() {
    return currentRound();
  }

  function base36Code(index) {
    let n = Math.max(0, Math.floor(index));
    let out = '';
    for (let i = 0; i < 4; i += 1) {
      out = ID_CHARS[n % 36] + out;
      n = Math.floor(n / 36);
    }
    return out;
  }

  function statusText(record) {
    if (!record || !record.seen) return '未学习';
    if ((record.mastery || 0) >= 80 && (record.interval || 0) >= 7) return '基本完成';
    return '巩固中';
  }

  function defaultRecord(id) {
    return {
      id,
      seen: false,
      status: 'new',
      favorite: false,
      ef: 2.5,
      interval: 1,
      dueDay: 1,
      lastReviewDay: 0,
      reps: 0,
      total: 0,
      correct: 0,
      wrong: 0,
      fuzzy: 0,
      lapses: 0,
      learningStep: 0,
      mastery: 0,
      createdAt: todayISO(),
      updatedAt: todayISO()
    };
  }

  function sanitizeRecord(input, id) {
    const base = defaultRecord(id);
    const merged = { ...base, ...(input || {}), id };
    merged.seen = Boolean(merged.seen);
    merged.favorite = Boolean(merged.favorite);
    merged.status = ['new', 'learning', 'review', 'graduated'].includes(merged.status) ? merged.status : (merged.seen ? 'learning' : 'new');
    merged.ef = clampNumber(merged.ef, 1.3, 5, 2.5);
    merged.interval = clampNumber(merged.interval, 1, 36500, 1);
    merged.dueDay = clampNumber(merged.dueDay, 1, 36500, 1);
    merged.lastReviewDay = clampNumber(merged.lastReviewDay, 0, 36500, 0);
    ['reps', 'total', 'correct', 'wrong', 'fuzzy', 'lapses', 'learningStep', 'mastery'].forEach((key) => {
      merged[key] = clampNumber(merged[key], 0, 999999, base[key]);
    });
    merged.mastery = clampNumber(merged.mastery, 0, 100, 0);
    return merged;
  }

  function computeMastery(record) {
    const total = Math.max(1, record.total || 0);
    const quality = ((record.correct || 0) + (record.fuzzy || 0) * 0.5) / total;
    const experience = Math.min(1, Math.log((record.reps || 0) + 1) / Math.log(8));
    const intervalBonus = Math.min(1, Math.log((record.interval || 1) + 1) / Math.log(31));
    const lapsePenalty = Math.max(0.35, 1 - (record.lapses || 0) * 0.08);
    return Math.round(Math.max(0, Math.min(100, (quality * 0.56 + experience * 0.28 + intervalBonus * 0.16) * 100 * lapsePenalty)));
  }

  function deriveOrder(mode = 'source') {
    const items = [...WORDS];
    if (mode === 'reverse') items.reverse();
    if (mode === 'kana') items.sort((a, b) => String(a.reading || a.word).localeCompare(String(b.reading || b.word), 'ja'));
    return items.map(w => w.id);
  }

  function normalizeOrder(order, fallbackMode = 'source') {
    const seen = new Set();
    const normalized = [];
    (Array.isArray(order) ? order : []).forEach((id) => {
      if (activeIds.has(id) && !seen.has(id)) {
        seen.add(id);
        normalized.push(id);
      }
    });
    const fallback = deriveOrder(fallbackMode);
    fallback.forEach((id) => {
      if (!seen.has(id)) normalized.push(id);
    });
    return normalized;
  }

  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('records')) db.createObjectStore('records', { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function tx(storeName, mode = 'readonly') {
    return state.db.transaction(storeName, mode).objectStore(storeName);
  }

  function dbGet(storeName, key) {
    return new Promise((resolve, reject) => {
      const req = tx(storeName).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function dbGetAll(storeName) {
    return new Promise((resolve, reject) => {
      const req = tx(storeName).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  function dbPut(storeName, value) {
    return new Promise((resolve, reject) => {
      const req = tx(storeName, 'readwrite').put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function dbClear(storeName) {
    return new Promise((resolve, reject) => {
      const req = tx(storeName, 'readwrite').clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  function dbDeleteDatabase() {
    if (state.db) state.db.close();
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(DB_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('数据库正在被其它页面占用，请关闭其它标签页后重试。'));
    });
  }

  async function saveMeta(key, value) {
    await dbPut('meta', { key, value });
  }

  async function saveRecord(record) {
    record.updatedAt = todayISO();
    state.records.set(record.id, record);
    await dbPut('records', record);
  }

  async function saveQueue() {
    await saveMeta('queue', {
      round: state.queueDay,
      day: state.queueDay,
      items: [...state.queue],
      initialSize: state.queueInitialSize
    });
  }

  async function loadState() {
    state.db = await openDB();
    const [configRow, orderRow, queueRow, records] = await Promise.all([
      dbGet('meta', 'config'),
      dbGet('meta', 'order'),
      dbGet('meta', 'queue'),
      dbGetAll('records')
    ]);

    state.config = configRow?.value || null;
    if (state.config) {
      state.config.targetRounds = clampNumber(state.config.targetRounds || state.config.targetDays, 1, 9999, 30);
      state.config.currentRound = clampNumber(state.config.currentRound, 1, 9999, 1);
      state.config.dailyMinutes = clampNumber(state.config.dailyMinutes, 1, 600, 25);
      state.config.cardSeconds = clampNumber(state.config.cardSeconds, 2, 120, 10);
      state.config.orderMode = state.config.orderMode || 'source';
    }
    state.order = normalizeOrder(orderRow?.value || [], state.config?.orderMode || 'source');

    state.records.clear();
    records.forEach((record) => {
      if (activeIds.has(record.id)) state.records.set(record.id, sanitizeRecord(record, record.id));
    });
    WORDS.forEach((word) => {
      if (!state.records.has(word.id)) state.records.set(word.id, defaultRecord(word.id));
    });

    const savedRound = queueRow?.value?.round ?? queueRow?.value?.day;
    if (savedRound === currentDay()) {
      state.queueDay = savedRound;
      state.queue = (queueRow.value.items || []).filter(id => activeIds.has(id));
      state.queueInitialSize = queueRow.value.initialSize || state.queue.length;
    }
  }

  async function persistAllRecords() {
    const transaction = state.db.transaction('records', 'readwrite');
    const store = transaction.objectStore('records');
    state.records.forEach(record => store.put(record));
    await new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
  }

  function calculateCapacity() {
    const round = currentRound();
    const Wtotal = WORDS.length;
    const doneCount = [...state.records.values()].filter(r => statusText(r) === '基本完成').length;
    const Dtarget = Math.max(1, Number(state.config?.targetRounds || 30));
    const Tdaily = Math.max(1, Number(state.config?.dailyMinutes || 25));
    const tcard = Math.max(2, Number(state.config?.cardSeconds || 10));
    const remainingRounds = Math.max(1, Dtarget - round + 1);
    const remainingNew = Math.max(0, Wtotal - doneCount);
    const Cmax = Math.floor((Tdaily * 60) / tcard);
    const Nmin = Math.min(remainingNew, Math.max(0, Math.ceil(remainingNew / remainingRounds)));
    const Cactual = Math.max(Cmax, Nmin);
    const Rquota = Math.max(0, Cactual - Nmin);
    return { Wtotal, Wgrad: doneCount, Dtarget, Dcurrent: round, Tdaily, tcard, Cmax, deltaD: remainingRounds, Nmin, Cactual, Rquota };
  }

  async function buildTodayQueue(force = false) {
    if (!state.config) return;
    const day = currentDay();
    if (!force && state.queueDay === day && state.queue.length) return;

    state.capacity = calculateCapacity();
    const { Nmin, Rquota } = state.capacity;
    const reviews = [];

    state.records.forEach((record, id) => {
      if (!activeIds.has(id) || !record.seen) return;
      const interval = Math.max(1, record.interval || 1);
      const delta = Math.max(0, day - (record.lastReviewDay || day));
      const RFI = delta / interval;
      const due = (record.status === 'learning') || (record.dueDay || 1) <= day || RFI >= 0.9;
      if (due) reviews.push({ id, RFI, dueDay: record.dueDay || 1 });
    });

    reviews.sort((a, b) => (b.RFI - a.RFI) || (a.dueDay - b.dueDay));

    const newIds = [];
    if (Nmin > 0) {
      for (const id of state.order) {
        const record = state.records.get(id);
        if (record && !record.seen) newIds.push(id);
        if (newIds.length >= Nmin) break;
      }
    }

    const reviewIds = reviews.slice(0, Rquota).map(item => item.id);
    const unique = [];
    const seen = new Set();
    [...reviewIds, ...newIds].forEach((id) => {
      if (!seen.has(id) && activeIds.has(id)) {
        seen.add(id);
        unique.push(id);
      }
    });

    state.queueDay = day;
    state.queue = unique;
    state.queueInitialSize = unique.length;
    state.currentId = state.queue[0] || null;
    state.side = 'front';
    await saveQueue();
  }

  function detectType(pos) {
    const text = String(pos || '').toLowerCase();
    const result = [];
    if (/名|noun|\bn\b|\[名\]/.test(text)) result.push('noun');
    if (/動|动|verb|\bv\b|\[動\]|\[动\]/.test(text)) result.push('verb');
    if (/形|adj|い形|な形|\[形\]/.test(text)) result.push('adj');
    if (/副|adv|adverb|\[副\]/.test(text)) result.push('adv');
    return result[0] || 'other';
  }

  function fxModeForWord(word) {
    const type = detectType(word?.pos || '');
    return { noun: 'mist', verb: 'snow', adj: 'petal', adv: 'coin', other: 'firework' }[type] || 'firework';
  }

  function updateTheme(word) {
    const type = detectType(word?.pos || '');
    const classes = ['theme-noun', 'theme-verb', 'theme-adj', 'theme-adv', 'theme-other'];
    classes.forEach(cls => {
      el.jpCard?.classList.remove(cls);
      document.body.classList.remove(cls);
    });
    el.jpCard?.classList.add(`theme-${type}`);
    document.body.classList.add('card', `theme-${type}`);
    FX.setMode(fxModeForWord(word));
  }

  function burstForCurrentWord() {
    const word = wordMap.get(state.currentId);
    if (!word) return;
    FX.setMode(fxModeForWord(word));
    FX.burstCenter();
  }

  function renderStudy() {
    state.currentId = state.queue[0] || null;
    const word = wordMap.get(state.currentId);
    if (!word) {
      renderEmptyStudy();
      return;
    }

    if (el.roundCompletePanel) el.roundCompletePanel.hidden = true;
    if (el.jpCard) el.jpCard.hidden = false;
    if (el.answerPanel) el.answerPanel.hidden = false;

    const record = state.records.get(word.id) || defaultRecord(word.id);
    updateTheme(word);
    el.frontWord.textContent = word.word;
    el.frontPos.textContent = word.pos || '—';
    el.backReading.textContent = word.reading || '—';
    el.backWord.textContent = word.word;
    el.toneBox.textContent = `声調：${word.tone || '—'}`;
    el.backPos.textContent = `品詞：${word.pos || '—'}`;
    el.meaningText.textContent = word.meaning || '—';
    el.frontStatusBadge.textContent = statusText(record);
    el.backStatusBadge.textContent = statusText(record);

    const favText = record.favorite ? '★ 已收藏' : '☆ 收藏';
    el.favoriteTopBtn.textContent = favText;
    el.favoriteTopBtn.classList.toggle('active', record.favorite);
    $$('.mini-star').forEach(btn => {
      btn.textContent = record.favorite ? '★' : '☆';
      btn.classList.toggle('active', record.favorite);
    });

    el.jpCard.dataset.side = state.side;
    el.showAnswerBtn.hidden = state.side === 'back';
    el.showAnswerBtn.disabled = false;
    el.showAnswerBtn.textContent = '答えを表示';
    el.ratingButtons.hidden = state.side !== 'back';

    const done = Math.max(0, (state.queueInitialSize || 0) - state.queue.length);
    const total = Math.max(state.queueInitialSize || state.queue.length, state.queue.length, 1);
    el.roundProgressText.textContent = `第 ${currentRound()} 轮 · ${Math.min(done + 1, total)} / ${total}`;
    el.masteryText.textContent = `当前词掌握率 ${record.mastery || 0}%`;
    el.progressFill.style.width = `${Math.round((done / total) * 100)}%`;
  }

  function renderEmptyStudy() {
    const dummy = { pos: '' };
    updateTheme(dummy);

    if (!state.config) {
      if (el.roundCompletePanel) el.roundCompletePanel.hidden = true;
      if (el.jpCard) el.jpCard.hidden = false;
      if (el.answerPanel) el.answerPanel.hidden = true;
      el.frontWord.textContent = '準備';
      el.frontPos.textContent = '初期設定';
      el.roundProgressText.textContent = '学习参数尚未设置';
      el.masteryText.textContent = '请先开始或导入';
      el.progressFill.style.width = '0%';
      return;
    }

    const allDone = [...state.records.values()].filter(r => activeIds.has(r.id)).every(r => statusText(r) === '基本完成');
    const maxRound = Math.max(1, Number(state.config?.targetRounds || 30));
    const canContinue = !allDone;

    if (el.jpCard) el.jpCard.hidden = true;
    if (el.answerPanel) el.answerPanel.hidden = true;
    if (el.roundCompletePanel) el.roundCompletePanel.hidden = false;

    const title = allDone ? 'おめでとう！全部完成！' : `おめでとう！第 ${currentRound()} 轮完成！`;
    const nextText = currentRound() >= maxRound ? '追加ラウンドへ' : '次のラウンドへ';
    if (el.completeTitle) el.completeTitle.textContent = title;
    if (el.completeText) {
      el.completeText.textContent = allDone
        ? '所有单词已经基本完成。先休息一下吧，也建议立刻复制下面自动生成的引继码保存。'
        : '本轮学习已经完成。先休息一下吧，也建议立刻复制下面自动生成的引继码保存本轮数据。';
    }
    if (el.nextRoundBtn) {
      el.nextRoundBtn.textContent = nextText;
      el.nextRoundBtn.hidden = !canContinue;
    }
    if (el.completeCode) {
      try {
        el.completeCode.value = encodePayload(buildExportPayload());
      } catch (error) {
        el.completeCode.value = '';
      }
    }

    el.favoriteTopBtn.textContent = '☆ 收藏';
    el.favoriteTopBtn.classList.remove('active');
    el.showAnswerBtn.hidden = true;
    el.ratingButtons.hidden = true;
    el.roundProgressText.textContent = `第 ${currentRound()} 轮完成`;
    el.masteryText.textContent = 'おめでとう';
    el.progressFill.style.width = '100%';
    FX.burstCenter(4);
  }

  function renderStatsAndList() {
    const records = [...state.records.values()].filter(r => activeIds.has(r.id));
    const total = WORDS.length;
    const newCount = records.filter(r => !r.seen).length;
    const doneCount = records.filter(r => statusText(r) === '基本完成').length;
    const favCount = records.filter(r => r.favorite).length;
    el.statTotal.textContent = total;
    el.statNew.textContent = newCount;
    el.statLearning.textContent = Math.max(0, total - newCount - doneCount);
    el.statDone.textContent = doneCount;
    el.statFav.textContent = favCount;
    el.statDue.textContent = state.queue.length;

    state.capacity = state.config ? calculateCapacity() : null;
    if (el.capacityDebug) el.capacityDebug.textContent = state.capacity ? JSON.stringify(state.capacity, null, 2) : '尚未初始化';
    if (state.capacity) {
      if (el.todayPlanText) el.todayPlanText.textContent = `第 ${state.capacity.Dcurrent} 轮 / ${state.capacity.Dtarget} 轮 · 新词下限 ${state.capacity.Nmin} · 复习名额 ${state.capacity.Rquota}`;
    }

    renderWordList();
  }

  function renderWordList() {
    const query = (el.wordSearch.value || '').trim().toLowerCase();
    const mode = el.listOrderSelect.value || 'user';
    let ids;
    if (mode === 'user') ids = normalizeOrder(state.order, state.config?.orderMode || 'source');
    else if (mode === 'favorite') {
      ids = normalizeOrder(state.order, state.config?.orderMode || 'source')
        .sort((a, b) => Number(Boolean(state.records.get(b)?.favorite)) - Number(Boolean(state.records.get(a)?.favorite)));
    } else ids = deriveOrder(mode);

    const rows = [];
    ids.forEach((id) => {
      const word = wordMap.get(id);
      const record = state.records.get(id) || defaultRecord(id);
      if (!word) return;
      const haystack = `${word.word} ${word.reading} ${word.meaning}`.toLowerCase();
      if (query && !haystack.includes(query)) return;
      rows.push(`
        <div class="word-row" data-word-id="${escapeHtml(id)}">
          <div class="word-only" title="${escapeHtml(word.word)}">${escapeHtml(word.word)}</div>
          <div class="word-state">
            <button class="word-fav-btn" type="button" data-list-fav="${escapeHtml(id)}" aria-label="收藏 ${escapeHtml(word.word)}">${record.favorite ? '★' : '☆'}</button>
            <span class="state-pill">${escapeHtml(statusText(record))}</span>
          </div>
        </div>`);
    });
    el.wordList.innerHTML = rows.join('') || '<p class="muted">没有匹配单词。</p>';
  }

  function renderAdminTable() {
    // 已按需求移除页面上的管理员数据表；词库继续在 js/words.js 里顺序维护。
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.toast.classList.remove('show'), 2200);
  }

  function pushHistory(ids, type = 'rating') {
    const uniqueIds = [...new Set(ids.filter(Boolean))];
    state.history.push({
      type,
      queue: [...state.queue],
      queueDay: state.queueDay,
      queueInitialSize: state.queueInitialSize,
      side: state.side,
      currentId: state.currentId,
      records: uniqueIds.map(id => structuredClone(state.records.get(id) || defaultRecord(id)))
    });
    if (state.history.length > 30) state.history.shift();
  }

  async function undo() {
    if (state.side === 'back') {
      state.side = 'front';
      renderStudy();
      toast('已返回正面');
      return;
    }

    const snap = state.history.pop();
    if (!snap || snap.type !== 'rating') {
      toast('没有可以撤回的四级选择');
      return;
    }

    snap.records.forEach(record => state.records.set(record.id, record));
    state.queue = [...snap.queue];
    state.queueDay = snap.queueDay;
    state.queueInitialSize = snap.queueInitialSize;
    state.currentId = snap.currentId;
    state.side = 'back';
    await persistAllRecords();
    await saveQueue();
    renderAll();
    toast('已撤回上一个单词的选择');
  }

  function flipToBack() {
    if (!state.currentId) return;
    state.side = 'back';
    el.showAnswerBtn.disabled = false;
    el.showAnswerBtn.textContent = '答えを表示';
    burstForCurrentWord();
    renderStudy();
  }

  function insertIntoQueue(id, positionOneBased) {
    const L = state.queue.length;
    const index = Math.max(0, Math.min(L, Math.floor(positionOneBased) - 1));
    state.queue.splice(index, 0, id);
  }

  function updateEF(oldEF, q) {
    if (q === 1) return Math.max(1.3, oldEF - 0.20);
    if (q === 2) return Math.max(1.3, oldEF - 0.15);
    if (q === 4) return oldEF + 0.15;
    return oldEF;
  }

  function graduateRecord(record, q, day, oldInterval, delta) {
    const base = Math.max(oldInterval, delta || 1);
    if (q === 3) record.interval = Math.max(1, Math.floor(base * record.ef));
    if (q === 4) record.interval = Math.max(2, Math.floor(base * record.ef * 1.3));
    record.dueDay = day + record.interval;
    record.status = record.interval >= 7 ? 'graduated' : 'review';
    record.learningStep = 0;
  }

  async function rateCurrent(q) {
    const id = state.currentId;
    if (!id || !wordMap.has(id)) return;
    if (state.side !== 'back') {
      flipToBack();
      return;
    }

    const record = state.records.get(id) || defaultRecord(id);
    pushHistory([id], 'rating');

    const day = currentDay();
    const oldInterval = Math.max(1, record.interval || 1);
    const delta = Math.max(1, day - (record.lastReviewDay || day));
    const wasNewOrLearning = !record.seen || record.status === 'new' || record.status === 'learning';

    state.queue.shift();
    record.seen = true;
    record.reps = (record.reps || 0) + 1;
    record.total = (record.total || 0) + 1;
    record.ef = updateEF(record.ef || 2.5, q);
    record.lastReviewDay = day;

    if (q === 1) {
      record.wrong = (record.wrong || 0) + 1;
      record.lapses = (record.lapses || 0) + 1;
      record.interval = 1;
      record.dueDay = day;
      record.status = 'learning';
      record.learningStep = 0;
      insertIntoQueue(id, 1);
    }

    if (q === 2) {
      record.fuzzy = (record.fuzzy || 0) + 1;
      if (wasNewOrLearning) {
        record.status = 'learning';
        record.learningStep = 0;
        insertIntoQueue(id, Math.max(1, Math.floor(state.queue.length * 0.3)));
      } else {
        record.interval = Math.max(1, Math.floor(oldInterval * 1.2));
        record.dueDay = day + record.interval;
        record.status = 'review';
      }
    }

    if (q === 3) {
      record.correct = (record.correct || 0) + 1;
      if (wasNewOrLearning) {
        record.status = 'learning';
        record.learningStep = (record.learningStep || 0) + 1;
        if (record.learningStep >= 2) graduateRecord(record, q, day, oldInterval, delta);
        else insertIntoQueue(id, Math.max(1, Math.floor(state.queue.length * 0.8)));
      } else {
        graduateRecord(record, q, day, oldInterval, delta);
      }
    }

    if (q === 4) {
      record.correct = (record.correct || 0) + 1;
      graduateRecord(record, q, day, oldInterval, delta);
    }

    record.mastery = computeMastery(record);
    await saveRecord(record);
    await saveQueue();
    state.side = 'front';
    renderAll();
    burstForCurrentWord();
  }

  async function toggleFavorite(id = state.currentId) {
    if (!id || !activeIds.has(id)) return;
    const record = state.records.get(id) || defaultRecord(id);
    record.favorite = !record.favorite;
    await saveRecord(record);
    renderAll();
    if (id === state.currentId && el.studyPage.classList.contains('page-active')) {
      burstForCurrentWord();
    }
    toast(record.favorite ? '已收藏' : '已取消收藏');
  }

  function substitute(text, decode = false) {
    const from = decode ? PERMUTATION_CIPHER : PERMUTATION_PLAIN;
    const to = decode ? PERMUTATION_PLAIN : PERMUTATION_CIPHER;
    const map = new Map([...from].map((char, i) => [char, to[i]]));
    return [...text].map(ch => map.get(ch) || ch).join('');
  }

  function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function base64ToUtf8(base64) {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodePayload(payload) {
    const b64 = utf8ToBase64(JSON.stringify(payload));
    return CODE_PREFIX + substitute([...b64].reverse().join(''), false);
  }

  function decodePayload(code) {
    const trimmed = String(code || '').trim();
    if (!trimmed.startsWith(CODE_PREFIX)) throw new Error('引继码格式不正确。');
    const body = trimmed.slice(CODE_PREFIX.length);
    const b64 = [...substitute(body, true)].reverse().join('');
    const payload = JSON.parse(base64ToUtf8(b64));
    if (!payload || payload.app !== 'jp-anki-srs-offline') throw new Error('这不是本项目的引继码。');
    return payload;
  }

  function buildExportPayload() {
    const order = normalizeOrder(state.order, state.config?.orderMode || 'source');
    const records = order.map((id, index) => ({
      key: base36Code(index) + id,
      seqId: base36Code(index),
      wordId: id,
      record: state.records.get(id) || defaultRecord(id)
    }));
    return {
      app: 'jp-anki-srs-offline',
      v: 1,
      createdAt: new Date().toISOString(),
      wordBank: { total: WORDS.length, activeIds: [...activeIds] },
      config: state.config,
      order,
      queue: { round: state.queueDay, day: state.queueDay, items: state.queue, initialSize: state.queueInitialSize },
      records
    };
  }

  async function exportCode() {
    if (!state.config) {
      toast('请先初始化学习数据');
      return;
    }
    const code = encodePayload(buildExportPayload());
    el.inheritCode.value = code;
    toast('引继码已生成，请复制保存后再退出');
  }

  async function copyText(text) {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    }
  }

  async function importCode(code) {
    const payload = decodePayload(code);
    const config = payload.config || {};
    config.startDate = config.startDate || todayISO();
    config.targetRounds = clampNumber(config.targetRounds || config.targetDays, 1, 9999, 30);
    config.currentRound = clampNumber(config.currentRound, 1, 9999, 1);
    config.dailyMinutes = clampNumber(config.dailyMinutes, 1, 600, 25);
    config.cardSeconds = clampNumber(config.cardSeconds, 2, 120, 10);
    config.orderMode = config.orderMode || 'source';

    state.config = config;
    state.order = normalizeOrder(payload.order || [], config.orderMode);
    state.records.clear();
    WORDS.forEach(w => state.records.set(w.id, defaultRecord(w.id)));

    (payload.records || []).forEach((entry) => {
      const id = entry.wordId || entry.id || String(entry.key || '').slice(4, 8);
      if (activeIds.has(id)) {
        state.records.set(id, sanitizeRecord(entry.record || entry.rec || entry, id));
      }
    });

    const q = payload.queue || {};
    const importedRound = q.round ?? q.day;
    state.queueDay = importedRound === currentDay() ? importedRound : 0;
    state.queue = state.queueDay ? (q.items || []).filter(id => activeIds.has(id)) : [];
    state.queueInitialSize = q.initialSize || state.queue.length;

    await saveMeta('config', state.config);
    await saveMeta('order', state.order);
    await persistAllRecords();
    await buildTodayQueue(!state.queue.length);
    await saveQueue();
    state.side = 'front';
    renderAll();
    toast('引继码导入成功，已自动过滤旧词并初始化新词');
  }

  function showSetupDialog() {
    updateSetupDerived();
    if (!el.setupDialog.open) {
      try {
        el.setupDialog.showModal();
      } catch (_) {
        el.setupDialog.setAttribute('open', '');
      }
    }
  }

  async function resetToSetup() {
    await dbDeleteDatabase();
    state.db = await openDB();
    state.config = null;
    state.records.clear();
    WORDS.forEach(w => state.records.set(w.id, defaultRecord(w.id)));
    state.order = deriveOrder('source');
    state.queue = [];
    state.queueDay = 0;
    state.queueInitialSize = 0;
    state.currentId = null;
    state.side = 'front';
    state.history = [];
    el.inheritCode.value = '';
    switchTab('study');
    renderAll();
    showSetupDialog();
    toast('本机数据已清空，请重新开始或导入引继码');
  }

  async function startNew() {
    const targetRounds = clampNumber(el.targetRoundsInput.value, 1, 9999, 30);
    const dailyMinutes = clampNumber(el.dailyMinutesInput.value, 1, 600, 25);
    const cardSeconds = clampNumber(el.cardSecondsInput.value, 2, 120, 10);
    const orderMode = el.orderModeInput.value || 'source';

    state.config = {
      startDate: todayISO(),
      targetRounds,
      currentRound: 1,
      dailyMinutes,
      cardSeconds,
      orderMode,
      createdAt: new Date().toISOString()
    };
    state.order = deriveOrder(orderMode);
    state.records.clear();
    WORDS.forEach(w => state.records.set(w.id, defaultRecord(w.id)));
    state.queue = [];
    state.history = [];

    await saveMeta('config', state.config);
    await saveMeta('order', state.order);
    await persistAllRecords();
    await buildTodayQueue(true);
    el.setupDialog.close();
    renderAll();
    toast('初始化完成，开始背诵');
  }

  async function startNextRound() {
    if (!state.config) return;
    state.config.currentRound = currentRound() + 1;
    state.queue = [];
    state.queueDay = 0;
    state.queueInitialSize = 0;
    state.currentId = null;
    state.side = 'front';
    await saveMeta('config', state.config);
    await saveQueue();
    await buildTodayQueue(true);
    renderAll();
    toast(`已开始第 ${currentRound()} 轮`);
  }

  function handlePrimaryAction() {
    if (!state.currentId) return;
    flipToBack();
  }

  function updateSetupDerived() {
    const targetRounds = clampNumber(el.targetRoundsInput.value, 1, 9999, 30);
    const dailyMinutes = clampNumber(el.dailyMinutesInput.value, 1, 600, 25);
    const cardSeconds = clampNumber(el.cardSecondsInput.value, 2, 120, 10);
    const capacity = Math.floor((dailyMinutes * 60) / cardSeconds);
    const perRoundNeed = Math.ceil(WORDS.length / targetRounds);
    const pressure = capacity >= perRoundNeed ? '每轮容量充足' : '每轮容量偏小，系统会按目标自动越权提高本轮新词量';
    el.setupDerivedText.innerHTML = `词库 ${WORDS.length} 词，目标 ${targetRounds} 轮以内完成。<br>建议每轮至少推进约 ${perRoundNeed} 个新词；当前参数理论容量 ${capacity} 张/轮。<br><strong>${pressure}</strong>`;
  }

  function switchTab(tab) {
    const isData = tab === 'data';
    el.studyPage.classList.toggle('page-active', !isData);
    el.dataPage.classList.toggle('page-active', isData);
    el.tabs.dataset.active = isData ? 'data' : 'study';
    $$('.tab-button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    if (isData) renderStatsAndList();
  }

  function renderAll() {
    renderStudy();
    renderStatsAndList();
  }

  function bindEvents() {
    $$('.tab-button').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

    $$('.setup-switch-btn').forEach(btn => btn.addEventListener('click', () => {
      const mode = btn.dataset.setupMode;
      $$('.setup-switch-btn').forEach(b => b.classList.toggle('active', b === btn));
      el.newSetupPanel.classList.toggle('active', mode === 'new');
      el.importSetupPanel.classList.toggle('active', mode === 'import');
    }));

    [el.targetRoundsInput, el.dailyMinutesInput, el.cardSecondsInput].filter(Boolean).forEach(input => {
      input.addEventListener('input', updateSetupDerived);
    });

    el.startNewBtn.addEventListener('click', startNew);
    el.setupImportBtn.addEventListener('click', async () => {
      try {
        await importCode(el.setupImportCode.value);
        el.setupDialog.close();
      } catch (error) {
        toast(error.message || '导入失败');
      }
    });

    el.setupDialog.addEventListener('cancel', (event) => {
      if (!state.config) event.preventDefault();
    });

    el.completeCopyBtn?.addEventListener('click', async () => {
      const ok = await copyText(el.completeCode?.value || '');
      toast(ok ? '本轮引继码已复制' : '复制失败，请手动复制');
    });

    el.nextRoundBtn?.addEventListener('click', startNextRound);

    el.showAnswerBtn.addEventListener('click', handlePrimaryAction);
    el.jpCard.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      if (state.side === 'front') flipToBack();
    });

    el.ratingButtons.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-rate]');
      if (btn) rateCurrent(Number(btn.dataset.rate));
    });

    document.addEventListener('click', (event) => {
      const fav = event.target.closest('[data-action="favorite"]');
      if (fav) toggleFavorite();
      const listFav = event.target.closest('[data-list-fav]');
      if (listFav) toggleFavorite(listFav.dataset.listFav);
    });

    el.favoriteTopBtn.addEventListener('click', () => toggleFavorite());
    el.undoBtn.addEventListener('click', undo);

    document.addEventListener('keydown', (event) => {
      const tag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (event.code === 'Space') {
        event.preventDefault();
        if (state.currentId) flipToBack();
      }
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'].includes(event.code)) {
        event.preventDefault();
        const q = Number(event.key);
        if (q >= 1 && q <= 4) rateCurrent(q);
      }
      if (event.key === '0') {
        event.preventDefault();
        if (state.currentId) toggleFavorite();
      }
      if (event.key === 'Backspace') {
        event.preventDefault();
        undo();
      }
    });

    el.exportBtn.addEventListener('click', exportCode);
    el.copyCodeBtn.addEventListener('click', async () => {
      const ok = await copyText(el.inheritCode.value);
      toast(ok ? '已复制引继码' : '复制失败，请手动复制');
    });
    el.importBtn.addEventListener('click', async () => {
      try {
        await importCode(el.inheritCode.value);
      } catch (error) {
        toast(error.message || '导入失败');
      }
    });
    el.resetBtn.addEventListener('click', async () => {
      const ok = confirm('确定清空本机 IndexedDB 学习数据吗？只要退出或清空前，请务必先生成并复制保存引继码。');
      if (!ok) return;
      try {
        await resetToSetup();
      } catch (error) {
        toast(error.message || '清空失败');
      }
    });

    el.wordSearch.addEventListener('input', renderWordList);
    el.listOrderSelect.addEventListener('change', renderWordList);
    window.addEventListener('beforeunload', (event) => {
      if (!state.config) return;
      event.preventDefault();
      event.returnValue = '退出前请先复制保存好引继码。';
    });
  }

  function installWordAdmin() {
    window.WordAdmin = {
      usedIds() {
        return [...new Set([...WORDS.map(w => w.id), ...RETIRED_IDS])].sort();
      },
      validateId(id) {
        return /^[0-9A-Z]{4}$/.test(String(id || ''));
      },
      nextSequentialId() {
        const used = new Set([...WORDS.map(w => w.id), ...RETIRED_IDS]);
        for (let i = 1; i < 36 ** 4; i += 1) {
          const id = base36Code(i);
          if (!used.has(id)) return id;
        }
        throw new Error('4位ID池已满');
      },
      makeWord(word, reading, tone, pos, meaning) {
        return { id: this.nextSequentialId(), word, reading, tone, pos, meaning, active: true };
      },
      exportJson() {
        return JSON.stringify(WORDS, null, 2);
      }
    };
  }

  const FX = (() => {
    const canvas = $('#fxCanvas');
    const ctx = canvas.getContext('2d', { alpha: true })
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let baseCount = 0;
    let raf = 0;
    let mode = 'firework';
    const lowPower = Number(navigator.hardwareConcurrency || 8) <= 4 || Math.min(innerWidth, innerHeight) <= 480;
    const quality = lowPower ? 0.65 : 1;
    const maxExtra = lowPower ? 70 : 140;
    const pointer = { x: -9999, y: -9999, power: 0 };

    function rand(min, max) { return min + Math.random() * (max - min); }
    function scaled(value) { return Math.max(1, Math.round(value * quality)); }
    function add(p) {
      if (particles.length < baseCount + maxExtra) particles.push(p);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createBase();
    }

    function createBase() {
      particles = particles.filter(p => !p.persistent);
      const baseParticles = [];
      const counts = { snow: 52, petal: 30, mist: 9 };
      const count = scaled(counts[mode] || 0);
      for (let i = 0; i < count; i += 1) {
        if (mode === 'snow') baseParticles.push({ kind: 'snow', persistent: true, x: rand(0, width), y: rand(0, height), r: rand(1.5, 4.5), vx: rand(-0.18, 0.18), vy: rand(0.22, 0.65), a: rand(0.18, 0.58), spin: 0, spinV: 0 });
        if (mode === 'petal') baseParticles.push({ kind: 'petal', persistent: true, x: rand(0, width), y: rand(0, height), r: rand(3, 7), vx: rand(-0.3, 0.3), vy: rand(0.3, 0.85), a: rand(0.2, 0.58), spin: rand(0, Math.PI * 2), spinV: rand(0.012, 0.032) });
        if (mode === 'mist') baseParticles.push({ kind: 'mist', persistent: true, x: rand(0, width), y: rand(0, height), r: rand(50, 110), vx: rand(-0.08, 0.08), vy: rand(-0.02, 0.02), a: rand(0.06, 0.14), spin: 0, spinV: 0 });
      }
      particles = [...baseParticles, ...particles.filter(p => !p.persistent)];
      baseCount = baseParticles.length;
    }

    function firework(x, y) {
      const colors = ['#dc5a50', '#5a96d2', '#e6b946', '#aa78c8'];
      const count = scaled(24);
      for (let i = 0; i < count; i += 1) {
        const angle = Math.PI * 2 * i / count;
        const speed = rand(1.1, 2.9);
        add({ kind: 'spark', persistent: false, x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: rand(1.8, 4.2), a: 0.52, life: rand(34, 62), color: colors[i % colors.length], spin: 0, spinV: 0 });
      }
    }

    function coins(x, y) {
      for (let i = 0; i < scaled(12); i += 1) add({ kind: 'coin', persistent: false, x: x + rand(-18, 18), y: y + rand(-12, 12), vx: rand(-1.35, 1.35), vy: rand(-4.2, -1.8), r: rand(4.5, 8), a: 0.76, life: rand(55, 100), spin: rand(0, Math.PI * 2), spinV: rand(0.07, 0.15) });
    }

    function mist(x, y) {
      for (let i = 0; i < scaled(5); i += 1) add({ kind: 'mist', persistent: false, x: x + rand(-35, 35), y: y + rand(-16, 16), vx: rand(-0.7, 0.7), vy: rand(-0.2, 0.2), r: rand(32, 80), a: 0.14, life: rand(70, 120), spin: 0, spinV: 0 });
    }

    function snowBurst(x, y) {
      for (let i = 0; i < scaled(18); i += 1) {
        add({
          kind: 'snow', persistent: false, x: x + rand(-24, 24), y: y + rand(-16, 16),
          vx: rand(-1.1, 1.1), vy: rand(-2.4, 0.4), r: rand(1.8, 4.6),
          a: 0.72, life: rand(45, 85), spin: 0, spinV: 0
        });
      }
    }

    function petalBurst(x, y) {
      for (let i = 0; i < scaled(14); i += 1) {
        add({
          kind: 'petal', persistent: false, x: x + rand(-22, 22), y: y + rand(-12, 12),
          vx: rand(-1.2, 1.2), vy: rand(-2.8, -0.6), r: rand(3, 7),
          a: 0.72, life: rand(50, 95), spin: rand(0, Math.PI * 2), spinV: rand(0.04, 0.09)
        });
      }
    }

    function burst(x, y) {
      pointer.x = x;
      pointer.y = y;
      pointer.power = 1;
      if (mode === 'coin') coins(x, y);
      else if (mode === 'mist') mist(x, y);
      else if (mode === 'petal') petalBurst(x, y);
      else if (mode === 'snow') snowBurst(x, y);
      else firework(x, y);
    }

    function force(p) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > 1 && d2 < 150 * 150) {
        const inv = 1 / Math.sqrt(d2);
        p.vx += dx * inv * 0.03 * pointer.power;
        p.vy += dy * inv * 0.017 * pointer.power;
      }
    }

    function wrap(p) {
      if (p.y > height + 30) { p.y = -30; p.x = rand(0, width); }
      if (p.x < -100) p.x = width + 100;
      else if (p.x > width + 100) p.x = -100;
    }

    function draw(p) {
      if (p.kind === 'snow') {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.kind === 'petal') {
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#f4a9b5';
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.2, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (p.kind === 'mist') {
        if (!p.persistent) p.a *= 0.991;
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = '#be4637';
        ctx.lineWidth = p.persistent ? 1.4 : 1.8;
        ctx.beginPath();
        ctx.moveTo(p.x - p.r, p.y);
        ctx.bezierCurveTo(p.x - p.r * 0.3, p.y - 20, p.x + p.r * 0.3, p.y + 20, p.x + p.r, p.y);
        ctx.stroke();
      }
      if (p.kind === 'spark') {
        p.vy += 0.02;
        p.a *= 0.974;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.kind === 'coin') {
        p.vy += 0.07;
        p.a *= 0.991;
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.fillStyle = '#d7a848';
        ctx.strokeStyle = '#fff0aa';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.72, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        if (!p.persistent) {
          p.life -= 1;
          if (p.life <= 0 || p.a <= 0.008) {
            particles[i] = particles[particles.length - 1];
            particles.pop();
            continue;
          }
        }
        if (pointer.power > 0.01 && (p.kind === 'snow' || p.kind === 'petal')) force(p);
        p.x += p.vx;
        p.y += p.vy;
        p.spin += p.spinV || 0;
        if (p.persistent) wrap(p);
        draw(p);
      }
      ctx.globalAlpha = 1;
      pointer.power *= 0.91;
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('pointerdown', (event) => {
      const target = event.target;
      if (target && target.closest && target.closest('button, input, textarea, select, dialog')) return;
      burst(event.clientX, event.clientY, 0);
    }, { passive: true });

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf) cancelAnimationFrame(raf);
      if (!document.hidden) frame();
    });
    resize();
    frame();

    return {
      setMode(nextMode) {
        if (mode !== nextMode) {
          mode = nextMode;
          createBase();
        }
      },
      burstCenter() {
        burst(width / 2, Math.min(height * 0.56, height - 120));
      }
    };
  })();

  async function init() {
    if (!window.indexedDB) {
      alert('当前浏览器不支持 IndexedDB，请换用 Chrome / Edge / Safari 新版本。');
      return;
    }
    installWordAdmin();
    bindEvents();
    renderAdminTable();
    updateSetupDerived();

    await loadState();
    if (state.config) {
      await buildTodayQueue(false);
    }
    renderAll();
    if (!state.config) showSetupDialog();
  }

  init().catch((error) => {
    console.error(error);
    toast(error.message || '初始化失败');
  });
})();
