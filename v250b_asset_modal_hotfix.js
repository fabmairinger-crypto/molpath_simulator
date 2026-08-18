/* MolPath Simulator v2.5.0b — isolated in-app asset modal hotfix
   Scope: image asset links only. Does NOT wrap render(), alter responsive shell,
   change version stamps, case logic, i18n, or global layout. */
(function () {
  'use strict';

  const ID = 'mpAssetModalHotfix';
  let overlay = null;
  let image = null;
  let title = null;
  let closeButton = null;
  let historyEntry = false;
  let lastFocus = null;

  function isLocalImageAssetLink(a) {
    if (!a || !a.querySelector('img')) return false;
    const raw = (a.getAttribute('href') || '').trim();
    if (!raw) return false;
    const isImage = /\.(?:png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(raw);
    const isAsset = /(?:^|\/)assets\//i.test(raw) || /\/assets\//i.test(a.href || '');
    return isImage && isAsset;
  }

  function getLabel(a) {
    const container = a.closest('figure,.mp24-asset,.lab24-media,.res24i-media,[class*="-asset"],[class*="-media"]');
    if (container) {
      const cap = container.querySelector('figcaption,.mp24-asset-title');
      if (cap && cap.textContent.trim()) return cap.textContent.trim();
    }
    const img = a.querySelector('img');
    return (img && img.alt) || a.title || 'Asset';
  }

  function ensureModal() {
    if (overlay) return;

    const style = document.createElement('style');
    style.id = ID + 'Style';
    style.textContent = `
#${ID}{position:fixed;inset:0;z-index:2147483000;display:none;align-items:stretch;justify-content:stretch;background:rgba(5,15,28,.88);padding:clamp(6px,2vw,18px);}
#${ID}.is-open{display:flex;}
#${ID} .mpam-dialog{position:relative;display:flex;flex-direction:column;min-width:0;min-height:0;width:100%;height:100%;max-width:1500px;max-height:1100px;margin:auto;background:#0b1524;border:1px solid rgba(255,255,255,.18);border-radius:16px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.45);}
#${ID} .mpam-head{display:flex;align-items:center;gap:10px;flex:0 0 auto;min-width:0;padding:7px 8px 7px 13px;background:#102239;border-bottom:1px solid rgba(255,255,255,.14);color:#fff;}
#${ID} .mpam-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.9rem;font-weight:800;}
#${ID} .mpam-close{flex:0 0 auto;width:42px;height:42px;margin:0;padding:0;border:1px solid rgba(255,255,255,.28);border-radius:11px;background:rgba(255,255,255,.08);color:#fff;font:700 26px/1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer;}
#${ID} .mpam-stage{flex:1 1 auto;min-width:0;min-height:0;overflow:auto;display:flex;align-items:center;justify-content:center;padding:8px;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y pinch-zoom;}
#${ID} .mpam-image{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;background:#fff;border-radius:6px;}
@media(max-width:760px){#${ID}{padding:0;}#${ID} .mpam-dialog{max-width:none;max-height:none;border:0;border-radius:0;}#${ID} .mpam-head{padding-left:10px;}#${ID} .mpam-stage{padding:4px;}}
`;
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.id = ID;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="mpam-dialog" role="dialog" aria-modal="true" aria-labelledby="mpamTitle"><div class="mpam-head"><div class="mpam-title" id="mpamTitle">Asset</div><button type="button" class="mpam-close" aria-label="Schließen" title="Schließen">×</button></div><div class="mpam-stage"><img class="mpam-image" alt=""></div></div>';
    document.body.appendChild(overlay);

    image = overlay.querySelector('.mpam-image');
    title = overlay.querySelector('.mpam-title');
    closeButton = overlay.querySelector('.mpam-close');

    closeButton.addEventListener('click', requestClose);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) requestClose();
    });
  }

  function openModal(src, label) {
    ensureModal();
    lastFocus = document.activeElement;
    title.textContent = label || 'Asset';
    image.src = src;
    image.alt = label || 'Asset';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    try { closeButton.focus({ preventScroll: true }); } catch (_) { closeButton.focus(); }

    if (!historyEntry) {
      try {
        history.pushState({ mpAssetModal: true }, '');
        historyEntry = true;
      } catch (_) {
        historyEntry = false;
      }
    }
  }

  function closeModal() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    image.removeAttribute('src');
    historyEntry = false;
    try {
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    } catch (_) {}
  }

  function requestClose() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    if (historyEntry) {
      try { history.back(); return; } catch (_) {}
    }
    closeModal();
  }

  document.addEventListener('click', function (e) {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!isLocalImageAssetLink(a)) return;
    e.preventDefault();
    openModal(a.href || a.getAttribute('href'), getLabel(a));
  }, true);

  window.addEventListener('popstate', function () {
    if (overlay && overlay.classList.contains('is-open')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      e.preventDefault();
      requestClose();
    }
  });

  window.MolPathAssetModalHotfix = Object.freeze({
    base: 'v2.5.0b',
    close: requestClose
  });
})();
