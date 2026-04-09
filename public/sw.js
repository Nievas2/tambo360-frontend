if (!self.define) {
  let e,
    a = {}
  const c = (c, s) => (
    (c = new URL(c + '.js', s).href),
    a[c] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = c), (e.onload = a), document.head.appendChild(e))
        } else ((e = c), importScripts(c), a())
      }).then(() => {
        let e = a[c]
        if (!e) throw new Error(`Module ${c} didn’t register its module`)
        return e
      })
  )
  self.define = (s, i) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (a[n]) return
    let t = {}
    const d = (e) => c(e, n),
      r = { module: { uri: n }, exports: t, require: d }
    a[n] = Promise.all(s.map((e) => r[e] || d(e))).then((e) => (i(...e), t))
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
          url: '/_next/static/chunks/05f4ccaa-468a166560971b5c.js',
          revision: '468a166560971b5c',
        },
        {
          url: '/_next/static/chunks/1010-f3f4cdb9f873c934.js',
          revision: 'f3f4cdb9f873c934',
        },
        {
          url: '/_next/static/chunks/1132-ec55cb7c4dd43377.js',
          revision: 'ec55cb7c4dd43377',
        },
        {
          url: '/_next/static/chunks/1264-095382d65ae7d15e.js',
          revision: '095382d65ae7d15e',
        },
        {
          url: '/_next/static/chunks/1468-f901d92fa584e99a.js',
          revision: 'f901d92fa584e99a',
        },
        {
          url: '/_next/static/chunks/1832-49fcfe99d5437909.js',
          revision: '49fcfe99d5437909',
        },
        {
          url: '/_next/static/chunks/3715-185ec76f0259c989.js',
          revision: '185ec76f0259c989',
        },
        {
          url: '/_next/static/chunks/4178-5d7ee6a6840095a9.js',
          revision: '5d7ee6a6840095a9',
        },
        {
          url: '/_next/static/chunks/4439-0c28b42d51ad7c45.js',
          revision: '0c28b42d51ad7c45',
        },
        {
          url: '/_next/static/chunks/4573-9625fb4867347ddc.js',
          revision: '9625fb4867347ddc',
        },
        {
          url: '/_next/static/chunks/4819-6396e5b8f9518d14.js',
          revision: '6396e5b8f9518d14',
        },
        {
          url: '/_next/static/chunks/4846-d99b326751458e1c.js',
          revision: 'd99b326751458e1c',
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
          url: '/_next/static/chunks/6050-402dca05b3c33fac.js',
          revision: '402dca05b3c33fac',
        },
        {
          url: '/_next/static/chunks/6068-cfbb625d17666021.js',
          revision: 'cfbb625d17666021',
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
          url: '/_next/static/chunks/6907-9ace6f391ae5aa27.js',
          revision: '9ace6f391ae5aa27',
        },
        {
          url: '/_next/static/chunks/7315-2f8722e450192c2f.js',
          revision: '2f8722e450192c2f',
        },
        {
          url: '/_next/static/chunks/751-a66e1db7355f1f15.js',
          revision: 'a66e1db7355f1f15',
        },
        {
          url: '/_next/static/chunks/8230-5b327e056dc72d56.js',
          revision: '5b327e056dc72d56',
        },
        {
          url: '/_next/static/chunks/8417-02d8a6cb4712d522.js',
          revision: '02d8a6cb4712d522',
        },
        {
          url: '/_next/static/chunks/9567-3d33bf99f3243429.js',
          revision: '3d33bf99f3243429',
        },
        {
          url: '/_next/static/chunks/9588-2711e7e42ae98a2c.js',
          revision: '2711e7e42ae98a2c',
        },
        {
          url: '/_next/static/chunks/9909-37fe9a9664e5c7c7.js',
          revision: '37fe9a9664e5c7c7',
        },
        {
          url: '/_next/static/chunks/app/(auth)/establecimiento/page-67c170dfe12e9aef.js',
          revision: '67c170dfe12e9aef',
        },
        {
          url: '/_next/static/chunks/app/(auth)/iniciar-sesion/page-2bb4af2d164b9427.js',
          revision: '2bb4af2d164b9427',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-e37f3675456d19d6.js',
          revision: 'e37f3675456d19d6',
        },
        {
          url: '/_next/static/chunks/app/(auth)/recuperar-contrasena/page-57cc20e40151d3b0.js',
          revision: '57cc20e40151d3b0',
        },
        {
          url: '/_next/static/chunks/app/(auth)/registrarse/page-644d46b10556d248.js',
          revision: '644d46b10556d248',
        },
        {
          url: '/_next/static/chunks/app/(auth)/verificar/page-58e74ad0ce3154ba.js',
          revision: '58e74ad0ce3154ba',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/alertas/page-97b322a2357fdb60.js',
          revision: '97b322a2357fdb60',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/analisis/page-2e62c8c3d80cc1d2.js',
          revision: '2e62c8c3d80cc1d2',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/layout-6727a2b5bdd0a405.js',
          revision: '6727a2b5bdd0a405',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/perfil/page-0a2c912671b02ebb.js',
          revision: '0a2c912671b02ebb',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/produccion/lote/%5Bid%5D/page-dc7496d4074e9afb.js',
          revision: 'dc7496d4074e9afb',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/produccion/page-ab0609c6a1369c27.js',
          revision: 'ab0609c6a1369c27',
        },
        {
          url: '/_next/static/chunks/app/(landing)/contacto/page-d96c2fd5e04fb293.js',
          revision: 'd96c2fd5e04fb293',
        },
        {
          url: '/_next/static/chunks/app/(landing)/equipo/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/(landing)/layout-e7ff29433c6e34f6.js',
          revision: 'e7ff29433c6e34f6',
        },
        {
          url: '/_next/static/chunks/app/(landing)/nosotros/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/(landing)/page-e7fc898e634d2655.js',
          revision: 'e7fc898e634d2655',
        },
        {
          url: '/_next/static/chunks/app/(landing)/precios/page-935d44b736e01036.js',
          revision: '935d44b736e01036',
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
          url: '/_next/static/chunks/app/_global-error/page-c7d9c78c349cdfb3.js',
          revision: 'c7d9c78c349cdfb3',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-490f26d134239b44.js',
          revision: '490f26d134239b44',
        },
        {
          url: '/_next/static/chunks/app/layout-5081e5f4f4d8418b.js',
          revision: '5081e5f4f4d8418b',
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
          url: '/_next/static/css/aa5f3beaa9801050.css',
          revision: 'aa5f3beaa9801050',
        },
        {
          url: '/_next/static/czHyduf24iAIr804A2R3p/_buildManifest.js',
          revision: 'c8c5fb1ebadbda39b6a54b73054b22c5',
        },
        {
          url: '/_next/static/czHyduf24iAIr804A2R3p/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
        { url: '/alertIcon.svg', revision: '856af77e612d3b226785609be7a36772' },
        {
          url: '/establecimiento.webp',
          revision: '0b4b94af5f6dcb858e3ecfe761036f8e',
        },
        {
          url: '/landing/2.jpeg',
          revision: 'cd6548afd839434ca530fec999f84a66',
        },
        {
          url: '/landing/3.jpeg',
          revision: '9e33f9679944eebec7976d4ffed0181a',
        },
        {
          url: '/landing/4.jpeg',
          revision: '1343bfd48b582fcc0879422bca00d642',
        },
        {
          url: '/landing/hero.webp',
          revision: 'f23dd54d0704f54b5954fcc6c1e14254',
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
          revision: '6a66bae4e22667943247b11e5a833f25',
        },
        {
          url: '/swe-worker-5c72df51bb1f6ee0.js',
          revision: '76fdd3369f623a3edcf74ce2200bfdd0',
        },
        {
          url: '/tambo-engine.webp',
          revision: '1c649db1ed4025ef923d2bac5dc6747f',
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
      ({ request: e, url: { pathname: a }, sameOrigin: c }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        c &&
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
      ({ request: e, url: { pathname: a }, sameOrigin: c }) =>
        '1' === e.headers.get('RSC') && c && !a.startsWith('/api/'),
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
