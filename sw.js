/* 中华美食千百道 v5.1 Service Worker */
const CACHE_NAME = 'cr-v51-final-v2';
self.addEventListener('fetch', e => {
  // JSON数据文件总是network-first，避免缓存失败导致无限加载
  if (e.request.url.includes('recipes_data')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // HTML和静态资源cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll([
      '/ChineseRecipes500/',
      '/ChineseRecipes500/chinese_recipes_500.html'
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
