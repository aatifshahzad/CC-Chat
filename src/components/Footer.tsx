const cols = [
  { title: 'Product', links: [['Templates', '#templates'], ['Method', '#method'], ['Pricing', '#pricing']] },
  { title: 'Support', links: [['FAQ', '#faq'], ['Contact', 'mailto:hello@example.com'], ['Licence', '#licence']] },
  { title: 'Social', links: [['X / Twitter', '#'], ['Instagram', '#'], ['Dribbble', '#']] },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x">
        <div className="grid-12">
          <div className="col-span-12 mb-10 md:col-span-4 md:mb-0">
            <p className="serif text-3xl">
              Hx<span className="text-lime">.</span>
            </p>
            <p className="mt-4 max-w-xs text-[15px] text-ink-muted">Templates for people who want their site to feel made, not generated.</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="col-span-6 mb-8 md:col-span-2 md:col-start-auto">
              <h2 className="eyebrow mb-5 text-[11px] text-ink-muted">{c.title}</h2>
              <ul className="flex flex-col gap-3 text-[15px]">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-ink-muted transition-colors hover:text-ink">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line py-8 font-mono text-[12px] text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} HYLIOX. All rights reserved.</p>
          <p>Built with AI · Not by AI</p>
        </div>
      </div>

      {/* Oversized brand mark — drawn via CSS content so it stays purely decorative. */}
      <div
        aria-hidden="true"
        data-mark="HYLIOX"
        className="pointer-events-none select-none text-center font-medium leading-[0.75] tracking-[-0.06em] text-white/[0.04] before:content-[attr(data-mark)]"
        style={{ fontSize: 'clamp(96px, 22vw, 340px)' }}
      />
    </footer>
  )
}
