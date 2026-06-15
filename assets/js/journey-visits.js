/**
 * Bi-Monthly Journey Visit Renderer — integrates with Winner Program save/load
 */
const JourneyVisits = (function () {
  const PHASE_LABELS = { 1: 'Phase 1 · Initiation', 2: 'Phase 2 · Active Loss', 3: 'Phase 3 · Stabilization', 4: 'Phase 4 · Maintenance' };
  let activeMonth = 0;
  let visitDataCache = {};

  function $(id) { return document.getElementById(id); }

  function fieldId(month, id) { return `visit_${month}_${id}`; }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderScale(month, field) {
    const fid = fieldId(month, field.id);
    let html = `<div class="visit-field visit-field-scale"><label>${escapeHtml(field.label)}</label><div class="scale-row">`;
    for (let i = 1; i <= 10; i++) {
      html += `<label class="scale-opt"><input type="radio" name="${fid}" value="${i}" data-visit-month="${month}" data-visit-field="${field.id}"><span>${i}</span></label>`;
    }
    html += '</div></div>';
    return html;
  }

  function renderField(month, field) {
    const fid = fieldId(month, field.id);
    const attrs = `id="${fid}" data-visit-month="${month}" data-visit-field="${field.id}"`;
    const ph = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';

    switch (field.type) {
      case 'scale':
        return renderScale(month, field);
      case 'textarea':
        return `<div class="visit-field"><label for="${fid}">${escapeHtml(field.label)}</label><textarea ${attrs} rows="3"${ph}></textarea></div>`;
      case 'select':
        return `<div class="visit-field"><label for="${fid}">${escapeHtml(field.label)}</label><select ${attrs}><option value="">Select…</option>${(field.options || []).map(o => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join('')}</select></div>`;
      case 'checkbox':
        return `<div class="visit-field visit-field-check"><label class="check-label"><input type="checkbox" ${attrs}> ${escapeHtml(field.labelCheck || field.label)}</label></div>`;
      case 'number':
        return `<div class="visit-field"><label for="${fid}">${escapeHtml(field.label)}</label><input type="number" ${attrs}${ph}></div>`;
      case 'date':
        return `<div class="visit-field"><label for="${fid}">${escapeHtml(field.label)}</label><input type="date" ${attrs}></div>`;
      default:
        return `<div class="visit-field"><label for="${fid}">${escapeHtml(field.label)}</label><input type="text" ${attrs}${ph}></div>`;
    }
  }

  function renderCoreVitals(month) {
    const paniniWeight = month === activeMonth ? ' data-panini="weight"' : '';
    const paniniWaist = month === activeMonth ? ' data-panini="waist"' : '';
    const paniniBp = month === activeMonth ? ' data-panini="bp"' : '';
    const paniniDose = month === activeMonth ? ' data-panini="glp1Med"' : '';

    return `
      <div class="visit-core-vitals">
        <h3>Core Visit Vitals</h3>
        <div class="visit-vitals-grid">
          <div class="visit-field">
            <label for="visit_${month}_date">Visit Date</label>
            <input type="date" id="visit_${month}_date" data-visit-month="${month}" data-visit-core="date">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_weight">Weight (kg)</label>
            <input type="text" id="visit_${month}_weight" data-visit-month="${month}" data-visit-core="weight"${paniniWeight} placeholder="e.g. 82">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_waist">Waist (cm)</label>
            <input type="text" id="visit_${month}_waist" data-visit-month="${month}" data-visit-core="waist"${paniniWaist} placeholder="e.g. 94">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_bp">Blood Pressure</label>
            <input type="text" id="visit_${month}_bp" data-visit-month="${month}" data-visit-core="bp"${paniniBp} placeholder="e.g. 128/82">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_dose">GLP-1 Dose</label>
            <input type="text" id="visit_${month}_dose" data-visit-month="${month}" data-visit-core="dose"${paniniDose} placeholder="e.g. 1 mg weekly">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_dietScore">Dietary Adherence (1–10)</label>
            <input type="number" id="visit_${month}_dietScore" data-visit-month="${month}" data-visit-core="dietScore" min="1" max="10">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_exerciseScore">Exercise Consistency (1–10)</label>
            <input type="number" id="visit_${month}_exerciseScore" data-visit-month="${month}" data-visit-core="exerciseScore" min="1" max="10">
          </div>
          <div class="visit-field span2">
            <label for="visit_${month}_providerNotes">Provider Notes / Adjustments</label>
            <textarea id="visit_${month}_providerNotes" data-visit-month="${month}" data-visit-core="providerNotes" rows="2" placeholder="Clinical adjustments, referrals, next steps…"></textarea>
          </div>
        </div>
      </div>`;
  }

  function renderVisitForm(visit) {
    const m = visit.month;
    let sectionsHtml = visit.sections.map(sec => `
      <div class="visit-section-block">
        <h3>${escapeHtml(sec.heading)}</h3>
        <div class="visit-fields-grid">
          ${sec.fields.map(f => renderField(m, f)).join('')}
        </div>
      </div>
    `).join('');

    return `
      <article class="visit-card" data-visit-month="${m}" id="visitCard_${m}">
        <div class="visit-card-header phase-${visit.phase}">
          <div class="visit-month-badge">Month ${m}</div>
          <div>
            <h3 class="visit-title">${escapeHtml(visit.title)}</h3>
            <p class="visit-focus">${escapeHtml(visit.focus)}</p>
            <span class="visit-phase-tag">${PHASE_LABELS[visit.phase] || ''}</span>
          </div>
        </div>
        ${renderCoreVitals(m)}
        <div class="visit-unique-assessment">
          <h3>Unique Assessment — Month ${m}</h3>
          ${sectionsHtml}
        </div>
        <div class="visit-insight">
          <div class="insight-block patient-insight">
            <strong>Patient Insight</strong>
            <p>${escapeHtml(visit.insight.patient)}</p>
          </div>
          <div class="insight-block clinician-insight">
            <strong>Clinician Insight</strong>
            <p>${escapeHtml(visit.insight.clinician)}</p>
          </div>
        </div>
      </article>`;
  }

  function buildNavigator() {
    const nav = $('visitNav');
    if (!nav) return;
    nav.innerHTML = JOURNEY_VISITS.map(v => `
      <button type="button" class="visit-pill phase-${v.phase}${v.month === activeMonth ? ' active' : ''}"
        data-month="${v.month}" onclick="JourneyVisits.showVisit(${v.month})">
        M${v.month}
      </button>
    `).join('');
  }

  function renderAllVisitForms() {
    const container = $('visitFormContainer');
    if (!container) return;
    container.innerHTML = JOURNEY_VISITS.map(v => {
      const hidden = v.month !== activeMonth ? ' style="display:none"' : '';
      return `<div class="visit-form-wrap" data-visit-wrap="${v.month}"${hidden}>${renderVisitForm(v)}</div>`;
    }).join('');
    bindVisitEvents();
    applyCachedData();
  }

  function showVisit(month) {
    saveCurrentToCache();
    activeMonth = month;
    document.querySelectorAll('.visit-pill').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.month, 10) === month);
    });
    document.querySelectorAll('.visit-form-wrap').forEach(wrap => {
      wrap.style.display = parseInt(wrap.dataset.visitWrap, 10) === month ? 'block' : 'none';
    });
    applyCachedData();
    prefillActiveFromProfile();
    syncPaniniFromActiveVisit();
    if (typeof autoSave === 'function') autoSave();
  }

  function bindVisitEvents() {
    const container = $('visitFormContainer');
    if (!container) return;
    container.querySelectorAll('[data-visit-month]').forEach(el => {
      el.addEventListener('input', onVisitInput);
      el.addEventListener('change', onVisitInput);
    });
  }

  function onVisitInput(e) {
    const el = e.target;
    if (!el.dataset.visitMonth) return;
    saveFieldToCache(el);
    if (el.dataset.visitCore === 'weight' || el.dataset.panini === 'weight') {
      syncWeightToPatient(el.value);
    }
    if (['weight', 'waist', 'bp'].includes(el.dataset.visitCore) || ['weight', 'waist', 'bp', 'glp1Med'].includes(el.dataset.panini)) {
      syncPaniniFromActiveVisit();
    }
    if (typeof autoSave === 'function') autoSave();
  }

  function syncWeightToPatient(val) {
    if (!val || !window.PaniniPatient) return;
    const data = PaniniPatient.load();
    data.weight = val.trim();
    PaniniPatient.save(data);
  }

  function prefillActiveFromProfile() {
    if (!window.PaniniPatient) return;
    const p = PaniniPatient.load();
    const wrap = document.querySelector(`.visit-form-wrap[data-visit-wrap="${activeMonth}"]`);
    if (!wrap) return;
    const map = { weight: 'weight', waist: 'waist', bp: 'bp', glp1Med: 'dose' };
    Object.entries(map).forEach(([pk, core]) => {
      if (!p[pk]) return;
      const el = wrap.querySelector(`[data-visit-core="${core}"]`);
      if (el && !el.value) el.value = p[pk];
    });
  }

  function syncPaniniFromActiveVisit() {
    if (!window.PaniniPatient) return;
    const wrap = document.querySelector(`.visit-form-wrap[data-visit-wrap="${activeMonth}"]`);
    if (!wrap) return;
    const data = PaniniPatient.load();
    const w = wrap.querySelector('[data-visit-core="weight"]');
    const waist = wrap.querySelector('[data-visit-core="waist"]');
    const bp = wrap.querySelector('[data-visit-core="bp"]');
    const dose = wrap.querySelector('[data-visit-core="dose"]');
    if (w && w.value) data.weight = w.value.trim();
    if (waist && waist.value) data.waist = waist.value.trim();
    if (bp && bp.value) data.bp = bp.value.trim();
    if (dose && dose.value) data.glp1Med = dose.value.trim();
    PaniniPatient.save(data);
  }

  function saveFieldToCache(el) {
    const month = String(el.dataset.visitMonth);
    if (!visitDataCache[month]) visitDataCache[month] = { core: {}, fields: {} };
    if (el.dataset.visitCore) {
      if (el.type === 'checkbox') visitDataCache[month].core[el.dataset.visitCore] = el.checked;
      else visitDataCache[month].core[el.dataset.visitCore] = el.value;
    } else if (el.dataset.visitField) {
      if (el.type === 'checkbox') visitDataCache[month].fields[el.dataset.visitField] = el.checked;
      else if (el.type === 'radio') {
        if (el.checked) visitDataCache[month].fields[el.dataset.visitField] = el.value;
      } else visitDataCache[month].fields[el.dataset.visitField] = el.value;
    }
  }

  function saveCurrentToCache() {
    const wrap = document.querySelector(`.visit-form-wrap[data-visit-wrap="${activeMonth}"]`);
    if (!wrap) return;
    wrap.querySelectorAll('[data-visit-month]').forEach(el => saveFieldToCache(el));
  }

  function readWrapData(wrap, month) {
    const entry = { core: {}, fields: {} };
    wrap.querySelectorAll('[data-visit-month]').forEach(el => {
      if (String(el.dataset.visitMonth) !== String(month)) return;
      if (el.dataset.visitCore) {
        entry.core[el.dataset.visitCore] = el.type === 'checkbox' ? el.checked : el.value;
      } else if (el.dataset.visitField) {
        if (el.type === 'radio') {
          if (el.checked) entry.fields[el.dataset.visitField] = el.value;
        } else if (el.type === 'checkbox') {
          entry.fields[el.dataset.visitField] = el.checked;
        } else {
          entry.fields[el.dataset.visitField] = el.value;
        }
      }
    });
    return entry;
  }

  function applyDataToWrap(month, data) {
    if (!data) return;
    const wrap = document.querySelector(`.visit-form-wrap[data-visit-wrap="${month}"]`);
    if (!wrap) return;

    Object.entries(data.core || {}).forEach(([key, val]) => {
      const el = wrap.querySelector(`[data-visit-core="${key}"]`);
      if (!el) return;
      if (el.type === 'checkbox') el.checked = !!val;
      else el.value = val;
    });

    Object.entries(data.fields || {}).forEach(([key, val]) => {
      const fields = wrap.querySelectorAll(`[data-visit-field="${key}"]`);
      if (!fields.length) return;
      const first = fields[0];
      if (first.type === 'radio') {
        fields.forEach(r => { r.checked = r.value === String(val); });
      } else if (first.type === 'checkbox') {
        first.checked = !!val;
      } else {
        first.value = val;
      }
    });
  }

  function collectAllVisits() {
    saveCurrentToCache();
    const visits = { ...visitDataCache };
    document.querySelectorAll('.visit-form-wrap').forEach(wrap => {
      const month = String(wrap.dataset.visitWrap);
      visits[month] = readWrapData(wrap, month);
    });
    visitDataCache = visits;
    return visits;
  }

  function applyCachedData() {
    applyDataToWrap(activeMonth, visitDataCache[String(activeMonth)]);
  }

  function restoreVisits(visits) {
    visitDataCache = visits || {};
    JOURNEY_VISITS.forEach(v => applyDataToWrap(v.month, visitDataCache[String(v.month)]));
  }

  function init() {
    if (typeof JOURNEY_VISITS === 'undefined') return;
    buildNavigator();
    renderAllVisitForms();
    prefillActiveFromProfile();
    window.addEventListener('beforeprint', () => {
      document.querySelectorAll('.visit-form-wrap').forEach(w => w.classList.remove('visit-print-target'));
      const active = document.querySelector(`.visit-form-wrap[data-visit-wrap="${activeMonth}"]`);
      if (active) active.classList.add('visit-print-target');
      document.body.classList.add('print-active-visit');
    });
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('print-active-visit');
      document.querySelectorAll('.visit-form-wrap').forEach(w => w.classList.remove('visit-print-target'));
    });
  }

  return {
    init,
    showVisit,
    collectAllVisits,
    restoreVisits,
    getActiveMonth: () => activeMonth,
  };
})();
