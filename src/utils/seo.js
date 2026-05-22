const SITE_URL = 'https://www.zycomachine.com'

const getCanonicalUrl = (canonicalPath) => {
  if (!canonicalPath) {
    return SITE_URL
  }

  if (/^https?:\/\//i.test(canonicalPath)) {
    return canonicalPath
  }

  return `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`
}

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

