import { m } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  'aria-label'?: string
}

const base =
  'group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-colors duration-200'
const variants = {
  primary: 'bg-lime text-obsidian hover:bg-[#e0ff7a] shadow-[0_0_0_1px_rgba(212,255,79,0.4),0_8px_32px_-8px_rgba(212,255,79,0.5)]',
  ghost: 'border border-white/15 text-ink hover:border-white/30 hover:bg-white/[0.04]',
}

export function Button({ href, children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <m.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </m.a>
  )
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  id,
}: {
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  const center = align === 'center'
  return (
    <header className={`mb-12 md:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <p data-reveal className="eyebrow mb-5">
        {eyebrow}
      </p>
      <h2 id={id} data-reveal className="text-h1 font-medium">
        {title}
      </h2>
      {sub && (
        <p data-reveal className={`mt-5 text-body text-ink-muted ${center ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
          {sub}
        </p>
      )}
    </header>
  )
}

export function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-4 w-4 shrink-0 ${className}`}>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Cross({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-4 w-4 shrink-0 ${className}`}>
      <path d="M4.5 4.5l7 7m0-7l-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
