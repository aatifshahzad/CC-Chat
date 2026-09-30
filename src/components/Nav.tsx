import { useEffect, useState } from 'react'

const links = [
  { href: '#templates', label: 'Templates' },
  { href: '#method', label: 'Method' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-content items-center justify-between rounded-full px-5 transition-colors duration-300 ${
          scrolled ? 'glass' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="serif text-2xl leading-none">
          Hx<span className="text-lime">.</span>
          <span className="sr-only"> HYLIOX, back to top</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#templates"
          className="inline-flex h-9 items-center rounded-full bg-lime px-4 text-sm font-medium text-obsidian transition-transform hover:scale-[1.02]"
        >
          Browse
        </a>
      </nav>
    </header>
  )
}
