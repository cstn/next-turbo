import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/internal/',
  },
  sitemap: 'https://demo.cast-it.de/sitemap.xml',
});

export default robots;
