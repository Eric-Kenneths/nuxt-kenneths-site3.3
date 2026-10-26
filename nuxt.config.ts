// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  pages: true,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: 'https://kenneths.com'
    }
  },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ],
  },

  modules: ['@nuxtjs/google-fonts', 'nuxt-gtag'],
  gtag: {
    id: 'G-2C8BCH5WD0',
    loadingStrategy: 'defer'
  },
  googleFonts: {
    preload: true,
    families: {
      Roboto: [300,400,700],
    }
  },
    app: {
    head: {
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'alternate',
                type: 'application/rss+xml',
                title: "Kenneth's Blog RSS Feed",
                href: '/feed'
            }
        ],
        script: [
          {
            // WCMH - Amazon Tag (via Google Tag Manager)
            // The Amazon Advertising Tag is initialized and managed inside Google Tag Manager.
            // Do not load amzn.js or call amzn("addTag", ...) here, because that would duplicate
            // the Amazon GTM tag and could cause inaccurate PageView and conversion reporting.

            //  Google Tag Manager
              id: 'google-tag-manager',
              tagPosition: 'head',
              children: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-M25HKV4');
              `
            },
            {
                id: 'meta-pixel-code',
                async: true,
                defer: true,
                children: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1026089295639396');
                    fbq('track', 'PageView');
                
              `
          },
          // {
          //   // Premion tracking pixel (loads on all pages)
          //   src: 'https://px.premion.com/pixel.js?pxid=690a1da2cb60c291418e7c7d',
          //   async: true,
          //   defer: true
          // },
            // {
            //     src: 'https://tools.luckyorange.com/core/lo.js?site-id=311a0b19',
            //     async: true,
            //     defer: true
            // }
        ],
        noscript: [
            {
              // Google Tag Manager noscript fallback
              tagPosition: 'bodyOpen',
              children: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M25HKV4"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `
            },
            {
                children: `
                    <img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=1026089295639396&ev=PageView&noscript=1" />
                `
            }
        ]
    }
  },

  routeRules: {
    // 1) Pure static build-time pages
    
    '/accessibility-statement': { prerender: true },
    '/contact-us': { prerender: true },
    '/join-our-team': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/referral-program': { prerender: true },
    '/return-policy': { prerender: true },
    '/salon-policy': { prerender: true },
    '/services': { prerender: true },
    '/training': { prerender: true },

    // 2) Non-static caching
    '/sitemap.xml': { swr: 21600 },
    '/' : { swr: 21600},
    '/about': { swr: 21600},
    '/blog': { swr: 3600 },
    '/blog/post/**': { swr: 86400 },
    '/blog/**': { swr: 21600 },
    '/locations/**': { swr: 21600 },
    '/our-team': { swr: 21600 },
    '/services/hair': { swr: 21600 },
    '/services/spa': { swr: 21600 },
    '/services/nail': { swr: 21600 },
    '/services/hair/**' : { swr: 21600 },
    '/services/nail/**' : { swr: 21600 },
    '/services/spa/**' : { swr: 21600 },

        // always render fresh, no inherited SWR cache
    '/blog/test': { cache: false, swr: false },
    '/blog/test/**': { cache: false, swr: false },
    '/book/new/**': {
      ssr: false,
      headers: {
        'cache-control': 'no-store, max-age=0',
        'pragma': 'no-cache',
        'expires': '0',
        'x-robots-tag': 'noindex, nofollow'
      }
    },
    '/book/models': {
      ssr: false,
      headers: {
        'cache-control': 'no-store, max-age=0',
        'pragma': 'no-cache',
        'expires': '0',
        'x-robots-tag': 'noindex, nofollow'
      }
    },
    '/book/models-confirm': {
      ssr: false,
      headers: {
        'cache-control': 'no-store, max-age=0',
        'pragma': 'no-cache',
        'expires': '0',
        'x-robots-tag': 'noindex, nofollow'
      }
    },
    '/shop/gift-cards': { ssr: true },
    '/shop/gift-cards/**': {
      ssr: false,
      headers: {
        'cache-control': 'no-store, max-age=0',
        'pragma': 'no-cache',
        'expires': '0'
      }
    },
    '/book/': { redirect: { to: 'https://kenneths.com/app', statusCode: 301 } },
    '/book-now/': { redirect: { to: 'https://kenneths.com/app', statusCode: 301 } },
    //'/book/**' : { redirect: {to: 'https://kenneths.com/app', statusCode: 301 } },
    '/appointment-book/**' : { redirect: {to: '/app', statusCode: 301 } },
    '/Gift-Certificate/GCPrint.aspx' : { redirect: {to: '/gc', statusCode: 301 } },
    '/Gift-Certificate/gcprint.aspx' : { redirect: {to: '/gc', statusCode: 301 } },
    '/Gift-Certificate/**' : { redirect: {to: '/shop/gift-cards', statusCode: 301 } },
    '/gift-certificate/**' : { redirect: {to: '/shop/gift-cards', statusCode: 301 } },
    '/hh-mc' : { redirect: {to: 'https://myhairharmony.com/?ref=mc', statusCode: 301 } },
    //Services
    '/service-guide/service/**': { redirect: { to: '/service-menu', statusCode: 301 } },
    '/service-guide/spa/bar/': { redirect: { to: '/services/spa', statusCode: 301 } },
    '/service-guide/hair' : { redirect: {to: '/services/hair/', statusCode: 301 } },
    '/service-guide/nail' : { redirect: {to: '/services/nail/', statusCode: 301 } },
    '/service-guide/spa' : { redirect: {to: '/services/spa/', statusCode: 301 } },
    '/service-guide/spa/facials' : { redirect: {to: '/services/spa/facials', statusCode: 301 } },
    '/service-guide/spa/peels' : { redirect: {to: '/services/spa/facials', statusCode: 301 } },
    '/service-guide/spa/waxings' : { redirect: {to: '/services/spa/waxing', statusCode: 301 } },
    '/service-guide/spa/brow-lash' : { redirect: {to: '/services/spa/brow-and-lash', statusCode: 301 } },
    '/service-guide/spa/makeup' : { redirect: {to: '/services/spa/makeup', statusCode: 301 } },
    '/service-guide/spa/massages' : { redirect: {to: '/services/spa/massage', statusCode: 301 } },
    '/service-guide/spa-bar' : { redirect: {to: '/services/spa/spa-bar', statusCode: 301 } },
    '/service-guide/nail/manicures' : { redirect: {to: '/services/nail/manicures', statusCode: 301 } },
    '/service-guide/nail/pedicures': { redirect: { to: '/services/nail/pedicures', statusCode: 301 } },
    '/services.aspx' : { redirect: {to: '/service-menu', statusCode: 301 } },
    '/services-spa.aspx' : { redirect: {to: '/services/spa/facials', statusCode: 301 } },
    '/services-nails.aspx' : { redirect: {to: '/services/nail/manicures', statusCode: 301 } },
    '/services-hair.aspx' : { redirect: {to: '/services/hair', statusCode: 301 } }, 
    '/hairhome.aspx' : { redirect: {to: '/services/hair', statusCode: 301 } },
    '/hairhome.aspx/1000': { redirect: { to: '/services/hair', statusCode: 301 } },
    '/service-guide/Hair/1000': { redirect: { to: '/services/hair', statusCode: 301 } },
    // Supporting Articles
    '/service-guide/hair/haircutsandstyles': { redirect: { to: '/services/hair/haircutsandstyles', statusCode: 301 } },
    '/service-guide/hair/color' : { redirect: {to: '/services/hair/color', statusCode: 301 } },
    '/service-guide/hair/highlights': { redirect: { to: '/services/hair/highlights', statusCode: 301 } },
    '/service-guide/hair/treatments': { redirect: { to: '/services/hair/treatments', statusCode: 301 } },
    '/service-guide/hair/smoothing-and-perms': { redirect: { to: '/services/hair/smoothing-and-perms', statusCode: 301 } },
    '/service-guide/hair/hairextensions': { redirect: { to: '/services/hair/extensions', statusCode: 301 } },
    '/service-guide/spa/browandlash' : { redirect: { to: '/services/spa/brow-and-lash', statusCode: 301 } },
    // Updated Supporting Article Pathing
      // Hair Articles
    '/services/hair/haircutsandstyles': { redirect: { to: '/services/hair/cuts-and-styles', statusCode: 301 } },
    '/services/hair/haircutsandstyles/**': { redirect: { to: '/services/hair/cuts-and-styles/**', statusCode: 301 } },
    '/services/hair/haircoloring': { redirect: { to: '/services/hair/color', statusCode: 301 } },
    '/services/hair/haircoloring/**': { redirect: { to: '/services/hair/color/**', statusCode: 301 } },
    '/services/hair/hairextensions': { redirect: { to: '/services/hair/extensions', statusCode: 301 } },
    '/services/hair/hairextensions/**': { redirect: { to: '/services/hair/extensions/**', statusCode: 301 } },
    '/services/hair/hairhighlighting': { redirect: { to: '/services/hair/highlights', statusCode: 301 } },
    '/services/hair/hairhighlighting/**': { redirect: { to: '/services/hair/highlights/**', statusCode: 301 } },
    '/services/hair/hairsmoothingandperms': { redirect: { to: '/services/hair/smoothing-and-perms', statusCode: 301 } },
    '/services/hair/hairsmoothingandperms/**': { redirect: { to: '/services/hair/smoothing-and-perms/**', statusCode: 301 } },
    '/services/hair/hairtreatment': { redirect: { to: '/services/hair/treatments', statusCode: 301 } },
    '/services/hair/hairtreatment/**': { redirect: { to: '/services/hair/treatments/**', statusCode: 301 } },
      // Spa Articles
    '/services/spa/waxings': { redirect: { to: '/services/spa/waxing', statusCode: 301 } },
    '/services/spa/waxings/**': { redirect: { to: '/services/spa/waxing/**', statusCode: 301 } },
    '/services/spa/browandlash': { redirect: { to: '/services/spa/brow-and-lash', statusCode: 301 } },
    '/services/spa/browandlash/**': { redirect: { to: '/services/spa/brow-and-lash/**', statusCode: 301 } },
    // Supporting articles whose stored slug had a space (now a hyphen)
    '/services/hair/cuts-and-styles/special-occasion-hairstyles-elegant-looks-for%20memorable-events': { redirect: { to: '/services/hair/cuts-and-styles/special-occasion-hairstyles-elegant-looks-for-memorable-events', statusCode: 301 } },
    '/services/hair/extensions/clip-in%20extensions-for-volume-instant-fullness-made-easy': { redirect: { to: '/services/hair/extensions/clip-in-extensions-for-volume-instant-fullness-made-easy', statusCode: 301 } },
    '/services/nail/manicures/maintain-perfection-acrylic-balance-for-long-lasting%20nails': { redirect: { to: '/services/nail/manicures/maintain-perfection-acrylic-balance-for-long-lasting-nails', statusCode: 301 } },
    '/services/nail/manicures/enhance-your-experience-the%20ultimate-guide-to-manicure-add-ons': { redirect: { to: '/services/nail/manicures/enhance-your-experience-the-ultimate-guide-to-manicure-add-ons', statusCode: 301 } },
    // Web Retail
    '/webretail/**' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } }, 
    '/shop-retail/**' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/shop/retail/cbd' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/shop-Retail/**' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/retail-item/**' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/shop/retail/spa' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/checkout/**': { redirect: { to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/shop/retail/product/bioionic-goldpro-curling-iron-1%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-goldpro-curling-iron-1in'), statusCode: 301 } },
    '/shop/retail/product/bioionic-goldpro-curling-iron-1.5%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-goldpro-curling-iron-1.5in'), statusCode: 301 } },
    '/shop/retail/product/bioionic-long-barrel-iron-1%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-long-barrel-iron-1in'), statusCode: 301 } },
    '/shop/retail/product/bioionic-long-barrel-iron-1.25%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-long-barrel-iron-1.25in'), statusCode: 301 } },
    '/shop/retail/product/Bioionic-Long-Barrel-Iron-1.25%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-long-barrel-iron-1.25in'), statusCode: 301 } },
    '/shop/retail/product/bioionic-stylewinder-1.25%22' : { redirect: {to: encodeURI('/shop/retail/product/bioionic-stylewinder-1.25in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-1%22' : { redirect: {to: encodeURI('/shop/retail/product/beramic--ion-thermal-brush-1in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-134%22' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-1.75in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-218%22' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-2.125in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-312%22' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-Thermal-brush-3.5in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-414%22': { redirect: { to: encodeURI('/shop/retail/product/ceramic-ion-Thermal-brush-4.25in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-2.125in' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-2.125in'), statusCode: 301 } },
    '/shop/retail/product/ceramic-1-38%22-flat-iron' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-1-.375in-flat-iron'), statusCode: 301 } },
    '/shop/retail/product/ergo-super-gentle-round-brush-2.25%22' : { redirect: {to: encodeURI('/shop/retail/product/ergo-super-gentle-round-brush-2.25in'), statusCode: 301 } },
    '/shop/retail/product/ergo-super-gentle-round-brush-2.75%22' : { redirect: {to: encodeURI('/shop/retail/product/ergo-super-gentle-round-brush-2.75in'), statusCode: 301 } },
    '/shop/retail/product/keratin-complex-ceramic-round-brush-2%22' : { redirect: {to: encodeURI('/shop/retail/product/keratin-complex-ceramic-round-brush-2in'), statusCode: 301 } },
    '/shop/retail/product/keratin-complex-ceramic-round-brush-3%22' : { redirect: {to: encodeURI('/shop/retail/product/keratin-complex-ceramic-round-brush-3in'), statusCode: 301 } },
    '/shop/retail/product/keratin-complex-ceramic-round-brush-3.5%22' : { redirect: {to: encodeURI('/shop/retail/product/keratin-complex-ceramic-round-brush-3.5in'), statusCode: 301 } },
    '/shop/retail/product/keratin-complex-round-brush-2.5%22' : { redirect: {to: encodeURI('/shop/retail/product/keratin-complex-round-brush-2.5in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-1in' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-1in' ), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-4.25in' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-4.25in'), statusCode: 301 } },
    '/shop/retail/product/ceramic--ion-thermal-brush-1.75in' : { redirect: {to: encodeURI('/shop/retail/product/ceramic-ion-thermal-brush-1.75in'), statusCode: 301 } },
    '/shop/retail/product/nano-titanium-ultra-thin-straightener-112%22': { redirect: { to: encodeURI('/shop/retail/product/nano-titanium-ultra-thin-straightener-1.5in'), statusCode: 301 } },
    '/shop/retail/product/thermal-spray-high-shold-4.2oz' : { redirect: {to: encodeURI('/shop/retail/product/thermal-spray-high-hold-4.2oz'), statusCode: 301 } },
    '/shop/retail/product/Straight--Smooth' : { redirect: {to: encodeURI('/shop/retail/product/Straight-Smooth'), statusCode: 301 } },
    '/shop/retail/product/extreme-hydration-hand--body-lotion' : { redirect: {to: encodeURI('/shop/retail/product/extreme-hydration-hand-body-lotion'), statusCode: 301 } },
    '/shop/retail/product/blueberry--white-tea-hydrating-mist' : { redirect: {to: encodeURI('/shop/retail/product/blueberry-white-tea-hydrating-mist'), statusCode: 301 } },
    '/shop/retail/product/blueberry--beet-root-shampoo' : { redirect: {to: encodeURI('/shop/retail/product/blueberry-beet-root-shampoo'), statusCode: 301 } },
    '/shop/retail/product/volume--shine-shampoo' : { redirect: {to: encodeURI('/shop/retail/product/volume-shine-shampoo'), statusCode: 301 } },
    '/shop/retail/product/moisture--shine-shampoo' : { redirect: {to: encodeURI('/shop/retail/product/moisture-shine-shampoo'), statusCode: 301 } },
    // Blog
    '/kblog' : { redirect: {to: '/blog', statusCode: 301 } },
    '/kblog/**' : { redirect: {to: '/blog', statusCode: 301 } }, 
    '/getfeed.aspx/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2012/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2013/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2014/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2015/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2016/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2017/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2018/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2019/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2020/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2021/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/2022/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/post/feed/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/search' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/syndication.axd' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/archive' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/author/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/webresource.axd' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/account/**' : { redirect: {to: '/blog', statusCode: 301 } },
    '/blog/kenneths-tool-sale' : { redirect: {to: '/blog/post/kenneths-tool-sale', statusCode: 301 } },
    '/blog/an-overview-of-our-top-hair-treatments' : { redirect: {to: '/blog/post/an-overview-of-our-top-hair-treatments', statusCode: 301 } },
    '/blog/solution-for-coloring-gray-hair' : { redirect: {to: '/blog/post/solution-for-coloring-gray-hair', statusCode: 301 } },
    '/blog/columbus-best-hair-salon-2023' : { redirect: {to: '/blog/post/columbus-best-hair-salon-2023', statusCode: 301 } },
    '/blog/looking-for-the-perfect-stylist': { redirect: { to: '/blog/post/looking-for-the-perfect-stylist', statusCode: 301 } },
    '/blog/5-myths-about-winter-hair-care-in-columbus-ohio' : { redirect: {to: '/blog/post/5-myths-about-winter-hair-care-in-columbus-ohio', statusCode: 301 } },
    '/blog/best-gift-for-mothers-day' : { redirect: {to: '/blog/post/best-gift-for-mothers-day', statusCode: 301 } },
    '/blog/hair-care-kits-your-one-stop-shop-for-great-hair' : { redirect: {to: '/blog/post/hair-care-kits-your-one-stop-shop-for-great-hair', statusCode: 301 } },
    '/blog/best-mothers-day-gift' : { redirect: {to: '/blog/post/best-mothers-day-gift', statusCode: 301 } },
    '/blog/4-day-spa-treatments-for-effortless-summer-beauty' : { redirect: {to: '/blog/post/4-day-spa-treatments-for-effortless-summer-beauty', statusCode: 301 } },
    '/blog/7-winter-skin-care-products-we-cant-live-without' : { redirect: {to: '/blog/post/7-winter-skin-care-products-we-cant-live-without', statusCode: 301 } },
    '/blog/hair-extensions-are-so-in-for-summer' : { redirect: {to: '/blog/post/hair-extensions-are-so-in-for-summer', statusCode: 301 } },
    '/blog/join-our-team-as-an-experienced-hair-stylist' : { redirect: {to: '/blog/post/join-our-team-as-an-experienced-hair-stylist', statusCode: 301 } },
    '/blog/merry-kitmas' : { redirect: {to: '/blog/post/merry-kitmas', statusCode: 301 } },
    '/blog/10-beauty-essentials-to-have-on-hand-this-winter' : { redirect: {to: '/blog/post/10-beauty-essentials-to-have-on-hand-this-winter', statusCode: 301 } },
    // General
    '/index.html' : { redirect: {to: '/', statusCode: 301 } },
    // '/_nuxt/' : { redirect: {to: '/', statusCode: 301 } }, chatgpt said don't do this
    '/default.aspx' : { redirect: {to: '/', statusCode: 301 } },
    '/main/**' : { redirect: {to: '/', statusCode: 301 } },
    // '/assets/**' : { redirect: {to: '/', statusCode: 301 } }, chatgpt said don't do this
    '/wp-login.php/**' : { redirect: {to: '/', statusCode: 301 } },
    '/wp-comments-post.php/**' : { redirect: {to: '/', statusCode: 301 } },
    '/wpblog' : { redirect: {to: '/blog', statusCode: 301 } },
    '/xmlrpc.php/**' : { redirect: {to: '/', statusCode: 301 } },
    '/.well-known/**' : { redirect: {to: '/', statusCode: 301 } },
    '/c.a/**' : { redirect: {to: '/', statusCode: 301 } },
    '/security.txt': { redirect: { to: '/', statusCode: 301 } },
    // Locations
    '/locations/1000' : { redirect: {to: '/locations', statusCode: 301 } },
    '/kenneths-locations.aspx': { redirect: { to: '/locations', statusCode: 301 } },
    '/locations.aspx/**': { redirect: { to: '/locations', statusCode: 301 } },
    // Location - Academy
    '/kenneths-academy-hair-salon.aspx/**': { redirect: { to: '/locations/academy', statusCode: 301 } },
    '/locations/academy-hair-salon': { redirect: { to: '/locations/academy', statusCode: 301 } },
    '/locations/academy-hair-salon/1000' : { redirect: {to: '/locations/academy', statusCode: 301 } },
    // Location - Grove City
    '/grove-city-hair-salon-and-waxing-studio.aspx/**': { redirect: { to: '/locations/grove-city', statusCode: 301 } },
    '/locations/grove-city-hair-salon-waxing-studio' : { redirect: {to: '/locations/grove-city', statusCode: 301 } },
    '/locations/grove-city-hair-salon-waxing-studio/1000' : { redirect: {to: '/locations/grove-city', statusCode: 301 } },
    '/grove-city-hair-salon-and-waxing': { redirect: { to: '/locations/grove-city', statusCode: 301 } },
    '/grove-city-hair-salon-and-waxing-studio.aspx.grove' : { redirect: {to: '/locations/grove-city', statusCode: 301 } },
    '/grove-city-hair-salon-and-waxing-studio.aspx.*' : { redirect: {to: '/locations/grove-city', statusCode: 301 } },
    // Location - Upper Arlington
    '/upper-arlington-kingsdale-hair-salon-nail-spa-and-waxing-studio.aspx/**' : { redirect: {to: '/locations/upper-arlington', statusCode: 301 } },
    '/locations/upper-arlington-kingsdale-hair-salon-nail-spa-waxing-studio' : { redirect: {to: '/locations/upper-arlington', statusCode: 301 } },
    //  Location -Polaris
    '/polaris-parkway-lewis-center-hair-salon-and-day-spa.aspx/**': { redirect: { to: '/locations/polaris', statusCode: 301 } },
    '/locations/polaris-parkway-lewis-center-hair-salon-and-day-spa.aspx/**': { redirect: { to: '/locations/polaris', statusCode: 301 } },
    '/locations/polaris-parkway-lewis-center-hair-salon-day-spa': { redirect: { to: '/locations/polaris', statusCode: 301 } },
    '/locations/polaris-parkway-lewis-center-hair-salon-day-spa/1000' : { redirect: {to: '/locations/polaris', statusCode: 301 } },
    // Location - Powell
    '/powell-hair-salon-and-waxing-studio.aspx/**' : { redirect: {to: '/locations/powell', statusCode: 301 } },
    '/locations/powell-hair-salon-waxing-studio' : { redirect: {to: '/locations/powell', statusCode: 301 } },
    '/locations/powel-hair-salon-waxing-studio': { redirect: { to: '/locations/powell', statusCode: 301 } },
    '/locations/powel-hair-salon-waxing-studio/1000' : { redirect: {to: '/locations/powell', statusCode: 301 } },
    // Location - New Albany
    '/new-albany-hair-salon-and-day-spa.aspx/services.aspx/**': { redirect: { to: '/locations/new-albany', statusCode: 301 } },
    '/locations/new-albany-hair-salon-day-spa' : { redirect: {to: '/locations/new-albany', statusCode: 301 } },
    '/new-albany-hair-salon-and-day-spa.aspx/**' : { redirect: {to: '/locations/new-albany', statusCode: 301 } },
    // Location - Hilliard
    '/upper-arlington-hilliard-hair-salon-and-day-spa.aspx/**': { redirect: { to: '/locations/hilliard', statusCode: 301 } },
    '/locations/upper-arlington-hilliard-hair-salon-day-spa': { redirect: { to: '/locations/hilliard', statusCode: 301 } },
    '/locations/upper-arlington-hilliard-hair-salon-day-spa/1000': { redirect: { to: '/locations/hilliard', statusCode: 301 } },
    '/upper-arlington-hilliard-hair-' : { redirect: {to: '/locations/hilliard', statusCode: 301 } },
    // Location - Westerville
    '/westerville-hair-salon-and-waxing-studio.aspx/**': { redirect: { to: '/locations/westerville', statusCode: 301 } },
    '/locations/westerville-hair-salon-waxing-studio': { redirect: { to: '/locations/westerville', statusCode: 301 } },
    '/locations/westerville-hair-salon-waxing-studio/1000' : { redirect: {to: '/locations/westerville', statusCode: 301 } },
    // Location - Dublin
    '/dublin-hair-salon-and-waxing-studio.aspx/**': { redirect: { to: '/locations/dublin', statusCode: 301 } },
    '/locations/dublin-hair-salon-spa-waxing-studio': { redirect: { to: '/locations/dublin', statusCode: 301 } },
    '/locations/dublin-hair-salon-nail-spa-waxing-studio' : { redirect: {to: '/locations/dublin', statusCode: 301 } },
    '/dublin-hair-salon-and-waxing-s': { redirect: { to: '/locations/dublin', statusCode: 301 } },
    '/dublin-hair-salon-nail-spa-waxing-studio/1000' : { redirect: {to: '/locations/dublin', statusCode: 301 } },
    // Location - Pickerington
    '/pickerington-hair-salon-nail-spa-and-waxing-studio.aspx/**': { redirect: { to: '/locations/pickerington', statusCode: 301 } },
    '/locations/pickerington-hair-salon-nail-spa-waxing-studio': { redirect: { to: '/locations/pickerington', statusCode: 301 } },
    '/locations/pickerington-hair-salon-nail-spa-waxing-studio/1000' : { redirect: {to: '/locations/pickerington', statusCode: 301 } },
    '/locations/pickerington-hair-salon-nail-spa-and-waxing-studio.aspx': { redirect: { to: '/locations/pickerington', statusCode: 301 } },
    // Location - Worthington
    '/worthington-hair-salon-nail-spa-and-waxing-studio.aspx/**': { redirect: { to: '/locations', statusCode: 301 } },
    // Careers
    '/careers' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers-tuition-grants.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers-grants.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers-licensed-professionals.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers/careers-customer-service.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers-customer-service.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers/scholarships.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/scholarships.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    '/careers/tour/**': { redirect: { to: '/join-our-team', statusCode: 301 } }, 
    '/careers/careers-licensed-professionals.aspx' : { redirect: {to: '/join-our-team', statusCode: 301 } },
    // Misc
    '/contactus.aspx' : { redirect: {to: '/contact-us', statusCode: 301 } },
    '/spa.aspx' : { redirect: {to: '/services/spa', statusCode: 301 } },
    '/covid19-preparedness.aspx' : { redirect: {to: '/', statusCode: 301 } },
    '/ContactUs.aspx' : { redirect: {to: '/contact-us', statusCode: 301 } },
    '/privacypolicy.aspx' : { redirect: {to: '/privacy-policy', statusCode: 301 } },
    '/PrivacyPolicy.aspx' : { redirect: {to: '/privacy-policy', statusCode: 301 } },
    '/webmobile/**' : { redirect: {to: '/', statusCode: 301 } },
    '/new-customers/**' : { redirect: {to: '/book', statusCode: 301 } },
    '/New-Customers/**' : { redirect: {to: '/book', statusCode: 301 } },
    '/club-kenneth/**' : { redirect: {to: '/', statusCode: 301 } },
    '/webab/**': { redirect: { to: '/book', statusCode: 301 } },
    '/club-': { redirect: { to: '/', statusCode: 301 } },
    '/Club-' : { redirect: {to: '/', statusCode: 301 } },
    '/xb' : { redirect: {to: '/book', statusCode: 301 } },
    '/kenneths-corporate-offices.aspx': { redirect: { to: '/', statusCode: 301 } },
    '/models': { redirect: { to: '/model', statusCode: 301 } },
    // TODO need a bio link for Tony, Amy, and Stephanie for the blog entries
    '/author/tony-anders**' : { redirect: {to: '/about#tony-anders', statusCode: 301 } },
    '/author/appointment-' : { redirect: {to: '/book', statusCode: 301 } },
    '/crd' : { redirect: {to: '/', statusCode: 301 } },
    '/shop-Reta' : { redirect: {to: '/shop/retail/top-sellers', statusCode: 301 } },
    '/webgc/**' : { redirect: {to: '/shop/gift-cards', statusCode: 301 } },
    '/freehaircut' : { redirect: {to: '/', statusCode: 301 } },
    '/LP': { redirect: { to: '/', statusCode: 301 } },
    '/lp': { redirect: { to: '/', statusCode: 301 } },
    '/LP/**': { redirect: { to: '/', statusCode: 301 } },
    '/lp/**': { redirect: { to: '/', statusCode: 301 } },
  }
})