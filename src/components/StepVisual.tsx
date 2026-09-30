import { templates } from '../data/content'
import { TemplateThumb } from './TemplateThumb'

export function StepVisual({ kind }: { kind: 'pick' | 'code' | 'ship' }) {
  return (
    <div aria-hidden="true" className="glass relative aspect-[5/4] overflow-hidden rounded-card p-5 md:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />
      {kind === 'pick' && (
        <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
          {templates.slice(0, 6).map((t, i) => (
            <div
              key={t.name}
              className={`overflow-hidden rounded-lg border ${i === 1 ? 'border-lime ring-4 ring-lime/15' : 'border-white/5 opacity-50'}`}
            >
              <TemplateThumb hue={t.hue} layout={t.layout} />
            </div>
          ))}
        </div>
      )}
      {kind === 'code' && (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-black/60">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5 font-mono text-[11px] text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-lime" /> tokens.ts
          </div>
          <pre className="flex-1 overflow-hidden p-4 font-mono text-[12px] leading-[1.8] text-ink-muted md:text-mono">
            <code>
              <span className="text-[#C8A2FF]">export const</span> tokens = {'{'}
              {'\n'}  color: {'{'}
              {'\n'}    bg: <span className="text-lime">'#0A0A0A'</span>,
              {'\n'}    accent: <span className="text-lime">'#D4FF4F'</span>,
              {'\n'}  {'}'},
              {'\n'}  font: {'{'}
              {'\n'}    display: <span className="text-lime">'Instrument Serif'</span>,
              {'\n'}    sans: <span className="text-lime">'Geist'</span>,
              {'\n'}  {'}'},
              {'\n'}  radius: <span className="text-[#FFB38A]">16</span>,
              {'\n'}{'}'}
              {'\n'}
              {'\n'}<span className="text-ink-faint">// cursor: "make the hero warmer"</span>
              {'\n'}<span className="text-ink-faint">// ✓ edited 1 token, layout untouched</span>
            </code>
          </pre>
        </div>
      )}
      {kind === 'ship' && (
        <div className="flex h-full flex-col gap-4">
          <div className="flex-1 overflow-hidden rounded-lg border border-white/5">
            <TemplateThumb hue="#D4FF4F" layout="hero" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 px-4 py-3 font-mono text-[12px]">
            <span className="text-ink-muted">yourstudio.com</span>
            <span className="flex items-center gap-2 text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_#D4FF4F]" /> Live
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
