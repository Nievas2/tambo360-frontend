if (!self.define) {
  let e,
    a = {}
  const s = (s, c) => (
    (s = new URL(s + '.js', c).href),
    a[s] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = s), (e.onload = a), document.head.appendChild(e))
        } else ((e = s), importScripts(s), a())
      }).then(() => {
        let e = a[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (c, n) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (a[i]) return
    let t = {}
    const r = (e) => s(e, i),
      d = { module: { uri: i }, exports: t, require: r }
    a[i] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (n(...e), t))
  }
}
define(['./workbox-3c9d0171'], function (e) {
  'use strict'
  ;(importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/NPgVnYkQSMGu4w5jyjUS_/_buildManifest.js',
          revision: 'ae95ec4364c09f0a70dfffaa7ebce369',
        },
        {
          url: '/_next/static/NPgVnYkQSMGu4w5jyjUS_/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/05f4ccaa-468a166560971b5c.js',
          revision: '468a166560971b5c',
        },
        {
          url: '/_next/static/chunks/1132-ec55cb7c4dd43377.js',
          revision: 'ec55cb7c4dd43377',
        },
        {
          url: '/_next/static/chunks/1334-1f7846f273ef52d9.js',
          revision: '1f7846f273ef52d9',
        },
        {
          url: '/_next/static/chunks/2653-e7efd33a014b774d.js',
          revision: 'e7efd33a014b774d',
        },
        {
          url: '/_next/static/chunks/2811-756bf61baed424f5.js',
          revision: '756bf61baed424f5',
        },
        {
          url: '/_next/static/chunks/3205-0d7eacbb97e1d888.js',
          revision: '0d7eacbb97e1d888',
        },
        {
          url: '/_next/static/chunks/4178-5d7ee6a6840095a9.js',
          revision: '5d7ee6a6840095a9',
        },
        {
          url: '/_next/static/chunks/4635-8275803eb51a5d9e.js',
          revision: '8275803eb51a5d9e',
        },
        {
          url: '/_next/static/chunks/4819-5425e5feaa7995c1.js',
          revision: '5425e5feaa7995c1',
        },
        {
          url: '/_next/static/chunks/4939-5fcc8eaab720e17d.js',
          revision: '5fcc8eaab720e17d',
        },
        {
          url: '/_next/static/chunks/4990.2ae6e79f2eebae41.js',
          revision: '2ae6e79f2eebae41',
        },
        {
          url: '/_next/static/chunks/6068-7924e20738e57b63.js',
          revision: '7924e20738e57b63',
        },
        {
          url: '/_next/static/chunks/6299.ce097b5b702349b1.js',
          revision: 'ce097b5b702349b1',
        },
        {
          url: '/_next/static/chunks/6730-74be1b9ac933f65d.js',
          revision: '74be1b9ac933f65d',
        },
        {
          url: '/_next/static/chunks/6907-291ca054e28991b6.js',
          revision: '291ca054e28991b6',
        },
        {
          url: '/_next/static/chunks/7102-0eb010b51281debf.js',
          revision: '0eb010b51281debf',
        },
        {
          url: '/_next/static/chunks/7533-3b8a764e0bdeff5b.js',
          revision: '3b8a764e0bdeff5b',
        },
        {
          url: '/_next/static/chunks/8230-5b327e056dc72d56.js',
          revision: '5b327e056dc72d56',
        },
        {
          url: '/_next/static/chunks/8421-d1696a666beed481.js',
          revision: 'd1696a666beed481',
        },
        {
          url: '/_next/static/chunks/8812-c9972c01c4b2f64d.js',
          revision: 'c9972c01c4b2f64d',
        },
        {
          url: '/_next/static/chunks/8860-9dff293cb21882b2.js',
          revision: '9dff293cb21882b2',
        },
        {
          url: '/_next/static/chunks/8959-ea1cd45c60b244c1.js',
          revision: 'ea1cd45c60b244c1',
        },
        {
          url: '/_next/static/chunks/9185-da5ba5fbbe221390.js',
          revision: 'da5ba5fbbe221390',
        },
        {
          url: '/_next/static/chunks/9496-3715c01f031d1d5e.js',
          revision: '3715c01f031d1d5e',
        },
        {
          url: '/_next/static/chunks/app/(auth)/iniciar-sesion/page-a9c5c1077a838406.js',
          revision: 'a9c5c1077a838406',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-8db46708d9b60480.js',
          revision: '8db46708d9b60480',
        },
        {
          url: '/_next/static/chunks/app/(auth)/recuperar-contrasena/page-d450eaf173731ebf.js',
          revision: 'd450eaf173731ebf',
        },
        {
          url: '/_next/static/chunks/app/(auth)/registrarse/page-78591b53a1863f79.js',
          revision: '78591b53a1863f79',
        },
        {
          url: '/_next/static/chunks/app/(auth)/verificar/page-975676c8f1d84bde.js',
          revision: '975676c8f1d84bde',
        },
        {
          url: '/_next/static/chunks/app/(landing)/contacto/page-7c4871887f357071.js',
          revision: '7c4871887f357071',
        },
        {
          url: '/_next/static/chunks/app/(landing)/equipo/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/(landing)/layout-06293ff5d6d20f00.js',
          revision: '06293ff5d6d20f00',
        },
        {
          url: '/_next/static/chunks/app/(landing)/nosotros/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/(landing)/page-1421aeb03ed3a72e.js',
          revision: '1421aeb03ed3a72e',
        },
        {
          url: '/_next/static/chunks/app/(landing)/precios/page-803fb88453cb8b7c.js',
          revision: '803fb88453cb8b7c',
        },
        {
          url: '/_next/static/chunks/app/(landing)/producto/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/(landing)/testimonios/page-549e6ba657c224e9.js',
          revision: '549e6ba657c224e9',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/bienvenida/page-5d08421b67342d2d.js',
          revision: '5d08421b67342d2d',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/invitaciones/page-93f0dee14e7ec140.js',
          revision: '93f0dee14e7ec140',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/layout-77044835f903263a.js',
          revision: '77044835f903263a',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/%5BorgId%5D/%5Bid%5D/alertas/page-cb31e2c2b6717585.js',
          revision: 'cb31e2c2b6717585',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/%5BorgId%5D/%5Bid%5D/analisis/page-8bb25c786c0fb672.js',
          revision: '8bb25c786c0fb672',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/%5BorgId%5D/%5Bid%5D/layout-d36e806ef4311093.js',
          revision: 'd36e806ef4311093',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/%5BorgId%5D/%5Bid%5D/produccion/lote/%5BloteId%5D/page-f20f63b8364506f9.js',
          revision: 'f20f63b8364506f9',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/%5BorgId%5D/%5Bid%5D/produccion/page-a297e1b42366a50c.js',
          revision: 'a297e1b42366a50c',
        },
        {
          url: '/_next/static/chunks/app/(onboard)/organizaciones/page-3c6e8adbdcd4fc43.js',
          revision: '3c6e8adbdcd4fc43',
        },
        {
          url: '/_next/static/chunks/app/_global-error/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-490f26d134239b44.js',
          revision: '490f26d134239b44',
        },
        {
          url: '/_next/static/chunks/app/layout-731060a502274975.js',
          revision: '731060a502274975',
        },
        {
          url: '/_next/static/chunks/app/manifest.webmanifest/route-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/framework-918cbdc033dd495a.js',
          revision: '918cbdc033dd495a',
        },
        {
          url: '/_next/static/chunks/main-15d7d39429702d62.js',
          revision: '15d7d39429702d62',
        },
        {
          url: '/_next/static/chunks/main-app-afd53f6842678fbd.js',
          revision: 'afd53f6842678fbd',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/app-error-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/forbidden-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/global-error-41a35ab52e973254.js',
          revision: '41a35ab52e973254',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/not-found-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/unauthorized-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-38f45aeb0e00fc26.js',
          revision: '38f45aeb0e00fc26',
        },
        {
          url: '/_next/static/css/827658ac991ae42e.css',
          revision: '827658ac991ae42e',
        },
        {
          url: '/_next/static/css/d2ae45c9d2030aae.css',
          revision: 'd2ae45c9d2030aae',
        },
        {
          url: '/_next/static/media/19cfc7226ec3afaa-s.woff2',
          revision: '9dda5cfc9a46f256d0e131bb535e46f8',
        },
        {
          url: '/_next/static/media/21350d82a1f187e9-s.woff2',
          revision: '4e2553027f1d60eff32898367dd4d541',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/ba9851c3c22cd980-s.woff2',
          revision: '9e494903d6b0ffec1a1e14d34427d44d',
        },
        {
          url: '/_next/static/media/c5fe6dc8356a8c31-s.woff2',
          revision: '027a89e9ab733a145db70f09b8a18b42',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        { url: '/alertIcon.svg', revision: '223511d6b1500ad8722ae1e772e3f903' },
        {
          url: '/establecimiento.webp',
          revision: '0b4b94af5f6dcb858e3ecfe761036f8e',
        },
        {
          url: '/landing/hero.webp',
          revision: 'ce3b77943b8a8216ead4d28c671931d4',
        },
        {
          url: '/landing/tambo-engine.webp',
          revision: '1c649db1ed4025ef923d2bac5dc6747f',
        },
        {
          url: '/logos/isotipo_192x192.jpg',
          revision: '80a69aed5acae64bbd2ee1a8cf4c7d66',
        },
        {
          url: '/logos/isotipo_512x512.jpg',
          revision: '12d93c39ebdf163f9504cde40fc2bba1',
        },
        {
          url: '/logos/isotipo_tambo 1.png',
          revision: 'cd6550abb0f2a4600d990fe6641396cf',
        },
        {
          url: '/logotipo 1.png',
          revision: '44c2ff011a577578724bbde62db19440',
        },
        { url: '/offline.html', revision: 'aa1ae3dd9587138c6ead124f0faeb053' },
        { url: '/robot.svg', revision: '08c589dc10d4d98ea3c2315cf75534a1' },
        { url: '/robots.txt', revision: '00ea86f3e45722459a08b4aa2c6631b3' },
        {
          url: '/screenshots/desktop.jpg',
          revision: '6f8278ca95478444152c4b2dad17a623',
        },
        {
          url: '/screenshots/mobile.jpeg',
          revision: '54581b3451b1ceecd3affe3feb3b51f4',
        },
        { url: '/smart_toy.svg', revision: 'e5a881f2396e093222374b11d4482a00' },
        {
          url: '/successIcon.svg',
          revision: 'eb8523132179e8ef87337df84774489a',
        },
        {
          url: '/swe-worker-5c72df51bb1f6ee0.js',
          revision: '76fdd3369f623a3edcf74ce2200bfdd0',
        },
        {
          url: '/team/cintiaduarte.webp',
          revision: '9462ffbb9cd2e7a39763ec17a901ecbe',
        },
        {
          url: '/team/elianaproserpio.webp',
          revision: '569ce0b5e3114a8c3ecad27f335fb824',
        },
        {
          url: '/team/facundofernandez.webp',
          revision: 'edf8c24b4690202a470d18e512324e8a',
        },
        {
          url: '/team/gabrielnievas.webp',
          revision: '3ce99a861d8af458e80a4ed9adafef06',
        },
        {
          url: '/team/juanmeza.webp',
          revision: '538fc9cf74ffe7cd2dfeb07375288eb8',
        },
        {
          url: '/team/lorenasartori.webp',
          revision: '7e8bcfe246b670634ecad16b9c934bac',
        },
        {
          url: '/team/nicolasdebella.webp',
          revision: '52fc15ead5c73e64e0197aba5a1f9263',
        },
        {
          url: '/team/nicolasmansilla.webp',
          revision: '55569955d8fc46be5f5b9b85bc7ea7b6',
        },
        {
          url: '/team/nicolaspavon.webp',
          revision: 'edea828f611baff1c9cc37a85539d9a3',
        },
        {
          url: '/team/ornellameolans.webp',
          revision: 'aaec7f6248bdf3e7002810b108a82835',
        },
        {
          url: '/team/tatianatablada.webp',
          revision: 'c2bd09c87ec07ba1a9ff7ff5c18222d5',
        },
        { url: '/vacas.webp', revision: '6a6f39d196d5de45e7abab28e4636ff0' },
        { url: '/vacas_1.webp', revision: '155cd4f2a1b279d501de349b31e0afa0' },
        { url: '/vacas_2.webp', revision: '87fefdfc34b02f09584496fe1c16b315' },
        { url: '/vacas_3.webp', revision: '6c3da3beb12c6ee72cad503c887fd58c' },
        { url: '/vacas_4.webp', revision: '160d8df98c74dfef635f201ce2170e1e' },
        { url: '/vacas_5.webp', revision: '837248670b55faebed4922673819eda4' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith('/api/auth/callback') || !a.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        s &&
        !a.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        '1' === e.headers.get('RSC') && s && !a.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0))
})
