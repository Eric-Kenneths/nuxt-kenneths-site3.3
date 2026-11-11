// Redirects for routes that moved to Zenoti (booking, gift cards, customer lookup).
// The target URLs come from runtimeConfig so stage -> production is a config change.
//
// These are 302s on purpose while the Zenoti URLs are still stage values: a 301 is cached
// permanently by browsers and search engines. Switch to 301 once production URLs are final.
const REDIRECT_STATUS = 302

// Paths are matched lowercase. An entry ending in "/**" matches the path itself and anything below it.
const BOOKING_PATHS = [
  '/book/**',
  '/book-now/**',
  '/appointment-book/**',
  '/new-customers/**',
  '/webab/**',
  '/xb',
  '/author/appointment-',
  '/customer-find'
]

const GIFT_CARD_PATHS = [
  '/gc/**',
  '/shop/gift-cards/**',
  '/gift-certificate/**',
  '/webgc/**'
]

// Marketing parameters that are forwarded so campaign attribution is not lost.
const forwardedParameter = (name: string) =>
  name.startsWith('utm_') || name === 'gclid' || name === 'fbclid'

function matches(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.endsWith('/**')) {
      const base = pattern.slice(0, -3)
      return pathname === base || pathname.startsWith(base + '/')
    }
    return pathname === pattern
  })
}

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  // Ignore a trailing slash so '/book/' and '/book' behave the same.
  const pathname = url.pathname.toLowerCase().replace(/\/+$/, '') || '/'

  let target: string | undefined
  const { zenoti } = useRuntimeConfig(event).public

  if (matches(pathname, BOOKING_PATHS)) {
    target = zenoti.servicesUrl
  } else if (matches(pathname, GIFT_CARD_PATHS)) {
    target = zenoti.giftCardsUrl
  }

  if (!target) {
    return
  }

  const destination = new URL(target)
  for (const [name, value] of url.searchParams.entries()) {
    if (forwardedParameter(name.toLowerCase())) {
      destination.searchParams.append(name, value)
    }
  }

  return sendRedirect(event, destination.toString(), REDIRECT_STATUS)
})
