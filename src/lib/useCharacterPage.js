import { useEffect } from 'react'

// Each character page sets its accent (via :root[data-character]), title and
// canonical URL while mounted, and clears them when leaving.
export function useCharacterPage({ character, title, path }) {
  useEffect(() => {
    const root = document.documentElement
    if (character) root.dataset.character = character
    document.title = title
    const canonicalUrl = `https://portfolio.mctoshs.ca${path}`
    const canonical = document.querySelector('link[rel="canonical"]')
    const openGraphUrl = document.querySelector('meta[property="og:url"]')
    if (canonical) canonical.href = canonicalUrl
    if (openGraphUrl) openGraphUrl.content = canonicalUrl
    return () => { delete root.dataset.character }
  }, [character, title, path])
}
