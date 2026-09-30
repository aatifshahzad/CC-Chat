import type { gsap as GSAP } from 'gsap'
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'

type Loaded = { gsap: typeof GSAP; ScrollTrigger: typeof ST }

let promise: Promise<Loaded> | null = null

/** GSAP is not needed for first paint, so it is split out and loaded on demand. */
export function loadGsap(): Promise<Loaded> {
  promise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
  )
  return promise
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(min-width: 1024px)'
