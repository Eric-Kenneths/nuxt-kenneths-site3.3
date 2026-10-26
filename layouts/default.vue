<template>
  <div class="bg-primary-900 caret-transparent">
    <ClientOnly>
      <Toast />
    </ClientOnly>

    <header class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] z-50">
      <!-- Row 1 (solid background) -->
      <div class="bg-primary-500 shadow-md pr-2 lg:pr-0 py-2 lg:py-0">
        <div class="mx-auto max-w-[1600px] py-0.5 flex justify-between items-center">
          <span class="text-primary-900 text-xl hidden lg:block">{{ announcement }}</span>

          <div class="flex flex-1 lg:flex-none lg:mr-13 items-center justify-end">
            <div class="flex items-center gap-3">
              <a class="whitespace-nowrap" href="tel:6145385800">
                (614) 538-5800
              </a>

              <pop-up-menu>
                <template #trigger>
                  <div
                    class="px-5 py-2 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">
                    Make an Appointment
                  </div>
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

              <a href="/locations"
                class="px-5 py-2 cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap hidden lg:inline-flex">
                Find a Location
              </a>
            </div>

            <div class="hidden lg:flex items-center gap-3 ml-0.5">
              <!-- <img class="h-8" src="/images/icons/user-dark.webp" alt="Login" /> -->
              <gift-card-cart-icon class="relative" />

              <!-- Shopping Bag (Desktop) -->
              <button class="relative inline-flex items-center justify-center cursor-pointer" @click="openCart">
                <img class="block w-full h-full object-contain scale-60" src="/images/icons/shopping-bag-dark.webp"
                  alt="Shopping Bag" />

                <span v-if="retailGlobal.cart.count > 0"
                  class="absolute top-1 -right-1 bg-primary-100 text-primary-900 text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {{ retailGlobal.cart.count }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2 (transparent) -->
      <div class="bg-transparent  transition-transform duration-200 ease-out"
        :class="row2Hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'">
        <div
          class="mx-auto max-w-[1600px] px-4 pt-3  lg:pt-8 flex justify-center space-x-8 items-center text-primary-100">
          <!-- Navigation Links: Only on desktop (lg+) LEFT SIDE -->
          <div class="space-x-6 hidden lg:flex">
            <Button class="text-xl px-10" @click="openDrawer">Services</Button>
            <a href="/shop/retail/top-sellers"
              class="hover:text-primary-emphasis text-xl py-1 ml-3 k-menu-text-shadow">Products</a>
          </div>

          <!-- Logo center for desktop (lg+), left-aligned for md and down -->
          <div class="absolute left-1/2 transform -translate-x-1/2 lg:block hidden">
            <a href="/"><img src="/images/header/kenneths-your-salon-spa.webp" alt="Logo"
                class="h-20 k-shadow-img" /></a>
          </div>
          <!-- Mobile/tablet logo left-aligned -->
          <div class="flex items-center lg:hidden">
            <a href="/"><img src="/images/header/kenneths-your-salon-spa.webp" alt="Logo"
                class="h-15 k-shadow-img" /></a>
          </div>

          <!-- Right navigation: Only on desktop (lg+) -->
          <div class="items-center space-x-6 ml-auto hidden lg:flex">
            <a href="/about" class="hover:text-primary-emphasis text-xl py-1 k-menu-text-shadow">Our Story</a>
            <a href="/our-team" class="hover:text-primary-emphasis text-xl py-1 k-menu-text-shadow">Our Team</a>
            <a href="/shop/gift-cards" class="hover:text-primary-emphasis text-xl py-1 k-menu-text-shadow">Gift
              Cards</a>
            <!-- <img class="h-7 cursor-pointer k-shadow-img" src="/images/icons/search.webp" alt="Search Kenneth's" /> -->
          </div>

          <!-- Mobile/tablet: Right icons (user, bag, hamburger) -->
          <div class="flex items-center space-x-3 lg:hidden ml-auto">
            <!-- <img src="/images/icons/user-light.webp" class="h-6 k-shadow-img" alt="Login" /> -->
            <gift-card-cart-icon class="relative" />
            <!-- Shopping Bag (Mobile/Tablet) -->
            <button class="relative cursor-pointer bg-primary-500 rounded py-1 px-2 k-shadow-img" @click="openCart">
              <img src="/images/icons/shopping-bag-light.webp" class="h-6" alt="Shopping Bag">

              <span v-if="retailGlobal.cart.count > 0"
                class="absolute -top-2 -right-2 bg-primary-100 text-primary-900 text-[10px] font-bold px-1.5 py-px rounded-full shadow">
                {{ retailGlobal.cart.count }}
              </span>
            </button>
            <!-- Hamburger icon; triggers drawer -->
            <button aria-label="Open Menu" @click="drawerOpen = true"
              class="focus:outline-none cursor-pointer k-shadow-img bg-primary-500 rounded">
              <svg class="h-8 w-8 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
    <!-- Cart Menu Drawer -->
    <cart-menu />

    <!-- Drawer -->
    <Transition name="slide-left">
      <div v-if="drawerOpen" class="fixed inset-0 z-50 flex justify-center">
        <!-- Constrain drawer to content width -->
        <div class="w-full max-w-[1620px] relative flex">

          <!-- Drawer Panel (slides in from content boundary) -->
          <nav class="w-90 bg-primary-900 text-primary-100 h-full p-6 shadow-xl relative transform">
            <!-- Drawer Content -->
            <div class="border-b border-b-gray-100/50 pb-3 my-4 flex items-center lg:hidden">
              <a href="/"><img src="/images/header/kenneths-your-salon-spa.webp" alt="Logo" class="h-13" /></a>
            </div>

            <!-- X Close Icon -->
            <button @click="closeDrawer" aria-label="Close"
              class="absolute top-10 lg:top-4 right-5 text-primary-100 hover:text-primary-500 text-4xl focus:outline-none cursor-pointer"
              style="background:transparent;">
              &times;
            </button>

            <!-- Main Service Menu -->
            <div v-show="!submenu">
              <h2 class="text-xl font-bold mb-3">Services</h2>
              <div
                class="border-b border-b-gray-100/50 pb-6 lg:border-none space-y-4 lg:text-xl lg:uppercase font-bold">
                <a href="/services/hair"
                  class="lg:border-t border-t-gray-100/50 md:pt-2 px-0 cursor-pointer flex items-center justify-between">
                  <span class="text-left">Hair</span>
                  <!--<span><img class="w-7 lg:w-10" src="/images/icons/arrow-right.webp" alt="To hair sub menu" /></span>-->
                </a>
                <a href="/services/spa"
                  class="lg:border-t border-t-gray-100/50 md:pt-2 px-0 cursor-pointer flex items-center justify-between">
                  <span class="text-left">Spa</span>
                  <!-- <span><img class="w-7 lg:w-10" src="/images/icons/arrow-right.webp" alt="To spa sub menu" /></span> -->
                </a>
                <a href="/services/nail"
                  class="lg:border-t border-t-gray-100/50 md:pt-2 px-0 cursor-pointer flex items-center justify-between">
                  <span class="text-left">Nails</span>
                  <!-- <span><img class="w-7 lg:w-10" src="/images/icons/arrow-right.webp" alt="To nails sub menu" /></span> -->
                </a>
                <a href="/services"
                  class="lg:border-t border-t-gray-100/50 md:pt-2 px-0 cursor-pointer flex items-center justify-between">
                  <span class="text-left">All Services</span>
                  <!-- <span><img class="w-7 lg:w-10" src="/images/icons/arrow-right.webp"
                      alt="To all services sub menu" /></span> -->
                </a>
              </div>
            </div>

            <div v-show="submenu === null"
              class="border-b border-b-gray-100/50 pb-4 lg:hidden font-bold mt-6 space-y-4">
              <div>
                <a href="/shop/retail/top-sellers" class="text-primary-100 hover:text-primary-emphasis">Products</a>
              </div>
              <div>
                <a href="/shop/gift-cards" class="text-primary-100 hover:text-primary-emphasis">Gift Cards</a>
              </div>
              <div>
                <a href="/about" class="text-primary-100 hover:text-primary-emphasis">Our Story</a>
              </div>
              <div>
                <a href="/our-team" class="text-primary-100 hover:text-primary-emphasis">Our Team</a>
              </div>
              <div>
                <a href="/join-our-team" class="text-primary-100 hover:text-primary-emphasis">Join Our Team</a>
              </div>
            </div>

            <div v-show="submenu === null" class="lg:hidden pt-7">
              <div class="pb-5 flex">


                <pop-up-menu>
                  <template #trigger>
                    <div
                      class="px-19 py-2 text-center cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">
                      Make an Appointment</div>
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
              <div class="flex">
                <a href="/locations"
                  class="px-25 py-2 text-center cursor-pointer rounded-3xl bg-primary-100 text-primary-900 hover:bg-primary-emphasis whitespace-nowrap">Find
                  a Location</a>
              </div>
            </div>

            <!-- Hair Submenu (links) -->
            <div v-show="submenu === 'hair'">
              <button @click="submenu = null" class="mb-4 text-primary-500 hover:underline text-sm font-medium">&larr;
                back to service menu</button>
              <h2 class="text-xl font-bold mb-6 uppercase lg:normal-case">Hair Services</h2>
              <ul class="space-y-4 lg:text-xl lg:uppercase">
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/cuts-and-styles"
                    class="block">Hair Cuts + Styles</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/color" class="block">Hair
                    Color</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/highlights"
                    class="block">Highlighting</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/treatments" class="block">Hair
                    Masks + Treatments</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/smoothing-and-perms"
                    class="block">Hair Smoothing + Perms</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/extensions" class="block">Hair
                    extensions</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/hair/japanese-head-spa"
                    class="block">Japanese Head Spa</a></li>
              </ul>
            </div>

            <!-- Spa Submenu (links) -->
            <div v-show="submenu === 'spa'">
              <button @click="submenu = null" class="mb-4 text-primary-500 hover:underline text-sm font-medium">&larr;
                back to service menu</button>
              <h2 class="text-xl font-bold mb-6 uppercase lg:normal-case">Spa Services</h2>
              <ul class="space-y-4 lg:text-xl lg:uppercase">
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/facials"
                    class="block">Facials</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/waxing"
                    class="block">Waxings</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/brow-and-lash"
                    class="block">Brow +
                    Lash</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/makeup"
                    class="block">Makeup</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/massage"
                    class="block">Massage</a>
                </li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/spa/spa-bar" class="block">Spa Bar
                    (Polaris)</a></li>
              </ul>
            </div>

            <!-- Nails Submenu (links) -->
            <div v-show="submenu === 'nails'">
              <button @click="submenu = null" class="mb-4 text-primary-500 hover:underline text-sm font-medium">&larr;
                back to service menu</button>
              <h2 class="text-xl font-bold mb-6 uppercase lg:normal-case">Nail Services</h2>
              <ul class="space-y-4 lg:text-xl lg:uppercase">
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/nail/manicures"
                    class="block">Manicures</a></li>
                <li class="lg:border-t border-t-gray-100/50 pt-3"><a href="/services/nail/pedicures"
                    class="block">Pedicures</a></li>
              </ul>
            </div>

          </nav>

          <!-- Overlay (only inside content container) -->
          <div class="flex-1 bg-black/40" @click="closeDrawer"></div>
        </div>
      </div>
    </Transition>


    <!-- Slot: Main app content -->
    <main class="pt-14 mx-auto max-w-[1600px]">
      <slot />
    </main>

    <first-timer-coupon-popup />

    <footer class="bg-primary-900 text-primary-100 pt-10 pb-4 px-4 max-w-[1600px] mx-auto">
      <div class=" mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div>
        </div>
        <div class="flex justify-center">
          <img src="/images/icons/k-icon-light.webp" alt="Logo" class="h-40 w-auto" />
        </div>

        <div class="flex justify-center lg:justify-end gap-4">
          <img src="/images/footer/2025-columbus-ceo.webp" alt="Columbus CEO Best of Business"
            class="h-20 lg:h-25 w-auto" />
          <img src="/images/footer/2025-cbus-top-picks-first-place.webp" alt="CBUS Top Hair Salons and Spas"
            class="h-20 lg:h-25 w-auto" />
          <img src="/images/footer/2026-colum-best.webp" alt="Columbus best hair salon" class="h-20 lg:h-25 w-auto" />
          <img src="/images/footer/2025-salon-today.webp" alt="Kenneth's is a Salon Today 200"
            class="h-20 lg:h-25 w-auto" />
        </div>
      </div>

      <div
        class="border-t pt-3 max-w-[1920px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6 mb-8">
        <div>
          <ul class="space-y-2">
            <li><a href="/services/hair" class="hover:underline">Hair Services</a></li>
            <li><a href="/services/spa" class="hover:underline">Spa Services</a></li>
            <li><a href="/services/nail" class="hover:underline">Nail Services</a></li>
          </ul>
        </div>
        <div>
          <ul class="space-y-2">
            <li><a href="/about" class="hover:underline">Our Story</a></li>
            <li><a href="/shop/retail/top-sellers" class="hover:underline">Products</a></li>
            <li><a href="/our-team" class="hover:underline">Our Team</a></li>
          </ul>
        </div>
        <div>
          <ul class="space-y-2">
            <li><a href="/shop/gift-cards" class="hover:underline">Gift Cards</a></li>
            <li><a href="/join-our-team" class="hover:underline">Join Our Team</a></li>
            <li><a href="/salon-policy" class="hover:underline">Salon Policies &amp; FAQs</a></li>
          </ul>
        </div>
        <div>
          <ul class="space-y-2">
            <li><a href="/locations/academy" class="hover:underline">The Academy</a></li>
            <li><a href="/model" class="hover:underline">Model Program</a></li>
            <li><a href="/training" class="hover:underline">Training</a></li>
          </ul>
        </div>
        <div>
          <ul class="space-y-2">
            <li><a href="/blog" class="hover:underline">Our Blog</a></li>
            <li><a href="/referral-program" class="hover:underline">Refer a Friend</a></li>
            <li><a href="/contact-us" class="hover:underline">Contact Us</a></li>
          </ul>
        </div>
      </div>


      <div
        class="border-t pt-3 text-sm flex flex-col md:flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-3">

        <!-- Social Icons (top on small/medium, right on large) -->
        <div class="flex gap-4 order-1 lg:order-2">
          <a href="https://facebook.com/KennethsSalonandspa" target="_blank">
            <img src="/images/social/facebook-light.webp" alt="Kenneth's on Facebook" class="h-6 w-6 hover:opacity-80">
          </a>
          <a href="https://instagram.com/kennethssalonandspa" target="_blank">
            <img src="/images/social/instagram-light.webp" alt="Kenneth's on Instagram"
              class="h-6 w-6 hover:opacity-80">
          </a>
          <a href="https://tiktok.com/@kennethssalonandspa" target="_blank">
            <img src="/images/social/tiktok-light.webp" alt="Kenneth's on TikTok" class="h-6 w-6 hover:opacity-80">
          </a>
          <a href="https://pinterest.com/kennethssalonandspa" target="_blank">
            <img src="/images/social/pinterest-light.webp" alt="Kenneth's on Pinterest"
              class="h-6 w-6 hover:opacity-80">
          </a>
          <a href="https://x.com/KennethsSalon" target="_blank">
            <img src="/images/social/x-light.webp" alt="Kenneth's on X" class="h-6 w-6 hover:opacity-80">
          </a>
          <a href="https://youtube.com/@KennethsSalon" target="_blank">
            <img src="/images/social/youtube-light.webp" alt="Kenneth's on YouTube" class="h-6 w-6 hover:opacity-80">
          </a>
        </div>

        <!-- Footer Text -->
        <div class="order-2 lg:order-1 text-center lg:text-left">
          <span>© {{ currentYear }} Kenneth's</span>
          <span class="mx-2">|</span>
          <span>Version {{ appGlobal.appVersion }}</span>
          <span class="mx-2">|</span>
          <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
          <span class="mx-2">|</span>
          <a href="/return-policy" class="hover:underline">Return Policy</a>
          <span class="mx-2">|</span>
          <a href="/accessibility-statement" class="hover:underline">Accessibility Statement</a>
          <span class="block text-xs mt-1">Design by Wonderly</span>
        </div>

      </div>

      <!-- <div class="border-t pt-3 text-center text-sm">
        <span>© 2025 Kenneth's</span>
        <span class="mx-2">|</span>
        <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
        <span class="mx-2">|</span>
        <a href="/return-policy" class="hover:underline">Return Policy</a>
        <span class="mx-2">|</span>
        <a href="/accessibility-statement" class="hover:underline">Accessibility Statement</a>
        <span class="block text-xs mt-1">Design by Wonderly</span>
      </div> -->
    </footer>
  </div>
</template>

<script setup>
import Toast from '@/volt/Toast.vue';
import Button from '@/volt/Button.vue';
import { retailGlobal } from '~/composables/retailGlobal';
import { appGlobal } from '~/composables/appGlobal';
const route = useRoute()
const config = useRuntimeConfig()

const canonicalUrl = computed(() => {
  return `${config.public.siteUrl}${route.path}`
})

useHead({
  htmlAttrs: {
    lang: 'en-US'
  },
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ],
  meta: [
    {
      property: 'og:url',
      content: canonicalUrl
    },
    {
      property: 'og:image',
      content: 'https://kenneths.com/images/icons/logo-dark-medium.webp'
    }
  ]
})

const currentYear = ref(new Date().getFullYear());

const drawerOpen = ref(false)
const submenu = ref(null) // Tracks which submenu is open; null shows main menu

const row2Hidden = ref(false)

const announcement = ref('');

let lastY = 0
const delta = 8

const onScroll = () => {
  const y = window.scrollY || 0
  const diff = y - lastY

  if (y < 10) {
    row2Hidden.value = false
    lastY = y
    return
  }

  if (Math.abs(diff) < delta) return

  if (diff > 0) {
    // scrolling down
    row2Hidden.value = true
  } else {
    // scrolling up
    row2Hidden.value = false
  }

  lastY = y
}

onMounted(async () => {
  const { gtag } = useGtag();
  document.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.matches('a[href^="tel:"]')) {
      gtag('event', 'phone_number_click', {
        event_category: 'Phone Calls',
        event_label: e.target.getAttribute('href'),
        value: 1
      });
    }
  });

  lastY = window.scrollY || 0
  window.addEventListener('scroll', onScroll, { passive: true })

  const { getCartCount } = useLocalStorage();

  let retailCartCount = await getCartCount();

  if (retailCartCount > 0) {
    retailGlobal.refreshRetailSession();
  }

})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function openCart() {
  if (retailGlobal.cart.count > 0) {
    retailGlobal.refreshRetailSession();
  }
  retailGlobal.cart.visible = true;
}

function openDrawer() {
  submenu.value = null // Always start with root menu
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
  submenu.value = null
}
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}

.k-menu-text-shadow {
  text-shadow: 0 2px 5px #000;
}

.k-header-text-shadow {
  text-shadow: 0 2px 15px #000
}

.k-light-text-shadow {
  text-shadow: 0 2px 5px darkgray;
}

.k-shadow-img {
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.6));
}

.customerImageResponse {
  /* border: solid 5px white; */
  max-width: 100%;
  height: auto;
  padding: 0;
  border: 0px solid silver;
  /* box-shadow: -2px 2px 2px #888888; */
}

.customerResponseContainer {
  max-width: 225px !important;
  margin: 0px;
  padding: 15px;
  position: relative;
}

.customerResponseContainer img:hover {
  cursor: pointer;
  opacity: .8;
}

.checkMarkOverLay {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}
</style>