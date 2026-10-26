<template>
  <div class="min-h-screen">

    <!-- HERO: Video background with layered text and bottom-right image -->
    <section>
      <div class="relative hidden md:flex items-center justify-center h-[90vmin] w-full overflow-hidden">
        <div class="">
          <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
            class="absolute -top-8 -left-25 w-auto h-[110%] z-20 pointer-events-none opacity-50" />
        </div>
        <video class="absolute inset-0 w-full h-[90vmin] object-cover" autoplay loop muted playsinline loading="eager"
          fetchpriority="high" src="https://kenneths.com/static/home/kenneths-hair-salons-spas-hero.mp4"></video>
        <!-- Layered Text -->
        <div
          class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
          <p class="font-thin text-4xl md:text-6xl lg:text-8xl max-w-2xl text-center k-header-text-shadow">
            YOUR SALON.<br />YOUR SPA.<br />YOUR SPACE.</p>
        </div>
        <!-- Layered Image (bottom-right corner) -->
        <!-- <a href="/shop/retail/skin-care">
          <img src="https://kenneths.com/static/marketing/spfslider.webp" loading="eager" fetchpriority="high"
            alt="SPF Sale" class="absolute bottom-15 right-8 w-100 h-auto z-20" />
        </a> -->
        <!-- Layered Image (bottom-right corner) -->
        <!-- <a href="/shop/retail/search?si=Hydropeptide">
          <img src="https://kenneths.com/static/marketing/the-friends-and-family-sale.webp" loading="eager"
            fetchpriority="high" alt="Hydropeptide Sale" class="absolute bottom-15 right-8 w-100 h-auto z-20" />
        </a> -->
      </div>

      <div
        class="relative flex md:hidden items-center justify-center h-[600px] w-full overflow-hidden bg-[url('/images/home/kenneths-hair-salons-spas-hero.webp?20200312')] bg-no-repeat bg-cover">

        <div>
          <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
            class="absolute -top-8 -left-15 w-auto h-[115%] z-20 pointer-events-none opacity-50" />
        </div>

        <div
          class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center px-4 text-white pointer-events-none">
          <h1
            class="font-thin text-4xl md:text-6xl lg:text-8xl text-primary-100 text-center uppercase k-header-text-shadow">
            YOUR SALON.<br />YOUR SPA.<br />YOUR SPACE.</h1>
        </div>


      </div>
      <div class="md:hidden">
        <!-- <a href="/shop/retail/skin-care">
          <img src="https://kenneths.com/static/marketing/spfslider.webp" loading="eager" fetchpriority="high"
            alt="SPF Sale" class="w-full h-auto z-20" />
        </a> -->
        <!-- <a href="/shop/retail/search?si=Hydropeptide">
          <img src="https://kenneths.com/static/marketing/the-friends-and-family-sale.webp" loading="eager"
            fetchpriority="high" alt="Hydropeptide Sale" class="w-full h-auto z-20" />
        </a> -->
      </div>
    </section>

    <!--Glitter line-->
    <div class="m-0 p-0">
      <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
      </div>
    </div>

    <!--Beauty is about how you feel-->
    <section class="flex flex-col md:grid lg:grid-cols-2">
      <!-- Left Column: Square Image -->
      <div class="w-full h-full flex">
        <img src="/images/home/beauty-is-about-how-you-feel.webp" loading="eager" fetchpriority="high"
          alt="Beauty is about how you feel" class="object-cover w-full h-full" />
      </div>

      <!-- Right Column: Three Vertical Divs -->
      <div
        class="grid grid-rows-[40%_40%_20%] flex px-4 md:px-12 bg-primary-900 text-white min-h-135 md:min-h-180 h-full">
        <!-- Top Div: Large Text, Top Aligned -->
        <div class="flex items-start">
          <h2 class="k-section-title pt-10 md:pt-20 uppercase">BEAUTY ISN'T JUST ABOUT HOW YOU
            LOOK&mdash;IT'S
            ABOUT HOW YOU FEEL.
          </h2>
        </div>

        <!-- Middle Div: Bottom Aligned Text -->
        <div class="flex items-end">
          <p class="k-para-text">
            At Kenneth's, our passion runs deep, from haircuts that inspire confidence
            to spa treatments that
            rejuvenate your spirit.<br>
            Every client receives personalized service and care.<br>
            No matter where you are on your journey, our experts are trained to elevate your moment of
            self-care.</p>
        </div>

        <!-- Bottom Div: Bottom Aligned Text -->
        <div class="flex items-start pt-3">
          <pop-up-menu>
            <template #trigger>
              <div
                class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2">
                BOOK YOUR APPOINTMENT &rarr;</div>
            </template>
            <template #links>
              <div class="sans-serif p-3">
                <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
              </div>
              <div class="sans-serif p-3">
                <a class="text-xl link" href="/book/new/service-type">New Customer</a>
              </div>
            </template>
          </pop-up-menu>
        </div>
      </div>
    </section>

    <!--Departments sections-->
    <section class="py-10 px-4 bg-primary-100">
      <div class="text-primary-900 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <a href="/services/hair" class="flex flex-col items-start">
          <img src="/images/home/nav-to-hair.webp" alt="Hair" class="w-full object-cover shadow-md" loading="lazy"
            decoding="async" fetchpriority="low" />
          <h3 class="k-sub-section-title font-bold">HAIR<span class="ml-2 relative md:-top-[2px]">&rarr;</span></h3>
        </a>
        <a href="/services/spa" class="flex flex-col items-start">
          <img src="/images/home/nav-to-spa.webp" alt="Spa" class="w-full object-cover shadow-md" loading="lazy"
            decoding="async" fetchpriority="low" />
          <h3 class="k-sub-section-title font-bold">SPA<span class="ml-2 relative md:-top-[2px]">&rarr;</span></h3>
        </a>
        <a href="/services/nail" class="flex flex-col items-start">
          <img src="/images/home/nav-to-nails.webp" alt="Nails" class="w-full object-cover shadow-md" loading="lazy"
            decoding="async" fetchpriority="low" />
          <h3 class="k-sub-section-title font-bold">NAILS<span class="ml-2 relative md:-top-[2px]">&rarr;</span></h3>
        </a>
      </div>
    </section>

    <quiz-section />

    <!--Spa Bar-->
    <section class="flex flex-col-reverse flex-col md:grid lg:grid-cols-2">
      <!-- Right Column: Three Vertical Divs -->
      <div
        class="grid grid-rows-[40%_40%_20%] py-10 md:py-15 flex px-4 md:px-12 bg-primary-900 text-primary-100 min-h-90 md:min-h-150 h-full">
        <!-- Top Div: Large Text, Top Aligned -->
        <div class="flex flex-col items-start">
          <h2 class="k-section-title uppercase">Meet Us at The<br />Spa Bar
          </h2>
          <div class="pt-12 k-para-text">
            A new kind of happy hour where facials, nails, and spa treatments are fast & flawless.
          </div>
        </div>


        <!-- Middle Div: Bottom Aligned Text -->
        <div class="flex items-end">
          <pop-up-menu>
            <template #trigger>
              <div
                class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2">
                BOOK NOW @ POLARIS + HILLIARD &rarr;</div>
            </template>
            <template #links>
              <div class="sans-serif p-3">
                <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
              </div>
              <div class="sans-serif p-3">
                <a class="text-xl link" href="/book/new/promo?l=pl">New Customer</a>
              </div>
            </template>
          </pop-up-menu>
        </div>

        <!-- Bottom Div: Bottom Aligned Text -->
        <div class="flex items-start pt-3">
          <a href="/services/spa/spa-bar"
            class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2">EXPLORE
            THE MENU</a>
        </div>
      </div>
      <!-- Left Column: Square Image -->
      <div class="w-full h-full flex">
        <img src="/images/home/spa-bar-home.webp" alt="Spa Bar" class="object-cover w-full h-full" loading="lazy"
          decoding="async" fetchpriority="low" />
      </div>

    </section>

    <!--testimonial-->
    <section class="relative w-full  overflow-hidden bg-primary-500 text-primary-900">
      <!-- Background Image -->
      <!-- <div class="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-center"
                style="background-image: url('/images/home/hair-salon-testimonial.webp');"></div> -->

      <!-- Overlay for readability -->
      <div class="absolute inset-0 bg-black/20"></div>

      <!-- Content -->
      <div class="relative z-10 flex items-start h-full px-6 text-left py-10 md:py-15">
        <div class="px-5 md:px-10">
          <p
            class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed pr-0 pb-10 md:pb-30 lg:pr-30">
            “Kendall has been my blessing, she listened to my concerns, made recommendations, and gave me silky shiny,
            and
            sustainable results! I love my hair!”
          </p>
          <div class="w-full bg-repeat bg-[url('/images/icons/gold-line.webp')] h-[3px]">
          </div>
          <p class="text-xl font-semibold mt-4">Dee D.</p>
        </div>
      </div>
    </section>

    <locations-carousel class="pl-5" />

    <!--Academy Training-->
    <section class="flex flex-col md:grid lg:grid-cols-2">
      <!-- Left Column: Square Image -->
      <div class="w-full h-full flex">
        <img src="/images/home/training-program-academy-salon.webp" alt="Training program at our academy salon"
          class="object-cover w-full" loading="lazy" decoding="async" fetchpriority="low" />
      </div>

      <!-- Right Column: Three Vertical Divs -->
      <div
        class="grid grid-rows-[40%_40%_20%] flex px-4 md:px-12 bg-primary-900 text-white min-h-80 md:min-h-130 h-full">
        <!-- Top Div: Large Text, Top Aligned -->
        <div class="flex items-start">
          <h2 class="k-section-title pt-5 md:pt-20 uppercase">Our Commitment To Excellence
          </h2>
        </div>

        <!-- Middle Div: Bottom Aligned Text -->
        <div class="flex items-end pb-2 md:pb-5">
          <p class="k-para-text">Every Kenneth's stylist and technician completes a thorough training program
            at our Academy before servicing clients in our salons. You can book services at The Academy
            Salon for a lower price point while helping our stylists and technicians complete their
            training.</p>
        </div>

        <!-- Bottom Div: Bottom Aligned Text -->
        <div class="items-start justify-start pt-5">
          <a href="locations/academy"
            class="px-5 py-2 ml-auto lg:ml-0 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap text-xl">Learn
            More About the Academy</a>
        </div>
      </div>
    </section>

    <!--book-->
    <section class="relative w-full h-[450px] md:h-[635px] overflow-hidden bg-primary-100">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-no-repeat bg-center md:bg-center m-4"
        style="background-image: url('/images/home/book-now-home-page.webp');"></div>

      <!-- Overlay for readability -->
      <div class="absolute inset-0 bg-black/20 m-7 md:m-15"></div>

      <!-- Content -->
      <div class="relative z-10 flex items-center h-full">
        <div class="px-5 md:px-10 text-primary-100 text-center mx-auto">
          <p class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light k-menu-text-shadow uppercase">
            Book Your Beauty<br />Experience
          </p>
          <div>
            <pop-up-menu>
              <template #trigger>
                <div
                  class="hover:text-primary-500 k-section-link underline underline-offset-4 transition rounded py-3 inline-block mt-2 k-menu-text-shadow">
                  BOOK
                  ONLINE &rarr;</div>
              </template>
              <template #links>
                <div class="sans-serif p-3">
                  <a class="text-xl link" href="https://kenneths.com/app/">Existing Customer</a>
                </div>
                <div class="sans-serif p-3">
                  <a class="text-xl link" href="/book/new/service-type">New Customer</a>
                </div>
              </template>
            </pop-up-menu>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

// Site-wide entities for the homepage: the organization and the website it publishes.
// Each location page carries its own complete BeautySalon data (with the same @id as the
// /locations index), so the salons are not repeated here.
const organization = {
  "@type": "Organization",
  "@id": "https://kenneths.com/#organization",
  "name": "Kenneth's Hair Salons And Day Spas",
  "email": "apptroom@kenneths.com",
  "description": "We are dedicated to remaining reliable, relevant, and a resource for your hair, nail, and spa service needs. Kenneth's has been blessed to be continually recognized with local, national, and international awards, but we feel our best validation comes from your first visit and many returns thereafter. We can't wait to meet you. And know that we truly believe, that 'everyone deserves to feel beautiful.'",
  "image": "https://kenneths.com/static/kenneths.jpg",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://kenneths.com/#logo",
    "contentUrl": "https://kenneths.com/logo.webp",
    "url": "https://kenneths.com/logo.webp"
  },
  "url": "https://kenneths.com",
  "slogan": "Everyone deserves to feel beautiful",
  "brand": {
    "@type": "Brand",
    "name": "Kenneth's"
  },
  "telephone": "+16145385800",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+16145385800",
    "areaServed": "US",
    "availableLanguage": "English",
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:30"
      }
    ]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Columbus",
    "addressRegion": "OH",
    "postalCode": "43220",
    "streetAddress": "5151 Reed Rd Suite 250B",
    "addressCountry": "US"
  },
  "alternateName": [
    "Kenneth's",
    "Kenneth's Hair Salons",
    "Kenneth's Salon",
    "Kenneth's Spa",
    "Kenneth's Nail Salon"
  ],
  "additionalType": [
    "http://www.productontology.org/doc/Hairdresser",
    "https://www.wikidata.org/wiki/Q11265853",
    "https://www.wikidata.org/wiki/Q1195245",
    "http://www.productontology.org/doc/Hairstyle",
    "https://www.wikidata.org/wiki/Q747493",
    "https://www.wikidata.org/wiki/Q1161133",
    "http://www.productontology.org/doc/Day_spa",
    "http://www.productontology.org/doc/Cosmetics",
    "http://www.productontology.org/doc/Facial",
    "http://www.productontology.org/doc/Waxing",
    "http://www.productontology.org/doc/Bikini_waxing",
    "http://www.productontology.org/doc/Massage"
  ],
  "knowsAbout": [
    "Hair Stylist",
    "Hair Dresser",
    "https://en.wikipedia.org/wiki/Hairdresser",
    "Hair style",
    "https://en.wikipedia.org/wiki/Hairstyle",
    "https://en.wikipedia.org/wiki/List_of_hairstyles",
    "Hair coloring",
    "https://en.wikipedia.org/wiki/Hair_coloring",
    "Balayage",
    "https://en.wikipedia.org/wiki/Balayage",
    "Hair Highlighting",
    "https://en.wikipedia.org/wiki/Hair_highlighting",
    "Hair Extensions",
    "Weft",
    "https://en.wikipedia.org/wiki/Artificial_hair_integrations",
    "Keratin Treatment",
    "https://en.wikipedia.org/wiki/Brazilian_hair_straightening",
    "Manicure",
    "https://en.wikipedia.org/wiki/Manicure",
    "Pedicure",
    "https://en.wikipedia.org/wiki/Pedicure",
    "Facial",
    "https://en.wikipedia.org/wiki/Facial",
    "Day Spa",
    "Spa",
    "https://en.wikipedia.org/wiki/Day_spa",
    "Hydrafacial"
  ],
  "sameAs": [
    "https://www.instagram.com/kennethssalonandspa/",
    "https://www.facebook.com/KennethsSalonandspa",
    "https://www.tiktok.com/@kennethssalonandspa",
    "https://www.pinterest.com/kennethssalonandspa/",
    "https://www.youtube.com/user/KennethsSalon",
    "https://www.bbb.org/us/oh/columbus/profile/beauty-salon/kenneths-hair-salons-day-spas-inc-0302-20001492",
    "https://twitter.com/kennethssalon"
  ],
  "employee": [
    {
      "@type": "Person",
      "@id": "https://kenneths.com/about#tony-anders",
      "name": "Tony Anders",
      "jobTitle": "Vice President of Education",
      "worksFor": {
        "@id": "https://kenneths.com/#organization"
      },
      "sameAs": [
        "https://www.facebook.com/thetonyanders"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://kenneths.com/about#amy-mclain",
      "name": "Amy McLain",
      "jobTitle": "Director of Spa Education",
      "worksFor": {
        "@id": "https://kenneths.com/#organization"
      },
      "sameAs": [
        "https://www.facebook.com/amy.mclain.90"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://kenneths.com/about#stephanie-botamer",
      "name": "Stephanie Botamer",
      "jobTitle": "Director of Nail Education",
      "worksFor": {
        "@id": "https://kenneths.com/#organization"
      },
      "sameAs": [
        "https://www.facebook.com/stephanie.botamer"
      ]
    }
  ]
}

const website = {
  "@type": "WebSite",
  "@id": "https://kenneths.com/#website",
  "url": "https://kenneths.com",
  "name": "Kenneth's Hair Salons And Day Spas",
  "inLanguage": "en-US",
  "publisher": {
    "@id": "https://kenneths.com/#organization"
  }
}

const jsonLD = {
  "@context": "https://schema.org",
  "@graph": [organization, website]
}

const jsonLDString = JSON.stringify(jsonLD)

useHead({
  title: 'Hair Salon & Spa Columbus OH | Kenneth\'s',
  link: [
    {
      rel: 'canonical',
      href: 'https://kenneths.com'
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'Experience Kenneth\'s Hair Salons & Day Spas in Columbus, OH for expert hair, nails, facials, waxing, and massages across 10 convenient Central Ohio locations.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: 'Hair Salon & Spa Columbus OH | Kenneth\'s'
    },
    {
      property: 'og:description',
      content: 'Experience Kenneth\'s Hair Salons & Day Spas in Columbus, OH for expert hair, nails, facials, waxing, and massages across 10 convenient Central Ohio locations.'
    },
    {
      property: 'og:url',
      content: 'https://kenneths.com'
    },
    {
      property: 'og:image',
      content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
    },
    {
      property: 'og:image:secure_url',
      content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
    },
    {
      property: 'og:image:type',
      content: 'image/webp'
    },
    {
      property: 'og:image:alt',
      content: "Kenneth's Hair Salons And Day Spas logo"
    },
    {
      property: 'og:site_name',
      content: "Kenneth's Hair Salons And Day Spas"
    },
    {
      property: 'og:locale',
      content: 'en_US'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Hair Salon & Spa Columbus OH | Kenneth\'s'
    },
    {
      name: 'twitter:description',
      content: 'Experience Kenneth\'s Hair Salons & Day Spas in Columbus, OH for expert hair, nails, facials, waxing, and massages across 10 convenient Central Ohio locations.'
    },
    {
      name: 'twitter:image',
      content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
    },
    {
      name: 'twitter:image:alt',
      content: "Kenneth's Hair Salons And Day Spas logo"
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: jsonLDString
    }
  ]
})

</script>

<style scoped>
.hero {
  height: 1080px;
}
</style>