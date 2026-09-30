import { useEffect, useRef, useState } from 'react'
import { steps } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReveal } from '../hooks/useReveal'
import { DESKTOP, loadGsap, MOTION_OK } from '../lib/gsap'
import { SectionHead } from './ui'
import { StepVisual } from './StepVisual'

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  // Pinned crossfade only on desktop with motion allowed; otherwise a plain alternating stack.
  const pinned = useMediaQuery(`${DESKTOP} and ${MOTION_OK}`)
  const [active, setActive] = useState(0)
  useReveal(ref)

  useEffect(() => {
    if (!pinned) return
    let cancelled = false
    let revert: (() => void) | undefined

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      const el = stage.current
      if (cancelled || !el) return
      const ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-step]', el)
        gsap.set(rows.slice(1), { autoAlpha: 0 })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${window.innerHeight * (rows.length - 1) * 0.9}`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / (rows.length - 1), duration: 0.4, ease: 'power2.inOut' },
            invalidateOnRefresh: true,
            // Created after the reveal triggers below it, so make sure its spacer is measured first.
            refreshPriority: 1,
            onUpdate: (st) => setActive(Math.round(st.progress * (rows.length - 1))),
          },
        })
        rows.slice(1).forEach((row, i) => {
          const prev = rows[i]
          tl.to(prev.querySelector('[data-step-text]'), { autoAlpha: 0, y: -40, duration: 0.5 })
            .to(prev.querySelector('[data-step-media]'), { autoAlpha: 0, scale: 0.96, duration: 0.5 }, '<')
            .set(prev, { autoAlpha: 0 })
            .set(row, { autoAlpha: 1 })
            .from(row.querySelector('[data-step-text]'), { autoAlpha: 0, y: 40, duration: 0.5 })
            .from(row.querySelector('[data-step-media]'), { autoAlpha: 0, scale: 1.04, duration: 0.5 }, '<')
        })
      }, el)
      ScrollTrigger.refresh()
      revert = () => ctx.revert()
    })

    return () => {
      cancelled = true
      revert?.()
      setActive(0)
    }
  }, [pinned])

  return (
    <section ref={ref} id="method" aria-labelledby="method-title" className="section-y relative">
      <div className="container-x">
        <SectionHead
          id="method-title"
          eyebrow="How it works"
          title={
            <>
              Three steps. <span className="serif text-ink-muted">No prompt roulette.</span>
            </>
          }
        />
      </div>

      <div ref={stage} className={pinned ? 'relative h-[100svh]' : ''}>
        <div className={`container-x ${pinned ? 'relative h-full' : 'flex flex-col gap-24 md:gap-32'}`}>
          {pinned && (
            <ol aria-hidden="true" className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 font-mono text-mono">
              {steps.map((s, i) => (
                <li key={s.n} className={`transition-colors duration-300 ${i === active ? 'text-lime' : 'text-ink-faint'}`}>
                  {s.n}
                </li>
              ))}
            </ol>
          )}
          {steps.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article
                key={s.n}
                data-step
                {...(!pinned && { 'data-reveal': '' })}
                className={`grid-12 items-center ${pinned ? 'absolute inset-x-6 top-1/2 -translate-y-1/2 pl-12' : ''}`}
              >
                <div data-step-text className={`col-span-12 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <p className="font-mono text-mono text-lime">{s.n}</p>
                  <h3 className="mt-4 text-h2 font-medium">{s.title}</h3>
                  <p className="mt-4 max-w-md text-body text-ink-muted">{s.body}</p>
                </div>
                <div
                  data-step-media
                  className={`col-span-12 mt-10 lg:col-span-6 lg:mt-0 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
                >
                  <StepVisual kind={s.visual} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
