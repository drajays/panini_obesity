/**
 * Floating print button for module pages (standalone only — app shell has topbar print)
 */
(function () {
  const isEmbedded = window.self !== window.top;

  if (isEmbedded) {
    document.documentElement.classList.add('embedded-module');
  }

  const style = document.createElement('style');
  style.textContent = `
    .panini-print-fab {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9000;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      border: none;
      border-radius: 999px;
      background: #1e40af;
      color: #fff;
      font-size: 14px;
      font-weight: 650;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(30, 64, 175, 0.35);
      transition: transform 0.15s, background 0.15s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .panini-print-fab:hover {
      background: #1e3a8a;
      transform: translateY(-2px);
    }
    body.has-panini-fab {
      padding-bottom: 72px;
    }
    .embedded-module .toolbar .btn.solid { display: none !important; }
    .embedded-module button[onclick="triggerPrintMode()"] { display: none !important; }
    .embedded-module .panini-print-fab { display: none !important; }
    @media print {
      .panini-print-fab { display: none !important; }
      body.has-panini-fab { padding-bottom: 0; }
    }
    @media (max-width: 600px) {
      .panini-print-fab { padding: 12px 14px; font-size: 13px; left: 16px; bottom: 16px; }
      .panini-print-fab .label { display: none; }
    }
  `;
  document.head.appendChild(style);

  if (isEmbedded) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'panini-print-fab';
  btn.setAttribute('aria-label', 'Print this form');

  function doPrint() {
    if (typeof window.triggerPrintMode === 'function') window.triggerPrintMode();
    else window.print();
  }

  btn.addEventListener('click', doPrint);

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.triggerPrintMode === 'function') {
      btn.innerHTML = '<span aria-hidden="true">🖨️</span><span class="label">Print Report</span>';
    } else {
      btn.innerHTML = '<span aria-hidden="true">🖨️</span><span class="label">Print / PDF</span>';
    }
    document.body.classList.add('has-panini-fab');
    document.body.appendChild(btn);
  });
})();
