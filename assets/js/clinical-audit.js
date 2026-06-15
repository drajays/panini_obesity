/**
 * Clinical Input Audit & Simulator — OCI scoring and trajectory projection
 */
const ClinicalAudit = (function () {
  const STORAGE_PREFIX = 'paniniAudit_';
  const labels = ['Month 0', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'];
  const dataA = [0, -7.5, -14.0, -18.5, -21.5, -23.5, -24.5, -25.0, -25.0];
  const dataB = [0, -6.0, -11.5, -14.0, -15.0, -15.0, -14.8, -14.5, -14.5];
  const dataC = [0, -4.0, -6.0, -5.5, -3.0, -0.5, 1.5, 2.0, 2.0];

  let currentUnit = 'kg';
  let auditChart = null;
  let activePatientId = null;

  function $(id) { return document.getElementById(id); }

  function getActivePatientId() {
    if (activePatientId) return activePatientId;
    if (window.PatientStore) return PatientStore.getActiveId();
    try { return localStorage.getItem('paniniActivePatientId'); } catch (_) { return null; }
  }

  function storageKey(id) { return STORAGE_PREFIX + (id || 'default'); }

  function collectInputs() {
    return {
      unit: currentUnit,
      ibw: parseFloat($('inputIBW').value),
      protein: parseFloat($('inputProtein').value),
      resistance: parseInt($('inputResistance').value, 10),
      cardio: parseInt($('inputCardio').value, 10),
      steps: parseInt($('inputSteps').value, 10),
      medAdherence: parseInt($('inputMedAdherence').value, 10),
      followup: parseInt($('inputFollowup').value, 10),
    };
  }

  function applyInputs(data) {
    if (!data) return;
    if (data.unit) setUnit(data.unit, true);
    if (data.ibw != null) $('inputIBW').value = data.ibw;
    if (data.protein != null) $('inputProtein').value = data.protein;
    if (data.resistance != null) $('inputResistance').value = data.resistance;
    if (data.cardio != null) $('inputCardio').value = data.cardio;
    if (data.steps != null) $('inputSteps').value = data.steps;
    if (data.medAdherence != null) $('inputMedAdherence').value = data.medAdherence;
    if (data.followup != null) $('inputFollowup').value = data.followup;
  }

  function saveInputs() {
    const id = getActivePatientId();
    try {
      localStorage.setItem(storageKey(id), JSON.stringify(collectInputs()));
    } catch (_) {}
  }

  function loadSavedInputs() {
    const id = getActivePatientId();
    try {
      const raw = localStorage.getItem(storageKey(id));
      if (raw) applyInputs(JSON.parse(raw));
    } catch (_) {}
  }

  function seedFromPatientRecord() {
    if (!window.PatientStore) return;
    const record = PatientStore.getRecord();
    if (!record) return;

    const visits = record.visits || {};
    const months = Object.keys(visits).map(Number).sort((a, b) => b - a);
    for (const month of months) {
      const v = visits[String(month)];
      if (!v) continue;
      const fields = v.fields || {};
      const core = v.core || {};
      if (fields.proteinTarget && !$('inputProtein').dataset.userEdited) {
        const p = parseInt(fields.proteinTarget, 10);
        if (p >= 30 && p <= 180) $('inputProtein').value = p;
      }
      if (core.exerciseScore) {
        const ex = parseInt(core.exerciseScore, 10);
        if (ex >= 0 && ex <= 10) {
          $('inputResistance').value = ex >= 7 ? 3 : ex >= 4 ? 2 : ex >= 2 ? 1 : 0;
          $('inputCardio').value = Math.min(300, Math.max(0, ex * 20));
        }
      }
      if (core.dietScore) {
        const diet = parseInt(core.dietScore, 10);
        if (diet >= 0 && diet <= 10 && diet < 6) {
          const med = parseInt($('inputMedAdherence').value, 10);
          if (med > 70) $('inputMedAdherence').value = Math.max(60, med - (6 - diet) * 5);
        }
      }
      break;
    }

    const program = record.program || {};
    const metrics = program.tableInputs || [];
    const weight = parseFloat(metrics[0]);
    if (weight && weight > 40 && weight < 200 && !$('inputIBW').dataset.userEdited) {
      const target = Math.round(weight * 0.85);
      if (currentUnit === 'kg') {
        $('inputIBW').value = Math.min(150, Math.max(40, target));
      }
    }
  }

  function setUnit(unit, silent) {
    currentUnit = unit;
    const kgBtn = $('unitKg');
    const lbsBtn = $('unitLbs');
    if (kgBtn) kgBtn.className = `px-2 py-0.5 rounded ${unit === 'kg' ? 'bg-white text-slate-800 shadow-sm' : ''}`;
    if (lbsBtn) lbsBtn.className = `px-2 py-0.5 rounded ${unit === 'lbs' ? 'bg-white text-slate-800 shadow-sm' : ''}`;

    const ibwSlider = $('inputIBW');
    if (!ibwSlider) return;
    if (unit === 'kg') {
      ibwSlider.min = 40;
      ibwSlider.max = 150;
      if (!silent) ibwSlider.value = Math.round(parseFloat(ibwSlider.value) * 0.453592) || 70;
    } else {
      ibwSlider.min = 90;
      ibwSlider.max = 330;
      if (!silent) ibwSlider.value = Math.round(parseFloat(ibwSlider.value) / 0.453592) || 154;
    }
    document.querySelectorAll('.unitText').forEach((el) => { el.innerText = unit; });
    if (!silent) calculateAndRender();
  }

  function resetInputs() {
    setUnit('kg', true);
    $('inputIBW').value = 70;
    $('inputProtein').value = 60;
    $('inputResistance').value = 1;
    $('inputCardio').value = 60;
    $('inputSteps').value = 6500;
    $('inputMedAdherence').value = 80;
    $('inputFollowup').value = 70;
    delete $('inputIBW').dataset.userEdited;
    delete $('inputProtein').dataset.userEdited;
    calculateAndRender();
  }

  function initChart() {
    const canvas = $('auditChart');
    if (!canvas || typeof Chart === 'undefined') return;
    const ctx = canvas.getContext('2d');
    auditChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Scenario A (Optimized)', data: dataA, borderColor: 'rgba(22, 163, 74, 0.4)', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.3 },
          { label: 'Scenario B (Average)', data: dataB, borderColor: 'rgba(202, 138, 4, 0.4)', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.3 },
          { label: 'Scenario C (Relapse)', data: dataC, borderColor: 'rgba(220, 38, 38, 0.4)', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.3 },
          {
            label: "Patient's Projected Trajectory",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: '#0284c7',
            borderWidth: 4,
            borderDash: [6, 6],
            backgroundColor: 'rgba(2, 132, 199, 0.05)',
            pointBackgroundColor: '#0284c7',
            pointRadius: 5,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { font: { family: 'Plus Jakarta Sans', size: 10, weight: 600 }, usePointStyle: true, pointStyle: 'circle', padding: 12 },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans' },
          },
        },
        scales: {
          y: {
            ticks: { callback: (val) => val + '%', color: '#475569', font: { family: 'Plus Jakarta Sans' } },
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            suggestedMin: -28,
            suggestedMax: 5,
          },
          x: { grid: { display: false }, ticks: { color: '#475569', font: { family: 'Plus Jakarta Sans' } } },
        },
      },
    });
  }

  function calculateAndRender() {
    const ibw = parseFloat($('inputIBW').value);
    const protein = parseFloat($('inputProtein').value);
    const resistance = parseInt($('inputResistance').value, 10);
    const cardio = parseInt($('inputCardio').value, 10);
    const steps = parseInt($('inputSteps').value, 10);
    const medAdherence = parseInt($('inputMedAdherence').value, 10);
    const followup = parseInt($('inputFollowup').value, 10);

    $('valIBW').innerText = ibw;
    $('valProtein').innerText = protein;
    $('valResistance').innerText = resistance;
    $('valCardio').innerText = cardio;
    $('valSteps').innerText = steps.toLocaleString();
    $('valMedAdherence').innerText = medAdherence;
    $('valFollowup').innerText = followup;

    const ibwInKg = currentUnit === 'lbs' ? ibw * 0.453592 : ibw;
    const proteinGK = protein / ibwInKg;
    $('valProteinGK').innerText = proteinGK.toFixed(2);

    const proteinBadge = $('proteinGKBadge');
    if (proteinGK >= 1.2) {
      proteinBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-100 flex items-center gap-1';
    } else if (proteinGK >= 0.8) {
      proteinBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100 flex items-center gap-1';
    } else {
      proteinBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-100 flex items-center gap-1';
    }

    let proteinScore = proteinGK >= 1.2 ? 100 : proteinGK >= 0.8 ? 60 + 40 * ((proteinGK - 0.8) / 0.4) : 100 * (proteinGK / 0.8);
    let resistanceScore = resistance >= 2 ? 100 : resistance === 1 ? 50 : 0;
    let medScore = medAdherence >= 95 ? 100 : medAdherence >= 80 ? 60 + 40 * ((medAdherence - 80) / 15) : 100 * (medAdherence / 80);
    const stepScore = steps >= 8000 ? 100 : steps >= 5000 ? 60 + 40 * ((steps - 5000) / 3000) : 100 * (steps / 5000);
    const cardioScore = cardio >= 150 ? 100 : cardio >= 75 ? 50 + 50 * ((cardio - 75) / 75) : 100 * (cardio / 150);
    const exerciseScore = (stepScore + cardioScore) / 2;
    const followupScore = followup >= 90 ? 100 : followup >= 60 ? 60 + 40 * ((followup - 60) / 30) : 100 * (followup / 60);

    const oci = Math.round(0.25 * proteinScore + 0.20 * resistanceScore + 0.20 * medScore + 0.20 * exerciseScore + 0.15 * followupScore);

    $('scoreText').innerText = oci + '%';
    const circleCircumference = 301.6;
    const scoreRing = $('scoreRing');
    scoreRing.setAttribute('stroke-dashoffset', circleCircumference - (oci / 100) * circleCircumference);

    const badge = $('alignmentBadge');
    let prescriptionHTML = '';
    let description = '';

    if (oci >= 75) {
      scoreRing.setAttribute('stroke', '#16a34a');
      badge.className = 'px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-green-50 text-green-700 border border-green-200 flex items-center gap-1.5 uppercase tracking-wide';
      badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Optimized Alignment';
      description = 'Exceptional. The patient is executing high adherence across dietary protein, structured load training, and clinical compliance. They are on a sustainable, high-loss trajectory, minimizing muscle depletion and preserving the resting metabolic rate (RMR).';
    } else if (oci >= 40) {
      scoreRing.setAttribute('stroke', '#ca8a04');
      badge.className = 'px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1.5 uppercase tracking-wide';
      badge.innerHTML = '<i class="fa-solid fa-person-running"></i> Expected / Standard Path';
      description = 'The patient exhibits average adherence. They rely heavily on the drug\'s volumetric calorie-suppressive effects. Due to missing muscle-preservation protocols (protein and lifting deficits), they are highly susceptible to hitting a hard weight plateau at Month 9-12.';
    } else {
      scoreRing.setAttribute('stroke', '#dc2626');
      badge.className = 'px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5 uppercase tracking-wide';
      badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Relapse / Non-Responder Risk';
      description = 'ALERT: Critical input deficits. The patient risks early weight plateaus, critical lean muscle loss, and high relapse/regain if the pharmacotherapy is discontinued or dose-capped due to low behavioral foundations.';
    }

    $('complianceDescription').innerText = description;

    if (proteinGK < 1.2) {
      const recommendedMinProtein = Math.round(1.2 * ibwInKg);
      prescriptionHTML += `<div class="flex items-start gap-3 bg-red-50/50 border border-red-100 p-3 rounded-xl text-xs text-red-900">
        <i class="fa-solid fa-shrimp text-lg text-red-600 mt-0.5"></i>
        <div><p class="font-bold">CRITICAL: Insufficient Protein Target (${proteinGK.toFixed(2)}g/kg)</p>
        <p class="mt-0.5 text-red-700">Action: Increase protein intake to at least <strong class="font-bold">${recommendedMinProtein}g/day</strong> (current: ${protein}g/day). Sarcopenic fat loss occurs rapidly when protein is below 1.2g/kg under GLP-1 restriction.</p></div></div>`;
    } else {
      prescriptionHTML += `<div class="flex items-start gap-3 bg-green-50/50 border border-green-100 p-3 rounded-xl text-xs text-green-900">
        <i class="fa-solid fa-circle-check text-lg text-green-600 mt-0.5"></i>
        <div><p class="font-bold">OPTIMAL: High Protein Target Maintained (${proteinGK.toFixed(2)}g/kg)</p>
        <p class="mt-0.5 text-green-700">Excellent macros support lean body mass retention and keep Resting Metabolic Rate optimized.</p></div></div>`;
    }

    if (resistance < 2) {
      prescriptionHTML += `<div class="flex items-start gap-3 bg-yellow-50/50 border border-yellow-100 p-3 rounded-xl text-xs text-yellow-900">
        <i class="fa-solid fa-dumbbell text-lg text-yellow-600 mt-0.5"></i>
        <div><p class="font-bold">WARNING: Insufficient Resistance Training</p>
        <p class="mt-0.5 text-yellow-700">Action: Introduce structured resistance training <strong class="font-bold">2 to 3 days/week</strong>. Incretin-induced weight loss depletes skeletal muscle without load stress signaling.</p></div></div>`;
    } else {
      prescriptionHTML += `<div class="flex items-start gap-3 bg-green-50/50 border border-green-100 p-3 rounded-xl text-xs text-green-900">
        <i class="fa-solid fa-circle-check text-lg text-green-600 mt-0.5"></i>
        <div><p class="font-bold">OPTIMAL: Resistance Protocol Verified (${resistance} days/week)</p>
        <p class="mt-0.5 text-green-700">Adequate physical load acts as a protective barrier, limiting muscle wasting and safeguarding functional vitality.</p></div></div>`;
    }

    if (medAdherence < 80) {
      prescriptionHTML += `<div class="flex items-start gap-3 bg-red-50/50 border border-red-100 p-3 rounded-xl text-xs text-red-900">
        <i class="fa-solid fa-prescription-bottle-medical text-lg text-red-600 mt-0.5"></i>
        <div><p class="font-bold">CRITICAL: Unstable Medication Adherence (${medAdherence}%)</p>
        <p class="mt-0.5 text-red-700">Audit potential gastrointestinal side-effects causing missed or postponed doses. Do not titrate up until compliance is stable.</p></div></div>`;
    }

    if (followup < 75) {
      prescriptionHTML += `<div class="flex items-start gap-3 bg-yellow-50/50 border border-yellow-100 p-3 rounded-xl text-xs text-yellow-900">
        <i class="fa-solid fa-calendar-xmark text-lg text-yellow-600 mt-0.5"></i>
        <div><p class="font-bold">ADHERENCE ALERT: Clinical Follow-up Deficit (${followup}%)</p>
        <p class="mt-0.5 text-yellow-700">The monthly virtual or clinic engagement rate is critically linked to maintaining behavioral anchors. Increase virtual support touchpoints.</p></div></div>`;
    }

    $('prescriptionList').innerHTML = prescriptionHTML;

    const patientId = getActivePatientId();
    const printId = $('printPatientId');
    if (printId) printId.innerText = patientId || '___________________________';
    $('printIBW').innerText = `${ibw} ${currentUnit}`;
    $('printProteinGK').innerText = `${proteinGK.toFixed(2)} g/kg IBW`;

    const customProjectedData = [];
    for (let i = 0; i < labels.length; i++) {
      let weightA = 0;
      let weightC = 0;
      let weightB = 0;
      if (oci >= 50) {
        weightA = (oci - 50) / 50;
        weightB = 1.0 - weightA;
      } else {
        weightC = (50 - oci) / 50;
        weightB = 1.0 - weightC;
      }
      customProjectedData.push(parseFloat(((weightA * dataA[i]) + (weightB * dataB[i]) + (weightC * dataC[i])).toFixed(1)));
    }

    if (auditChart) {
      auditChart.data.datasets[3].data = customProjectedData;
      auditChart.update();
    }

    saveInputs();
  }

  function bindInputs() {
    ['inputIBW', 'inputProtein'].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener('input', () => { el.dataset.userEdited = '1'; calculateAndRender(); });
    });
    ['inputResistance', 'inputCardio', 'inputSteps', 'inputMedAdherence', 'inputFollowup'].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener('input', calculateAndRender);
    });
  }

  function onPatientId(id) {
    activePatientId = id || null;
    loadSavedInputs();
    if (window.PatientStore && id) {
      PatientStore.loadPatient(id).then(() => {
        seedFromPatientRecord();
        calculateAndRender();
      });
    } else {
      calculateAndRender();
    }
  }

  function init() {
    if (window.parent !== window) document.body.classList.add('in-iframe');
    const printDate = $('printDate');
    if (printDate) {
      printDate.innerText = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    initChart();
    bindInputs();
    loadSavedInputs();
    if (window.PatientStore && PatientStore.getActiveId()) {
      onPatientId(PatientStore.getActiveId());
    } else {
      calculateAndRender();
    }
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'panini-set-patient-id') onPatientId(e.data.id);
    });
  }

  window.setUnit = (unit) => setUnit(unit);
  window.resetInputs = resetInputs;
  window.calculateAndRender = calculateAndRender;
  window.triggerPrintMode = () => window.print();

  return { init, calculateAndRender, resetInputs, setUnit };
})();
