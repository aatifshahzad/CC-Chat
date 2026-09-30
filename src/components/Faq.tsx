import { AnimatePresence, m } from 'framer-motion'
import { useId, useRef, useState } from 'react'
import { faqs } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './ui'

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li
      data-reveal
      className={`border-b border-line border-l-2 transition-colors duration-300 ${open ? 'border-l-lime' : 'border-l-transparent'}`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 pl-5 pr-2 text-left text-[18px] font-medium transition-colors hover:text-lime"
        >
          {q}
          <span
            aria-hidden="true"
            className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${open ? 'rotate-45 text-lime' : 'text-ink-muted'}`}
          >
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-5 pr-8 text-body text-ink-muted">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Faq() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(0)
  useReveal(ref)
  return (
    <section ref={ref} id="faq" aria-labelledby="faq-title" className="section-y relative">
      <div className="container-x grid-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionHead
            id="faq-title"
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="serif text-ink-muted">answered.</span>
              </>
            }
            sub={
              <>
                Something else? <a href="mailto:hello@example.com" className="text-ink underline decoration-lime underline-offset-4">Email us</a>.
              </>
            }
          />
        </div>
        <ul className="col-span-12 border-t border-line lg:col-span-8">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
