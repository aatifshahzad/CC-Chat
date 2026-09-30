import { useEffect, useRef, useState } from 'react'

const SRC = import.meta.env.VITE_HERO_HLS_URL

/**
 * Full-bleed HLS background. The gradient poster renders immediately (and is all
 * reduced-motion / Save-Data users get); hls.js is only fetched when a stream is
 * configured and the browser lacks native HLS (light build: no subtitles/DRM/alt audio).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || !SRC) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return

    let destroy: (() => void) | undefined
    let cancelled = false

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SRC
    } else {
      import('hls.js/light').then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return
        const hls = new Hls({ capLevelToPlayerSize: true, maxBufferLength: 10 })
        hls.loadSource(SRC)
        hls.attachMedia(video)
        destroy = () => hls.destroy()
      })
    }
    video.play().catch(() => {})

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Poster: cinematic gradient + grain, zero requests */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 70% 20%, rgba(212,255,79,0.10), transparent 60%), radial-gradient(60% 50% at 15% 80%, rgba(120,140,255,0.10), transparent 60%), linear-gradient(180deg, #111 0%, #0A0A0A 100%)',
        }}
      />
      {SRC && (
        <video
          ref={ref}
          data-parallax
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full scale-110 object-cover transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      {/* 50% black overlay per spec, plus a bottom fade into the page */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-obsidian" />
    </div>
  )
}
