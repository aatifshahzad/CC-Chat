/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HERO_HLS_URL?: string
}

// The light build has the same API as the full build but ships without types.
declare module 'hls.js/light' {
  export { default } from 'hls.js'
}
