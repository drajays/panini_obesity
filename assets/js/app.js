/**
 * Panini Chronic Weight Management — Single App Shell
 */
(function () {
  const MODULES = [
    {
      id: 'evaluation',
      title: 'Initial Evaluation',
      subtitle: '30-question bilingual assessment (EN / हिंदी)',
      icon: '📋',
      path: 'pages/evaluation.html',
      step: 'Step 1 — Initial Visit',
      desc: 'Comprehensive person-centered obesity evaluation aligned with AACE, EASO, KSSO & OMA guidelines.',
    },
    {
      id: 'checklist',
      title: 'Secondary Causes & Tests',
      subtitle: 'Workup checklist (EN / हिंदी)',
      icon: '🔬',
      path: 'pages/checklist.html',
      step: 'Step 1 — Initial Visit',
      desc: 'Evidence-based checklist for secondary obesity causes and recommended laboratory investigations.',
    },
    {
      id: 'trajectory',
      title: 'Weight Trajectory Map',
      subtitle: 'Lifetime trajectory, yo-yo scorecard & 3-year prognostic map',
      icon: '📈',
      path: 'pages/trajectory.html',
      step: 'Step 1 — Initial Visit',
      desc: 'ObiTrack Clinical — chart lifetime weight milestones, yo-yo patterns, and interactive 3-year prognostic trajectory with 2-page print report.',
    },
    {
      id: 'psych',
      title: 'Psych & Behavioral Readiness',
      subtitle: 'PHQ-9, GAD-7, binge eating & sleep screen — fillable offline',
      icon: '🧠',
      path: 'pages/psych.html',
      step: 'Step 2 — Pre-Treatment',
      desc: 'Interactive screening for mood, anxiety, binge eating, stress, sleep, and GLP-1 journey readiness. Auto-saves locally — works online and offline.',
    },
    {
      id: 'dietary',
      title: 'Dietary Recall & Nutrition',
      subtitle: '24-hour recall + food frequency questionnaire',
      icon: '🥗',
      path: 'pages/dietary.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Interactive nutrition intake with meal-by-meal recall, FFQ, and behavioral eating factors.',
    },
    {
      id: 'dietary-contract',
      title: 'Obesity Dietary Contract',
      subtitle: '2-month agreement & daily compliance tracker',
      icon: '📝',
      path: 'pages/dietary-contract.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Patient–dietician 2-month dietary contract with agreed goals, meal plan, and month-wise daily tick-mark compliance tracking.',
    },
    {
      id: 'exercise',
      title: 'Physical Activity Assessment',
      subtitle: 'EVS, Godin, DASI bedside questionnaire',
      icon: '🏃',
      path: 'pages/exercise.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Baseline exercise documentation with EVS, Godin–Shephard, and DASI functional scoring.',
    },
    {
      id: 'yoga',
      title: 'Yoga & Asana Practice',
      subtitle: 'PranaDaily — 150 practices, studio player & journey',
      icon: '🧘',
      path: 'yoga/index.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Generate daily yoga routines from 150 authentic practices, run guided practice sessions with timer, and track streaks — works offline.',
    },
    {
      id: 'audit',
      title: 'Clinical Input Audit',
      subtitle: 'OCI compliance simulator & 36-month trajectory projection',
      icon: '📊',
      path: 'pages/audit.html',
      step: 'Step 3 — Multidisciplinary',
      desc: 'Model protein, exercise, medication, and follow-up adherence into an Overall Compliance Index with projected weight trajectory and metabolic prescription.',
    },
    {
      id: 'winner',
      title: '3-Year Winner Program',
      subtitle: 'GLP-1 journey with 19 bi-monthly visit assessments',
      icon: '🏆',
      path: 'pages/winner.html',
      step: 'Step 4 — Ongoing Care',
      desc: '36-month patient journey with 19 unique bi-monthly clinical visit forms, milestone tracking, and GLP-1 program integration.',
    },
  ];

  const state = { current: null, loaded: new Set() };

  const els = {
    navList: document.getElementById('navList'),
    moduleGrid: document.getElementById('moduleGrid'),
    homeView: document.getElementById('homeView'),
    content: document.getElementById('content'),
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    printBtn: document.getElementById('printBtn'),
    homeBtn: document.getElementById('homeBtn'),
    menuBtn: document.getElementById('menuBtn'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('sidebarOverlay'),
  };

  function basePath() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].endsWith('.html')) parts.pop();
    return parts.length ? '/' + parts.join('/') + '/' : '/';
  }

  function moduleUrl(path) {
    return basePath() + path;
  }

  function buildNav() {
    els.navList.innerHTML = MODULES.map((m) => `
      <li class="nav-item">
        <button class="nav-link" data-module="${m.id}" type="button">
          <span class="icon">${m.icon}</span>
          <span>${m.title}</span>
        </button>
      </li>
    `).join('');

    els.navList.querySelectorAll('.nav-link').forEach((btn) => {
      btn.addEventListener('click', () => navigate(btn.dataset.module));
    });
  }

  function buildGrid() {
    els.moduleGrid.innerHTML = MODULES.map((m) => `
      <article class="module-card" data-module="${m.id}" tabindex="0" role="button" aria-label="Open ${m.title}">
        <div class="card-icon">${m.icon}</div>
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

  function ensureModuleView(id) {
    let view = document.getElementById('view-' + id);
    if (view) return view;

    const mod = MODULES.find((m) => m.id === id);
    view = document.createElement('div');
    view.className = 'module-view';
    view.id = 'view-' + id;

    const iframe = document.createElement('iframe');
    iframe.className = 'module-frame';
    iframe.id = 'frame-' + id;
    iframe.title = mod.title;
    iframe.setAttribute('loading', 'lazy');
    view.appendChild(iframe);
    els.content.appendChild(view);
    return view;
  }

  function pushPatientToIframe(iframe) {
    try {
      const raw = localStorage.getItem('paniniPatientProfile_v1');
      if (raw && iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { type: 'panini-patient-update', data: JSON.parse(raw) },
          '*'
        );
      }
      const id = window.PatientStore ? PatientStore.getActiveId() : null;
      if (id && iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'panini-set-patient-id', id }, '*');
      }
    } catch (_) {}
  }

  function syncGlobalPatientIdInput() {
    const input = document.getElementById('globalPatientId');
    if (!input || !window.PatientStore) return;
    const id = PatientStore.getActiveId();
    if (id) input.value = id;
  }

  async function loadGlobalPatientId() {
    const input = document.getElementById('globalPatientId');
    if (!input || !window.PatientStore) return;
    const id = PatientStore.normalizeId(input.value);
    if (!PatientStore.isValidId(id)) {
      input.focus();
      return;
    }
    PatientStore.setActiveId(id);
    input.value = id;
    if (state.current) {
      const iframe = document.getElementById('frame-' + state.current);
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'panini-set-patient-id', id }, '*');
      }
    }
  }

  function generateGlobalPatientId() {
    if (!window.PatientStore) return;
    const id = PatientStore.generateId();
    PatientStore.setActiveId(id);
    const input = document.getElementById('globalPatientId');
    if (input) input.value = id;
  }

  function loadIframe(id) {
    const iframe = document.getElementById('frame-' + id);
    if (state.loaded.has(id)) {
      pushPatientToIframe(iframe);
      return;
    }
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

  function navigate(id) {
    if (!MODULES.some((m) => m.id === id)) return;

    state.current = id;
    const mod = MODULES.find((m) => m.id === id);

    els.homeView.style.display = 'none';
    document.querySelectorAll('.module-view').forEach((v) => v.classList.remove('active'));

    ensureModuleView(id);
    loadIframe(id);
    document.getElementById('view-' + id).classList.add('active');

    els.pageTitle.textContent = mod.title;
    els.pageSubtitle.textContent = mod.subtitle;

    setActiveNav(id);
    closeSidebar();

    const hash = id === 'home' ? '' : id;
    if (hash) history.replaceState(null, '', '#' + hash);
    else history.replaceState(null, '', window.location.pathname);
  }

  function goHome() {
    state.current = null;
    document.querySelectorAll('.module-view').forEach((v) => v.classList.remove('active'));
    els.homeView.style.display = 'block';
    els.pageTitle.textContent = 'Chronic Weight Management';
    els.pageSubtitle.textContent = 'Clinical forms toolkit — fill, save & print';
    els.navList.querySelectorAll('.nav-link').forEach((btn) => btn.classList.remove('active'));
    history.replaceState(null, '', window.location.pathname);
    closeSidebar();
  }

  function printCurrent() {
    if (!state.current) {
      window.print();
      return;
    }
    const iframe = document.getElementById('frame-' + state.current);
    if (iframe && iframe.contentWindow) {
      try {
        const win = iframe.contentWindow;
        if (typeof win.triggerPrintMode === 'function') {
          win.triggerPrintMode();
        } else {
          win.focus();
          win.print();
        }
      } catch (e) {
        window.print();
      }
    }
  }

  function initFromHash() {
    const hash = (location.hash || '').replace('#', '');
    if (hash && MODULES.some((m) => m.id === hash)) navigate(hash);
    else goHome();
  }

  els.printBtn.addEventListener('click', printCurrent);
  els.homeBtn.addEventListener('click', goHome);
  els.menuBtn.addEventListener('click', () => {
    els.sidebar.classList.toggle('open');
    els.overlay.classList.toggle('open');
  });
  els.overlay.addEventListener('click', closeSidebar);

  window.addEventListener('hashchange', initFromHash);
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'panini-patient-id-changed' && e.data.id) {
      const input = document.getElementById('globalPatientId');
      if (input) input.value = e.data.id;
      if (window.PatientStore) PatientStore.setActiveId(e.data.id, true);
    }
  });
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p' && state.current) {
      e.preventDefault();
      printCurrent();
    }
  });

  buildNav();
  buildGrid();
  syncGlobalPatientIdInput();
  const globalLoad = document.getElementById('globalPatientLoad');
  const globalGen = document.getElementById('globalPatientGen');
  const globalInput = document.getElementById('globalPatientId');
  if (globalLoad) globalLoad.addEventListener('click', loadGlobalPatientId);
  if (globalGen) globalGen.addEventListener('click', generateGlobalPatientId);
  if (globalInput) {
    globalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loadGlobalPatientId();
    });
  }
  initFromHash();
})();
