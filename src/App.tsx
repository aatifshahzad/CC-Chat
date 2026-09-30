import { LazyMotion } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Templates } from './components/Templates'
import { HowItWorks } from './components/HowItWorks'
import { Proof } from './components/Proof'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'

// Framer Motion features are loaded after first paint; `m` components render statically until then.
const motionFeatures = () => import('./lib/motion-features').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={motionFeatures} strict>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-lime px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Templates />
        <HowItWorks />
        <Proof />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </LazyMotion>
  )
}
