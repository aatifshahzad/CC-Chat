import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Arrow, Button } from './ui'

const PHRASE = 'BUILT WITH AI · NOT BY AI · '

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative isolate overflow-hidden pt-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[80%]"
        style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(212,255,79,0.18), rgba(212,255,79,0.04) 45%, transparent 70%)' }}
      />
      <div className="container-x flex flex-col items-center pb-section text-center">
        <p data-reveal className="eyebrow mb-8">
          Your move
        </p>
        <h2 id="cta-title" data-reveal className="max-w-4xl text-display">
          <span className="block font-medium tracking-[-0.03em]">Ready to ship?</span>
          <span className="serif block text-ink-muted">Or still scrolling references?</span>
        </h2>
        <div data-reveal className="mt-12">
          <Button href="#templates" className="h-14 px-8 text-base">
            Browse templates <Arrow />
          </Button>
        </div>
      </div>

      {/* Decorative marquee: text duplicated so translateX(-50%) loops seamlessly. */}
      <div className="group relative border-y border-line bg-obsidian/60 py-6 backdrop-blur" aria-hidden="true">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="whitespace-pre font-mono text-[clamp(20px,3vw,36px)] uppercase tracking-[0.2em] text-ink">
                  {PHRASE.split('·').map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && <span className="text-lime">·</span>}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">Built with AI, not by AI.</p>
    </section>
  )
}
