/**
 * PaniniData — Unified patient data store
 * ────────────────────────────────────────
 * One localStorage key per patient: paniniCentral_WIN-XXXXX
 * One GitHub JSON file per patient: data/patients/WIN-XXXXX.json
 *
 * Schema (no PII — ID only):
 * {
 *   patientId, schemaVersion:2, updatedAt,
 *   meta:   { height, targetWeight },
 *   dashVisits: [ { date, weight, waist, bp, dose, diet, exercise,
 *                   sleep, energy, hba1c, fbg, ldl, tg, hdl, alt,
 *                   steps, nadir, nsv[], sideEffect, doseChange } ],
 *   medTracker: { drug, startDate, targetDose, visits:[] }
 * }
 */
const PaniniData = (function () {
  const PREFIX   = 'paniniCentral_';
  const ID_KEY   = 'paniniCentralActiveId';
  const SCHEMA_V = 2;

  // Fields that must NEVER appear in stored data
  const PII = new Set([
    'name','fullname','patientname','phone','mobile','email',
    'mrn','dob','dateofbirth','address','emergencycontact',
    'supportperson','signature','sig',
  ]);

  // ── Path helpers ──────────────────────────────
  function basePath() {
    const p = window.location.pathname.split('/').filter(Boolean);
    if (p.length && p[p.length - 1].endsWith('.html')) p.pop();
    if (p[p.length - 1] === 'pages') p.pop();
    return p.length ? '/' + p.join('/') + '/' : '/';
  }

  function storageKey(id) { return PREFIX + id; }

  // ── PII stripping ─────────────────────────────
  function stripPii(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(stripPii);
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (PII.has(k.toLowerCase())) continue;
      // Heuristic: looks like email / phone
      if (typeof v === 'string') {
        if (/\b[\w.-]+@[\w.-]+\.\w+\b/.test(v)) continue;
        if (/\b\d{10}\b/.test(v)) continue;
        if (/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(v)) continue;
      }
      out[k] = stripPii(v);
    }
    return out;
  }

  // ── Empty record skeleton ─────────────────────
  function empty(id) {
    return {
      patientId:     id,
      schemaVersion: SCHEMA_V,
      updatedAt:     null,
      meta:          {},
      dashVisits:    [],
      medTracker:    {},
    };
  }

  // ── localStorage read/write ───────────────────
  function load(id) {
    if (!id) return null;
    try {
      const raw = localStorage.getItem(storageKey(id));
      return raw ? { ...empty(id), ...JSON.parse(raw) } : empty(id);
    } catch (_) { return empty(id); }
  }

  function save(id, data) {
    if (!id || !data) return;
    const clean      = stripPii({ ...data });
    clean.patientId  = id;
    clean.updatedAt  = new Date().toISOString();
    try { localStorage.setItem(storageKey(id), JSON.stringify(clean)); } catch (_) {}
  }

  // ── Section helpers ───────────────────────────
  function updateSection(id, section, value) {
    const rec       = load(id) || empty(id);
    rec[section]    = value;
    save(id, rec);
  }

  function getSection(id, section) {
    const rec = load(id);
    return rec ? rec[section] : null;
  }

  // ── Active ID shortcut ────────────────────────
  function getActiveId() {
    try { return localStorage.getItem(ID_KEY) || null; } catch (_) { return null; }
  }
  function setActiveId(id) {
    try { localStorage.setItem(ID_KEY, id); } catch (_) {}
  }

  // ── GitHub fetch ──────────────────────────────
  async function fetchGithub(id) {
    const url = basePath() + 'data/patients/' + encodeURIComponent(id) + '.json';
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return null;
      const remote = await res.json();
      // Safety check
      if (remote.patientId && remote.patientId !== id) return null;
      // Merge: remote wins on each section, local wins on timestamps it owns
      const local  = load(id);
      const merged = mergeRecords(local, remote);
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
    const other =  rt >= lt ? local         : remote;
    // Merge dashVisits by date
    const byDate = {};
    [...(other.dashVisits  || [])].forEach(v => { byDate[v.date] = v; });
    [...(base.dashVisits   || [])].forEach(v => { byDate[v.date] = { ...byDate[v.date], ...v }; });
    base.dashVisits = Object.values(byDate).sort((a, b) => a.date < b.date ? -1 : 1);
    // medTracker: newest wins
    if (!base.medTracker?.drug && other.medTracker?.drug) base.medTracker = other.medTracker;
    base.meta = { ...other.meta, ...base.meta };
    return base;
  }

  // ── Export JSON (for GitHub commit) ──────────
  function exportJson(id) {
    const rec = load(id);
    if (!rec.dashVisits?.length && !rec.medTracker?.drug) {
      alert('No data yet for ' + id + '. Enter visit data first.'); return;
    }
    const out = stripPii(rec);
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = id + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    return out;
  }

  // ── Validation ────────────────────────────────
  function validId(id) {
    return /^WIN-[A-Z0-9]{4,12}$/.test(id) || /^[A-Z0-9]{6,16}$/.test(id);
  }
  function normId(raw) {
    return String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  }
  function generateId() {
    const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = 'WIN-';
    for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
  }

  return {
    load, save, updateSection, getSection,
    fetchGithub, exportJson, mergeRecords,
    getActiveId, setActiveId,
    validId, normId, generateId,
  };
})();
