import type { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Next.js Demo app',
  short_name: 'Next.js Demo',
  description: 'A demo application built with Next.js and Turborepo',
  start_url: '/',
  display: 'standalone',
  background_color: '#008080',
  theme_color: '#ffffff',
  icons: [
    {
      src: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      src: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: '/favicon.ico',
      sizes: 'any',
      type: 'image/x-icon',
    },
  ],
});

export default manifest;
