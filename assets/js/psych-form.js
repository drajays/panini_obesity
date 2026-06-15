/**
 * Psych & Behavioral Readiness — fillable online/offline, Patient or Clinician mode
 */
const PsychForm = (function () {
  const STORAGE_PREFIX = 'paniniPsych_';
  const PHQ_COUNT = 9;
  const GAD_COUNT = 7;

  let saveTimer = null;
  let activePatientId = null;
  let fillMode = 'clinician';

  function getPatientId() {
    if (activePatientId) return activePatientId;
    if (window.PatientStore) return PatientStore.getActiveId();
    try { return localStorage.getItem('paniniActivePatientId'); } catch (_) { return null; }
  }

  function storageKey() {
    return STORAGE_PREFIX + (getPatientId() || 'default');
  }

  function $(id) { return document.getElementById(id); }

  function setStatus(msg) {
    const el = $('psychSaveStatus');
    if (el) el.textContent = msg;
  }

  function severityLabel(score) {
    if (score >= 15) return 'Moderately severe / severe';
    if (score >= 10) return 'Moderate';
    if (score >= 5) return 'Mild';
    if (score > 0) return 'Minimal';
    return '';
  }

  function sumRadios(prefix, count) {
    let total = 0;
    let answered = 0;
    for (let i = 1; i <= count; i++) {
      const checked = document.querySelector(`input[name="${prefix}${i}"]:checked`);
      if (checked) {
        total += parseInt(checked.value, 10);
        answered++;
      }
    }
    return { total, answered };
  }

  function updateScaleTotals() {
    const phq = sumRadios('phq', PHQ_COUNT);
    const gad = sumRadios('gad', GAD_COUNT);

    if ($('phqTotal')) $('phqTotal').textContent = phq.answered ? phq.total : '—';
    if ($('gadTotal')) $('gadTotal').textContent = gad.answered ? gad.total : '—';
    if ($('phqSeverity')) {
      $('phqSeverity').textContent = phq.answered
        ? `PHQ-9: ${severityLabel(phq.total)} (${phq.total}/27)`
        : '';
    }
    if ($('gadSeverity')) {
      $('gadSeverity').textContent = gad.answered
        ? `GAD-7: ${severityLabel(gad.total)} (${gad.total}/21)`
        : '';
    }

    const safety = $('phqSafetyAlert');
    if (safety) {
      const item9 = document.querySelector('input[name="phq9"]:checked');
      safety.classList.toggle('active', !!(item9 && parseInt(item9.value, 10) > 0));
    }

    const pid = $('psychPatientIdLabel');
    if (pid) {
      const id = getPatientId();
      pid.textContent = id ? 'ID: ' + id : 'Enter Patient ID above to link saves';
    }
  }

  function highlightScoreGroup(name) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
      const lbl = r.closest('.score-btn');
      if (lbl) lbl.classList.toggle('selected', r.checked);
    });
  }

  function enhanceScoreButtons() {
    document.querySelectorAll('.score input[type="radio"]').forEach((radio) => {
      const label = radio.parentElement;
      if (!label || label.classList.contains('score-btn')) return;
      label.classList.add('score-btn');
      if (!label.querySelector('.score-num')) {
        const span = document.createElement('span');
        span.className = 'score-num';
        span.textContent = radio.value;
        label.appendChild(span);
      }
      radio.addEventListener('change', () => {
        highlightScoreGroup(radio.name);
        updateScaleTotals();
        scheduleSave();
      });
      if (radio.checked) label.classList.add('selected');
    });
  }

  function setFillMode(mode) {
    fillMode = mode === 'patient' ? 'patient' : 'clinician';
    document.body.classList.toggle('mode-patient', fillMode === 'patient');
    document.body.classList.toggle('mode-clinician', fillMode === 'clinician');
    const btnP = $('modePatient');
    const btnC = $('modeClinician');
    if (btnP) btnP.classList.toggle('active', fillMode === 'patient');
    if (btnC) btnC.classList.toggle('active', fillMode === 'clinician');
    const clinField = document.querySelector('.row .clinician-only');
    if (clinField) clinField.style.display = fillMode === 'patient' ? 'none' : '';
    scheduleSave();
  }

  function collectData() {
    const form = $('psychForm');
    if (!form) return {};
    const data = {
      version: 2,
      fillMode,
      updatedAt: new Date().toISOString(),
      fields: {},
      checks: {},
      radios: {},
      selects: {},
    };

    form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach((el) => {
      if (el.dataset.panini) return;
      const key = el.name || el.id;
      if (key) data.fields[key] = el.value;
    });

    form.querySelectorAll('input[type="checkbox"]').forEach((el) => {
      if (el.name) data.checks[el.name] = el.checked;
    });

    form.querySelectorAll('input[type="radio"]:checked').forEach((el) => {
      if (el.name) data.radios[el.name] = el.value;
    });

    form.querySelectorAll('select').forEach((el) => {
      if (el.name) data.selects[el.name] = el.value;
    });

    return data;
  }

  function restoreData(data) {
    if (!data) return;
    const form = $('psychForm');
    if (!form) return;

    if (data.fillMode) setFillMode(data.fillMode);

    Object.entries(data.fields || {}).forEach(([key, val]) => {
      const el = form.querySelector(`[name="${key}"], #${CSS.escape(key)}`);
      if (el && !el.dataset.panini) el.value = val;
    });

    Object.entries(data.checks || {}).forEach(([name, checked]) => {
      const el = form.querySelector(`input[type="checkbox"][name="${name}"]`);
      if (el) el.checked = !!checked;
    });

    Object.entries(data.radios || {}).forEach(([name, val]) => {
      const el = form.querySelector(`input[type="radio"][name="${name}"][value="${val}"]`);
      if (el) {
        el.checked = true;
        highlightScoreGroup(name);
      }
    });

    Object.entries(data.selects || {}).forEach(([name, val]) => {
      const el = form.querySelector(`select[name="${name}"]`);
      if (el) el.value = val;
    });

    updateScaleTotals();
  }

  function save() {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(collectData()));
      const when = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setStatus('✓ Saved · fillable online & offline · ' + when);
    } catch (_) {
      setStatus('Could not save — storage may be full');
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    setStatus('Saving…');
    saveTimer = setTimeout(() => {
      save();
      updateScaleTotals();
    }, 350);
  }

  function loadSaved() {
    try {
      const raw = localStorage.getItem(storageKey());
      if (raw) restoreData(JSON.parse(raw));
      else updateScaleTotals();
    } catch (_) {
      updateScaleTotals();
    }
  }

  function defaultDate() {
    const dateEl = document.querySelector('[data-panini="assessmentDate"]');
    if (dateEl && !dateEl.value.trim()) {
      const d = new Date();
      dateEl.value = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      dateEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function bind() {
    const form = $('psychForm');
    if (!form) return;
    form.addEventListener('input', scheduleSave);
    form.addEventListener('change', scheduleSave);
  }

  async function loadPatientId() {
    const input = $('psychPatientId');
    if (!input || !window.PatientStore) return;
    const id = PatientStore.normalizeId(input.value);
    if (!PatientStore.isValidId(id)) {
      input.focus();
      setStatus('Enter a valid ID (e.g. WIN-K4M8P2)');
      return;
    }
    save();
    activePatientId = id;
    PatientStore.setActiveId(id);
    input.value = id;
    await PatientStore.loadPatient(id);
    loadSaved();
    if (window.PaniniPatient) PaniniPatient.applyToDom(PaniniPatient.load());
    updateScaleTotals();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'panini-patient-id-changed', id }, '*');
    }
  }

  function generatePatientId() {
    if (!window.PatientStore) return;
    const id = PatientStore.generateId();
    $('psychPatientId').value = id;
    PatientStore.setActiveId(id);
    activePatientId = id;
    setStatus('Generated ' + id + ' — click Load');
  }

  function onPatientId(id) {
    save();
    activePatientId = id || null;
    if ($('psychPatientId') && id) $('psychPatientId').value = id;
    loadSaved();
    updateScaleTotals();
  }

  function init() {
    if (window.parent !== window) document.body.classList.add('in-iframe');
    defaultDate();
    enhanceScoreButtons();
    bind();
    setFillMode('clinician');
    if (window.PatientStore && PatientStore.getActiveId()) {
      activePatientId = PatientStore.getActiveId();
      if ($('psychPatientId')) $('psychPatientId').value = activePatientId;
    }
    loadSaved();

    $('modePatient')?.addEventListener('click', () => setFillMode('patient'));
    $('modeClinician')?.addEventListener('click', () => setFillMode('clinician'));
    $('psychPatientLoad')?.addEventListener('click', loadPatientId);
    $('psychPatientGen')?.addEventListener('click', generatePatientId);
    $('psychPatientId')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loadPatientId();
    });

    window.addEventListener('message', (e) => {
      if (e.data?.type === 'panini-set-patient-id') onPatientId(e.data.id);
      if (e.data?.type === 'panini-patient-update' && window.PaniniPatient) {
        PaniniPatient.applyToDom(e.data.data);
      }
    });

    setStatus('Tap scores & checkboxes to fill · auto-saves');
  }

  window.triggerPrintMode = () => window.print();
  window.setPsychFillMode = setFillMode;

  return { init, collectData, restoreData, updateScaleTotals, setFillMode };
})();
