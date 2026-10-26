<template>
    <!-- Modal pop-up -->
    <RetailTechnicianLinkModal v-model="retailGlobal.linkTechnicianVisible"
      @cancel="retailGlobal.linkTechnicianVisible = false" @confirm="confirmTechnicianLink" />

    <section class="lg:hidden bg-primary-900 w-full h-[95px] lg:h-[120px] flex items-end">
      <GoldLine />
    </section>

    <!-- HERO -->
    <div class="relative flex items-center justify-center h-[45vmin] lg:h-[30vmin] w-full overflow-hidden">
      <div>
        <img src="/images/icons/k-icon-light.webp" loading="eager" fetchpriority="high" alt="Stylist"
          class="absolute -top-20 -left-10 w-auto h-[160%] z-20 pointer-events-none opacity-30" />
      </div>

      <div class="flex items-center justify-center space-x-6 pt-60 lg:pt-35 pb-70 lg:pb-35">
        <h1 class="font-thin text-2xl md:text-3xl lg:text-8xl text-primary-100 uppercase text-center pt-30">
          {{ currentHeroMeta.title }}
        </h1>
      </div>
    </div>

    <GoldLine />

    <div class="bg-primary-100 text-primary-900">
      <!-- Section Header -->
      <section class="flex flex-col md:grid lg:grid-cols-2">
        <div class="w-full h-full flex">
          <img :src="currentHeroMeta.imageSrc" :alt="currentHeroMeta.majorHeader" loading="eager" fetchpriority="high"
            class="object-cover w-full h-full" />
        </div>

        <div
          class="grid grid-rows-[auto_1fr_auto] px-4 md:px-12 bg-primary-900 text-white min-h-75 md:min-h-180 h-full">
          <div class="flex items-start">
            <h2 class="k-section-title pt-10 md:pt-10 font-thin uppercase">
              {{ currentHeroMeta.majorHeader }}
            </h2>
          </div>

          <div></div>

          <div class="self-end pb-8 md:pb-12">
            <p class="k-para-text">
              {{ currentHeroMeta.subHeader }}
            </p>
          </div>
        </div>
      </section>

      <product-menu />

      <!-- PRODUCT GRID SECTION -->
      <section id="product-grid" ref="productGridSection"
        class="w-full px-6 pb-16 bg-primary-100 text-primary-900 border-b border-primary-500 scroll-mt-28 lg:scroll-mt-36">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 max-w-[1600px] mx-auto">
          <!-- SIDEBAR -->
          <aside class="lg:col-span-1">
            <div class="p-5">
              <!-- TECHNICIAN SUPPORT (DESKTOP) -->
              <div class="hidden lg:block mb-6">
                <h3 class="text-2xl font-normal mb-4 text-primary-900">Technician</h3>

                <div class="w-full max-w-[320px]">
                  <div v-if="retailGlobal.linkedTechnician.techId === 0">
                    <button type="button"
                      class="w-full inline-flex items-center justify-between py-2 px-4 rounded-3xl bg-primary-500 text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900 cursor-pointer"
                      @click="openLinkTechModal">
                      <span class="text-base font-semibold uppercase">Support Your Technician</span>
                      <span class="text-sm font-semibold underline underline-offset-4">Click here</span>
                    </button>
                  </div>

                  <div v-else>
                    <div class="w-full rounded-3xl bg-primary-500 text-primary-900 p-4">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <div class="text-xs uppercase font-semibold opacity-80">Your technician</div>
                          <div class="text-lg font-semibold truncate">
                            {{ retailGlobal.linkedTechnician.technicianName }}
                          </div>
                        </div>

                        <div class="flex items-center gap-2 shrink-0">
                          <!-- EDIT -->
                          <button type="button"
                            class="inline-flex items-center gap-2 text-sm font-semibold uppercase underline underline-offset-4"
                            @click="openLinkTechModal"
                            :aria-label="`Edit linked technician. Currently: ${retailGlobal.linkedTechnician.technicianName}`">
                            Edit
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" stroke="currentColor"
                                stroke-width="2" stroke-linejoin="round" />
                            </svg>
                          </button>

                          <!-- CLEAR (X) -->
                          <button type="button"
                            class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-900"
                            @click="clearLinkedTechnician" aria-label="Clear linked technician"
                            title="Clear technician">
                            <span aria-hidden="true" class="text-xl leading-none">&times;</span>
                          </button>
                        </div>
                      </div>

                      <!-- TECH FAVORITES LINK (DESKTOP) -->
                      <button type="button"
                        class="mt-3 text-left text-base underline underline-offset-4 hover:opacity-80"
                        @click="technicianFavorites"
                        :aria-label="`See ${retailGlobal.linkedTechnician.technicianName}'s favorites`">
                        See technician favorites
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- PRODUCT SEARCH (DESKTOP) -->
              <div class="hidden lg:block mb-6">
                <h3 class="text-2xl font-normal mb-4 text-primary-900">Search</h3>

                <div class="relative w-full max-w-[320px]">
                  <label for="product-search-desktop" class="sr-only">
                    Search products
                  </label>

                  <div class="flex gap-2">
                    <div class="relative flex-1">
                      <InputText id="product-search-desktop" v-model="state.searchInput" placeholder="Search products"
                        class="w-full cursor-text caret-primary-900 rounded-3xl border border-primary-900/30 px-4 py-2 pr-9 bg-white text-primary-900"
                        @input="updateSuggestion" @keyup.enter="search" />

                      <button v-if="state.searchInput.length" type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-primary-900 hover:opacity-70"
                        aria-label="Clear product search" @click="clearSearch">
                        &times;
                      </button>
                    </div>

                    <button type="button"
                      class="shrink-0 rounded-3xl bg-primary-500 px-4 py-2 font-semibold uppercase text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900"
                      @click="search">
                      Search
                    </button>
                  </div>

                  <Menu v-if="state.searchSuggestions.length" :model="state.searchSuggestions"
                    class="absolute left-0 top-full z-50 mt-2 w-full" />
                </div>
              </div>

              <!-- CATEGORY (DESKTOP) -->
              <div v-if="state.filters.length" class="hidden lg:block">
                <h3 class="text-2xl font-normal mb-4 text-primary-900">Category</h3>

                <nav role="radiogroup" aria-label="Category Filters" class="space-y-3">
                  <button type="button" @click="selectCategoryNone" :aria-checked="state.selectedFilter === null"
                    role="radio" class="w-full flex items-center gap-3 px-2 py-2 rounded-lg">
                    <span class="relative inline-flex items-center justify-center h-6 w-6 rounded-full border-2"
                      :class="state.selectedFilter === null ? 'border-primary-900' : 'border-primary-900/70'">
                      <span v-if="state.selectedFilter === null" class="h-3.5 w-3.5 rounded-full bg-primary-900"></span>
                    </span>
                    <span class="text-xl"
                      :class="state.selectedFilter === null ? 'font-semibold' : 'font-medium text-primary-900/90'">
                      None
                    </span>
                  </button>

                  <button v-for="filter in state.filters" :key="filter.itemWebCategoryId" type="button"
                    @click="selectCategory(filter.itemWebCategoryId)"
                    :aria-checked="state.selectedFilter === filter.itemWebCategoryId" role="radio"
                    class="w-full flex items-center gap-3 px-2 py-2 rounded-lg">
                    <span class="relative inline-flex items-center justify-center h-6 w-6 rounded-full border-2"
                      :class="state.selectedFilter === filter.itemWebCategoryId ? 'border-primary-900' : 'border-primary-900/70'">
                      <span v-if="state.selectedFilter === filter.itemWebCategoryId"
                        class="h-3.5 w-3.5 rounded-full bg-primary-900"></span>
                    </span>
                    <span class="text-xl"
                      :class="state.selectedFilter === filter.itemWebCategoryId ? 'font-semibold' : 'font-medium text-primary-900/90'">
                      {{ filter.description }}
                    </span>
                  </button>
                </nav>
              </div>

              <hr class="my-6 border-t-2 border-primary-900/70 hidden lg:block" />

              <!-- SORT (DESKTOP) -->
              <div class="hidden lg:block">
                <h3 class="text-2xl font-normal mb-4 text-primary-900">Sort</h3>

                <nav role="radiogroup" aria-label="Sort Products" class="space-y-3">
                  <button v-for="opt in state.sortBys" :key="opt.value" type="button" @click="selectSort(opt.value)"
                    :aria-checked="state.sortBy === opt.value" role="radio"
                    class="w-full flex items-center gap-3 px-2 py-2 rounded-lg">
                    <span class="relative inline-flex items-center justify-center h-6 w-6 rounded-full border-2"
                      :class="state.sortBy === opt.value ? 'border-primary-900' : 'border-primary-900/70'">
                      <span v-if="state.sortBy === opt.value" class="h-3.5 w-3.5 rounded-full bg-primary-900"></span>
                    </span>
                    <span class="text-xl"
                      :class="state.sortBy === opt.value ? 'font-semibold' : 'font-medium text-primary-900/90'">
                      {{ opt.display }}
                    </span>
                  </button>
                </nav>
              </div>

              <!-- MOBILE CATEGORY & SORT -->
              <div class="lg:hidden grid grid-cols-2 gap-3">
                <details ref="mobileCategoryDetails" class="relative group min-w-0">
                  <summary
                    class="list-none inline-flex justify-between items-center gap-2 w-full py-2 px-4 rounded-3xl bg-primary-500 text-primary-900 cursor-pointer"
                    aria-label="Select product category">
                    <span class="min-w-0 flex-1 truncate">
                      {{ mobileSelectedCategoryLabel }}
                    </span>
                    <span aria-hidden="true" class="shrink-0">▾</span>
                  </summary>

                  <div
                    class="absolute left-0 mt-2 w-max min-w-full max-w-[calc(100vw-3rem)] bg-primary-500 rounded-2xl shadow-xl z-40 overflow-x-auto">
                    <button type="button"
                      class="block w-full text-left px-4 py-2 hover:bg-primary-emphasis whitespace-normal break-words leading-snug"
                      @click="selectMobileCategoryNone">
                      None
                    </button>
                    <button v-for="filter in state.filters" :key="filter.itemWebCategoryId" type="button"
                      class="block w-full text-left px-4 py-2 hover:bg-primary-emphasis whitespace-normal break-words leading-snug"
                      @click="selectMobileCategory(filter.itemWebCategoryId)">
                      {{ filter.description }}
                    </button>
                  </div>
                </details>

                <details ref="mobileSortDetails" class="relative group min-w-0">
                  <summary
                    class="list-none inline-flex justify-between items-center gap-2 w-full py-2 px-4 rounded-3xl bg-primary-500 text-primary-900 cursor-pointer"
                    aria-label="Sort products">
                    <span class="min-w-0 flex-1 truncate">
                      {{ mobileSelectedSortLabel }}
                    </span>
                    <span aria-hidden="true" class="shrink-0">▾</span>
                  </summary>

                  <div
                    class="absolute right-0 mt-2 w-max min-w-full max-w-[calc(100vw-3rem)] bg-primary-500 rounded-2xl shadow-xl z-40 overflow-x-auto">
                    <button v-for="opt in state.sortBys" :key="opt.value" type="button"
                      class="block w-full min-w-max text-left px-4 py-2 hover:bg-primary-emphasis whitespace-nowrap leading-snug"
                      @click="selectMobileSort(opt.value)">
                      {{ opt.display }}
                    </button>
                  </div>
                </details>
              </div>

              <!-- TECHNICIAN (MOBILE) -->
              <div class="lg:hidden mt-4 flex justify-center">
                <div class="w-full max-w-[calc(50%-0.375rem)]">
                  <div v-if="retailGlobal.linkedTechnician.techId === 0">
                    <button type="button"
                      class="w-full inline-flex items-center justify-between py-2 px-4 rounded-3xl bg-primary-500 text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900"
                      @click="openLinkTechModal">
                      <span class="text-sm font-semibold uppercase">Support Tech</span>
                      <span class="text-sm font-semibold underline underline-offset-4">Click</span>
                    </button>
                  </div>

                  <div v-else class="flex items-center gap-2">
                    <button type="button"
                      class="flex-1 inline-flex items-center justify-between py-2 px-4 rounded-3xl bg-primary-500 text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900"
                      @click="openLinkTechModal"
                      :aria-label="`Edit linked technician. Currently: ${retailGlobal.linkedTechnician.technicianName}`">
                      <span class="text-sm font-semibold uppercase truncate">
                        {{ retailGlobal.linkedTechnician.technicianName }}
                      </span>
                      <span class="text-sm font-semibold underline underline-offset-4">Edit</span>
                    </button>

                    <button type="button"
                      class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900"
                      @click="clearLinkedTechnician" aria-label="Clear linked technician" title="Clear technician">
                      <span aria-hidden="true" class="text-xl leading-none">&times;</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- TECH FAVORITES LINK (MOBILE) -->
              <div v-if="retailGlobal.linkedTechnician.techId !== 0" class="lg:hidden mt-3 flex justify-center">
                <button type="button"
                  class="w-full max-w-[calc(50%-0.375rem)] text-center text-sm font-semibold underline underline-offset-4 hover:opacity-80"
                  @click="technicianFavorites"
                  :aria-label="`Technician favorites for ${retailGlobal.linkedTechnician.technicianName}`">
                  Technician favorites
                </button>
              </div>
            </div>

            <!-- PRODUCT SEARCH (MOBILE) -->
            <div class="lg:hidden mt-4">
              <label for="product-search-mobile" class="sr-only">
                Search products
              </label>

              <div class="relative">
                <InputText id="product-search-mobile" v-model="state.searchInput" placeholder="Search products"
                  class="w-full cursor-text caret-primary-900 rounded-3xl border border-primary-900/30 px-4 py-2 pr-10 bg-white text-primary-900"
                  @input="updateSuggestion" @keyup.enter="search" />

                <button v-if="state.searchInput.length" type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-primary-900 hover:opacity-70 cursor-pointer"
                  aria-label="Clear product search" @click="clearSearch">
                  &times;
                </button>
              </div>

              <div class="mt-2 flex justify-center">
                <button type="button"
                  class="w-full max-w-[calc(50%-0.375rem)] rounded-3xl bg-primary-500 px-4 py-2 font-semibold uppercase text-primary-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-900 cursor-pointer"
                  @click="search">
                  Search
                </button>
              </div>

              <div class="relative">
                <Menu v-if="state.searchSuggestions.length" :model="state.searchSuggestions"
                  class="absolute left-0 top-0 z-50 mt-2 w-full" />
              </div>
            </div>
          </aside>

          <!-- PRODUCT GRID -->
          <div class="lg:col-span-3">
            <div class="max-w-4xl mx-auto text-center px-2 pt-3 pb-6">
              <p class="text-base md:text-lg leading-relaxed text-primary-900">
                {{ productIntroCopy }}
              </p>
            </div>

            <div class="text-center font-bold text-3xl md:text-4xl py-3 text-primary-900">
              {{ currentMeta.header }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="(item, id) in state.items" :key="item.itemCode || item.urlRouteName || id"
                class="bg-white/70 p-3 shadow-sm ring-1 ring-primary-500/20 hover:shadow-md transition">
                <a :href="'/shop/retail/product/' + item.urlRouteName" class="block group">
                  <div class="aspect-2/3 w-full overflow-hidden mb-3 rounded-lg bg-white/70 p-2">
                    <img class="h-full w-full object-contain mx-auto"
                      :src="retailGlobal.getItemImage(item.urlRouteName)" :alt="item.webName" loading="lazy" />
                  </div>

                  <div class="text-center font-semibold text-base md:text-lg mb-1">
                    {{ item.webName }}
                  </div>

                  <div class="text-center text-sm md:text-base" v-if="!item?.discount?.itemCode">
                    {{ filterCurrency(item.lowPrice) }}
                    <span v-if="item.highPrice > item.lowPrice">- {{ filterCurrency(item.highPrice) }}</span>
                  </div>

                  <div class="text-center text-sm md:text-base" v-else>
                    <span class="line-through opacity-70">
                      {{ filterCurrency(item.lowPrice) }}
                      <span v-if="item.highPrice > item.lowPrice">- {{ filterCurrency(item.highPrice) }}</span>
                    </span>
                    <span class="mx-1">•</span>
                    <span class="font-medium">{{ item.discount.discountText }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- /PRODUCT GRID -->
        </div>
      </section>
    </div>
</template>

<script setup>
import InputText from "@/volt/InputText.vue";
import Menu from "@/volt/Menu.vue";
import { appGlobal } from "~/composables/appGlobal";
import { retailGlobal } from "~/composables/retailGlobal";
import { dataGlobal } from "~/composables/dataGlobal";
import { useRoute, useRouter } from "vue-router";
import { reactive, watch, computed, onMounted, ref, nextTick } from "vue";
import { useFilters } from "~/composables/useFilters";
import { RETAIL_GROUPS } from "#shared/retailGroups";
import { useHead, useAsyncData, useRuntimeConfig } from "#imports";

dataGlobal.sideBarVisible = false;

const config = useRuntimeConfig();

const { getTechnicianLiteById } = useKhsds();

const route = useRoute();
const router = useRouter();
const { filterCurrency } = useFilters();

const productGridSection = ref(null);
const mobileCategoryDetails = ref(null);
const mobileSortDetails = ref(null);
const shouldScrollAfterRetailRouteChange = ref(false);

/* -------------------------------------------------------
   STATE
   IMPORTANT:
   Keep state before any computed SEO object that references state.
------------------------------------------------------- */
const state = reactive({
  filters: [],
  items: [],
  itemsMaster: [],
  selectedFilter: null,

  searchInput: "",
  searchSuggestions: [],
  searchParam: "",

  sortBy: "feats",
  sortBys: [
    { display: "Featured", value: "feats" },
    { display: "Product Name (A-Z)", value: "alpha0" },
    { display: "Product Name (Z-A)", value: "alpha1" },
    { display: "Price (Low > High)", value: "price0" },
    { display: "Price (High > Low)", value: "price1" },
  ],
});

async function scrollToProductGrid() {
  await nextTick();

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const el = productGridSection.value;
      if (!el) return;

      const headerOffset = window.innerWidth >= 1024 ? 145 : 105;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
}

/* -------------------------------------------------------
   API BASE URL
   For SSR, prefer runtime config.
   appGlobal.apiBaseUrl remains as a fallback for existing client behavior.
------------------------------------------------------- */
function getApiBaseUrl() {
  return String(config.public?.apiBaseUrl || appGlobal.apiBaseUrl || "").replace(/\/$/, "");
}

function buildApiUrl(path) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) return "";

  return `${apiBaseUrl}${path}`;
}

/* -------------------------------------------------------
   MODAL OPEN
------------------------------------------------------- */
function openLinkTechModal() {
  retailGlobal.linkTechnicianVisible = true;
}

/* -------------------------------------------------------
   LOCAL GROUP LIST
------------------------------------------------------- */
// The category list itself lives in shared/retailGroups.ts, which the sitemap also reads
const webGroups = RETAIL_GROUPS;

function getGroupCodeByUrlDescription(descrip) {
  const d = String(descrip || "").toLowerCase();
  return webGroups.find((x) => x.urlDescrip === d)?.code ?? 14;
}

function isRecognizedGroupSlug(descrip) {
  const d = String(descrip || "").toLowerCase();
  return d === "search" || webGroups.some((x) => x.urlDescrip === d);
}

/* -------------------------------------------------------
   CURRENT GROUP
------------------------------------------------------- */
const groupDescription = computed(() =>
  String(route.params.groupDescription || "top-sellers").toLowerCase()
);

const { throwError } = useResponse();

if (!isRecognizedGroupSlug(groupDescription.value)) {
  throwError(404, `Product category "${groupDescription.value}" not found`);
}

const isTechnicianFavoritesGroup = computed(
  () => getGroupCodeByUrlDescription(groupDescription.value) === 16
);

function isPublicRetailCategoryGroup() {
  const groupCode = getGroupCodeByUrlDescription(groupDescription.value);

  return groupDescription.value !== "search" && groupCode !== 16;
}

function getPublicRetailListUrl() {
  if (!isPublicRetailCategoryGroup()) return "";

  const groupCode = getGroupCodeByUrlDescription(groupDescription.value);

  return buildApiUrl(`/khsds/ItemWeb/ListForWeb/${groupCode}/0/0`);
}

/* -------------------------------------------------------
   HERO + SEO CONTENT MAP (H1 / H2 / Description / Keywords / Image)
------------------------------------------------------- */
const heroSeoMap = {
  "top-sellers": {
    metaTitle: "Luxury Products | ",
    title: "Top Sellers",
    majorHeader: "Our Most Loved Essentials",
    subHeader:
      "Client favorites developed, tested, and trusted in our salons for consistent results and everyday performance.",
    seoSupportTerms: ["best professional hair products", "salon favorites", "stylist recommended products"],
    imageSrc: "/images/retail/top-sellers.webp",
  },
  shampoo: {
    metaTitle: "Luxury Hair Care | ",
    title: "Shampoo",
    majorHeader: "Cleansing Designed with Purpose",
    subHeader:
      "Professionally formulated shampoos created to address scalp health, hair integrity, and long-term beauty across every hair type.",
    seoSupportTerms: ["professional shampoo", "salon shampoo", "scalp health", "hair care solutions"],
    imageSrc: "/images/retail/shampoo.webp",
  },
  conditioner: {
    metaTitle: "Luxury Hair Care | ",
    title: "Conditioner",
    majorHeader: "Targeted Moisture and Strength",
    subHeader:
      "Conditioners engineered to restore balance, enhance manageability, and protect the integrity of the hair at every stage.",
    seoSupportTerms: ["professional conditioner", "hair hydration", "damage repair", "salon conditioner"],
    imageSrc: "/images/retail/conditioner.webp",
  },
  "hair-sprays": {
    metaTitle: "Luxury Hair Care | ",
    title: "Hair Sprays",
    majorHeader: "Control Without Compromise",
    subHeader:
      "Finish and hold products designed to support movement, longevity, and polish without sacrificing touch or flexibility.",
    seoSupportTerms: ["professional hairspray", "flexible hold", "salon finishing products"],
    imageSrc: "/images/retail/hairsprays.webp",
  },
  "styling-aids": {
    metaTitle: "Luxury Hair Care | ",
    title: "Styling Aids",
    majorHeader: "Tools for Creative Control",
    subHeader:
      "Styling essentials curated to enhance texture, shape, and performance while supporting healthy hair and effortless styling.",
    seoSupportTerms: ["professional styling products", "texture products", "salon styling aids"],
    imageSrc: "/images/retail/styling-aids.webp",
  },
  "men's": {
    metaTitle: "Luxury Hair Care | ",
    title: "Men's",
    majorHeader: "Purpose-Driven Grooming",
    subHeader:
      "Straightforward, high-performance grooming products designed for modern routines and professional results.",
    seoSupportTerms: ["men's grooming products", "professional men's hair care", "salon men's products"],
    imageSrc: "/images/retail/mens.webp",
  },
  nails: {
    metaTitle: "Luxury Nail Care | ",
    title: "Nails",
    majorHeader: "Professional Care for Hands and Nails",
    subHeader:
      "Nail products selected to support strength, longevity, and clean beauty standards used daily in our salons.",
    seoSupportTerms: ["professional nail care", "salon nail products", "nail strength solutions"],
    imageSrc: "/images/retail/nails.webp",
  },
  "skin-care": {
    metaTitle: "Luxury Skin Care | ",
    title: "Skin Care",
    majorHeader: "Skin Care Backed by Expertise",
    subHeader:
      "Thoughtfully curated skin care developed to support healthy skin, visible results, and professional treatments beyond the treatment room.",
    seoSupportTerms: ["professional skin care", "salon skin care products", "esthetician recommended skin care"],
    imageSrc: "/images/retail/skin-care.webp",
  },
  tools: {
    metaTitle: "Professional Results | ",
    title: "Tools",
    majorHeader: "Performance Tools, Professional Results",
    subHeader:
      "Tools selected and tested by our artists to deliver precision, durability, and consistency in everyday styling.",
    seoSupportTerms: ["professional styling tools", "salon tools", "hair styling tools"],
    imageSrc: "/images/retail/hairsprays.webp",
  },
  search: {
    metaTitle: "Search Products | ",
    title: "Search",
    majorHeader: "Find Your Favorites",
    subHeader:
      "Search Kenneth's professional hair, skin, nail, and styling products available through our online retail shop.",
    seoSupportTerms: ["search salon products", "professional hair products", "Kenneth's retail products"],
    imageSrc: "/images/retail/top-sellers.webp",
  },
};

const defaultHeroSeo = heroSeoMap["top-sellers"];

const currentHeroMeta = computed(() => {
  const meta = heroSeoMap[groupDescription.value] || defaultHeroSeo;

  return {
    ...meta,
    keywords: meta.seoSupportTerms,
  };
});

/* -------------------------------------------------------
   SEO META (PRODUCT GRID HEADER META)
------------------------------------------------------- */
const technicianFavoritesMeta = computed(() => {
  const techName = retailGlobal.linkedTechnician?.technicianName || "";
  const header = techName ? `${techName}'s Favorites` : "Technician Favorites";

  return {
    header,
    title: techName ? `${header} | Kenneth's` : "Technician Favorites | Kenneth's",
    description: techName
      ? `Shop ${techName}'s favorite salon and spa products from Kenneth's—hand-picked recommendations to help you maintain your look at home.`
      : "Shop technician favorites from Kenneth's—hand-picked product recommendations to help you maintain your look at home.",
  };
});

const retailMeta = computed(() => ({
  "top-sellers": {
    header: "Top Sellers",
    title: "Top-Selling Salon Products Columbus OH | Kenneth's",
    description:
      "The salon and spa products Kenneth's guests buy most, from shampoo and styling aids to skin care and tools, recommended by our technicians. Columbus, OH.",
  },
  shampoo: {
    header: "Shampoo",
    title: "Shampoo Products Columbus OH | Kenneth's",
    description:
      "Professional shampoo for volume, moisture, color care, clarifying and swimmer's hair, from Kenneth's Columbus, OH salons. Take salon results home.",
  },
  conditioner: {
    header: "Conditioner",
    title: "Conditioner Products Columbus OH | Kenneth's",
    description:
      "Salon-quality conditioners for moisture, color protection, smoothing and strength, to keep hair soft and shiny between visits. Kenneth's, Columbus, OH.",
  },
  "hair-sprays": {
    header: "Hair Sprays",
    title: "Hair Spray Products Columbus OH | Kenneth's",
    description:
      "Working, finishing and firm-hold hair sprays that lock in your style and keep hair touchable and shiny. Professional formulas from Kenneth's, Columbus, OH.",
  },
  "men's": {
    header: "Men's",
    title: "Men's Hair Products Columbus OH | Kenneth's",
    description:
      "Shampoos, styling aids and finishing products for real-life styles and low-maintenance routines. Men's hair and grooming from Kenneth's, Columbus, OH.",
  },
  "skin-care": {
    header: "Skin Care",
    title: "Skin Care Products Columbus OH | Kenneth's",
    description:
      "Cleansers, serums, moisturizers, SPFs and treatment kits curated by Kenneth's spa estheticians for healthy, radiant skin at home. Columbus, OH.",
  },
  "styling-aids": {
    header: "Styling Aids",
    title: "Hair Styling Products Columbus OH | Kenneth's",
    description:
      "Creams, gels, oils, mousses and heat protectants for volume, smoothness, shine and control on every hair type. Salon styling products from Kenneth's.",
  },
  nails: {
    header: "Nails",
    title: "Nail Care Products Columbus OH | Kenneth's",
    description:
      "Polishes, treatments and manicure and pedicure essentials inspired by our salon nail services. Nail care products from Kenneth's, Columbus, OH.",
  },
  tools: {
    header: "Tools",
    title: "Hair & Beauty Tools Columbus OH | Kenneth's",
    description:
      "Brushes, irons and other styling essentials for salon-quality results at home. Professional hair and beauty tools from Kenneth's, Columbus, OH.",
  },
  search: {
    header: state.searchParam ? `Search: ${state.searchParam}` : "Search Products",
    title: "Search Salon Products | Kenneth's",
    description:
      "Search Kenneth's professional salon and spa products online, including hair care, skin care, nail care, styling aids, and tools.",
  },
  "technician-favorites": technicianFavoritesMeta.value,
}));

const fallbackMeta = {
  header: "Top Sellers",
  title: "Shop Retail | Kenneth's",
  description: "Shop Kenneth's professional hair and skin products online.",
};

const currentMeta = computed(() => {
  const metaMap = retailMeta.value;
  return metaMap[groupDescription.value] || metaMap["top-sellers"] || fallbackMeta;
});

/* -------------------------------------------------------
   SEO PRODUCT INTRO COPY FOR EACH DYNAMIC CATEGORY
------------------------------------------------------- */
const productIntroCopy = computed(() => {
  const introMap = {
    "top-sellers":
      "Shop Kenneth's top-selling salon and spa products, including guest-favorite shampoos, conditioners, styling aids, skin care, nail care, and beauty tools recommended by our Columbus and Central Ohio technicians.",

    shampoo:
      "Shop professional shampoo from Kenneth's, including salon-quality formulas for scalp health, moisture, volume, color care, clarifying, swimmer's hair, and everyday hair care in Columbus and Central Ohio.",

    conditioner:
      "Shop salon-quality conditioners from Kenneth's, including moisturizing, smoothing, strengthening, and color-protecting formulas designed to keep hair soft, shiny, manageable, and healthy between salon visits.",

    "hair-sprays":
      "Shop professional hair sprays from Kenneth's, including working sprays, finishing sprays, flexible-hold options, and firm-hold formulas designed to support movement, polish, shine, and long-lasting style.",

    "styling-aids":
      "Shop salon styling products from Kenneth's, including creams, gels, oils, mousses, texture products, heat protectants, and styling aids designed to add volume, smoothness, shine, and control.",

    "men's":
      "Shop men's hair and grooming products from Kenneth's, including professional shampoos, styling aids, grooming essentials, and finishing products selected for modern routines and low-maintenance styles.",

    nails:
      "Shop nail care products from Kenneth's, including professional polishes, nail treatments, manicure essentials, and pedicure products inspired by our Columbus and Central Ohio salon nail services.",

    "skin-care":
      "Shop professional skin care from Kenneth's, including cleansers, serums, moisturizers, SPFs, treatment kits, and esthetician-recommended products designed to support healthy, radiant skin at home.",

    tools:
      "Shop professional hair and beauty tools from Kenneth's, including brushes, irons, styling tools, and beauty essentials selected to help recreate salon-quality results at home.",
  };

  return introMap[groupDescription.value] || currentMeta.value.description;
});

const siteUrl = config.public.siteUrl;

const currentPageUrl = computed(() => {
  return `${siteUrl}/shop/retail/${groupDescription.value}`;
});

const retailCategoryJsonLd = computed(() => {
  const products = state.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}/shop/retail/product/${item.urlRouteName}`,
    name: item.webName,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentPageUrl.value}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: "Home",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": `${siteUrl}/shop/retail/top-sellers`,
              name: "Retail Products",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": currentPageUrl.value,
              name: currentMeta.value.header,
            },
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${currentPageUrl.value}/#webpage`,
        url: currentPageUrl.value,
        name: currentMeta.value.title,
        description: currentMeta.value.description,
        breadcrumb: {
          "@id": `${currentPageUrl.value}/#breadcrumb`,
        },
        mainEntity: {
          "@id": `${currentPageUrl.value}/#itemlist`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${currentPageUrl.value}/#itemlist`,
        name: `${currentMeta.value.header} Products`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: products.length,
        itemListElement: products,
      },
    ],
  };
});

/* -------------------------------------------------------
   SEO HEAD
------------------------------------------------------- */
useHead(() => ({
  title: currentMeta.value.title,
  link: [
    {
      rel: "canonical",
      href: currentPageUrl.value,
    },
  ],
  meta: [
    {
      name: "description",
      content: currentMeta.value.description,
    },
    {
      property: "og:title",
      content: currentMeta.value.title,
    },
    {
      property: "og:description",
      content: currentMeta.value.description,
    },
    {
      name: "robots",
      content: isPublicRetailCategoryGroup() ? "index, follow" : "noindex, follow",
    },
  ],
  script: [
    {
      key: "retail-category-jsonld",
      type: "application/ld+json",
      innerHTML: JSON.stringify(retailCategoryJsonLd.value).replace(/</g, "\\u003c"),
    },
  ],
}));

/* -------------------------------------------------------
   CATEGORY FILTER DEDUPE
   Dedupe visible category names, but preserve all category IDs.
   Example:
   Dry Hair ID 26 + Dry Hair ID 90 => one visible "Dry Hair" filter
   whose itemWebCategoryIdList is [26, 90].
------------------------------------------------------- */
function dedupeCategoryFilters(filters = []) {
  const map = new Map();

  filters.forEach((filter) => {
    const description = String(filter.description || "").trim();
    const key = description.toLowerCase();

    if (!description) return;

    if (!map.has(key)) {
      map.set(key, {
        ...filter,
        description,
        itemWebCategoryIdList: [filter.itemWebCategoryId],
      });

      return;
    }

    const existing = map.get(key);

    if (!existing.itemWebCategoryIdList.includes(filter.itemWebCategoryId)) {
      existing.itemWebCategoryIdList.push(filter.itemWebCategoryId);
    }
  });

  return Array.from(map.values());
}

/* -------------------------------------------------------
   SHARED RETAIL DATA ASSIGNMENT
------------------------------------------------------- */
function applyRetailData(data) {
  state.items = data?.itemWebListForWebViewModels || [];
  state.itemsMaster = [...state.items];
  state.filters = dedupeCategoryFilters(data?.itemWebCategoryList || []);

  state.selectedFilter = null;
  state.sortBy = "feats";
  applySort();
}

function clearRetailData() {
  state.items = [];
  state.itemsMaster = [];
  state.filters = [];
  state.selectedFilter = null;
  state.sortBy = "feats";
}

/* -------------------------------------------------------
   SSR PRODUCT FETCH
   This SSR-renders public category products into initial HTML source.
   Search and Technician Favorites remain client-loaded for now.
------------------------------------------------------- */
const { data: initialRetailData, error: initialRetailError } = await useAsyncData(
  () => `retail-products-${groupDescription.value}`,
  async () => {
    const url = getPublicRetailListUrl();

    if (!url) {
      return null;
    }

    return await $fetch(url, { method: "GET" });
  },
  {
    watch: [() => route.params.groupDescription],
  }
);

if (initialRetailError.value) {
  console.error("[Retail SSR] Failed to load initial retail products:", initialRetailError.value);
}

watch(
  initialRetailData,
  (data) => {
    if (!isPublicRetailCategoryGroup()) return;

    applyRetailData(data);
  },
  { immediate: true }
);

const mobileSelectedCategoryLabel = computed(() => {
  if (state.selectedFilter === null) return "Category";

  return (
    state.filters.find(
      (filter) => filter.itemWebCategoryId === state.selectedFilter
    )?.description || "Category"
  );
});

const mobileSelectedSortLabel = computed(() => {
  return (
    state.sortBys.find((opt) => opt.value === state.sortBy)?.display || "Sort"
  );
});

/* -------------------------------------------------------
   LOAD ITEMS
   Client-side loader remains for:
   - Search page
   - Technician Favorites
   - Fallback/manual reload behavior
------------------------------------------------------- */
async function loadItems({ scrollToGrid = false } = {}) {
  const isSearchPage = groupDescription.value === "search";

  let url = "";

  if (isSearchPage) {
    const searchTerm = String(route.query.si || "").trim();

    state.searchParam = searchTerm;
    state.searchInput = searchTerm;

    if (!searchTerm) {
      clearRetailData();

      return;
    }

    url = buildApiUrl(`/khsds/ItemWeb/Search/${encodeURIComponent(searchTerm.toUpperCase())}`);
  } else {
    const groupCode = getGroupCodeByUrlDescription(groupDescription.value);

    if (groupCode === 16) {
      await retailGlobal.refreshRetailSession();

      if (retailGlobal.linkedTechnician.techId === 0) {
        router.push("/shop/retail/top-sellers");
        return;
      }
    }

    url = buildApiUrl(`/khsds/ItemWeb/ListForWeb/${groupCode}/0/0`);
  }

  if (!url) {
    console.error("Failed to load retail items: missing API base URL.");
    clearRetailData();
    return;
  }

  try {
    const data = await $fetch(url, { method: "GET" });

    applyRetailData(data);

    if (scrollToGrid) {
      await scrollToProductGrid();
    }
  } catch (e) {
    console.error("Failed to load retail items:", e);
    clearRetailData();
  }
}

/* -------------------------------------------------------
   RELOAD TRIGGERS
------------------------------------------------------- */
watch(
  () => [route.params.groupDescription, route.query.si],
  async () => {
    const shouldScroll = shouldScrollAfterRetailRouteChange.value;
    shouldScrollAfterRetailRouteChange.value = false;

    if (!isPublicRetailCategoryGroup()) {
      await loadItems();
    }

    if (shouldScroll) {
      await scrollToProductGrid();
    }
  }
);

// IMPORTANT CHANGE:
// Previously, we reloaded favorites when linked tech changed AND loadItems() could open the modal.
// Now, loadItems() NEVER opens the modal. It redirects to top sellers if on favorites with no tech.
watch(
  () => retailGlobal.linkedTechnician.techId,
  (newVal, oldVal) => {
    if (!isTechnicianFavoritesGroup.value) return;
    if (newVal === oldVal) return;

    if ((newVal ?? 0) === 0) {
      router.push("/shop/retail/top-sellers");
      return;
    }

    loadItems();
  }
);

/* -------------------------------------------------------
   TECH LINKING
------------------------------------------------------- */
async function confirmTechnicianLink(technician) {
  retailGlobal.linkTechnicianVisible = false;

  retailGlobal.linkedTechnician.techId = technician?.techId ?? 0;
  retailGlobal.linkedTechnician.technicianCode = technician?.technicianCode ?? "";
  retailGlobal.linkedTechnician.technicianName = technician?.technicianName ?? "";
  retailGlobal.linkedTechnician.technicianType = technician?.technicianType ?? "";

  try {
    const { getWebOrderRetailCartId } = useLocalStorage();
    const idRaw = await getWebOrderRetailCartId();
    const id = Number(idRaw || 0);

    if (id === 0) {
      await retailGlobal.webRetailInitialize(0, retailGlobal.linkedTechnician.techId);
    } else {
      await retailGlobal.UpdateLinkedTechnician(id, retailGlobal.linkedTechnician.techId);
    }
  } catch (e) {
    console.error("Link technician call failed (may be non-fatal):", e);
  }

  await retailGlobal.refreshRetailSession();

  if (isTechnicianFavoritesGroup.value) {
    await loadItems();
  }
}

/**
 * Clears technician selection:
 * - DO NOT open modal
 * - If currently on technician favorites page: redirect to top sellers
 * - Otherwise: stay on current page
 */
async function clearLinkedTechnician() {
  retailGlobal.linkedTechnician.techId = 0;
  retailGlobal.linkedTechnician.technicianCode = "";
  retailGlobal.linkedTechnician.technicianName = "";
  retailGlobal.linkedTechnician.technicianType = "";

  try {
    const { getWebOrderRetailCartId } = useLocalStorage();
    const idRaw = await getWebOrderRetailCartId();
    const id = Number(idRaw || 0);

    if (id !== 0) {
      await retailGlobal.UpdateLinkedTechnician(id, 0);
    }
  } catch (e) {
    console.error("Unlink technician call failed (may be non-fatal):", e);
  }

  await retailGlobal.refreshRetailSession();

  if (isTechnicianFavoritesGroup.value) {
    router.push("/shop/retail/top-sellers");
  }
}

/* -------------------------------------------------------
   TECHNICIAN FAVORITES NAV
------------------------------------------------------- */
function technicianFavorites() {
  if (retailGlobal.linkedTechnician.techId === 0) {
    openLinkTechModal();
    return;
  }

  router.push("/shop/retail/technician-favorites");
}

/* -------------------------------------------------------
   BOOTSTRAP
------------------------------------------------------- */
onMounted(async () => {
  retailGlobal.menuVisible = true;
  retailGlobal.checkForNeededRefresh();

  await retailGlobal.refreshRetailSession();

  const technicianId = route.query.techid;
  if (technicianId !== undefined && technicianId !== null && technicianId !== "") {
    const tech = await getTechnicianLiteById(technicianId);
    if (tech && tech.techId) {
      await confirmTechnicianLink(tech);
    }
  }

  // Public category products are loaded with useAsyncData above so they can SSR.
  // Keep client-side loading for search and technician favorites.
  if (!isPublicRetailCategoryGroup()) {
    await loadItems();
  }
});

/* -------------------------------------------------------
   FILTERING
------------------------------------------------------- */
function selectCategoryNone() {
  state.selectedFilter = null;
  state.items = [...state.itemsMaster];
  applySort();
}

function selectCategory(categoryId) {
  state.selectedFilter = categoryId;
  filterItems();
}

function filterItems() {
  let list = [...state.itemsMaster];

  if (state.selectedFilter) {
    const selectedFilter = state.filters.find(
      (filter) => filter.itemWebCategoryId === state.selectedFilter
    );

    const selectedCategoryIds = selectedFilter?.itemWebCategoryIdList?.length
      ? selectedFilter.itemWebCategoryIdList
      : [state.selectedFilter];

    list = list.filter((item) =>
      item.itemWebCategoryIdList?.some?.((categoryId) =>
        selectedCategoryIds.includes(categoryId)
      )
    );
  }

  state.items = list;
  applySort();
}

/* -------------------------------------------------------
   SORTING
------------------------------------------------------- */
function selectSort(value) {
  state.sortBy = value;
  applySort();
}

function closeMobileCategoryMenu() {
  if (mobileCategoryDetails.value) {
    mobileCategoryDetails.value.open = false;
  }
}

function closeMobileSortMenu() {
  if (mobileSortDetails.value) {
    mobileSortDetails.value.open = false;
  }
}

function selectMobileCategoryNone() {
  selectCategoryNone();
  closeMobileCategoryMenu();
}

function selectMobileCategory(categoryId) {
  selectCategory(categoryId);
  closeMobileCategoryMenu();
}

function selectMobileSort(value) {
  selectSort(value);
  closeMobileSortMenu();
}

function applySort() {
  switch (state.sortBy) {
    case "feats":
      state.items.sort((a, b) => (b.qtySold ?? 0) - (a.qtySold ?? 0));
      break;
    case "alpha0":
      state.items.sort((a, b) => String(a.webName ?? "").localeCompare(String(b.webName ?? "")));
      break;
    case "alpha1":
      state.items.sort((a, b) => String(b.webName ?? "").localeCompare(String(a.webName ?? "")));
      break;
    case "price0":
      state.items.sort((a, b) => (a.lowPrice ?? 0) - (b.lowPrice ?? 0));
      break;
    case "price1":
      state.items.sort((a, b) => (b.lowPrice ?? 0) - (a.lowPrice ?? 0));
      break;
  }
}

/* -------------------------------------------------------
   SEARCHING
------------------------------------------------------- */
async function search(event) {
  const searchTerm = String(state.searchInput || "").trim();

  if (!searchTerm) return;

  state.searchSuggestions = [];

  event?.target?.blur?.();

  await goToRetailRouteAndScroll({
    path: "/shop/retail/search",
    query: {
      si: searchTerm,
    },
  });
}

async function clearSearch() {
  state.searchInput = "";
  state.searchSuggestions = [];

  if (state.searchParam !== "") {
    state.searchParam = "";

    await goToRetailRouteAndScroll({
      path: "/shop/retail/top-sellers",
    });
  }
}

async function goToRetailRouteAndScroll(location) {
  shouldScrollAfterRetailRouteChange.value = true;

  const previousFullPath = route.fullPath;

  await router.push(location);

  if (route.fullPath === previousFullPath) {
    shouldScrollAfterRetailRouteChange.value = false;

    if (!isPublicRetailCategoryGroup()) {
      await loadItems();
    }

    await scrollToProductGrid();
  }
}

async function updateSuggestion() {
  const searchTerm = String(state.searchInput || "").trim();

  state.searchSuggestions = [];

  if (searchTerm.length < 2) return;

  try {
    const searchResults = await retailGlobal.getItemWebSearchWord(searchTerm);

    state.searchSuggestions = searchResults.map((result) => ({
      label: result.word,
      command: () => {
        state.searchInput = result.word;
        state.searchSuggestions = [];

        goToRetailRouteAndScroll({
          path: "/shop/retail/search",
          query: {
            si: result.word,
          },
        });
      },
    }));
  } catch (e) {
    console.error("Failed to load search suggestions:", e);
    state.searchSuggestions = [];
  }
}
</script>

<style scoped></style>