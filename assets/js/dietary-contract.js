/**
 * Obesity Dietary Contract — 2-month tracker, auto-save, Patient ID
 */
const DietaryContract = (function () {
  const STORAGE_PREFIX = 'paniniDietContract_';

  let saveTimer = null;
  let activePatientId = null;

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
    const el = $('contractSaveStatus');
    if (el) el.textContent = msg;
  }

  function formatMonth(date) {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function dayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function toInputDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function dateKey(date) {
    return toInputDate(date);
  }

  function createMonthTable(year, monthIndex, tickState) {
    const monthDate = new Date(year, monthIndex, 1);
    const totalDays = daysInMonth(year, monthIndex);
    let rows = '';

    for (let day = 1; day <= totalDays; day++) {
      const current = new Date(year, monthIndex, day);
      const key = dateKey(current);
      const checked = tickState[key] ? ' checked' : '';
      rows += `
        <tr>
          <td>${day}</td>
          <td>${formatDate(current)}</td>
          <td>${dayName(current)}</td>
          <td class="center"><input class="tickbox daily-tick" type="checkbox" data-date="${key}"${checked}></td>
          <td><input type="text" class="tick-remark" data-date="${key}" value="${(tickState[key + '_remark'] || '').replace(/"/g, '&quot;')}"></td>
        </tr>
      `;
    }

    return `
      <div class="month-card">
        <div class="month-header">${formatMonth(monthDate)}</div>
        <table>
          <thead>
            <tr>
              <th style="width: 12%;">Day</th>
              <th style="width: 30%;">Date</th>
              <th style="width: 18%;">Weekday</th>
              <th style="width: 15%;">Tick</th>
              <th style="width: 25%;">Remarks</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function collectTicks() {
    const ticks = {};
    document.querySelectorAll('.daily-tick').forEach((el) => {
      if (el.dataset.date) ticks[el.dataset.date] = el.checked;
    });
    document.querySelectorAll('.tick-remark').forEach((el) => {
      if (el.dataset.date && el.value.trim()) ticks[el.dataset.date + '_remark'] = el.value.trim();
    });
    return ticks;
  }

  function collectData() {
    const data = { version: 1, updatedAt: new Date().toISOString(), fields: {}, checks: {}, ticks: collectTicks() };
    const form = $('contractForm');
    if (!form) return data;

    form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach((el) => {
      if (el.dataset.panini || el.classList.contains('tick-remark')) return;
      const key = el.id || el.name;
      if (key) data.fields[key] = el.value;
    });

    form.querySelectorAll('input[type="checkbox"]').forEach((el) => {
      if (el.classList.contains('daily-tick')) return;
      const key = el.name || el.id;
      if (key) data.checks[key] = el.checked;
    });

    return data;
  }

  function restoreData(data) {
    if (!data) return;
    const form = $('contractForm');
    if (!form) return;

    Object.entries(data.fields || {}).forEach(([key, val]) => {
      const el = $(key) || form.querySelector(`[name="${key}"]`);
      if (el && !el.dataset.panini) el.value = val;
    });

    Object.entries(data.checks || {}).forEach(([key, checked]) => {
      const el = form.querySelector(`[name="${key}"], #${CSS.escape(key)}`);
      if (el) el.checked = !!checked;
    });

    if (data.fields?.startDate || $('startDate')?.value) {
      generateTracker(data.ticks || {});
    }
  }

  function save() {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(collectData()));
      const when = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setStatus('✓ Saved · ' + when);
    } catch (_) {
      setStatus('Could not save');
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    setStatus('Saving…');
    saveTimer = setTimeout(save, 400);
  }

  function loadSaved() {
    try {
      const raw = localStorage.getItem(storageKey());
      if (raw) restoreData(JSON.parse(raw));
    } catch (_) {}
  }

  function generateTracker(savedTicks) {
    const startDateInput = $('startDate');
    const tracker = $('tracker');
    let baseDate = startDateInput?.value ? new Date(startDateInput.value + 'T12:00:00') : new Date();
    if (isNaN(baseDate.getTime())) baseDate = new Date();

    const tickState = savedTicks || collectTicks();
    const year1 = baseDate.getFullYear();
    const month1 = baseDate.getMonth();
    const nextMonthDate = new Date(year1, month1 + 1, 1);
    const year2 = nextMonthDate.getFullYear();
    const month2 = nextMonthDate.getMonth();

    tracker.innerHTML = createMonthTable(year1, month1, tickState) + createMonthTable(year2, month2, tickState);

    if ($('signDate') && !$('signDate').value) $('signDate').value = toInputDate(baseDate);
    if ($('reviewDate')) {
      const review = new Date(year1, month1 + 2, 0);
      $('reviewDate').value = toInputDate(review);
    }

    document.querySelectorAll('.daily-tick, .tick-remark').forEach((el) => {
      el.addEventListener('change', scheduleSave);
      el.addEventListener('input', scheduleSave);
    });

    scheduleSave();
  }

  function markAll(value) {
    document.querySelectorAll('.daily-tick').forEach((box) => { box.checked = value; });
    scheduleSave();
  }

  async function loadPatientId() {
    const input = $('contractPatientId');
    if (!input || !window.PatientStore) return;
    const id = PatientStore.normalizeId(input.value);
    if (!PatientStore.isValidId(id)) {
      input.focus();
      setStatus('Enter valid Patient ID (WIN-XXXXXX)');
      return;
    }
    save();
    activePatientId = id;
    PatientStore.setActiveId(id);
    input.value = id;
    await PatientStore.loadPatient(id);
    loadSaved();
    if (window.PaniniPatient) PaniniPatient.applyToDom(PaniniPatient.load());
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'panini-patient-id-changed', id }, '*');
    }
  }

  function generatePatientId() {
    if (!window.PatientStore) return;
    const id = PatientStore.generateId();
    $('contractPatientId').value = id;
    PatientStore.setActiveId(id);
    activePatientId = id;
    setStatus('Generated ' + id);
  }

  function onPatientId(id) {
    save();
    activePatientId = id || null;
    if ($('contractPatientId') && id) $('contractPatientId').value = id;
    loadSaved();
  }

  function bind() {
    const form = $('contractForm');
    if (!form) return;
    form.addEventListener('input', scheduleSave);
    form.addEventListener('change', scheduleSave);
  }

  function init() {
    if (window.parent !== window) document.body.classList.add('in-iframe');
    bind();

    if (window.PatientStore && PatientStore.getActiveId()) {
      activePatientId = PatientStore.getActiveId();
      if ($('contractPatientId')) $('contractPatientId').value = activePatientId;
    }

    const today = new Date();
    if ($('startDate') && !$('startDate').value) $('startDate').value = toInputDate(today);

    loadSaved();
    if (!$('tracker')?.innerHTML.trim()) generateTracker();

    $('contractPatientLoad')?.addEventListener('click', loadPatientId);
    $('contractPatientGen')?.addEventListener('click', generatePatientId);
    $('contractPatientId')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loadPatientId();
    });

    window.addEventListener('message', (e) => {
      if (e.data?.type === 'panini-set-patient-id') onPatientId(e.data.id);
      if (e.data?.type === 'panini-patient-update' && window.PaniniPatient) {
        PaniniPatient.applyToDom(e.data.data);
      }
    });

    setStatus('Auto-save on · generate tracker after setting start date');
  }

  window.generateTracker = () => generateTracker();
  window.markAll = markAll;
  window.triggerPrintMode = () => window.print();

  return { init, generateTracker, markAll, collectData, restoreData };
})();
