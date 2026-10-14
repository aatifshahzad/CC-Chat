// All copy lives here so it can be edited without touching layout.
// NOTE: testimonials and stats below are PLACEHOLDERS — replace with real,
// attributable quotes/figures before going live.

export type Template = {
  name: string
  sub: string
  /** Column span on the 12-col grid at lg+. */
  span: 4 | 6 | 8
  /** Featured card spans two rows. */
  tall?: boolean
  hue: string
  layout: 'editorial' | 'split' | 'grid' | 'mono' | 'hero' | 'stack'
}

export const templates: Template[] = [
  { name: 'Meridian', sub: 'Editorial studio site with case-study depth.', span: 8, tall: true, hue: '#D4FF4F', layout: 'hero' },
  { name: 'Halcyon', sub: 'Quiet SaaS landing, built for one conversion.', span: 4, hue: '#9DB4FF', layout: 'split' },
  { name: 'Oculus', sub: 'Photographer folio with full-bleed galleries.', span: 4, hue: '#FFB38A', layout: 'grid' },
  { name: 'Ledger', sub: 'Fintech product page with data-rich sections.', span: 4, hue: '#7CF0C5', layout: 'mono' },
  { name: 'Atelier', sub: 'Boutique agency, serif-forward and slow.', span: 4, hue: '#F2E6D0', layout: 'editorial' },
  { name: 'Impeccable', sub: '@pbakaus/impeccable — polished product story with a premium editorial finish.', span: 4, hue: '#C8A2FF', layout: 'stack' },
  { name: 'Northwind', sub: 'Consultancy site with a real narrative arc.', span: 6, hue: '#8FD3FF', layout: 'editorial' },
  { name: 'Kinetic', sub: 'Launch page for hardware and physical product.', span: 6, hue: '#FF8F8F', layout: 'hero' },
]

export const steps = [
  {
    n: '01',
    title: 'Pick the template that fits your story.',
    body: 'Every template is built around a narrative, not a component dump. Choose the structure that matches how you sell — editorial, product-led or proof-heavy.',
    visual: 'pick' as const,
  },
  {
    n: '02',
    title: 'Drop it into Cursor, v0 or Lovable.',
    body: 'Clean React + Tailwind, typed props, one design-token file. Your AI tool edits it without flattening the details that make it feel hand-made.',
    visual: 'code' as const,
  },
  {
    n: '03',
    title: 'Ship something people remember.',
    body: 'Motion, type and rhythm are already tuned. Swap in your copy and imagery, run the checklist, and deploy the same afternoon.',
    visual: 'ship' as const,
  },
]

export const stats = [
  { value: '2,400+', label: 'Sites shipped' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '38', label: 'Countries' },
  { value: '< 1 day', label: 'Median time to launch' },
]

export const testimonials = [
  { quote: 'I stopped getting the "did ChatGPT make this?" comment. That alone paid for it.', name: 'Placeholder Name', role: 'Founder, Studio' },
  { quote: 'The typography decisions are what sold me. Cursor kept them intact through every edit.', name: 'Placeholder Name', role: 'Indie developer' },
  { quote: 'We went from Figma limbo to live in a weekend. Clients assume we hired an agency.', name: 'Placeholder Name', role: 'Co-founder, Agency' },
  { quote: 'Finally a template where the motion is restrained instead of a demo reel.', name: 'Placeholder Name', role: 'Product designer' },
  { quote: 'The method doc is worth it on its own. I use it on client work now.', name: 'Placeholder Name', role: 'Freelance designer' },
  { quote: 'Lighthouse was green out of the box. I did not expect that from something this animated.', name: 'Placeholder Name', role: 'Frontend engineer' },
]

export type Tier = {
  eyebrow: string
  name: string
  price: string
  blurb: string
  features: { label: string; included: boolean }[]
  cta: string
  /** Checkout / booking link — placeholder until a payment provider is wired up. */
  href: string
  featured?: boolean
}

export const tiers: Tier[] = [
  {
    eyebrow: 'Solo',
    name: 'Express',
    price: '€297',
    blurb: 'One template, ready to drop into your AI tool.',
    cta: 'Get Express',
    href: '#checkout-express',
    features: [
      { label: '1 template of your choice', included: true },
      { label: 'Cursor / v0 / Lovable setup guide', included: true },
      { label: 'Design token file', included: true },
      { label: 'The Method playbook', included: false },
      { label: 'Custom section design', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    eyebrow: 'Most popular',
    name: 'Standard',
    price: '€597',
    blurb: 'The full library plus the method behind it.',
    cta: 'Get Standard',
    href: '#checkout-standard',
    featured: true,
    features: [
      { label: 'All 8 templates', included: true },
      { label: 'Cursor / v0 / Lovable setup guide', included: true },
      { label: 'Design token file', included: true },
      { label: 'The Method playbook', included: true },
      { label: 'Custom section design', included: false },
      { label: 'Priority support', included: true },
    ],
  },
  {
    eyebrow: 'Studio',
    name: 'Custom',
    price: '€1,499',
    blurb: 'Everything, adapted to your brand by us.',
    cta: 'Book a call',
    href: '#book-call',
    features: [
      { label: 'All 8 templates', included: true },
      { label: 'Cursor / v0 / Lovable setup guide', included: true },
      { label: 'Design token file', included: true },
      { label: 'The Method playbook', included: true },
      { label: '3 custom sections, designed for you', included: true },
      { label: 'Priority support', included: true },
    ],
  },
]

export const faqs = [
  { q: 'What exactly do I get?', a: 'A React + Tailwind + TypeScript codebase per template, a design-token file, a setup guide for Cursor, v0 and Lovable, and (on Standard and Custom) The Method playbook.' },
  { q: 'Do I need to know how to code?', a: 'Not deeply. The templates are structured so an AI tool can edit them safely. Knowing enough to run a dev server and read a diff helps.' },
  { q: 'Can I use a template for client work?', a: 'Yes. Each licence covers unlimited projects for you or your clients. You cannot resell the templates themselves as templates.' },
  { q: 'Is it really a one-time payment?', a: 'Yes. All prices are one-shot. No subscription, no seat fees, and updates to the templates you own are included.' },
  { q: 'Which frameworks are supported?', a: 'Templates ship as Vite + React. They port cleanly to Next.js; the setup guide covers the handful of changes needed.' },
  { q: 'How is this different from a free template?', a: 'Free templates optimise for breadth. These optimise for one thing: a site with a point of view — type, rhythm and motion tuned so it doesn’t feel generic.' },
  { q: 'What if it is not right for me?', a: 'Email within 14 days of purchase and we will refund you, no questions asked.' },
  { q: 'How does the Custom tier work?', a: 'After purchase you book a kickoff call. We design three bespoke sections in your brand and hand them over as code in the same structure as the template library.' },
]
