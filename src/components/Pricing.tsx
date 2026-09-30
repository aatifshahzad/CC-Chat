import { m } from 'framer-motion'
import { useRef } from 'react'
import { tiers } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Arrow, Button, Check, Cross, SectionHead } from './ui'

export function Pricing() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-title" className="section-y relative">
      <div className="container-x">
        <SectionHead
          id="pricing-title"
          align="center"
          eyebrow="Pricing"
          title={
            <>
              Pay once. <span className="serif text-ink-muted">Ship forever.</span>
            </>
          }
        />

        <ul className="grid-12 items-stretch">
          {tiers.map((t) => (
            <li key={t.name} data-reveal className="col-span-12 md:col-span-4">
              <m.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`relative flex h-full flex-col rounded-card p-7 md:p-8 ${
                  t.featured
                    ? 'border border-lime bg-[rgba(212,255,79,0.04)] shadow-[0_0_0_4px_rgba(212,255,79,0.06),0_30px_120px_-30px_rgba(212,255,79,0.45)]'
                    : 'glass'
                }`}
              >
                <p className={`font-mono text-mono uppercase tracking-eyebrow ${t.featured ? 'text-lime' : 'text-ink-muted'}`}>{t.eyebrow}</p>
                <h3 className="mt-4 text-h3 font-medium">{t.name}</h3>
                <p className="mt-2 text-[15px] text-ink-muted">{t.blurb}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="serif text-[64px] leading-none">{t.price}</span>
                  <span className="font-mono text-mono text-ink-muted">one-shot</span>
                </p>

                <ul className="my-8 flex flex-col gap-3 border-t border-line pt-8 text-[15px]">
                  {t.features.map((f) => (
                    <li key={f.label} className={`flex items-start gap-3 ${f.included ? 'text-ink' : 'text-ink-muted'}`}>
                      {f.included ? <Check className="mt-1 text-lime" /> : <Cross className="mt-1 text-ink-faint" />}
                      <span>
                        <span className="sr-only">{f.included ? 'Included: ' : 'Not included: '}</span>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button href={t.href} variant={t.featured ? 'primary' : 'ghost'} className="mt-auto w-full">
                  {t.cta} <Arrow />
                </Button>
              </m.div>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-10 text-center font-mono text-mono text-ink-muted">
          All prices one-shot, no subscription.
        </p>
      </div>
    </section>
  )
}
