import { useRef } from 'react'
import { stats, testimonials } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './ui'

export function Proof() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} aria-labelledby="proof-title" className="section-y relative border-y border-line">
      <div className="container-x">
        <SectionHead
          id="proof-title"
          align="center"
          eyebrow="Social proof"
          title={
            <>
              Built by people who <span className="serif">care how it feels.</span>
            </>
          }
        />

        <dl className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:mb-20 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col bg-obsidian px-6 py-8 text-center">
              <dt className="order-2 mt-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-muted">{s.label}</dt>
              <dd className="serif order-1 text-[clamp(36px,4vw,52px)] leading-none text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <li key={i} data-reveal className="mb-6 break-inside-avoid">
              <figure className="glass rounded-card p-6 md:p-7">
                <blockquote className={`text-ink ${i % 3 === 0 ? 'serif text-[22px] leading-snug' : 'text-[17px] leading-relaxed'}`}>
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 font-mono text-[12px] text-lime">
                    {t.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
