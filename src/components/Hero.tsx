import { useEffect, useRef } from 'react'
import { loadGsap, MOTION_OK, DESKTOP } from '../lib/gsap'
import { onLoaderDone } from '../lib/loader'
import { Arrow, Button } from './ui'
import { Dust } from './Dust'
import { HeroVideo } from './HeroVideo'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false
    let revert: (() => void) | undefined

    loadGsap().then(({ gsap }) => {
      const root = ref.current
      if (cancelled || !root) return
      const mm = gsap.matchMedia(root)

      mm.add(MOTION_OK, () => {
        // The headline stays painted (it's the LCP element); only supporting bits animate in.
        const items = root.querySelectorAll('[data-hero-in]')
        gsap.set(items, { autoAlpha: 0, y: 24 })
        const off = onLoaderDone(() => {
          gsap.to(items, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
          gsap.fromTo(
            root.querySelectorAll('[data-hero-line]'),
            { yPercent: 12 },
            { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08 },
          )
        })
        return off
      })

      // Parallax on desktop only.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap.to(root.querySelectorAll('[data-parallax]'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(root.querySelector('[data-hero-content]'), {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert?.()
    }
  }, [])

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <HeroVideo />
      <Dust />

      <div data-hero-content className="container-x relative z-10 flex flex-col items-center py-32 text-center">
        <p data-hero-in className="eyebrow mb-8">
          Templates · 2026
        </p>
        <h1 id="hero-title" className="max-w-5xl text-display font-medium tracking-[-0.03em]">
          <span data-hero-line className="block">Ship a site that</span>
          <span data-hero-line className="serif block pb-2 text-[1.08em] text-ink">
            doesn’t feel like AI made it.
          </span>
        </h1>
        <p data-hero-in className="mt-8 max-w-md text-[17px] leading-relaxed text-ink-muted">
          8 premium templates. Cursor / v0 / Lovable ready.
        </p>
        <div data-hero-in className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="#templates">
            Browse templates <Arrow />
          </Button>
          <Button href="#method" variant="ghost">
            See the method
          </Button>
        </div>
      </div>

      <a
        href="#templates"
        aria-label="Scroll to templates"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted md:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-lime to-transparent" />
      </a>
    </section>
  )
}
