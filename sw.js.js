// sw.js - PWA Service Worker 腳本
const CACHE_NAME = 'rcgs-pwa-v1';

// 1. 安裝階段：跳過等待，立即啟用最新的 Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. 啟用階段：立即取得頁面控制權
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 3. 攔截請求：優先發送網路請求，若離線或失敗則改讀取快取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});