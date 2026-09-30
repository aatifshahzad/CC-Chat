import { useEffect, useRef } from 'react'

/** Sparse drifting particles on a canvas. Pauses off-screen / hidden tab; off for reduced motion. */
export function Dust({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const n = window.innerWidth < 768 ? Math.round(count / 2) : count
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ps = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(Math.random() * 0.15 + 0.03),
      a: Math.random() * 0.5 + 0.15,
      t: Math.random() * Math.PI * 2,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        p.t += 0.01
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.x < -4) p.x = w + 4
        else if (p.x > w + 4) p.x = -4
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = '#FAFAFA'
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const setRunning = () => {
      cancelAnimationFrame(raf)
      if (visible && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning() })
    io.observe(canvas)
    document.addEventListener('visibilitychange', setRunning)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', setRunning)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
