/* eslint-disable no-restricted-globals */
/* global workbox */
const CacheTimes = {
  ONE_YEAR: 60 * 60 * 24 * 365,
  THIRTY_DAYS: 60 * 60 * 24 * 30,
};

workbox.core.setCacheNameDetails({
  prefix: 'bible-app',
});

workbox.precaching.cleanupOutdatedCaches();

workbox.precaching.addPlugins([new workbox.broadcastUpdate.Plugin('precache-updates')]);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

/* -- Images -- */
workbox.routing.registerRoute(
  /\.(?:gif|jpeg|jpg|png|svg)$/,

  new workbox.strategies.CacheFirst({
    cacheName: 'bible-images',

    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: CacheTimes.THIRTY_DAYS,
      }),
    ],
  }),
);

/* -- Google Font Cache -- */
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,

  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,

  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',

    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),

      new workbox.expiration.Plugin({
        maxAgeSeconds: CacheTimes.ONE_YEAR,
        maxEntries: 30,
      }),
    ],
  }),
);

/* -- ESV API Cache -- */
workbox.routing.registerRoute(
  /^https:\/\/api.esv.org\/v3\/passage\/html\//,

  new workbox.strategies.CacheFirst({
    cacheName: 'esv-api',

    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: CacheTimes.THIRTY_DAYS,
        maxEntries: 50,
      }),
    ],
  }),
);

/* -- SPA Routing -- */
workbox.routing.registerNavigationRoute('/index.html');

self.skipWaiting();
