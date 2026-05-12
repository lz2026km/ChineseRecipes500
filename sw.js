/* 中华美食千百道 v5.1 Service Worker */
const CACHE_NAME = 'cr-v51-final';
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll([
      '/ChineseRecipes500/',
      '/ChineseRecipes500/chinese_recipes_500.html',
      '/ChineseRecipes500/recipes_data.json'
    ]))
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});
