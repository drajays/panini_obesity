/**
 * Floating print button for module pages (works standalone or in iframe)
 */
(function () {
  if (window.self !== window.top) {
    document.documentElement.classList.add('embedded-module');
  }

  const style = document.createElement('style');
  style.textContent = `
    .panini-print-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
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
    .embedded-module .toolbar .btn.solid { display: none !important; }
    @media print {
      .panini-print-fab { display: none !important; }
    }
    @media (max-width: 600px) {
      .panini-print-fab { padding: 12px 14px; font-size: 13px; }
      .panini-print-fab .label { display: none; }
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'panini-print-fab';
  btn.setAttribute('aria-label', 'Print this form');
  btn.innerHTML = '<span aria-hidden="true">🖨️</span><span class="label">Print / PDF</span>';
  btn.addEventListener('click', () => window.print());

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(btn);
  });
})();
