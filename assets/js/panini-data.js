/**
 * PaniniData — Unified patient data store
 * ─────────────────────────────────────────────────────
 * Shares the active-ID key with PatientStore so entering
 * the patient ID once in the app shell propagates to every module.
 *
 * localStorage key  : paniniActivePatientId  (shared with PatientStore)
 * Patient data key  : paniniCentral_WIN-XXXXX
 * GitHub JSON path  : data/patients/WIN-XXXXX.json
 *
 * Schema (no PII — numeric/categorical clinical data only):
 * {
 *   patientId, schemaVersion:2, updatedAt,
 *   meta:        { height, targetWeight },
 *   dashVisits:  [ { date, weight, waist, bp, dose, diet, exercise,
 *                    sleep, energy, hba1c, fbg, ldl, tg, hdl, alt,
 *                    steps, nadir, nsv[], sideEffect, doseChange } ],
 *   medTracker:  { drug, startDate, targetDose, visits:[] }
 * }
 */
const PaniniData = (function () {
  // ── Shared with PatientStore so ONE entry populates every module ──
  const ID_KEY   = 'paniniActivePatientId';
  const PREFIX   = 'paniniCentral_';
  const SCHEMA_V = 2;

  const PII = new Set([
    'name','fullname','patientname','phone','mobile','email',
    'mrn','dob','dateofbirth','address','emergencycontact',
    'supportperson','signature','sig',
  ]);

  // ─── ID helpers ──────────────────────────────────────
  function normId(raw) {
    return String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  }
  function validId(id) {
    return /^WIN-[A-Z0-9]{4,12}$/.test(id) || /^[A-Z0-9]{6,16}$/.test(id);
  }
  function generateId() {
    const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = 'WIN-';
    for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
  }
  function getActiveId() {
    try { return localStorage.getItem(ID_KEY) || null; } catch (_) { return null; }
  }
  function setActiveId(id) {
    try { localStorage.setItem(ID_KEY, id); } catch (_) {}
    // Notify parent shell if running in iframe
    try {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'panini-patient-id-changed', id }, '*');
      }
    } catch (_) {}
  }

  // ─── Path helper ─────────────────────────────────────
  function basePath() {
    const p = window.location.pathname.split('/').filter(Boolean);
    if (p.length && p[p.length - 1].endsWith('.html')) p.pop();
    if (p[p.length - 1] === 'pages') p.pop();
    return p.length ? '/' + p.join('/') + '/' : '/';
  }

  // ─── PII stripping ────────────────────────────────────
  function stripPii(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(stripPii);
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (PII.has(k.toLowerCase())) continue;
      if (typeof v === 'string') {
        if (/\b[\w.-]+@[\w.-]+\.\w+\b/.test(v)) continue;
        if (/\b\d{10}\b/.test(v)) continue;
        if (/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(v)) continue;
      }
      out[k] = stripPii(v);
    }
    return out;
  }

  // ─── Record skeleton ──────────────────────────────────
  function empty(id) {
    return { patientId: id, schemaVersion: SCHEMA_V, updatedAt: null,
             meta: {}, dashVisits: [], medTracker: {} };
  }

  // ─── localStorage ─────────────────────────────────────
  function storeKey(id) { return PREFIX + id; }

  function load(id) {
    if (!id) return null;
    try {
      const raw = localStorage.getItem(storeKey(id));
      return raw ? { ...empty(id), ...JSON.parse(raw) } : empty(id);
    } catch (_) { return empty(id); }
  }

  function save(id, data) {
    if (!id || !data) return;
    const clean     = stripPii({ ...data });
    clean.patientId = id;
    clean.updatedAt = new Date().toISOString();
    try { localStorage.setItem(storeKey(id), JSON.stringify(clean)); } catch (_) {}
  }

  function updateSection(id, section, value) {
    const rec    = load(id) || empty(id);
    rec[section] = value;
    save(id, rec);
  }

  function getSection(id, section) {
    const rec = load(id);
    return rec ? rec[section] : null;
  }

  // ─── GitHub sync ──────────────────────────────────────
  async function fetchGithub(id) {
    const url = basePath() + 'data/patients/' + encodeURIComponent(id) + '.json';
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return null;
      const remote = await res.json();
      if (remote.patientId && remote.patientId !== id) return null;
      const merged = mergeRecords(load(id), remote);
      save(id, merged);
      return merged;
    } catch (_) { return null; }
  }

  function mergeRecords(local, remote) {
    if (!local)  return remote;
    if (!remote) return local;
    const lt = new Date(local.updatedAt  || 0).getTime();
    const rt = new Date(remote.updatedAt || 0).getTime();
    const base  = rt >= lt ? { ...remote } : { ...local  };
    const other = rt >= lt ? local : remote;
    // Merge dashVisits by date (union, base wins on conflict)
    const byDate = {};
    (other.dashVisits || []).forEach(v => { byDate[v.date] = v; });
    (base.dashVisits  || []).forEach(v => { byDate[v.date] = { ...byDate[v.date], ...v }; });
    base.dashVisits = Object.values(byDate).sort((a, b) => a.date < b.date ? -1 : 1);
    if (!base.medTracker?.drug && other.medTracker?.drug) base.medTracker = other.medTracker;
    base.meta = { ...(other.meta || {}), ...(base.meta || {}) };
    return base;
  }

  function exportJson(id) {
    const rec = load(id);
    if (!rec?.dashVisits?.length && !rec?.medTracker?.drug) {
      alert('No data yet for ' + id + '. Enter visit data first.'); return;
    }
    const blob = new Blob([JSON.stringify(stripPii(rec), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = id + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ─── Frame sync ───────────────────────────────────────
  // Call this once per module page. Registers:
  //  1. postMessage listener  → parent shell broadcasts panini-set-patient-id
  //  2. storage event         → another tab/frame changes the active ID
  // `onLoad(id)` is your page's load function.
  function initFrameSync(onLoad) {
    // React to parent broadcasting the patient ID into this iframe
    window.addEventListener('message', (e) => {
      if (!e.data) return;
      if (e.data.type === 'panini-set-patient-id' && e.data.id) {
        const id = normId(e.data.id);
        if (validId(id)) {
          setActiveId(id);
          onLoad(id);
        }
      }
      // Also handle legacy patient-update message
      if (e.data.type === 'panini-patient-update' && e.data.data?.patientId) {
        const id = normId(e.data.data.patientId);
        if (validId(id)) {
          setActiveId(id);
          onLoad(id);
        }
      }
    });

    // React to the active ID changing in another module / shell
    window.addEventListener('storage', (e) => {
      if (e.key === ID_KEY && e.newValue) {
        const id = normId(e.newValue);
        if (validId(id)) onLoad(id);
      }
    });
  }

  return {
    load, save, updateSection, getSection,
    fetchGithub, exportJson, mergeRecords,
    getActiveId, setActiveId,
    validId, normId, generateId,
    initFrameSync,
  };
})();
