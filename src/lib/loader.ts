const LOADER_MS = 3000
const FADE_MS = 600

let done = false
const listeners = new Set<() => void>()

function finish() {
  if (done) return
  done = true
  document.documentElement.classList.remove('is-loading')
  listeners.forEach((fn) => fn())
  listeners.clear()
}

/** Fires once the loader has started fading out (or immediately if it was skipped). */
export function onLoaderDone(fn: () => void): () => void {
  if (done) {
    fn()
    return () => {}
  }
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function startLoader() {
  const root = document.documentElement
  const el = document.getElementById('loader')
  if (!el || root.classList.contains('no-loader')) {
    el?.remove()
    finish()
    return
  }

  root.classList.add('is-loading')
  // Measure from navigation start so a slow bundle doesn't stretch the loader past 3s.
  const wait = Math.max(0, LOADER_MS - performance.now())
  window.setTimeout(() => {
    el.classList.add('is-done')
    try {
      sessionStorage.setItem('hyliox:loaded', '1')
    } catch {
      /* storage blocked — loader simply shows again next time */
    }
    finish()
    window.setTimeout(() => el.remove(), FADE_MS)
  }, wait)
}
