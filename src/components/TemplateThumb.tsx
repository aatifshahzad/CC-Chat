import type { Template } from '../data/content'

/**
 * Lightweight vector stand-in for a template screenshot (zero network bytes).
 * Replace with <picture> AVIF/WebP screenshots when real ones exist.
 */
export function TemplateThumb({ hue, layout }: Pick<Template, 'hue' | 'layout'>) {
  const bar = (w: string, o = 0.14, h = 'h-1.5') => (
    <div className={`${h} rounded-full`} style={{ width: w, background: `rgba(250,250,250,${o})` }} />
  )
  const block = (cls: string, strong = false) => (
    <div
      className={`rounded-md ${cls}`}
      style={{ background: strong ? hue : `color-mix(in srgb, ${hue} 14%, transparent)` }}
    />
  )

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-[#0f0f0f]"
      style={{ backgroundImage: `radial-gradient(120% 80% at 80% 0%, color-mix(in srgb, ${hue} 18%, transparent), transparent 60%)` }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/15" />
        ))}
        <div className="ml-3 h-1.5 w-1/4 rounded-full bg-white/10" />
      </div>

      <div className="flex h-[calc(100%-26px)] flex-col gap-3 p-[6%]">
        {layout === 'hero' && (
          <>
            <div className="flex justify-between">{bar('18%', 0.3)}{bar('30%')}</div>
            <div className="mt-[6%] flex flex-col items-center gap-2">
              {bar('58%', 0.7, 'h-3')}
              {bar('42%', 0.7, 'h-3')}
              {bar('34%', 0.2)}
              <div className="mt-2 h-3 w-[16%] rounded-full" style={{ background: hue }} />
            </div>
            <div className="mt-auto grid min-h-0 flex-[0_1_34%] grid-cols-3 gap-2">
              {block('h-full')}
              {block('h-full opacity-80', true)}
              {block('h-full')}
            </div>
          </>
        )}
        {layout === 'split' && (
          <div className="grid flex-1 grid-cols-2 gap-3">
            <div className="flex flex-col justify-center gap-2">
              {bar('90%', 0.7, 'h-2.5')}
              {bar('70%', 0.7, 'h-2.5')}
              {bar('80%')}
              <div className="mt-1 h-2.5 w-1/3 rounded-full" style={{ background: hue }} />
            </div>
            {block('h-full')}
          </div>
        )}
        {layout === 'grid' && (
          <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
            {block('col-span-2 row-span-2', true)}
            {block('')}
            {block('')}
          </div>
        )}
        {layout === 'mono' && (
          <>
            {bar('50%', 0.7, 'h-2.5')}
            <div className="flex flex-1 items-end gap-1.5">
              {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? hue : `color-mix(in srgb, ${hue} 22%, transparent)` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">{bar('100%')}{bar('100%')}{bar('100%')}</div>
          </>
        )}
        {layout === 'editorial' && (
          <>
            <div className="h-5 w-2/3 rounded-sm" style={{ background: `color-mix(in srgb, ${hue} 60%, transparent)` }} />
            {bar('40%', 0.3)}
            <div className="mt-auto grid grid-cols-5 gap-2">
              {block('col-span-3 aspect-[4/3]')}
              <div className="col-span-2 flex flex-col gap-1.5">{bar('100%')}{bar('90%')}{bar('95%')}{bar('60%')}</div>
            </div>
          </>
        )}
        {layout === 'stack' && (
          <div className="grid flex-1 grid-cols-4 gap-3">
            <div className="flex flex-col gap-1.5 border-r border-white/5 pr-2">
              {bar('80%', 0.3)}{bar('60%')}{bar('70%')}{bar('50%')}
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              {bar('60%', 0.7, 'h-2.5')}
              <div className="flex-1 rounded-md border border-white/5 bg-black/40 p-2 font-mono text-[8px] leading-tight" style={{ color: hue }}>
                $ npx create
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
