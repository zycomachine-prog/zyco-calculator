export const SITE_URL = 'https://www.zycomachine.com'

export const ZYCO_PUBLISHER = {
  '@type': 'Organization',
  name: 'ZYCO',
  url: SITE_URL,
}

const getCanonicalUrl = (canonicalPath) => {
  if (!canonicalPath) {
    return SITE_URL
  }

  if (/^https?:\/\//i.test(canonicalPath)) {
    return canonicalPath
  }

  return `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`
}

export const getSiteUrl = getCanonicalUrl

const upsertMetaByName = (name, content) => {
  let meta = document.querySelector(`meta[name="${name}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

const upsertMetaByProperty = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

const upsertCanonical = (href) => {
  let link = document.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}

const findStructuredDataScript = (id) => {
  if (!id) {
    return document.querySelector(
      'script[type="application/ld+json"][data-seo-jsonld]'
    )
  }

  const byDataAttribute = document.querySelector(
    `script[type="application/ld+json"][data-seo-jsonld="${id}"]`
  )

  if (byDataAttribute) {
    return byDataAttribute
  }

  const byId = document.getElementById(id)

  return byId?.tagName === 'SCRIPT' ? byId : null
}

export const setStructuredData = ({
  id,
  data,
}) => {
  if (typeof document === 'undefined' || !data) {
    return
  }

  let script = findStructuredDataScript(id)

  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }

  if (id) {
    script.setAttribute('id', id)
    script.setAttribute('data-seo-jsonld', id)
  } else {
    script.setAttribute('data-seo-jsonld', 'true')
  }

  script.textContent = JSON.stringify(data).replace(/</g, '\\u003c')
}

export const createWebApplicationStructuredData = ({
  name,
  description,
  path,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: getCanonicalUrl(path),
  applicationCategory: 'EngineeringApplication',
  operatingSystem: 'Web',
  publisher: ZYCO_PUBLISHER,
})

export const createFAQPageStructuredData = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

export const setPageSEO = ({
  title,
  description,
  keywords,
  canonicalPath,
}) => {
  if (typeof document === 'undefined') {
    return
  }

  const canonicalUrl = getCanonicalUrl(canonicalPath)

  document.title = title

  upsertMetaByName('description', description)
  upsertMetaByName('keywords', keywords)
  upsertCanonical(canonicalUrl)

  upsertMetaByProperty('og:title', title)
  upsertMetaByProperty('og:description', description)
  upsertMetaByProperty('og:type', 'website')
  upsertMetaByProperty('og:url', canonicalUrl)

  upsertMetaByName('twitter:card', 'summary_large_image')
  upsertMetaByName('twitter:title', title)
  upsertMetaByName('twitter:description', description)
}
