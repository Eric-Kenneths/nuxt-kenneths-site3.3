<template>
  <!-- Outer wrapper -->
  <div class="w-full pt-[150px]">
    <!-- MAIN CONTENT -->
    <div v-if="!state.displayError && !isLoading"
      class="mx-auto w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-primary-100 px-4 lg:px-6 pb-10">
      <!-- LEFT COLUMN -->
      <div class="w-full py-6 flex justify-center">
        <div class="w-[400px]">
          <!-- TOP BACK LINK -->
          <div class="mb-4">
            <button type="button" @click="router.go(-1)"
              class="inline-flex items-center gap-1 text-primary-900 hover:text-primary-700 cursor-pointer">
              ← Back
            </button>
          </div>

          <!-- Product image -->
          <img :src="productImage" :alt="state.itemWeb.itemName || 'Product image'" draggable="false"
            class="w-full h-[600px] object-contain bg-primary-100 p-4" />
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="w-full py-6">
        <!-- BREADCRUMBS -->
        <nav aria-label="Breadcrumb" class="mb-5 text-sm text-primary-900">
          <ol class="flex flex-wrap items-center gap-2">
            <li>
              <NuxtLink to="/" class="underline underline-offset-4 hover:text-primary-500">
                Home
              </NuxtLink>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <NuxtLink to="/shop/retail/top-sellers" class="underline underline-offset-4 hover:text-primary-500">
                Products
              </NuxtLink>
            </li>

            <li aria-hidden="true">/</li>

            <li aria-current="page" class="font-semibold">
              {{ state.itemWeb.itemName }}
            </li>
          </ol>
        </nav>

        <h1 class="sans-serif my-0 text-4xl lg:text-5xl leading-tight">
          <span class="text-lg block mb-1">{{ state.itemWeb.brandName }}</span>
          {{ state.itemWeb.itemName }}
        </h1>

        <!-- PRICE -->
        <div class="mb-5 mt-4">
          <div v-if="!hasDiscount" class="text-2xl font-semibold">
            {{ filterCurrency(effectiveBasePrice) }}
          </div>

          <div v-else class="space-y-1">
            <div class="text-sm font-medium text-primary-900">
              {{ state.itemWeb.discount.discountText }}
            </div>

            <div class="text-lg line-through opacity-70">
              {{ filterCurrency(effectiveBasePrice) }}
            </div>

            <div class="text-2xl font-semibold">
              {{ filterCurrency(discountedPrice) }}
            </div>
          </div>
        </div>

        <!-- SIZE -->
        <div v-if="state.itemVarients.length > 1" class="mb-4">
          <span class="block text-sm mb-1 text-primary-900">Size</span>

          <ClientOnly>
            <Select v-model="selectedVariantCode" :options="variantOptions" optionLabel="label" optionValue="value"
              class="min-w-[6rem]" />

            <template #fallback>
              <select v-model="selectedVariantCode"
                class="min-w-[6rem] border border-primary-900 bg-primary-100 px-3 py-2">
                <option v-for="option in variantOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </template>
          </ClientOnly>
        </div>

        <!-- QUANTITY -->
        <div v-if="isInStock" class="mb-5">
          <span class="block text-sm mb-1 text-primary-900">Quantity</span>

          <ClientOnly>
            <Select v-model="state.quantity" :options="quantityOptions" optionLabel="label" optionValue="value"
              class="min-w-[4rem]" />

            <template #fallback>
              <select v-model="state.quantity" class="min-w-[4rem] border border-primary-900 bg-primary-100 px-3 py-2">
                <option v-for="option in quantityOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </template>
          </ClientOnly>
        </div>

        <!-- ADD TO CART -->
        <div class="mb-6">
          <button v-if="isInStock" type="button" :disabled="isAddingToCart" @click="addItemToCart"
            class="flex items-center justify-center w-full px-6 py-3 rounded-3xl bg-primary-900 text-primary-100 hover:bg-primary-emphasis transition uppercase tracking-wide font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {{ isAddingToCart ? 'adding...' : 'add to cart' }}
          </button>

          <div v-else class="k-para-text font-semibold text-primary-900 text-center">
            Out of stock
          </div>
        </div>

        <hr class="my-6 border-primary-900" />

        <!-- DESCRIPTION -->
        <section class="mb-6">
          <h2 class="k-para-text font-semibold text-primary-900 mb-2">
            About {{ state.itemWeb.itemName }}
          </h2>

          <p class="md:text-xl text-base leading-relaxed whitespace-pre-wrap" data-allow-mismatch="text"
            v-text="normalizedDescription"></p>
        </section>

        <hr class="my-6 border-primary-900" />

        <!-- WHAT'S INSIDE -->
        <section class="mb-6">
          <h3 class="k-para-text font-semibold text-primary-900 mb-2">
            What's Inside
          </h3>
        </section>

        <p class="text-sm italic text-primary-900 mb-4">
          Our Exclusive Private Label Products are developed by a cosmetic chemist
          to provide salon-quality results at home.
        </p>
      </div>

      <!-- BOTTOM BACK LINK -->
      <div class="col-span-1 lg:col-span-2 w-full flex justify-center mt-4 mb-10">
        <button type="button" @click="router.go(-1)"
          class="inline-flex k-section-link items-center gap-2 text-primary-900 hover:text-primary-500 uppercase underline tracking-wide">
          &larr; Back To All Products
        </button>
      </div>
    </div>

    <!-- LOADING STATE -->
    <section v-else-if="isLoading" class="mx-auto w-full max-w-[1600px] bg-primary-100 px-4 py-20 text-center"
      aria-live="polite">
      <p class="text-xl text-primary-900">
        Loading product...
      </p>
    </section>

    <!-- PRODUCT UNAVAILABLE STATE -->
    <section v-else class="mx-auto w-full max-w-[1600px] bg-primary-100 px-4 py-20"
      aria-labelledby="product-unavailable-title">
      <div class="mx-auto max-w-2xl text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-900">
          Product Unavailable
        </p>

        <h1 id="product-unavailable-title" class="sans-serif text-4xl lg:text-5xl leading-tight text-primary-900">
          This product is no longer available.
        </h1>

        <p class="mt-5 text-base md:text-xl leading-relaxed text-primary-900">
          This item may have been removed from inventory or discontinued. Please browse our current retail products, or
          contact us if you need help finding a similar item.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/shop/retail/top-sellers"
            class="inline-flex items-center justify-center rounded-3xl bg-primary-900 px-6 py-3 font-semibold uppercase tracking-wide text-primary-100 hover:bg-primary-emphasis">
            Shop Current Products
          </NuxtLink>

          <button type="button" @click="router.go(-1)"
            class="inline-flex items-center justify-center rounded-3xl border border-primary-900 px-6 py-3 font-semibold uppercase tracking-wide text-primary-900 hover:bg-primary-900 hover:text-primary-100 cursor-pointer">
            Go Back
          </button>
        </div>
      </div>
    </section>
  </div>

  <BookSection />
</template>

<script setup>
import { appGlobal } from '~/composables/appGlobal'
import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'
import { useLocalStorage } from '~/composables/useLocalStorage'
import Select from '@/volt/Select'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { filterCurrency, filter2DigitDecimal } = useFilters()

dataGlobal.sideBarVisible = false
retailGlobal.menuVisible = true

const isAddingToCart = ref(false)

function normalizeMultilineText(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trimEnd()
}

function createMetaDescription(value) {
  const text = normalizeMultilineText(value)
    .replace(/[\n\r]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  if (!text) {
    return "Shop professional salon and spa products from Kenneth's."
  }

  return fitMetaDescription(splitSentences(text), text)
}

// Words whose trailing period is not the end of a sentence (e.g. "Circadia AquaPorin by Dr. Pugliese")
const nonSentenceEnders = /^(dr|mr|mrs|ms|st|jr|sr|vs|etc|approx|oz|fl|no|inc|co|e\.g|i\.e)$/i

function splitSentences(text) {
  const sentences = []
  let start = 0

  for (const match of text.matchAll(/[.!?]+["')\]]*(?=\s|$)/g)) {
    const end = match.index + match[0].length
    const lastWord = text.slice(start, match.index).split(/\s+/).pop().replace(/^["'(\[]+/, '')

    // A single capital letter ("J.") or a known abbreviation is not a sentence end
    if (nonSentenceEnders.test(lastWord) || /^[A-Z]$/.test(lastWord)) continue

    sentences.push(text.slice(start, end).trim())
    start = end
  }

  const rest = text.slice(start).trim()
  if (rest) sentences.push(rest)

  return sentences
}

// As many whole sentences as fit in 155 characters. If that leaves a very short description, or the
// first sentence alone is too long, cut at a word boundary and end with an ellipsis instead.
function fitMetaDescription(sentences, text) {
  const maxLength = 155
  const minLength = 90

  let result = ''

  for (const sentence of sentences) {
    const next = result ? `${result} ${sentence}` : sentence
    if (next.length > maxLength) break
    result = next
  }

  if (result.length >= minLength || result === text) return result

  const room = text.slice(0, maxLength - 1)
  const lastSpace = room.lastIndexOf(' ')
  const cut = lastSpace > 60 ? room.slice(0, lastSpace) : room

  return cut.replace(/[\s,;:–—-]+$/, '') + '…'
}

function isTruthyActive(value) {
  return value === true || value === 1 || value === '1' || value === 'true'
}

// ----------------------------------
// API BASE URL
// For SSR, prefer runtime config.
// appGlobal.apiBaseUrl remains as a fallback for existing client behavior.
// ----------------------------------
function getApiBaseUrl() {
  return String(config.public?.apiBaseUrl || appGlobal.apiBaseUrl || '').replace(/\/$/, '')
}

function buildApiUrl(path) {
  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) return ''

  return `${apiBaseUrl}${path}`
}

// ----------------------------------
// ROUTE PARAM
// ----------------------------------
const urlRouteName = computed(() => String(route.params.urlRouteName || ''))

// ----------------------------------
// STATE
// ----------------------------------
const state = reactive({
  itemWeb: {
    brandName: '',
    itemName: '',
    description: '',
    discount: { itemCode: null }
  },
  itemVarients: [],
  selectedItemVarient: null,
  quantity: '1',
  displayError: false,
  isNonActiveItem: false,
  quantities: Array.from({ length: 10 }, (_, i) => ({
    code: i + 1,
    description: String(i + 1)
  }))
})

// ----------------------------------
// SELECTED VARIANT CODE
// ----------------------------------
const selectedVariantCode = ref(null)

// ----------------------------------
// FETCH PRODUCT
// ----------------------------------
const apiUrl = computed(() =>
  buildApiUrl(`/khsds/ItemWeb/UrlRouteName/${urlRouteName.value}`)
)

const { data: retailItem, error } = await useFetch(apiUrl, {
  key: () => `item-${urlRouteName.value}`,
  default: () => null
})

if (!error.value && retailItem.value?.itemWebForRetail) {
  const item = {
    ...retailItem.value.itemWebForRetail,
    description: normalizeMultilineText(
      retailItem.value.itemWebForRetail.description
    )
  }

  if (item.itemWebId && isTruthyActive(item.webActive)) {
    state.itemWeb = item
    state.itemVarients = retailItem.value.itemVarients || []

    if (state.itemVarients.length > 0) {
      const def = state.itemVarients[0]
      state.selectedItemVarient = def
      selectedVariantCode.value = def.itemCode
    }
  } else {
    state.displayError = true
    state.itemWeb = item
    state.isNonActiveItem = true
  }
} else {
  state.displayError = true
}

// Return a 410 status for SSR when the product cannot be displayed.
// The friendly unavailable UI still renders instead of a blank page.
if (state.displayError && import.meta.server) {
  const event = useRequestEvent()
  if (event) {
    setResponseStatus(event, 410)
  }
}

// ----------------------------------
// LOADING FLAG
// ----------------------------------
const isLoading = computed(
  () => !state.displayError && !retailItem.value && !error.value
)

// ----------------------------------
// SYNC VARIANT SELECTION
// ----------------------------------
watch(
  selectedVariantCode,
  code => {
    if (!code) return

    state.selectedItemVarient =
      state.itemVarients.find(v => v.itemCode === code) || null
  },
  { immediate: true }
)

// ----------------------------------
// SELECT OPTIONS
// ----------------------------------
const variantOptions = computed(() =>
  state.itemVarients.map(v => ({
    label: v.dropdownLabel,
    value: v.itemCode
  }))
)

const quantityOptions = computed(() =>
  state.quantities.map(q => ({
    label: q.description,
    value: String(q.code)
  }))
)

// ----------------------------------
// PRICE HELPERS
// ----------------------------------
const hasDiscount = computed(() => !!state.itemWeb.discount?.itemCode)

const effectiveBasePrice = computed(() =>
  Number(state.selectedItemVarient?.price || 0)
)

const discountedPrice = computed(() => {
  if (!hasDiscount.value) return effectiveBasePrice.value

  const d = state.itemWeb.discount
  const base = effectiveBasePrice.value

  if (d.discountType === 'Percent') {
    return base * (1 - d.discountPercent / 100)
  }

  if (d.discountType === 'Amount') {
    return base - d.discountAmount
  }

  return base
})

const isInStock = computed(
  () =>
    !!state.selectedItemVarient &&
    state.selectedItemVarient.outOfStock === false
)

const productImage = computed(() =>
  retailGlobal.getItemImage(urlRouteName.value)
)

const normalizedDescription = computed(() =>
  normalizeMultilineText(state.itemWeb.description)
)

// ----------------------------------
// SEO HELPERS
// ----------------------------------
const productUrl = computed(() =>
  `https://kenneths.com/shop/retail/product/${urlRouteName.value}`
)

const productSeoTitle = computed(() => {
  const itemName = String(state.itemWeb.itemName || '').trim()
  const brandName = String(state.itemWeb.brandName || "Kenneth's").trim()

  if (!itemName) return "Kenneth's Salon Product"

  return `${itemName} | ${brandName} Salon Products`
})

const productMetaDescription = computed(() =>
  createMetaDescription(state.itemWeb.description)
)

// ----------------------------------
// WEIGHT HELPERS
// ----------------------------------
function hasValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

function parseWeightValue(value) {
  if (!hasValue(value)) return null

  const match = String(value).match(/[\d.]+/)
  return match ? Number(match[0]) : null
}

function resolveProductWeightValue(variant, itemWeb) {
  const productWeight =
    variant?.weight ??
    variant?.productWeight ??
    itemWeb?.weight ??
    itemWeb?.productWeight ??
    variant?.dropdownLabel ??
    '8'

  return parseWeightValue(productWeight) || 8
}

function resolveShippingWeightValue(variant, itemWeb, productWeightValue) {
  const shippingWeight =
    variant?.shippingWeight ??
    variant?.shipping_weight ??
    variant?.shippingWeightValue ??
    itemWeb?.shippingWeight ??
    itemWeb?.shipping_weight ??
    itemWeb?.shippingWeightValue

  return parseWeightValue(shippingWeight) || productWeightValue
}

function resolveWeightUnitCode(variant, itemWeb) {
  const unit =
    variant?.shippingWeightUnit ??
    variant?.shipping_weight_unit ??
    variant?.weightUnit ??
    itemWeb?.shippingWeightUnit ??
    itemWeb?.shipping_weight_unit ??
    itemWeb?.weightUnit ??
    'ONZ'

  const normalizedUnit = String(unit).trim().toLowerCase()

  if (normalizedUnit === 'oz' || normalizedUnit === 'ounce' || normalizedUnit === 'ounces') {
    return 'ONZ'
  }

  if (normalizedUnit === 'lb' || normalizedUnit === 'lbs' || normalizedUnit === 'pound' || normalizedUnit === 'pounds') {
    return 'LBR'
  }

  if (normalizedUnit === 'g' || normalizedUnit === 'gram' || normalizedUnit === 'grams') {
    return 'GRM'
  }

  if (normalizedUnit === 'kg' || normalizedUnit === 'kilogram' || normalizedUnit === 'kilograms') {
    return 'KGM'
  }

  return unit || 'ONZ'
}

function resolveWeightUnitText(unitCode) {
  if (unitCode === 'ONZ') return 'oz'
  if (unitCode === 'LBR') return 'lb'
  if (unitCode === 'GRM') return 'g'
  if (unitCode === 'KGM') return 'kg'

  return 'oz'
}

// ----------------------------------
// SEO
// ----------------------------------
if (!state.displayError && retailItem.value?.itemWebForRetail) {
  const desc = productMetaDescription.value
  const slug = urlRouteName.value
  const seoVariant = state.selectedItemVarient || retailItem.value.itemVarients?.[0] || null

  const productWeightValue = resolveProductWeightValue(seoVariant, state.itemWeb)
  const shippingWeightValue = resolveShippingWeightValue(
    seoVariant,
    state.itemWeb,
    productWeightValue
  )
  const weightUnitCode = resolveWeightUnitCode(seoVariant, state.itemWeb)
  const weightUnitText = resolveWeightUnitText(weightUnitCode)

  const jsonLD = {
    '@context': 'https://schema.org',

    '@graph': [
      {
        '@type': 'Place',

        '@id': 'https://kenneths.com/#place',

        address: {
          '@type': 'PostalAddress',
          streetAddress: '5151 Reed Rd',
          addressLocality: 'Columbus',
          addressRegion: 'OH',
          postalCode: '43220',
          addressCountry: 'US'
        }
      },

      {
        '@type': ['BeautySalon', 'Organization'],

        '@id': 'https://kenneths.com/#organization',

        name: "Kenneth's Hair Salons And Day Spas",

        url: 'https://kenneths.com',

        telephone: '(614) 538-5800',

        priceRange: '$$$',

        sameAs: [
          'https://www.instagram.com/kennethssalonandspa/',
          'https://www.facebook.com/KennethsSalonandspa',
          'https://www.tiktok.com/@kennethssalonandspa',
          'https://www.pinterest.com/kennethssalonandspa/',
          'https://www.youtube.com/user/KennethsSalon',
          'https://twitter.com/kennethssalon'
        ],

        address: {
          '@type': 'PostalAddress',
          streetAddress: '5151 Reed Rd Suite 250B',
          addressLocality: 'Columbus',
          addressRegion: 'OH',
          postalCode: '43220',
          addressCountry: 'US'
        },

        logo: {
          '@type': 'ImageObject',

          '@id': 'https://kenneths.com/#logo',

          url: 'https://kenneths.com/logo.webp',

          contentUrl: 'https://kenneths.com/logo.webp',

          caption: "Kenneth's Hair Salons And Day Spas",

          inLanguage: 'en-US',

          width: '450',

          height: '566'
        },

        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',

            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday'
            ],

            opens: '08:30',

            closes: '19:30'
          },

          {
            '@type': 'OpeningHoursSpecification',

            dayOfWeek: ['Saturday'],

            opens: '08:30',

            closes: '16:00'
          }
        ],

        location: {
          '@id': 'https://kenneths.com/#place'
        },

        image: {
          '@id': 'https://kenneths.com/#logo'
        }
      },

      {
        '@type': 'WebSite',

        '@id': 'https://kenneths.com/#website',

        url: 'https://kenneths.com',

        name: "Kenneth's Hair Salons And Day Spas",

        alternateName: "Kenneth's",

        publisher: {
          '@id': 'https://kenneths.com/#organization'
        },

        inLanguage: 'en-US'
      },

      {
        '@type': 'ImageObject',

        '@id': productImage.value,

        url: productImage.value,

        width: '400',

        height: '600',

        inLanguage: 'en-US'
      },

      {
        '@type': 'BreadcrumbList',

        '@id': `${productUrl.value}/#breadcrumb`,

        itemListElement: [
          {
            '@type': 'ListItem',

            position: 1,

            item: {
              '@id': 'https://kenneths.com',

              name: 'Home'
            }
          },

          {
            '@type': 'ListItem',

            position: 2,

            item: {
              '@id': 'https://kenneths.com/shop/retail/top-sellers',

              name: 'Retail Products'
            }
          },

          {
            '@type': 'ListItem',

            position: 3,

            item: {
              '@id': productUrl.value,

              name: state.itemWeb.itemName
            }
          }
        ]
      },

      {
        '@type': 'ItemPage',

        '@id': `${productUrl.value}/#webpage`,

        url: productUrl.value,

        name: productSeoTitle.value,

        isPartOf: {
          '@id': 'https://kenneths.com/#website'
        },

        primaryImageOfPage: {
          '@id': productImage.value
        },

        breadcrumb: {
          '@id': `${productUrl.value}/#breadcrumb`
        },

        inLanguage: 'en-US'
      },

      {
        '@type': 'Product',

        '@id': `${productUrl.value}/#product`,

        name: state.itemWeb.itemName,

        description: normalizedDescription.value,

        image: [productImage.value],

        url: productUrl.value,

        sku: seoVariant?.itemCode || slug,

        category: state.itemWeb.category || 'Hair Care Products',

        brand: {
          '@type': 'Brand',

          name: state.itemWeb.brandName || "Kenneth's"
        },

        mainEntityOfPage: {
          '@id': `${productUrl.value}/#webpage`
        },

        weight: {
          '@type': 'QuantitativeValue',

          value: productWeightValue,

          unitCode: weightUnitCode,

          unitText: weightUnitText
        },

        offers: {
          '@type': 'Offer',

          url: productUrl.value,

          price: filter2DigitDecimal(
            seoVariant?.price || 0
          ),

          priceCurrency: 'USD',

          availability: isInStock.value
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',

          itemCondition: 'https://schema.org/NewCondition',

          seller: {
            '@id': 'https://kenneths.com/#organization'
          },

          shippingDetails: {
            '@type': 'OfferShippingDetails',

            shippingWeight: {
              '@type': 'QuantitativeValue',

              value: shippingWeightValue,

              unitCode: weightUnitCode,

              unitText: weightUnitText
            },

            shippingRate: {
              '@type': 'MonetaryAmount',

              value: 10.95,

              currency: 'USD'
            },

            shippingDestination: {
              '@type': 'DefinedRegion',

              addressCountry: 'US'
            },

            deliveryTime: {
              '@type': 'ShippingDeliveryTime',

              handlingTime: {
                '@type': 'QuantitativeValue',

                minValue: 1,

                maxValue: 3,

                unitCode: 'DAY'
              },

              transitTime: {
                '@type': 'QuantitativeValue',

                minValue: 1,

                maxValue: 5,

                unitCode: 'DAY'
              }
            }
          },

          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',

            applicableCountry: 'US',

            returnPolicyCountry: 'US',

            returnPolicyCategory:
              'https://schema.org/MerchantReturnFiniteReturnWindow',

            merchantReturnDays: 14,

            returnMethod: 'https://schema.org/ReturnByMail',

            returnFees: 'https://schema.org/FreeReturn'
          }
        }
      }
    ]
  }



  useHead({
    title: productSeoTitle.value,
    link: [
      {
        rel: 'canonical',
        href: productUrl.value
      }
    ],
    meta: [
      {
        name: 'description',
        content: desc
      },
      {
        property: 'og:type',
        content: 'product'
      },
      {
        property: 'og:title',
        content: productSeoTitle.value
      },
      {
        property: 'og:description',
        content: desc
      },
      {
        property: 'og:url',
        content: productUrl.value
      },
      {
        property: 'og:image',
        content: productImage.value
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: productSeoTitle.value
      },
      {
        name: 'twitter:description',
        content: desc
      },
      {
        name: 'twitter:image',
        content: productImage.value
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLD)
      }
    ]
  })
}

if (state.displayError) {
  useHead({
    title: "Product Unavailable | Kenneth's Salon Products",
    link: [
      {
        rel: 'canonical',
        href: productUrl.value
      }
    ],
    meta: [
      {
        name: 'description',
        content:
          "This Kenneth's salon product is no longer available. Browse our current retail products to find similar salon and spa items."
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: "Product Unavailable | Kenneth's Salon Products"
      },
      {
        property: 'og:description',
        content:
          "This Kenneth's salon product is no longer available. Browse our current retail products to find similar salon and spa items."
      },
      {
        property: 'og:url',
        content: productUrl.value
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:title',
        content: "Product Unavailable | Kenneth's Salon Products"
      },
      {
        name: 'twitter:description',
        content:
          "This Kenneth's salon product is no longer available. Browse our current retail products to find similar salon and spa items."
      }
    ]
  })
}

// ----------------------------------
// CLOSE DETAILS ON OUTSIDE CLICK
// ----------------------------------
const closeDetailsOnOutsideClick = event => {
  document.querySelectorAll('details').forEach(drop => {
    if (!drop.contains(event.target)) {
      drop.open = false
    }
  })
}

onMounted(() => {
  document.addEventListener('click', closeDetailsOnOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDetailsOnOutsideClick)
})

// ----------------------------------
// CART ID RESOLUTION
// ----------------------------------
async function resolveRetailCartId() {
  const { getWebOrderRetailCartId, setWebOrderRetailCartId } = useLocalStorage()

  const storedCartId = Number(await getWebOrderRetailCartId())

  if (storedCartId > 0) {
    return storedCartId
  }

  const initCartId = Number(
    await retailGlobal.webRetailInitialize(
      0,
      retailGlobal.linkedTechnician?.techId || 0
    )
  )

  if (initCartId > 0) {
    await setWebOrderRetailCartId(initCartId)
    return initCartId
  }

  console.error('Cart initialization failed. webRetailInitialize did not return a valid cart ID.')
  return 0
}

// ----------------------------------
// ADD TO CART
// ----------------------------------
async function addItemToCart() {
  if (isAddingToCart.value) return

  if (!state.selectedItemVarient?.itemCode) {
    console.error('No variant selected.')
    return
  }

  isAddingToCart.value = true

  try {
    const cartId = await resolveRetailCartId()

    if (!cartId || cartId === 0) {
      console.error('Cart initialization failed (cartId = 0)')
      return
    }

    await retailGlobal.postWebOrderRetail(
      cartId,
      state.selectedItemVarient.itemCode,
      Number(state.quantity),
      '0'
    )

    await retailGlobal.refreshRetailSession()

    retailGlobal.cart.visible = true
  } catch (e) {
    console.error('Error adding to cart:', e)
  } finally {
    isAddingToCart.value = false
  }
}
</script>

<style scoped></style>