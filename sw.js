/* 中华美食千百道 v3.5 Service Worker */
const CACHE_NAME = 'cr-v35';
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll([
      '/ChineseRecipes500/',
      '/ChineseRecipes500/chinese_recipes_500.html',
      '/ChineseRecipes500/recipes_data.json'
    ]))
  );
});
