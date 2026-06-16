/**
 * Panini Chronic Weight Management — Single App Shell
 */
(function () {
  // mandatory:true   → green in nav + grid; included in every follow-up visit
  // initialOnly:true → only in the initial-visit flow (first visit)
  const MODULES = [
    {
      id: 'dashboard',
      title: 'Visit Intelligence Dashboard',
      subtitle: 'Trends · Metabolic Momentum Score · Flags · Coaching card',
      icon: '🏥',
      path: 'pages/visit-dashboard.html',
      step: 'Every Visit — Start Here',
      desc: 'One-screen visit overview: weight & lab trends, Metabolic Momentum Score (0–100), medication progression, red flag alerts, and a printable patient coaching card.',
      mandatory: true,
    },
    {
      id: 'intake-form',
      title: 'Patient Intake Form',
      subtitle: '4-page printable offline form — patient fills before first visit',
      icon: '📄',
      path: 'pages/patient-intake-form.html',
      step: 'Step 0 — Before First Visit',
      desc: 'Compact 4-page A4 form: health profile, weight history, medical history, medications, lifestyle habits, and readiness goals. Print for patient to fill in the waiting area or at home — staff enters data into the app later.',
      mandatory: true,
      initialOnly: true,
    },
    {
      id: 'evaluation',
      title: 'Initial Evaluation',
      subtitle: '30-question bilingual assessment (EN / हिंदी)',
      icon: '📋',
      path: 'pages/evaluation.html',
      step: 'Step 1 — Initial Visit',
      desc: 'Comprehensive person-centered obesity evaluation aligned with AACE, EASO, KSSO & OMA guidelines.',
      mandatory: true,
      initialOnly: true,
    },
    {
      id: 'checklist',
      title: 'Secondary Causes & Tests',
      subtitle: 'Workup checklist (EN / हिंदी)',
      icon: '🔬',
      path: 'pages/checklist.html',
      step: 'Step 1 — Initial Visit',
      desc: 'Evidence-based checklist for secondary obesity causes and recommended laboratory investigations.',
      mandatory: true,
      initialOnly: true,
    },
    {
      id: 'weight-journey',
      title: 'Weight Journey Map',
      subtitle: 'Birth-to-future lifetime trajectory + GLP-1 projection graph',
      icon: '📈',
      path: 'pages/weight-journey.html',
      step: 'Step 1 — Initial Visit',
      desc: 'Complete lifetime weight graph from birth to present — all milestones, yo-yo patterns, BMI zones — plus projected 3-year GLP-1 trajectory. Printable A4 clinical report.',
      mandatory: false,
    },
    {
      id: 'psych',
      title: 'Psych & Behavioral Readiness',
      subtitle: 'PHQ-9, GAD-7, binge eating & sleep screen',
      icon: '🧠',
      path: 'pages/psych.html',
      step: 'Step 2 — Pre-Treatment',
      desc: 'Interactive screening for mood, anxiety, binge eating, stress, sleep, and GLP-1 journey readiness. Auto-saves locally — works online and offline.',
      mandatory: true,
      initialOnly: true,
    },
    {
      id: 'dietary',
      title: 'Dietary Recall & Nutrition',
      subtitle: '24-hour recall + food frequency questionnaire',
      icon: '🥗',
      path: 'pages/dietary.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Interactive nutrition intake with meal-by-meal recall, FFQ, and behavioral eating factors.',
      mandatory: false,
    },
    {
      id: 'dietary-contract',
      title: 'Obesity Dietary Contract',
      subtitle: '2-month agreement & daily compliance tracker',
      icon: '📝',
      path: 'pages/dietary-contract.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Patient–dietician 2-month dietary contract with agreed goals, meal plan, and month-wise daily tick-mark compliance tracking.',
      mandatory: false,
    },
    {
      id: 'exercise',
      title: 'Physical Activity Assessment',
      subtitle: 'EVS, Godin, DASI bedside questionnaire',
      icon: '🏃',
      path: 'pages/exercise.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Baseline exercise documentation with EVS, Godin–Shephard, and DASI functional scoring.',
      mandatory: false,
    },
    {
      id: 'yoga',
      title: 'Yoga & Asana Practice',
      subtitle: 'PranaDaily — 150 practices, studio player & journey',
      icon: '🧘',
      path: 'yoga/index.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Generate daily yoga routines from 150 authentic practices, run guided practice sessions with timer, and track streaks — works offline.',
      mandatory: false,
    },
    {
      id: 'audit',
      title: 'Clinical Input Audit',
      subtitle: 'OCI compliance simulator & 36-month trajectory projection',
      icon: '📊',
      path: 'pages/audit.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Model protein, exercise, medication, and follow-up adherence into an Overall Compliance Index with projected weight trajectory and metabolic prescription.',
      mandatory: false,
    },
    {
      id: 'medication',
      title: 'Medication Titration Tracker',
      subtitle: 'Dose log · Titration ladder · Dose–Weight chart · Clinical prompts',
      icon: '💊',
      path: 'pages/medication-tracker.html',
      step: 'Step 4 — Ongoing Care',
      desc: 'Visit-by-visit titration log for semaglutide, tirzepatide, liraglutide, phentermine, orlistat, bupropion-naltrexone, and topiramate. Embedded protocols, dose–weight response chart, contraindication flags, and clinical decision prompts.',
      mandatory: true,
    },
    {
      id: 'coaching',
      title: 'Patient Coaching Card',
      subtitle: 'Printable A4 progress card — hand to patient at each visit',
      icon: '🃏',
      path: 'pages/coaching-card.html',
      step: 'Every Visit — Print for Patient',
      desc: 'Auto-generated visit summary: weight lost, Metabolic Momentum Score, wins, focus area, labs, current medication, and next appointment line. Print or save as PDF.',
      mandatory: true,
    },
    {
      id: 'winner',
      title: '3-Year Winner Program',
      subtitle: 'GLP-1 journey with 19 bi-monthly visit assessments',
      icon: '🏆',
      path: 'pages/winner.html',
      step: 'Step 4 — Ongoing Care',
      desc: '36-month patient journey with 19 unique bi-monthly clinical visit forms, milestone tracking, and GLP-1 program integration.',
      mandatory: false,
    },
  ];

  // ── Visit flow sequences ──────────────────────────────────────────
  const FLOW_INITIAL  = ['intake-form','evaluation','checklist','weight-journey','psych',
                          'dietary','dietary-contract','exercise','audit',
                          'medication','dashboard','coaching','winner'];
  const FLOW_FOLLOWUP = ['dashboard','medication','coaching'];

  // ── State ─────────────────────────────────────────────────────────
  const state = {
    current: null,
    loaded: new Set(),
    flowMode: false,
    flowOrder: [],
    flowIndex: 0,
  };

  const els = {
    navList:    document.getElementById('navList'),
    moduleGrid: document.getElementById('moduleGrid'),
    homeView:   document.getElementById('homeView'),
    content:    document.getElementById('content'),
    pageTitle:  document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    printBtn:   document.getElementById('printBtn'),
    homeBtn:    document.getElementById('homeBtn'),
    menuBtn:    document.getElementById('menuBtn'),
    sidebar:    document.getElementById('sidebar'),
    overlay:    document.getElementById('sidebarOverlay'),
    flowBar:    document.getElementById('flowBar'),
  };

  // ── Path helpers ──────────────────────────────────────────────────
  function basePath() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].endsWith('.html')) parts.pop();
    return parts.length ? '/' + parts.join('/') + '/' : '/';
  }
  function moduleUrl(path) { return basePath() + path; }

  // ── Build nav sidebar ─────────────────────────────────────────────
  function buildNav() {
    els.navList.innerHTML = MODULES.map((m) => `
      <li class="nav-item">
        <button class="nav-link${m.mandatory ? ' nav-mandatory' : ''}" data-module="${m.id}" type="button">
          <span class="icon">${m.icon}</span>
          <span>${m.title}</span>
          ${m.mandatory ? '<span class="nav-req-dot" title="Required"></span>' : ''}
        </button>
      </li>
    `).join('');
    els.navList.querySelectorAll('.nav-link').forEach((btn) => {
      btn.addEventListener('click', () => navigate(btn.dataset.module));
    });
  }

  // ── Build home module grid ────────────────────────────────────────
  function buildGrid() {
    els.moduleGrid.innerHTML = MODULES.map((m) => `
      <article class="module-card${m.mandatory ? ' module-mandatory' : ''}"
               data-module="${m.id}" tabindex="0" role="button" aria-label="Open ${m.title}">
        <div class="card-icon">${m.icon}</div>
        ${m.mandatory ? '<span class="card-req-badge">Required</span>' : ''}
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="step">${m.step}</div>
      </article>
    `).join('');
    els.moduleGrid.querySelectorAll('.module-card').forEach((card) => {
      const open = () => navigate(card.dataset.module);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  // ── Flow mode ─────────────────────────────────────────────────────
  function enterFlowMode(type) {
    state.flowOrder = (type === 'initial' ? FLOW_INITIAL : FLOW_FOLLOWUP)
      .filter(id => MODULES.some(m => m.id === id));
    state.flowIndex = 0;
    state.flowMode  = true;
    if (els.flowBar) els.flowBar.style.display = 'flex';
    navigate(state.flowOrder[0]);
    renderFlowBar();
    closeSidebar();
  }

  function exitFlowMode() {
    state.flowMode = false;
    if (els.flowBar) els.flowBar.style.display = 'none';
  }

  function flowNext() {
    if (state.flowIndex < state.flowOrder.length - 1) {
      state.flowIndex++;
      navigate(state.flowOrder[state.flowIndex]);
      renderFlowBar();
    } else {
      exitFlowMode();
      goHome();
    }
  }

  function flowPrev() {
    if (state.flowIndex > 0) {
      state.flowIndex--;
      navigate(state.flowOrder[state.flowIndex]);
      renderFlowBar();
    }
  }

  function flowSkip() { flowNext(); }   // skip = advance without "done" action

  function renderFlowBar() {
    const idx   = state.flowIndex;
    const total = state.flowOrder.length;
    const modId = state.flowOrder[idx];
    const mod   = MODULES.find(m => m.id === modId) || {};
    const pct   = total > 1 ? Math.round((idx / (total - 1)) * 100) : 100;

    const el = (id) => document.getElementById(id);
    if (el('flowStepNum'))    el('flowStepNum').textContent    = `Step ${idx + 1} of ${total}`;
    if (el('flowStepTitle'))  el('flowStepTitle').textContent  = mod.title || '';
    if (el('flowBarFill'))    el('flowBarFill').style.width    = pct + '%';
    if (el('flowMandBadge')) {
      const b = el('flowMandBadge');
      b.textContent  = mod.mandatory ? '✓ Required' : 'Optional';
      b.className    = 'flow-badge ' + (mod.mandatory ? 'flow-badge-req' : 'flow-badge-opt');
    }
    if (el('flowPrevBtn'))  el('flowPrevBtn').disabled  = idx === 0;
    if (el('flowNextBtn'))  el('flowNextBtn').textContent =
      idx === total - 1 ? '✓ Finish Visit' : 'Done → Next';
  }

  // ── Module view helpers ───────────────────────────────────────────
  function ensureModuleView(id) {
    let view = document.getElementById('view-' + id);
    if (view) return view;
    const mod  = MODULES.find((m) => m.id === id);
    view       = document.createElement('div');
    view.className = 'module-view';
    view.id    = 'view-' + id;
    const iframe      = document.createElement('iframe');
    iframe.className  = 'module-frame';
    iframe.id         = 'frame-' + id;
    iframe.title      = mod.title;
    iframe.setAttribute('loading', 'lazy');
    view.appendChild(iframe);
    els.content.appendChild(view);
    return view;
  }

  function pushPatientToIframe(iframe) {
    try {
      const raw = localStorage.getItem('paniniPatientProfile_v1');
      if (raw && iframe?.contentWindow)
        iframe.contentWindow.postMessage({ type: 'panini-patient-update', data: JSON.parse(raw) }, '*');
      const id = window.PatientStore ? PatientStore.getActiveId() : null;
      if (id && iframe?.contentWindow)
        iframe.contentWindow.postMessage({ type: 'panini-set-patient-id', id }, '*');
    } catch (_) {}
  }

  function loadIframe(id) {
    const iframe = document.getElementById('frame-' + id);
    if (state.loaded.has(id)) { pushPatientToIframe(iframe); return; }
    const mod = MODULES.find((m) => m.id === id);
    iframe.addEventListener('load', () => pushPatientToIframe(iframe), { once: true });
    iframe.src = moduleUrl(mod.path);
    state.loaded.add(id);
  }

  function setActiveNav(id) {
    els.navList.querySelectorAll('.nav-link').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.module === id);
    });
  }

  function closeSidebar() {
    els.sidebar.classList.remove('open');
    els.overlay.classList.remove('open');
  }

  // ── Navigate ──────────────────────────────────────────────────────
  function navigate(id) {
    if (!MODULES.some((m) => m.id === id)) return;
    state.current = id;
    const mod = MODULES.find((m) => m.id === id);
    els.homeView.style.display = 'none';
    document.querySelectorAll('.module-view').forEach((v) => v.classList.remove('active'));
    ensureModuleView(id);
    loadIframe(id);
    document.getElementById('view-' + id).classList.add('active');
    els.pageTitle.textContent    = mod.title;
    els.pageSubtitle.textContent = mod.subtitle;
    setActiveNav(id);
    closeSidebar();
    const hash = id === 'home' ? '' : id;
    if (hash) history.replaceState(null, '', '#' + hash);
    else      history.replaceState(null, '', window.location.pathname);
    // Sync flow bar step if we navigated by clicking sidebar/grid in flow mode
    if (state.flowMode) {
      const fi = state.flowOrder.indexOf(id);
      if (fi !== -1 && fi !== state.flowIndex) { state.flowIndex = fi; renderFlowBar(); }
    }
  }

  function goHome() {
    exitFlowMode();
    state.current = null;
    document.querySelectorAll('.module-view').forEach((v) => v.classList.remove('active'));
    els.homeView.style.display = 'block';
    els.pageTitle.textContent    = 'Chronic Weight Management';
    els.pageSubtitle.textContent = 'Clinical forms toolkit — fill, save & print';
    els.navList.querySelectorAll('.nav-link').forEach((btn) => btn.classList.remove('active'));
    history.replaceState(null, '', window.location.pathname);
    closeSidebar();
  }

  function printCurrent() {
    if (!state.current) { window.print(); return; }
    const iframe = document.getElementById('frame-' + state.current);
    if (iframe?.contentWindow) {
      try {
        const win = iframe.contentWindow;
        if (typeof win.triggerPrintMode === 'function') win.triggerPrintMode();
        else { win.focus(); win.print(); }
      } catch (e) { window.print(); }
    }
  }

  // ── Patient ID helpers ────────────────────────────────────────────
  function syncGlobalPatientIdInput() {
    const input = document.getElementById('globalPatientId');
    if (!input || !window.PatientStore) return;
    const id = PatientStore.getActiveId();
    if (id) input.value = id;
  }

  async function loadGlobalPatientId(forcedId) {
    const input = document.getElementById('globalPatientId');
    const raw   = forcedId || (input && input.value) || '';
    if (!window.PatientStore) return;
    const id = PatientStore.normalizeId(raw);
    if (!PatientStore.isValidId(id)) { if (input) input.focus(); return; }
    PatientStore.setActiveId(id);
    try { localStorage.setItem('paniniActivePatientId', id); } catch (_) {}
    if (input) input.value = id;
    showPatientBadge(id);
    state.loaded.forEach((modId) => {
      const iframe = document.getElementById('frame-' + modId);
      if (iframe?.contentWindow)
        iframe.contentWindow.postMessage({ type: 'panini-set-patient-id', id }, '*');
    });
  }

  function generateGlobalPatientId() {
    if (!window.PatientStore) return;
    const id = PatientStore.generateId();
    PatientStore.setActiveId(id);
    try { localStorage.setItem('paniniActivePatientId', id); } catch (_) {}
    const input = document.getElementById('globalPatientId');
    if (input) input.value = id;
    showPatientBadge(id);
  }

  function loadDemoPatient() {
    const input = document.getElementById('globalPatientId');
    if (input) input.value = 'WIN-DEMO01';
    loadGlobalPatientId('WIN-DEMO01');
    navigate('dashboard');
  }

  function showPatientBadge(id) {
    let badge = document.getElementById('activePatientBadge');
    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'activePatientBadge';
      badge.style.cssText =
        'font-size:11px;font-weight:700;background:rgba(255,255,255,.18);' +
        'padding:3px 10px;border-radius:6px;color:#fff;letter-spacing:.04em;';
      const tp = document.querySelector('.topbar-patient');
      if (tp) tp.appendChild(badge);
    }
    badge.textContent = '✓ ' + id;
    badge.style.background = 'rgba(22,163,74,.35)';
    setTimeout(() => { badge.style.background = 'rgba(255,255,255,.18)'; }, 2000);
  }

  // ── Hash init ─────────────────────────────────────────────────────
  function initFromHash() {
    const hash = (location.hash || '').replace('#', '');
    if (hash && MODULES.some((m) => m.id === hash)) navigate(hash);
    else goHome();
  }

  // ── Event wiring ──────────────────────────────────────────────────
  els.printBtn.addEventListener('click', printCurrent);
  els.homeBtn.addEventListener('click', goHome);
  els.menuBtn.addEventListener('click', () => {
    els.sidebar.classList.toggle('open');
    els.overlay.classList.toggle('open');
  });
  els.overlay.addEventListener('click', closeSidebar);

  window.addEventListener('hashchange', initFromHash);
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'panini-patient-id-changed' && e.data.id) {
      const input = document.getElementById('globalPatientId');
      if (input) input.value = e.data.id;
      if (window.PatientStore) PatientStore.setActiveId(e.data.id, true);
    }
  });
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p' && state.current) {
      e.preventDefault(); printCurrent();
    }
    // Flow mode keyboard shortcuts
    if (state.flowMode) {
      if (e.key === 'ArrowRight') { e.preventDefault(); flowNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); flowPrev(); }
    }
  });

  // ── Expose globals for HTML onclick handlers ──────────────────────
  window.enterFlowMode  = enterFlowMode;
  window.exitFlowMode   = exitFlowMode;
  window.flowNext       = flowNext;
  window.flowPrev       = flowPrev;
  window.flowSkip       = flowSkip;
  window.loadDemoPatient = loadDemoPatient;
  window.loadGlobalPatientId = loadGlobalPatientId;
  window.generateGlobalPatientId = generateGlobalPatientId;

  // ── Boot ──────────────────────────────────────────────────────────
  buildNav();
  buildGrid();
  syncGlobalPatientIdInput();
  const globalLoad  = document.getElementById('globalPatientLoad');
  const globalGen   = document.getElementById('globalPatientGen');
  const globalInput = document.getElementById('globalPatientId');
  if (globalLoad)  globalLoad.addEventListener('click', loadGlobalPatientId);
  if (globalGen)   globalGen.addEventListener('click', generateGlobalPatientId);
  if (globalInput) globalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadGlobalPatientId();
  });
  initFromHash();
})();
