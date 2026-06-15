/**
 * Bi-Monthly Journey Visit Renderer — visit-wise data, auto-save, progress outputs
 */
const JourneyVisits = (function () {
  const VISIT_KEY = 'paniniJourneyVisits_v1';
  const PHASE_LABELS = { 1: 'Phase 1 · Initiation', 2: 'Phase 2 · Active Loss', 3: 'Phase 3 · Stabilization', 4: 'Phase 4 · Maintenance' };
  let activeMonth = 0;
  let visitDataCache = {};
  let saveTimer = null;

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
            <input type="text" id="visit_${month}_weight" data-visit-month="${month}" data-visit-core="weight" placeholder="e.g. 82">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_waist">Waist (cm)</label>
            <input type="text" id="visit_${month}_waist" data-visit-month="${month}" data-visit-core="waist" placeholder="e.g. 94">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_bp">Blood Pressure</label>
            <input type="text" id="visit_${month}_bp" data-visit-month="${month}" data-visit-core="bp" placeholder="e.g. 128/82">
          </div>
          <div class="visit-field">
            <label for="visit_${month}_dose">GLP-1 Dose</label>
            <input type="text" id="visit_${month}_dose" data-visit-month="${month}" data-visit-core="dose" placeholder="e.g. 1 mg weekly">
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

  function visitHasData(month) {
    const d = visitDataCache[String(month)];
    if (!d) return false;
    const c = d.core || {};
    return !!(c.date || c.weight || c.waist || c.bp || c.dose || c.providerNotes);
  }

  function getPatientName() {
    const el = document.getElementById('pname');
    return el && el.value.trim() ? el.value.trim() : 'Patient';
  }

  function parseWeight(val) {
    const n = parseFloat(String(val || '').replace(/[^\d.]/g, ''));
    return isNaN(n) ? null : n;
  }

  function getBaselineWeight() {
    const w = visitDataCache['0']?.core?.weight;
    return parseWeight(w);
  }

  function calcTbwl(currentWeight) {
    const base = getBaselineWeight();
    if (!base || !currentWeight) return null;
    return (((base - currentWeight) / base) * 100).toFixed(1);
  }

  function getVisitSummaries() {
    return JOURNEY_VISITS.map(v => {
      const d = visitDataCache[String(v.month)] || { core: {}, fields: {} };
      const c = d.core || {};
      const w = parseWeight(c.weight);
      return {
        month: v.month,
        phase: v.phase,
        title: v.title,
        date: c.date || '',
        weight: c.weight || '',
        weightNum: w,
        waist: c.waist || '',
        bp: c.bp || '',
        dose: c.dose || '',
        dietScore: c.dietScore || '',
        exerciseScore: c.exerciseScore || '',
        notes: c.providerNotes || '',
        tbwl: w && v.month > 0 ? calcTbwl(w) : (v.month === 0 ? '0' : null),
        hasData: visitHasData(v.month),
      };
    });
  }

  function getCompletedCount() {
    return JOURNEY_VISITS.filter(v => visitHasData(v.month)).length;
  }

  function getNextVisitMonth() {
    const next = JOURNEY_VISITS.find(v => !visitHasData(v.month));
    return next ? next.month : null;
  }

  function persistVisits() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        const payload = {
          patientName: getPatientName(),
          activeVisitMonth: activeMonth,
          visits: collectAllVisits(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(VISIT_KEY, JSON.stringify(payload));
        updateStatusBadge();
        updateNavIndicators();
        renderProgressDashboard();
      } catch (_) {}
    }, 400);
  }

  function loadVisits() {
    try {
      let raw = localStorage.getItem(VISIT_KEY);
      if (!raw) {
        const legacy = localStorage.getItem('obesityWinnerForm_v2');
        if (legacy) {
          const old = JSON.parse(legacy);
          if (old.visits && Object.keys(old.visits).length) {
            visitDataCache = old.visits;
            if (typeof old.activeVisitMonth === 'number') activeMonth = old.activeVisitMonth;
            persistVisits();
            return;
          }
        }
        return;
      }
      const data = JSON.parse(raw);
      visitDataCache = data.visits || {};
      if (typeof data.activeVisitMonth === 'number') activeMonth = data.activeVisitMonth;
    } catch (_) {}
  }

  function updateStatusBadge() {
    const el = $('journeyStatus');
    if (!el) return;
    const done = getCompletedCount();
    const next = getNextVisitMonth();
    el.textContent = `${done}/19 visits logged` + (next !== null ? ` · Next: M${next}` : ' · Journey complete');
  }

  function buildNavigator() {
    const nav = $('visitNav');
    if (!nav) return;
    nav.innerHTML = JOURNEY_VISITS.map(v => {
      const done = visitHasData(v.month);
      return `
      <button type="button" class="visit-pill phase-${v.phase}${v.month === activeMonth ? ' active' : ''}${done ? ' done' : ''}"
        data-month="${v.month}" onclick="JourneyVisits.showVisit(${v.month})" title="${escapeHtml(v.title)}">
        M${v.month}${done ? '<span class="visit-done-dot" aria-hidden="true"></span>' : ''}
      </button>`;
    }).join('');
  }

  function updateNavIndicators() {
    document.querySelectorAll('.visit-pill').forEach(btn => {
      const m = parseInt(btn.dataset.month, 10);
      const done = visitHasData(m);
      btn.classList.toggle('done', done);
      let dot = btn.querySelector('.visit-done-dot');
      if (done && !dot) {
        dot = document.createElement('span');
        dot.className = 'visit-done-dot';
        dot.setAttribute('aria-hidden', 'true');
        btn.appendChild(dot);
      } else if (!done && dot) {
        dot.remove();
      }
    });
    updateStatusBadge();
  }

  function renderWeightSparkline(summaries) {
    const points = summaries.filter(s => s.weightNum !== null);
    if (points.length < 2) return '<p class="spark-empty">Add weight at 2+ visits to see trend.</p>';
    const weights = points.map(p => p.weightNum);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = max - min || 1;
    const w = 280;
    const h = 60;
    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p.weightNum - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    }).join(' ');
    return `<svg class="weight-sparkline" viewBox="0 0 ${w} ${h}" width="100%" height="${h}"><polyline fill="none" stroke="#0d9488" stroke-width="2.5" points="${coords}"/></svg>`;
  }

  function renderProgressDashboard() {
    const panel = $('journeyProgressPanel');
    if (!panel) return;
    const summaries = getVisitSummaries();
    const done = getCompletedCount();
    const next = getNextVisitMonth();
    const base = getBaselineWeight();
    const latest = [...summaries].reverse().find(s => s.weightNum !== null);
    const latestTbwl = latest && latest.month > 0 ? calcTbwl(latest.weightNum) : null;

    let rows = summaries.map(s => `
      <tr class="${s.hasData ? 'row-done' : 'row-pending'}">
        <td><strong>M${s.month}</strong></td>
        <td>${escapeHtml(s.title)}</td>
        <td>${s.date || '—'}</td>
        <td>${s.weight || '—'}</td>
        <td>${s.tbwl !== null && s.tbwl !== undefined ? s.tbwl + '%' : '—'}</td>
        <td>${s.dietScore || '—'}</td>
        <td>${s.exerciseScore || '—'}</td>
        <td>${s.hasData ? '✓' : '—'}</td>
      </tr>
    `).join('');

    panel.innerHTML = `
      <div class="progress-stats">
        <div class="stat-card"><span class="stat-val">${done}/19</span><span class="stat-lbl">Visits Logged</span></div>
        <div class="stat-card"><span class="stat-val">${base ? base + ' kg' : '—'}</span><span class="stat-lbl">Baseline (M0)</span></div>
        <div class="stat-card"><span class="stat-val">${latest ? latest.weight : '—'}</span><span class="stat-lbl">Latest Weight</span></div>
        <div class="stat-card"><span class="stat-val">${latestTbwl ? latestTbwl + '%' : '—'}</span><span class="stat-lbl">TBWL</span></div>
        <div class="stat-card stat-next"><span class="stat-val">${next !== null ? 'M' + next : 'Done'}</span><span class="stat-lbl">Next Visit</span></div>
      </div>
      <div class="spark-wrap">${renderWeightSparkline(summaries)}</div>
      <div class="progress-table-wrap">
        <table class="progress-table">
          <thead><tr><th>Month</th><th>Assessment</th><th>Date</th><th>Weight</th><th>TBWL</th><th>Diet</th><th>Exercise</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="progress-actions">
        ${next !== null ? `<button type="button" class="btn-progress" onclick="JourneyVisits.showVisit(${next})">Go to Next Visit (M${next})</button>` : ''}
        <button type="button" class="btn-progress primary" onclick="JourneyVisits.generateProgressReport()">Generate Progress Report</button>
        <button type="button" class="btn-progress" onclick="JourneyVisits.printProgressReport()">Print Progress Report</button>
      </div>
      <div id="progressReportOutput" class="progress-report-output" style="display:none"></div>
    `;
  }

  function generateProgressReport() {
    const out = $('progressReportOutput');
    if (!out) return;
    const summaries = getVisitSummaries();
    const name = getPatientName();
    const done = getCompletedCount();
    const base = getBaselineWeight();
    const latest = [...summaries].reverse().find(s => s.weightNum !== null);

    let visitBlocks = summaries.filter(s => s.hasData).map(s => {
      const visit = JOURNEY_VISITS.find(v => v.month === s.month);
      return `
        <div class="report-visit-block">
          <h4>Month ${s.month} — ${escapeHtml(visit.title)}</h4>
          <p><strong>Date:</strong> ${s.date || '—'} &nbsp;|&nbsp; <strong>Weight:</strong> ${s.weight || '—'}${s.tbwl ? ' (' + s.tbwl + '% TBWL)' : ''} &nbsp;|&nbsp; <strong>BP:</strong> ${s.bp || '—'}</p>
          <p><strong>GLP-1:</strong> ${s.dose || '—'} &nbsp;|&nbsp; <strong>Diet:</strong> ${s.dietScore || '—'}/10 &nbsp;|&nbsp; <strong>Exercise:</strong> ${s.exerciseScore || '—'}/10</p>
          ${s.notes ? '<p><strong>Notes:</strong> ' + escapeHtml(s.notes) + '</p>' : ''}
          <p class="report-insight"><em>${escapeHtml(visit.insight.clinician)}</em></p>
        </div>`;
    }).join('');

    out.innerHTML = `
      <div class="report-document" id="progressReportDoc">
        <div class="report-header">
          <h3>36-Month Journey — Progress Report</h3>
          <p><strong>Patient:</strong> ${escapeHtml(name)} &nbsp;|&nbsp; <strong>Generated:</strong> ${new Date().toLocaleDateString()} &nbsp;|&nbsp; <strong>Visits logged:</strong> ${done}/19</p>
          <p><strong>Baseline weight (M0):</strong> ${base ? base + ' kg' : '—'} &nbsp;|&nbsp; <strong>Latest weight:</strong> ${latest ? latest.weight : '—'}${latest && latest.tbwl ? ' (' + latest.tbwl + '% TBWL)' : ''}</p>
        </div>
        ${visitBlocks || '<p>No visit data entered yet. Log data visit-by-visit to generate a full report.</p>'}
        <div class="report-footer">Panini Chronic Weight Management · 3-Year Obesity Winner Program</div>
      </div>`;
    out.style.display = 'block';
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function printProgressReport() {
    generateProgressReport();
    document.body.classList.add('print-progress-report');
    window.print();
    window.addEventListener('afterprint', () => document.body.classList.remove('print-progress-report'), { once: true });
  }

  function prefillFromPriorVisit(month) {
    const wrap = document.querySelector(`.visit-form-wrap[data-visit-wrap="${month}"]`);
    if (!wrap) return;
    const weightEl = wrap.querySelector('[data-visit-core="weight"]');
    if (!weightEl || weightEl.value) return;
    const prior = [...JOURNEY_VISITS].reverse().find(v => v.month < month && visitHasData(v.month));
    if (!prior) return;
    const pw = visitDataCache[String(prior.month)]?.core?.weight;
    if (pw) weightEl.placeholder = `Last visit M${prior.month}: ${pw} kg`;
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
    prefillFromPriorVisit(month);
    persistVisits();
  }

  function onVisitInput() {
    saveCurrentToCache();
    persistVisits();
    renderProgressDashboard();
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

  function bindVisitEvents() {
    const container = $('visitFormContainer');
    if (!container) return;
    container.querySelectorAll('[data-visit-month]').forEach(el => {
      el.addEventListener('input', onVisitInput);
      el.addEventListener('change', onVisitInput);
    });
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
    updateNavIndicators();
    renderProgressDashboard();
  }

  function init() {
    if (typeof JOURNEY_VISITS === 'undefined') return;
    loadVisits();
    buildNavigator();
    renderAllVisitForms();
    restoreVisits(visitDataCache);
    showVisit(activeMonth);
    const pname = document.getElementById('pname');
    if (pname) pname.addEventListener('input', persistVisits);
    window.addEventListener('beforeprint', () => {
      if (document.body.classList.contains('print-progress-report')) return;
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
    generateProgressReport,
    printProgressReport,
    getCompletedCount,
    getNextVisitMonth,
  };
})();
