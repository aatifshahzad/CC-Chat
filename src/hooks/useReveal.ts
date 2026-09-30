import { useEffect, type RefObject } from 'react'
import { loadGsap, MOTION_OK } from '../lib/gsap'

/**
 * Fades + lifts every `[data-reveal]` descendant as it scrolls into view.
 * Content is visible by default; hiding only happens once GSAP runs and motion is allowed,
 * so reduced-motion users and no-JS render the final state.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let cancelled = false
    let revert: (() => void) | undefined

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !scope.current) return
      const mm = gsap.matchMedia(scope.current)
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)
        gsap.set(items, { autoAlpha: 0, y: 32 })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
            }),
        })
      })
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert?.()
    }
  }, [scope])
}
