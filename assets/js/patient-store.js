/**
 * Anonymous Patient Store — ID-based, no PII, GitHub JSON + localStorage
 */
const PatientStore = (function () {
  const ACTIVE_ID_KEY = 'paniniActivePatientId';
  const SCHEMA_VERSION = 1;

  const PII_FIELD_NAMES = new Set([
    'name', 'pname', 'patientname', 'fullname', 'mrn', 'phone', 'mobile', 'email',
    'dob', 'dateofbirth', 'address', 'clinician', 'assessor', 'provider',
    'patientname', 'whypersonal', 'why', 'supportperson', 'emergencycontact',
    'sig', 'signature', 'notespersonal',
  ]);

  const ALLOWED_PROGRAM_FIELDS = new Set([
    'startdate', 'enddate', 'med',
  ]);

  let activeId = null;
  let listeners = [];

  function onChange(fn) { listeners.push(fn); }
  function notify() { listeners.forEach(fn => { try { fn(activeId); } catch (_) {} }); }

  function basePath() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].endsWith('.html')) parts.pop();
    if (parts[parts.length - 1] === 'pages') parts.pop();
    return parts.length ? '/' + parts.join('/') + '/' : '/';
  }

  function normalizeId(raw) {
    return String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  }

  function isValidId(id) {
    return /^WIN-[A-Z0-9]{4,12}$/.test(id) || /^[A-Z0-9]{6,16}$/.test(id);
  }

  function generateId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return 'WIN-' + code;
  }

  function getActiveId() {
    if (activeId) return activeId;
    try { activeId = localStorage.getItem(ACTIVE_ID_KEY) || null; } catch (_) {}
    return activeId;
  }

  function setActiveId(id, silent) {
    const norm = normalizeId(id);
    if (!norm) { activeId = null; localStorage.removeItem(ACTIVE_ID_KEY); notify(); return null; }
    if (!isValidId(norm)) return null;
    activeId = norm;
    try { localStorage.setItem(ACTIVE_ID_KEY, norm); } catch (_) {}
    if (!silent) notify();
    return norm;
  }

  function storageKey(id) { return 'paniniRecord_' + id; }

  function stripPiiFromFields(fields) {
    const out = {};
    Object.entries(fields || {}).forEach(([k, v]) => {
      const key = k.toLowerCase();
      if (PII_FIELD_NAMES.has(key)) return;
      if (typeof v === 'string' && looksLikePii(v)) return;
      out[k] = v;
    });
    return out;
  }

  function looksLikePii(text) {
    const s = String(text);
    if (/\b[\w.-]+@[\w.-]+\.\w+\b/.test(s)) return true;
    if (/\b\d{10}\b/.test(s)) return true;
    if (/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(s)) return true;
    return false;
  }

  function sanitizeVisitFields(fields) {
    const out = {};
    Object.entries(fields || {}).forEach(([k, v]) => {
      if (PII_FIELD_NAMES.has(k.toLowerCase())) return;
      if (k === 'supportPerson' || k === 'emergencyContact') return;
      if (typeof v === 'string' && looksLikePii(v)) return;
      out[k] = v;
    });
    return out;
  }

  function sanitizeVisits(visits) {
    const out = {};
    Object.entries(visits || {}).forEach(([month, data]) => {
      out[month] = {
        core: { ...(data.core || {}) },
        fields: sanitizeVisitFields(data.fields || {}),
      };
      if (out[month].core.providerNotes && looksLikePii(out[month].core.providerNotes)) {
        delete out[month].core.providerNotes;
      }
    });
    return out;
  }

  function sanitizeProgram(program) {
    const p = program || {};
    const fields = {};
    Object.entries(p.fields || {}).forEach(([k, v]) => {
      if (ALLOWED_PROGRAM_FIELDS.has(k.toLowerCase())) fields[k] = v;
    });
    return {
      startdate: p.startdate || fields.startdate || '',
      enddate: p.enddate || fields.enddate || '',
      med: p.med || fields.med || '',
      tableInputs: Array.isArray(p.tableInputs) ? p.tableInputs : [],
      checks: Array.isArray(p.checks) ? p.checks : [],
    };
  }

  function buildRecord(partial) {
    const id = getActiveId();
    if (!id) return null;
    return {
      patientId: id,
      schemaVersion: SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      activeVisitMonth: partial.activeVisitMonth ?? 0,
      visits: sanitizeVisits(partial.visits || {}),
      program: sanitizeProgram(partial.program || {}),
    };
  }

  function saveLocal(record) {
    if (!record || !record.patientId) return;
    try {
      localStorage.setItem(storageKey(record.patientId), JSON.stringify(record));
    } catch (_) {}
  }

  function loadLocal(id) {
    try {
      const raw = localStorage.getItem(storageKey(id));
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  async function fetchFromGithub(id) {
    const url = basePath() + 'data/patients/' + encodeURIComponent(id) + '.json';
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.patientId && normalizeId(data.patientId) !== id) return null;
      return data;
    } catch (_) { return null; }
  }

  function mergeRecords(local, remote) {
    if (!local) return remote;
    if (!remote) return local;
    const localTime = new Date(local.updatedAt || 0).getTime();
    const remoteTime = new Date(remote.updatedAt || 0).getTime();
    const base = remoteTime > localTime ? { ...remote } : { ...local };
    const other = remoteTime > localTime ? local : remote;
    base.visits = { ...(other.visits || {}), ...(base.visits || {}) };
    if (other.program) {
      base.program = { ...other.program, ...base.program };
    }
    base.patientId = local.patientId || remote.patientId;
    base.updatedAt = new Date(Math.max(localTime, remoteTime)).toISOString();
    return base;
  }

  async function loadPatient(id) {
    const norm = setActiveId(id || getActiveId());
    if (!norm) return { ok: false, error: 'Invalid ID. Use format WIN-XXXXXX' };

    const local = loadLocal(norm);
    const remote = await fetchFromGithub(norm);
    const merged = mergeRecords(local, remote);
    if (merged) saveLocal(merged);

    notify();
    return { ok: true, id: norm, record: merged, fromGithub: !!remote };
  }

  function saveRecord(partial) {
    const record = buildRecord(partial);
    if (!record) return null;
    saveLocal(record);
    return record;
  }

  function getRecord() {
    const id = getActiveId();
    if (!id) return null;
    return loadLocal(id);
  }

  function exportForGithub() {
    const record = getRecord();
    if (!record) {
      alert('Enter a Patient ID and load data first.');
      return;
    }
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = record.patientId + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function applyToUi(record) {
    if (!record) return;
    if (window.JourneyVisits && record.visits) {
      JourneyVisits.restoreVisits(record.visits);
      if (typeof record.activeVisitMonth === 'number') {
        JourneyVisits.showVisit(record.activeVisitMonth);
      }
    }
    if (typeof window.restoreWinnerProgram === 'function' && record.program) {
      window.restoreWinnerProgram(record.program);
    }
    const idInput = document.getElementById('patientUniqueId');
    if (idInput) idInput.value = record.patientId || getActiveId() || '';
  }

  async function loadAndApply(id) {
    const result = await loadPatient(id);
    if (!result.ok) return result;
    applyToUi(result.record);
    return result;
  }

  function collectProgramFromForm() {
    if (typeof window.collectWinnerProgram === 'function') {
      return window.collectWinnerProgram();
    }
    return {};
  }

  function persistAll() {
    const id = getActiveId();
    if (!id) return;
    const visits = window.JourneyVisits ? JourneyVisits.collectAllVisits() : {};
    const activeVisitMonth = window.JourneyVisits ? JourneyVisits.getActiveMonth() : 0;
    const program = collectProgramFromForm();
    return saveRecord({ visits, activeVisitMonth, program });
  }

  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'panini-set-patient-id') {
      loadAndApply(e.data.id);
    }
  });

  return {
    generateId,
    normalizeId,
    isValidId,
    getActiveId,
    setActiveId,
    loadPatient,
    loadAndApply,
    saveRecord,
    getRecord,
    persistAll,
    exportForGithub,
    applyToUi,
    onChange,
  };
})();
