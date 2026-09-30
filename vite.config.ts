import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The whole stylesheet is ~7 kB gzipped, so inlining all of it is cheaper than
 * extracting "critical" CSS: it removes the only render-blocking request.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        for (const [file, chunk] of Object.entries(ctx.bundle)) {
          if (!file.endsWith('.css') || chunk.type !== 'asset') continue
          const tag = new RegExp(`<link[^>]*href="[^"]*${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`)
          if (!tag.test(html)) continue
          html = html.replace(tag, () => `<style>${chunk.source}</style>`)
          delete ctx.bundle[file]
        }
        return html
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  build: {
    target: 'es2020',
  },
})
