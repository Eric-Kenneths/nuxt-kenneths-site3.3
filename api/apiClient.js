// Shared HTTP layer for repositories. Public site: no auth token, no 401 redirect, no loading flag.
// Repositories call apiRequest(url, options, 'repoName.method'); the URL comes from appStore.

export function getHeaders(isFormData = false) {
  const headers = {}

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

export async function handleResponse(response, errorSource) {
  let body = null

  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok) {
    const message = body?.detail || body?.title || response.statusText || `Error in ${errorSource}`

    const error = new Error(message)
    error.status = response.status
    error.body = body
    error.source = errorSource
    throw error
  }

  return body
}

export async function apiRequest(url, options, errorSource) {
  const response = await fetch(url, options)
  return await handleResponse(response, errorSource)
}
