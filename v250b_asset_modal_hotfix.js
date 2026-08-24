/* MolPath Simulator v2.5.0b — robust in-app asset viewer / ESCAPER v2
   Scope: local image asset links only. Provides a persistent visible close control,
   Escape-key close, and backdrop close. No history/back dependency. */
(function () {
  'use strict';

  const ID = 'mpAssetModalHotfix';
  let overlay = null;
  let image = null;
  let title = null;
  let closeButton = null;
  let lastFocus = null;
  let previousOverflow = '';

  function isLocalImageAssetLink(a) {
    if (!a) return false;
    const raw = (a.getAttribute('href') || '').trim();
    if (!raw) return false;
    const isImage = /\.(?:png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(raw);
    const isAsset = /(?:^|\/)assets\//i.test(raw) || /\/assets\//i.test(a.href || '');
    return isImage && isAsset;
  }

  function getLabel(a) {
    const explicit = a && a.getAttribute('data-asset-title');
    if (explicit) return explicit;
    const container = a && a.closest ? a.closest('figure,.mp24-asset,.lab24-media,.res24i-media,[class*="-asset"],[class*="-media"]') : null;
    if (container) {
      const cap = container.querySelector('figcaption,.mp24-asset-title');
      if (cap && cap.textContent.trim()) return cap.textContent.trim();
    }
    const img = a && a.querySelector ? a.querySelector('img') : null;
    return (img && img.alt) || (a && a.title) || 'Asset';
  }

  function ensureModal() {
    if (overlay && document.body.contains(overlay)) return;

    if (!document.getElementById(ID + 'Style')) {
      const style = document.createElement('style');
      style.id = ID + 'Style';
      style.textContent = `
#${ID}{position:fixed;inset:0;z-index:2147483600;display:none;align-items:center;justify-content:center;background:rgba(3,12,24,.92);padding:14px;box-sizing:border-box;}
#${ID}.is-open{display:flex;}
#${ID} .mpam-dialog{position:relative;display:flex;flex-direction:column;width:min(96vw,1600px);height:min(95vh,1100px);min-width:0;min-height:0;background:#081522;border:1px solid rgba(255,255,255,.22);border-radius:16px;overflow:hidden;box-shadow:0 28px 90px rgba(0,0,0,.58);}
#${ID} .mpam-head{display:flex;align-items:center;gap:12px;flex:0 0 auto;min-height:58px;padding:7px 8px 7px 16px;background:#10263e;border-bottom:1px solid rgba(255,255,255,.15);color:#fff;}
#${ID} .mpam-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:800 .95rem/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;}
#${ID} .mpam-close{position:relative;z-index:3;display:inline-flex;align-items:center;justify-content:center;gap:7px;flex:0 0 auto;height:44px;min-width:122px;padding:0 14px;border:2px solid rgba(255,255,255,.8);border-radius:12px;background:#b42318;color:#fff;font:900 15px/1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.25);}
#${ID} .mpam-close:hover,#${ID} .mpam-close:focus{background:#d92d20;outline:3px solid rgba(255,255,255,.3);outline-offset:1px;}
#${ID} .mpam-x{font-size:24px;line-height:1;transform:translateY(-1px);}
#${ID} .mpam-stage{flex:1 1 auto;min-width:0;min-height:0;overflow:auto;display:flex;align-items:center;justify-content:center;padding:8px;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y pinch-zoom;}
#${ID} .mpam-image{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;background:#fff;border-radius:6px;}
#${ID} .mpam-float-close{display:none;}
@media(max-width:760px){#${ID}{padding:0;}#${ID} .mpam-dialog{width:100vw;height:100vh;border:0;border-radius:0;}#${ID} .mpam-head{min-height:54px;padding-left:10px;}#${ID} .mpam-close{min-width:48px;width:48px;padding:0;font-size:0;}#${ID} .mpam-x{font-size:27px;}#${ID} .mpam-stage{padding:4px;}}
`;
      document.head.appendChild(style);
    }

    overlay = document.createElement('div');
    overlay.id = ID;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="mpam-dialog" role="dialog" aria-modal="true" aria-labelledby="mpamTitle"><div class="mpam-head"><div class="mpam-title" id="mpamTitle">Asset</div><button type="button" class="mpam-close" aria-label="Asset schließen" title="Schließen (Esc)"><span class="mpam-x" aria-hidden="true">×</span><span>Schließen</span></button></div><div class="mpam-stage"><img class="mpam-image" alt=""></div></div>';
    document.body.appendChild(overlay);

    image = overlay.querySelector('.mpam-image');
    title = overlay.querySelector('.mpam-title');
    closeButton = overlay.querySelector('.mpam-close');

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  }

  function openModal(src, label) {
    ensureModal();
    lastFocus = document.activeElement;
    title.textContent = label || 'Asset';
    image.src = src;
    image.alt = label || 'Asset';
    previousOverflow = document.documentElement.style.overflow || '';
    document.documentElement.style.overflow = 'hidden';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    try { closeButton.focus({ preventScroll: true }); } catch (_) { try { closeButton.focus(); } catch (_) {} }
  }

  function closeModal() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (image) image.removeAttribute('src');
    document.documentElement.style.overflow = previousOverflow;
    try { if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true }); } catch (_) {}
  }

  function clickHandler(e) {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!isLocalImageAssetLink(a)) return;
    e.preventDefault();
    e.stopPropagation();
    openModal(a.href || a.getAttribute('href'), getLabel(a));
  }

  document.addEventListener('click', clickHandler, true);
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && overlay && overlay.classList.contains('is-open')) {
      e.preventDefault(); e.stopPropagation(); closeModal();
    }
  }, true);

  function boot(){ try { ensureModal(); } catch (_) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true }); else boot();

  window.MolPathAssetModalHotfix = Object.freeze({
    base: 'v2.5.0b',
    version: 'escaper-v2',
    open: openModal,
    close: closeModal
  });
})();
