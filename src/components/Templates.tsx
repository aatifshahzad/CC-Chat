import { m } from 'framer-motion'
import { useRef } from 'react'
import { templates, type Template } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './ui'
import { TemplateThumb } from './TemplateThumb'

// Static class map so Tailwind can see every span at build time.
const spanCls: Record<Template['span'], string> = {
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
  8: 'lg:col-span-8',
}

function Card({ t, index }: { t: Template; index: number }) {
  const featured = index === 0
  return (
    <li data-reveal className={`col-span-12 md:col-span-6 ${spanCls[t.span]} ${t.tall ? 'lg:row-span-2' : ''}`}>
      <m.a
        href="#pricing"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`group glass flex h-full flex-col overflow-hidden rounded-card transition-[border-color,box-shadow] duration-300 hover:border-white/15 ${
          featured ? 'border-lime/40 shadow-[0_0_0_1px_rgba(212,255,79,0.15),0_24px_80px_-32px_rgba(212,255,79,0.35)] hover:border-lime/70' : ''
        }`}
      >
        <div className={`relative overflow-hidden border-b border-line ${t.tall ? 'aspect-[16/10] lg:aspect-auto lg:flex-1' : 'aspect-[16/10]'}`}>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <TemplateThumb hue={t.hue} layout={t.layout} />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 p-5 md:p-6">
          <div>
            <h3 className={`flex items-center gap-3 font-medium ${featured ? 'text-h3' : 'text-lg'}`}>
              {featured ? <span className="serif text-[1.15em]">{t.name}</span> : t.name}
              {featured && (
                <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian">
                  Featured
                </span>
              )}
            </h3>
            <p className="mt-1 text-[15px] text-ink-muted">{t.sub}</p>
          </div>
          <span
            aria-hidden="true"
            className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
              featured ? 'border-lime/50 text-lime group-hover:bg-lime group-hover:text-obsidian' : 'border-white/10 text-ink-muted group-hover:border-white/30 group-hover:text-ink'
            }`}
          >
            ↗
          </span>
        </div>
      </m.a>
    </li>
  )
}

export function Templates() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="templates" aria-labelledby="templates-title" className="section-y relative">
      <div className="container-x">
        <SectionHead
          id="templates-title"
          eyebrow="The collection"
          title={
            <>
              Eight templates. <span className="serif text-ink-muted">Zero filler.</span>
            </>
          }
          sub="Each one is built around a story structure, then tuned for type, rhythm and motion until it stops looking generated."
        />
        <ul className="grid-12 lg:auto-rows-auto">
          {templates.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
