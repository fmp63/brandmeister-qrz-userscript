// ==UserScript==
// @name         BrandMeister → QRZ.com
// @namespace    brandmeister-qrz-userscript
// @version      2.2
// @description  Redirect callsign clicks on the BrandMeister dashboard to the matching QRZ.com profile
// @author       FMP63
// @match        https://brandmeister.network/*
// @match        https://*.brandmeister.network/*
// @run-at       document-idle
// @inject-into  content
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  console.log('[QRZ] active on', location.href, '- v2.2');

  // Loose ham callsign pattern with optional portable suffix (/P, /M, ...).
  // Requiring a trailing letter is what keeps talkgroup IDs like "TG262"
  // from matching in stage 3.
  const CALLSIGN_PATTERN = /^[A-Z0-9]{1,3}\d[A-Z0-9]*[A-Z](?:\/[A-Z0-9]+)?$/;

  function extractCallsign(link) {
    const href = link.getAttribute('href') || '';

    // Stage 1: hash route, e.g. #/profile/DO2BX — the current scheme.
    const hashMatch = href.match(/#\/profile\/([A-Z0-9\/]+)/i);
    if (hashMatch) return hashMatch[1].toUpperCase();

    // Stage 2: legacy query parameter ?call= — kept for compatibility.
    const queryParam = new URLSearchParams(href.split('?')[1] || '').get('call');
    if (queryParam) return queryParam.toUpperCase();

    // Stage 3: fallback — match the link text against a callsign pattern.
    const text = (link.textContent || '').trim().toUpperCase();
    return CALLSIGN_PATTERN.test(text) ? text : null;
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;

    const callsign = extractCallsign(link);
    if (!callsign) return;

    event.preventDefault();
    event.stopPropagation();

    const baseCall = callsign.split('/')[0];
    window.open('https://www.qrz.com/db/' + encodeURIComponent(baseCall), '_blank');
    console.log('[QRZ] v2.2 redirecting', callsign, 'to QRZ.com');
  }, true);
})();
