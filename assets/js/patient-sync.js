/**
 * Panini Patient Profile — cross-module auto-fill via localStorage + BroadcastChannel
 */
(function (global) {
  const STORAGE_KEY = 'paniniPatientProfile_v1';
  const CHANNEL = 'panini-patient-sync';
  const DEBOUNCE_MS = 350;

  const EMPTY = {
    name: '', mrn: '', dob: '', age: '', sex: '', height: '', weight: '',
    peakWeight: '', peakAge: '', waist: '', bmi: '', bp: '', hba1c: '', glucose: '',
    assessmentDate: '', clinician: '', clinic: '', glp1Med: '', assessor: '', bodyFat: '',
    targetTbwlPercent: '',
  };

  let syncing = false;
  let saveTimer = null;
  let channel = null;

  try { channel = new BroadcastChannel(CHANNEL); } catch (_) {}

  function load() {
    try {
      return { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch (_) {
      return { ...EMPTY };
    }
  }

  function save(data) {
    const merged = { ...EMPTY, ...data };
    if (merged.height && merged.weight) {
      const bmi = computeBmi(merged.height, merged.weight);
      if (bmi) merged.bmi = bmi;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    if (channel) channel.postMessage({ type: 'update', data: merged });
    if (global.parent && global.parent !== global) {
      try {
        global.parent.postMessage({ type: 'panini-patient-update', data: merged }, '*');
      } catch (_) {}
    }
    return merged;
  }

  function computeBmi(heightCm, weightKg) {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) return (w / ((h / 100) ** 2)).toFixed(1);
    return '';
  }

  function formatDobAge(dob, age) {
    if (dob && age) return `${dob} / ${age}`;
    if (dob) return dob;
    if (age) return String(age);
    return '';
  }

  function setValue(el, value) {
    if (!el || value === undefined || value === null) return;
    const str = String(value);
    if (el.value === str) return;

    if (el.tagName === 'SELECT') {
      let matched = false;
      [...el.options].forEach((opt) => {
        if (opt.value === str || opt.text === str) {
          el.value = opt.value;
          matched = true;
        }
      });
      if (!matched) return;
    } else {
      el.value = str;
    }

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function captureFromDom() {
    const data = load();

    document.querySelectorAll('[data-panini]').forEach((el) => {
      if (el.dataset.paniniMirror || el.dataset.paniniApplyOnly) return;
      const key = el.dataset.panini;
      if (!key || !(key in EMPTY)) return;
      data[key] = (el.value || '').trim();
    });

    return data;
  }

  function applyToDom(incoming) {
    const data = { ...EMPTY, ...incoming };
    syncing = true;

    document.querySelectorAll('[data-panini]').forEach((el) => {
      const key = el.dataset.panini;
      if (!key) return;

      if (key === 'dobAge' || el.dataset.paniniApplyOnly === 'dobAge') {
        setValue(el, formatDobAge(data.dob, data.age));
        return;
      }

      if (data[key]) setValue(el, data[key]);
    });

    if (typeof global.updatePatientParams === 'function') {
      global.updatePatientParams();
    }

    syncing = false;
  }

  function scheduleSave() {
    if (syncing) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => save(captureFromDom()), DEBOUNCE_MS);
  }

  function bind() {
    document.querySelectorAll('[data-panini]').forEach((el) => {
      if (el.dataset.paniniMirror || el.dataset.paniniApplyOnly) return;
      el.addEventListener('input', scheduleSave);
      el.addEventListener('change', scheduleSave);
    });
  }

  function init() {
    applyToDom(load());
    bind();

    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { applyToDom(JSON.parse(e.newValue)); } catch (_) {}
      }
    });

    if (channel) {
      channel.onmessage = (e) => {
        if (e.data && e.data.type === 'update') applyToDom(e.data.data);
      };
    }

    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'panini-patient-update') {
        applyToDom(e.data.data);
      }
    });
  }

  global.PaniniPatient = { load, save, applyToDom, captureFromDom, init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
