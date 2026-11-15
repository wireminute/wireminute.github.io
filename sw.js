/*
 * WireMinute service worker — NO-CACHE PASS-THROUGH.
 *
 * This worker exists for ONE reason: Chrome requires a registered service
 * worker with a fetch handler before wireminute.com counts as an
 * installable PWA, which the Android app (TWA) needs in order to open
 * full-screen.
 *
 * It caches NOTHING. Every request is forwarded straight to the network,
 * so the site's freshness rule is fully preserved: readers always get the
 * latest stories, and the page's own 60-second refresh is untouched.
 *
 * Do NOT add caching here. A caching service worker is forbidden by the
 * WireMinute freshness doctrine (WORKFLOW.md, as amended by the owner's
 * 2026-11-16 APK decision: pass-through allowed, caching is not).
 */

self.addEventListener('install', (event) => {
  // Take over immediately; there is no cached version to migrate.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Become the active worker for all open pages right away.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through only: always go to the network, never to a cache.
  event.respondWith(fetch(event.request));
});
