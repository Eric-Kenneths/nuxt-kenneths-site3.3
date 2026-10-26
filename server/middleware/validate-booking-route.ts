import {
  createError,
  defineEventHandler,
  getRequestURL
} from 'h3'

const BOOKING_PREFIX = '/book/new/'

const allowedSteps = new Set([
  'service-type',
  'services',
  'location',
  'technician',
  'times',
  'take',
  'promo',
  'service'
])

const allowedQueryParameters = new Set([
  // Functional booking parameters
  'mid',
  'd',
  'c',
  'a',
  'p',
  'l',
  'fl',
  'dsl',
  't',
  's',
  'bps',
  'mc',
  'qti',
  'cc',
  'v',
  'x',

  // Known marketing parameters
  'utm_campaign',
  'utm_source',
  'utm_medium',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid'
])

const maximumValueLengths: Record<string, number> = {
  mid: 10,
  d: 20,
  c: 30,
  a: 1,
  p: 1,
  l: 4,
  fl: 4,
  dsl: 1,
  t: 20,
  s: 20,
  bps: 1,
  mc: 100,
  qti: 50,
  cc: 20,
  v: 20,
  x: 1,

  utm_campaign: 200,
  utm_source: 100,
  utm_medium: 100,
  utm_content: 200,
  utm_term: 200,
  gclid: 250,
  fbclid: 250
}

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname.toLowerCase()

  if (!pathname.startsWith(BOOKING_PREFIX)) {
    return
  }

  
  /*
   * Only one path segment is valid after /book/new/.
   *
   * Examples:
   * /book/new/services       valid
   * /book/new/install        invalid step
   * /book/new/services/test  invalid additional segment
   */
  const remainder = pathname.slice(BOOKING_PREFIX.length)
  const segments = remainder.split('/').filter(Boolean)

  if (
    segments.length !== 1 ||
    !allowedSteps.has(segments[0])
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found'
    })
  }

  /*
   * Use URLSearchParams rather than an object representation so duplicate
   * keys can be detected reliably.
   */
  const seenParameters = new Set<string>()

  for (const [rawName, rawValue] of url.searchParams.entries()) {
    const name = rawName.toLowerCase()

    if (!allowedQueryParameters.has(name)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request parameters'
      })
    }

    if (seenParameters.has(name)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Duplicate request parameters'
      })
    }

    seenParameters.add(name)

    const maximumLength = maximumValueLengths[name]

    if (
      maximumLength !== undefined &&
      rawValue.length > maximumLength
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request parameters'
      })
    }

    /*
     * Reject control characters. More restrictive validation for each
     * functional value remains in the page and API.
     */
    if (/[\u0000-\u001F\u007F]/.test(rawValue)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request parameters'
      })
    }
  }
})